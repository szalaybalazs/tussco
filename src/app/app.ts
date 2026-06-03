import appList from "./apps.json";
import { lookupApp, iTunesApp } from "./itunes";
import { discoverScreenshots } from "./screenshots";

/**
 * How an app relates to me — shown as a stamp on the card and detail page.
 * - "indie": my own app, published under my account
 * - "co-owner": built as co-owner of a company/startup (e.g. Tappointment)
 * - "contract": client work or a contribution to someone else's app
 */
export type iAppRole = "indie" | "co-owner" | "contract";

/**
 * A raw entry in apps.json.
 *
 * - If `appid` is a non-empty string, the app's data (name, icon, description,
 *   screenshots, release date, …) is fetched from the public iTunes API. This
 *   works even when the app is published under someone else's account. Any
 *   field set here overrides the fetched value.
 * - If `appid` is empty/omitted, the app is treated as a local fallback (e.g.
 *   delisted from the App Store) and rendered entirely from this JSON. In that
 *   case `name`, `icon` and `releaseDate` are required.
 *
 * `role` defaults to "indie" when omitted.
 */
export interface iRawApp {
  appid?: string;
  id?: string;
  name?: string;
  icon?: string;
  description?: string;
  releaseDate?: string;
  genre?: string;
  role?: iAppRole;
  rating?: number;
  ratingCount?: number;
  minimumOsVersion?: string;
  background?: string;
  color?: string;
  href?: string;
}

/** A fully-resolved app used everywhere in the UI. */
export interface iApp {
  id: string;
  appid?: string;
  name: string;
  icon: string;
  description: string;
  releaseDate: string;
  year: number;
  role: iAppRole;
  genre?: string;
  developer?: string;
  rating?: number;
  ratingCount?: number;
  version?: string;
  size?: string;
  minimumOsVersion?: string;
  screenshots: string[];
  storeUrl?: string;
  price?: string;
  background?: string;
  color?: string;
}

/** A set of apps released in the same calendar year. */
export interface iYearGroup {
  year: number;
  apps: iApp[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatBytes = (bytes?: string): string | undefined => {
  if (!bytes) return undefined;
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return undefined;
  if (n >= 1e9) return `${(n / 1e9).toFixed(1)} GB`;
  return `${Math.round(n / 1e6)} MB`;
};

const yearOf = (date: string) => new Date(date).getFullYear();

/** Merge a raw JSON entry with optional iTunes data into a resolved app. */
const normalize = (raw: iRawApp, itunes: iTunesApp | null): iApp | null => {
  if (raw.appid && itunes) {
    const itunesShots = [
      ...(itunes.screenshotUrls ?? []),
      ...(itunes.ipadScreenshotUrls ?? []),
    ];
    const id = raw.id || raw.appid;
    // Prefer live App Store screenshots. Fall back to local ones discovered in
    // public/screens/<appid|id>/ when the API exposes none — newer apps it
    // doesn't return, or apps that were later delisted.
    const screenshots = itunesShots.length
      ? itunesShots
      : discoverScreenshots([raw.appid, id]);
    const releaseDate = raw.releaseDate || itunes.releaseDate || "";
    if (!releaseDate) return null;

    return {
      id,
      appid: raw.appid,
      name: raw.name || itunes.trackName,
      icon:
        raw.icon ||
        itunes.artworkUrl512 ||
        itunes.artworkUrl100 ||
        itunes.artworkUrl60 ||
        "",
      description: raw.description || itunes.description || "",
      releaseDate,
      year: yearOf(releaseDate),
      role: raw.role ?? "indie",
      genre: raw.genre || itunes.primaryGenreName,
      developer: itunes.artistName,
      rating: itunes.averageUserRating,
      ratingCount: itunes.userRatingCount,
      version: itunes.version,
      size: formatBytes(itunes.fileSizeBytes),
      minimumOsVersion: itunes.minimumOsVersion,
      screenshots,
      storeUrl:
        raw.href ||
        itunes.trackViewUrl ||
        `https://apps.apple.com/app/id${raw.appid}`,
      price: itunes.formattedPrice,
      background: raw.background,
      color: raw.color,
    };
  }

  // Local fallback: requires enough data to stand on its own.
  if (!raw.name || !raw.icon || !raw.releaseDate) return null;
  const id = raw.id || slugify(raw.name);
  return {
    id,
    name: raw.name,
    icon: raw.icon,
    description: raw.description || "",
    releaseDate: raw.releaseDate,
    year: yearOf(raw.releaseDate),
    role: raw.role ?? "indie",
    genre: raw.genre,
    rating: raw.rating,
    ratingCount: raw.ratingCount,
    minimumOsVersion: raw.minimumOsVersion,
    // A delisted app can still have an appid (e.g. screenshots filed under it).
    screenshots: discoverScreenshots([raw.appid, id]),
    storeUrl: raw.href,
    background: raw.background,
    color: raw.color,
  };
};

/** Resolve every app in apps.json, newest release first. */
export const getApps = async (): Promise<iApp[]> => {
  const raws = appList as iRawApp[];
  const resolved = await Promise.all(
    raws.map(async (raw) => {
      const itunes = raw.appid ? await lookupApp(raw.appid) : null;
      return normalize(raw, itunes);
    })
  );
  return resolved
    .filter((app): app is iApp => app !== null)
    .sort(
      (a, b) =>
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
};

/** Find a single resolved app by its route id (appid or slug). */
export const getApp = async (id: string): Promise<iApp | undefined> => {
  const apps = await getApps();
  return apps.find((app) => app.id === id);
};

/** Group resolved apps into calendar years, newest year first. */
export const groupByYear = (apps: iApp[]): iYearGroup[] => {
  const byYear = new Map<number, iApp[]>();
  for (const app of apps) {
    const bucket = byYear.get(app.year);
    if (bucket) bucket.push(app);
    else byYear.set(app.year, [app]);
  }
  return Array.from(byYear, ([year, apps]) => ({ year, apps })).sort(
    (a, b) => b.year - a.year
  );
};
