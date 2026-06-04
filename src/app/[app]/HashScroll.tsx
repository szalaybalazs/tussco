"use client";

import { useEffect } from "react";

/**
 * Scrolls to the element matching the URL hash on load, case-insensitively
 * (so /<app>#Support reaches id="support"). Native fragment navigation is
 * case-sensitive, and external app links use mixed case. scroll-margin on the
 * target keeps it clear of the sticky header.
 */
export const HashScroll = () => {
  useEffect(() => {
    const raw = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!raw) return;
    const lower = raw.toLowerCase();
    const el =
      document.getElementById(raw) ||
      Array.from(document.querySelectorAll<HTMLElement>("[id]")).find(
        (n) => n.id.toLowerCase() === lower
      );
    // rAF so any final layout (e.g. the support card) has settled.
    if (el) {
      const target = el;
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }, []);

  return null;
};
