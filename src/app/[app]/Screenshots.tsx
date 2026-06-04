"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { iPlatform, iScreenshotGroup } from "../screenshots";

const PLATFORM_LABEL: Record<iPlatform, string> = {
  iPhone: "iPhone",
  iPad: "iPad",
  macOS: "Mac",
  tvOS: "Apple TV",
};

// Tall phone shots use the horizontal strip; the wider platforms (iPad / Mac /
// Apple TV) are scaled to fit the content width instead.
const isStrip = (p: iPlatform) => p === "iPhone";

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

const Chevron = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

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
  const [menuOpen, setMenuOpen] = useState(false);
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
        <div className="relative mb-5 inline-block">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:scale-105 active:scale-95 transition-all"
          >
            <span>{PLATFORM_LABEL[group.platform]}</span>
            <Chevron />
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                aria-hidden
                onClick={() => setMenuOpen(false)}
              />
              <ul
                role="listbox"
                className="absolute left-0 top-full mt-2 z-50 min-w-[10rem] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1"
              >
                {groups.map((g) => (
                  <li key={g.platform}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={g.platform === group.platform}
                      onClick={() => {
                        setSelected(g.platform);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        g.platform === group.platform
                          ? "text-indigo-600 dark:text-indigo-300"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <span>{PLATFORM_LABEL[g.platform]}</span>
                      {g.platform === group.platform && (
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {isStrip(group.platform) ? (
        // Tall phone shots: full-bleed horizontal strip, first shot visible
        // (padding lives on the track so it scrolls with the first image).
        <div
          ref={stripRef}
          className="relative left-[calc(50%-50vw)] w-screen overflow-x-auto scrollbar-none snap-x scroll-pl-5 sm:scroll-pl-8"
        >
          <div className="flex gap-4 px-5 sm:px-8 w-max mx-auto">
            {group.urls.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${appName} ${PLATFORM_LABEL[group.platform]} screenshot ${
                  i + 1
                }`}
                onLoad={i === 0 ? resetScroll : undefined}
                className="h-[440px] w-auto max-w-none object-contain rounded-2xl shadow-md shrink-0 snap-start"
              />
            ))}
          </div>
        </div>
      ) : (
        // Wider shots (iPad / Mac / Apple TV): scaled to fit the content width.
        <div className="flex flex-col gap-4">
          {group.urls.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${appName} ${PLATFORM_LABEL[group.platform]} screenshot ${
                i + 1
              }`}
              className="w-full h-auto object-contain rounded-2xl shadow-md"
            />
          ))}
        </div>
      )}
    </section>
  );
};
