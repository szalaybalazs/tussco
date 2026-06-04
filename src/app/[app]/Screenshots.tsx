"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { iPlatform, iScreenshotGroup } from "../screenshots";

const PLATFORM_LABEL: Record<iPlatform, string> = {
  iPhone: "iPhone",
  iPad: "iPad",
  macOS: "Mac",
  tvOS: "Apple TV",
};

// Phone shots get a fixed height (tall portrait cards). The wider platforms
// (iPad / Mac / Apple TV) instead fit the viewport width — one shot per view.
const isPhone = (p: iPlatform) => p === "iPhone";

// iTunes screenshot URLs encode the pixel size, e.g. .../1488x2266bb.png — use
// it so each fit-to-width shot reserves the right height (no load-time jump).
const aspectRatioOf = (url: string): string | undefined => {
  const m = url.match(/\/(\d+)x(\d+)(?:bb)?\.(?:png|jpe?g|webp)/i);
  return m ? `${m[1]} / ${m[2]}` : undefined;
};

const detectPlatform = (): iPlatform => {
  if (typeof navigator === "undefined") return "iPhone";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPod/.test(ua)) return "iPhone";
  if (/iPad/.test(ua)) return "iPad";
  // iPadOS 13+ reports as a Mac — tell them apart by touch support.
  if (/Macintosh/.test(ua) && (navigator.maxTouchPoints ?? 0) > 1) return "iPad";
  if (/Mac OS X|Macintosh/.test(ua)) return "macOS";
  if (/Apple ?TV|tvOS/i.test(ua)) return "tvOS";
  return "iPhone";
};

export const Screenshots = ({
  groups,
  banner,
  appName,
}: {
  groups: iScreenshotGroup[];
  banner?: string;
  appName: string;
}) => {
  // SSR-safe default: iPhone if present, else the first available group. After
  // mount we switch to the visitor's own device platform when we have it.
  const defaultPlatform =
    groups.find((g) => g.platform === "iPhone")?.platform ?? groups[0]?.platform;
  const [selected, setSelected] = useState<iPlatform | undefined>(
    defaultPlatform
  );
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const p = detectPlatform();
    if (groups.some((g) => g.platform === p)) setSelected(p);
  }, [groups]);

  const resetScroll = useCallback(() => {
    if (stripRef.current) stripRef.current.scrollLeft = 0;
  }, []);

  const group = groups.find((g) => g.platform === selected) ?? groups[0];

  // Keep the strip pinned to the first shot when the platform changes.
  useEffect(() => {
    resetScroll();
  }, [selected, resetScroll]);

  // No device groups: show the lone banner ungrouped (never in a picker).
  if (!group) {
    if (!banner) return null;
    return (
      <div className="mt-10">
        <img
          src={banner}
          alt={`${appName} screenshot`}
          className="mx-auto w-full max-w-2xl h-auto object-contain"
        />
      </div>
    );
  }

  const showPicker = groups.length > 1;

  return (
    <section className="mt-10">
      {showPicker && (
        <div
          role="tablist"
          aria-label="Screenshot platform"
          className="flex w-fit mx-auto mb-6 rounded-xl bg-gray-100 dark:bg-gray-700/60 p-1"
        >
          {groups.map((g) => {
            const active = g.platform === group.platform;
            return (
              <button
                key={g.platform}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelected(g.platform)}
                className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-all ${
                  active
                    ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-300 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {PLATFORM_LABEL[g.platform]}
              </button>
            );
          })}
        </div>
      )}

      {/* Full-bleed horizontal strip, first shot visible (padding lives on the
          track so it scrolls with the first image). Phone shots use a fixed
          height; wider shots fit the viewport width — one per view, height from
          the shot's own aspect ratio. */}
      <div
        ref={stripRef}
        className="relative left-[calc(50%-50vw)] w-screen overflow-x-auto scrollbar-none snap-x scroll-pl-5 sm:scroll-pl-8"
      >
        <div className="flex gap-4 px-5 sm:px-8 w-max mx-auto">
          {group.urls.map((src, i) => {
            const phone = isPhone(group.platform);
            const aspectRatio = phone ? undefined : aspectRatioOf(src);
            return (
              <img
                key={src}
                src={src}
                alt={`${appName} ${PLATFORM_LABEL[group.platform]} screenshot ${
                  i + 1
                }`}
                onLoad={i === 0 ? resetScroll : undefined}
                style={aspectRatio ? { aspectRatio } : undefined}
                className={`object-contain rounded-2xl shadow-md shrink-0 snap-start ${
                  phone
                    ? "h-[440px] w-auto max-w-none"
                    : `w-[calc(100vw-2.5rem)] sm:w-[calc(100vw-4rem)] max-w-3xl ${
                        aspectRatio ? "" : "h-auto"
                      }`
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
