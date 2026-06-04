"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Browsers (Safari especially) often don't repaint the tab favicon when only
 * the <link rel="icon"> href changes during client-side navigation — so going
 * back from an app page can leave the app's icon stuck in the tab. Mirror the
 * current icon into our own <link> and recreate it on every route change to
 * force the tab to update (e.g. restore the profile icon when going back).
 */
export const FaviconRefresh = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Let Next update its metadata <link> first, then mirror + force a repaint.
    const t = setTimeout(() => {
      // Next appends a new <link rel="icon"> per route without removing the
      // old one, so the *last* one is the current route's icon.
      const managed = Array.from(
        document.querySelectorAll<HTMLLinkElement>(
          'link[rel="icon"]:not(#dynamic-favicon)'
        )
      );
      const current = managed[managed.length - 1];
      const href = current?.href;
      if (!href) return;
      // Prune the accumulated duplicates, keeping the latest.
      managed.slice(0, -1).forEach((l) => l.remove());
      // Recreate our own link last so the browser repaints the tab.
      document.getElementById("dynamic-favicon")?.remove();
      const link = document.createElement("link");
      link.id = "dynamic-favicon";
      link.rel = "icon";
      link.href = href;
      document.head.appendChild(link);
    }, 150);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
};
