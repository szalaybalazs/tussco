import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

// Apple touch icon — full-bleed, opaque PNG (iOS applies its own rounded mask).
// A PNG is important: iOS ignores a JPEG apple-touch-icon and falls back to the
// favicon on a padded white tile.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const profile =
  "data:image/jpeg;base64," +
  readFileSync(join(process.cwd(), "public", "profile.jpg")).toString("base64");

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile}
          width={180}
          height={180}
          style={{ width: 180, height: 180, objectFit: "cover" }}
        />
      </div>
    ),
    { ...size }
  );
}
