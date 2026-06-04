import fs from "fs";
import path from "path";

// Local screenshots live in public/screens/<key>/ where <key> is an app's
// appid or id. Files are named <Device>_<n>.<ext> (e.g. iPhone_1.png,
// iPad_2.jpg). If a folder has no device screenshots, a single file named
// image.<ext> is used as a fallback banner.
const SCREENS_DIR = path.join(process.cwd(), "public", "screens");
const DEVICE_ORDER = ["iPhone", "iPad", "macOS", "tvOS"] as const;
const DEVICE_FILE = /^(iPhone|iPad|macOS|tvOS)_(\d+)\.(png|jpe?g|webp)$/i;
const IMAGE_FILE = /^image\.(png|jpe?g|webp)$/i;

export type iPlatform = (typeof DEVICE_ORDER)[number];

export interface iScreenshotGroup {
  platform: iPlatform;
  urls: string[];
}

export interface iScreenshots {
  /** Device screenshots grouped by platform, in device order. */
  groups: iScreenshotGroup[];
  /** A single fallback banner (image.*) used when there are no device shots. */
  banner?: string;
}

const canonicalPlatform = (device: string): iPlatform =>
  DEVICE_ORDER.find((d) => d.toLowerCase() === device.toLowerCase()) ?? "iPhone";

const deviceRank = (platform: iPlatform) => DEVICE_ORDER.indexOf(platform);

/**
 * Find local screenshots for an app by scanning public/screens/<key>/.
 * Tries each candidate key in order and returns the first folder that has
 * images. Device screenshots (iPhone_1, iPad_1, …) are grouped by platform in
 * device then numeric order; if there are none, a lone image.<ext> banner is
 * returned ungrouped.
 */
export const discoverScreenshots = (
  keys: (string | undefined)[]
): iScreenshots => {
  for (const key of keys) {
    if (!key) continue;
    let files: string[];
    try {
      files = fs.readdirSync(path.join(SCREENS_DIR, key));
    } catch {
      continue; // no folder for this key
    }

    const device = files
      .map((file) => {
        const m = file.match(DEVICE_FILE);
        return m
          ? { file, platform: canonicalPlatform(m[1]), n: parseInt(m[2], 10) }
          : null;
      })
      .filter(
        (x): x is { file: string; platform: iPlatform; n: number } => !!x
      );

    if (device.length) {
      const byPlatform = new Map<iPlatform, { file: string; n: number }[]>();
      for (const d of device) {
        const bucket = byPlatform.get(d.platform) ?? [];
        bucket.push({ file: d.file, n: d.n });
        byPlatform.set(d.platform, bucket);
      }
      const groups: iScreenshotGroup[] = Array.from(
        byPlatform,
        ([platform, items]) => ({
          platform,
          urls: items
            .sort((a, b) => a.n - b.n)
            .map((it) => `/screens/${key}/${it.file}`),
        })
      ).sort((a, b) => deviceRank(a.platform) - deviceRank(b.platform));
      return { groups };
    }

    const banner = files.find((file) => IMAGE_FILE.test(file));
    if (banner) return { groups: [], banner: `/screens/${key}/${banner}` };
  }
  return { groups: [] };
};
