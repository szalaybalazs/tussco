import { ImageResponse } from "next/og";
import { getApp } from "../app";

// Same-origin, rounded favicon for an app page (remote App Store icons are
// square and unreliable as a cross-origin favicon).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: id } = await params;
  const app = await getApp(id);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        {app?.icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={app.icon}
            width={64}
            height={64}
            style={{ width: 64, height: 64, objectFit: "cover" }}
          />
        ) : null}
      </div>
    ),
    { ...size }
  );
}
