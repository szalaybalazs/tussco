"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Forwards a legacy privacy-policy URL (e.g. /pp, /pps, /ppp shipped in older
 * app builds) to the current /privacy-policy page. It renders briefly rather
 * than doing a server redirect, so the analytics script records the hit before
 * we forward. The old "#EULA" anchor is mapped to the Terms of Use section.
 */
export const LegacyRedirect = ({ to = "/privacy-policy" }: { to?: string }) => {
  const router = useRouter();

  useEffect(() => {
    const target = /eula|terms/i.test(window.location.hash)
      ? `${to}#terms`
      : to;
    // Give the (afterInteractive) analytics a beat to register this URL first.
    const timer = setTimeout(() => router.replace(target), 600);
    return () => clearTimeout(timer);
  }, [router, to]);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-24 text-gray-500 dark:text-gray-400">
      <p className="text-lg font-medium">Redirecting to the privacy policy…</p>
    </div>
  );
};
