// Public iTunes Lookup API — no auth required, CORS-friendly, works server-side.
// Docs: https://performance-partners.apple.com/search-api

export interface iTunesApp {
  trackId: number;
  trackName: string;
  description?: string;
  artworkUrl512?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
  screenshotUrls?: string[];
  ipadScreenshotUrls?: string[];
  averageUserRating?: number;
  userRatingCount?: number;
  formattedPrice?: string;
  primaryGenreName?: string;
  artistName?: string;
  contentAdvisoryRating?: string;
  fileSizeBytes?: string;
  minimumOsVersion?: string;
  version?: string;
  trackViewUrl?: string;
  releaseDate?: string;
  currentVersionReleaseDate?: string;
}

// Storefronts to try, in order. Apps not on the US store (e.g. locale-specific
// titles) fall back to the Hungarian store — mirrors the Catnip Media pattern.
const COUNTRIES = ["us", "hu"];

// Revalidate once a day; App Store metadata rarely changes intraday.
const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Look up a single app by its App Store id. Tries each storefront until one
 * returns a result. Returns null if the app can't be found or the request
 * fails, so callers can fall back to local JSON data.
 */
export async function lookupApp(appid: string): Promise<iTunesApp | null> {
  for (const country of COUNTRIES) {
    try {
      const res = await fetch(
        `https://itunes.apple.com/lookup?id=${encodeURIComponent(
          appid
        )}&country=${country}`,
        { next: { revalidate: REVALIDATE_SECONDS } }
      );
      if (!res.ok) continue;
      const data = await res.json();
      if (data.resultCount > 0) return data.results[0] as iTunesApp;
    } catch {
      // Network error — try the next storefront.
    }
  }
  return null;
}
