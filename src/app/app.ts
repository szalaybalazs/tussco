import appList from "./apps.json";
import { lookupApp, iTunesApp } from "./itunes";
import { discoverScreenshots, iScreenshotGroup } from "./screenshots";

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
  /** Overrides the App Store's release date — use it to place an app by the
   *  year I actually shipped my version, not the listing's original date. */
  releaseDate?: string;
  genre?: string;
  /** Company/developer shown after the name. Defaults to the App Store
   *  developer when fetched. */
  company?: string;
  role?: iAppRole;
  rating?: number;
  ratingCount?: number;
  minimumOsVersion?: string;
  /** Ignore App Store screenshots and use only the local ones — e.g. when a
   *  later version I didn't build changed how the app looks. */
  forceLocalScreenshots?: boolean;
  background?: string;
  color?: string;
  href?: string;
  /** Marketing/website URL — shows a "Website" button next to the App Store
   *  one (handy for delisted apps that still have a live site). */
  website?: string;
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
  company?: string;
  rating?: number;
  ratingCount?: number;
  version?: string;
  size?: string;
  minimumOsVersion?: string;
  /** Device screenshots grouped by platform (iPhone, iPad, macOS, tvOS). */
  screenshotGroups: iScreenshotGroup[];
  /** Single fallback banner (image.*) shown when there are no device shots. */
  screenshotBanner?: string;
  storeUrl?: string;
  website?: string;
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

// My Apple affiliate provider + campaign tokens, used to build tracked App
// Store links for my own (indie) apps.
const APPLE_PT = "118038397";
const APPLE_CT = "laszlotuss.com";
const appStoreUrl = (appid: string, tracked: boolean) =>
  tracked
    ? `https://apps.apple.com/app/apple-store/id${appid}?pt=${APPLE_PT}&ct=${APPLE_CT}&mt=8`
    : `https://apps.apple.com/app/id${appid}`;

/** Merge a raw JSON entry with optional iTunes data into a resolved app. */
const normalize = (raw: iRawApp, itunes: iTunesApp | null): iApp | null => {
  if (raw.appid && itunes) {
    const liveGroups: iScreenshotGroup[] = [];
    if (itunes.screenshotUrls?.length)
      liveGroups.push({ platform: "iPhone", urls: itunes.screenshotUrls });
    if (itunes.ipadScreenshotUrls?.length)
      liveGroups.push({ platform: "iPad", urls: itunes.ipadScreenshotUrls });
    if (itunes.appletvScreenshotUrls?.length)
      liveGroups.push({ platform: "tvOS", urls: itunes.appletvScreenshotUrls });

    const id = raw.id || raw.appid;
    // Prefer live App Store screenshots, falling back to local ones in
    // public/screens/<appid|id>/ when the API exposes none. With
    // forceLocalScreenshots, use only the local ones (ignore the App Store).
    const local = discoverScreenshots([raw.appid, id]);
    const { groups: screenshotGroups, banner: screenshotBanner } =
      raw.forceLocalScreenshots
        ? local
        : liveGroups.length
        ? { groups: liveGroups, banner: undefined }
        : local;
    const releaseDate = raw.releaseDate || itunes.releaseDate || "";
    if (!releaseDate) return null;
    const role = raw.role ?? "indie";

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
      role,
      genre: raw.genre || itunes.primaryGenreName,
      developer: itunes.artistName,
      company: raw.company ?? itunes.artistName,
      rating: raw.rating ?? itunes.averageUserRating,
      ratingCount: raw.ratingCount ?? itunes.userRatingCount,
      version: itunes.version,
      size: formatBytes(itunes.fileSizeBytes),
      minimumOsVersion: itunes.minimumOsVersion,
      screenshotGroups,
      screenshotBanner,
      // My own apps get tracked App Store links; others use the plain listing.
      storeUrl:
        raw.href ||
        (role === "indie"
          ? appStoreUrl(raw.appid, true)
          : itunes.trackViewUrl || appStoreUrl(raw.appid, false)),
      website: raw.website,
      price: itunes.formattedPrice,
      background: raw.background,
      color: raw.color,
    };
  }

  // Local fallback: requires enough data to stand on its own.
  if (!raw.name || !raw.icon || !raw.releaseDate) return null;
  const id = raw.id || slugify(raw.name);
  // A delisted app can still have an appid (e.g. screenshots filed under it).
  const local = discoverScreenshots([raw.appid, id]);
  return {
    id,
    appid: raw.appid,
    name: raw.name,
    icon: raw.icon,
    description: raw.description || "",
    releaseDate: raw.releaseDate,
    year: yearOf(raw.releaseDate),
    role: raw.role ?? "indie",
    genre: raw.genre,
    company: raw.company,
    rating: raw.rating,
    ratingCount: raw.ratingCount,
    minimumOsVersion: raw.minimumOsVersion,
    screenshotGroups: local.groups,
    screenshotBanner: local.banner,
    storeUrl: raw.href,
    website: raw.website,
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

/** Find a single resolved app by its route id — its slug/id or its appid. */
export const getApp = async (id: string): Promise<iApp | undefined> => {
  const apps = await getApps();
  return apps.find((app) => app.id === id || app.appid === id);
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
