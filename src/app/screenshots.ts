import fs from "fs";
import path from "path";

// Local screenshots live in public/screens/<key>/ where <key> is an app's
// appid or id. Files are named <Device>_<n>.<ext> (e.g. iPhone_1.png,
// iPad_2.jpg). If a folder has no device screenshots, a single file named
// image.<ext> is used as a fallback banner.
const SCREENS_DIR = path.join(process.cwd(), "public", "screens");
const DEVICE_ORDER = ["iPhone", "iPad", "macOS", "tvOS"];
const DEVICE_FILE = /^(iPhone|iPad|macOS|tvOS)_(\d+)\.(png|jpe?g|webp)$/i;
const IMAGE_FILE = /^image\.(png|jpe?g|webp)$/i;

const deviceRank = (device: string) => {
  const i = DEVICE_ORDER.findIndex(
    (d) => d.toLowerCase() === device.toLowerCase()
  );
  return i === -1 ? DEVICE_ORDER.length : i;
};

/**
 * Find local screenshots for an app by scanning public/screens/<key>/.
 * Tries each candidate key in order and returns the first folder that has
 * images. Device screenshots (iPhone_1, iPad_1, …) are returned in device
 * then numeric order; if there are none, a lone image.<ext> banner is used.
 */
export const discoverScreenshots = (
  keys: (string | undefined)[]
): string[] => {
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
        return m ? { file, device: m[1], n: parseInt(m[2], 10) } : null;
      })
      .filter((x): x is { file: string; device: string; n: number } => !!x)
      .sort((a, b) => deviceRank(a.device) - deviceRank(b.device) || a.n - b.n);

    if (device.length) {
      return device.map((d) => `/screens/${key}/${d.file}`);
    }

    const banner = files.find((file) => IMAGE_FILE.test(file));
    if (banner) return [`/screens/${key}/${banner}`];
  }
  return [];
};
