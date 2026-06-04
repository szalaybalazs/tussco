"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { socials, appStore } from "./socials";

const pillClasses =
  "inline-flex items-center gap-1 rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:scale-105 active:scale-95 w-fit transition-all";

const iconClasses =
  "w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-indigo-500 dark:bg-gray-700 dark:text-indigo-300";

// Top-level routes that aren't an app detail page.
const STATIC_ROUTES = ["about", "privacy-policy"];

const links = [appStore, ...socials];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const isAppPage =
    segments.length > 0 && !STATIC_ROUTES.includes(segments[0]);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="flex flex-shrink-0 backdrop-blur-lg bg-white/75 dark:bg-gray-800/75 z-50 sticky top-0">
      <div className="flex flex-shrink-0 px-5 sm:px-8 items-center max-w-4xl mx-auto w-full border-b border-gray-300 dark:border-gray-600 h-[80px]">
        <div className="flex-1">
          {isAppPage ? (
            <button
              type="button"
              onClick={() => {
                // Go back through history so the timeline scroll is restored;
                // fall back to the home page when there's nowhere to go back to.
                if (window.history.length > 1) router.back();
                else router.push("/");
              }}
              className={pillClasses}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Back</span>
            </button>
          ) : (
            <Link href="/about" className={pillClasses}>
              About
            </Link>
          )}
        </div>
        <Link href="/">
          <h1 className="text-indigo-600 dark:text-indigo-400 font-black text-lg sm:text-xl whitespace-nowrap">
            László Tuss
          </h1>
        </Link>
        <div className="flex-1 flex justify-end">
          {/* Tablet & desktop: inline icon row */}
          <div className="hidden md:flex gap-2">
            {links.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={iconClasses}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d={social.icon} />
                </svg>
              </a>
            ))}
          </div>

          {/* Mobile: hamburger dropdown */}
          <div className="md:hidden relative">
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className={iconClasses}
            >
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
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>

            {menuOpen && (
              <>
                {/* Click-away backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  aria-hidden
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 z-50 w-52 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg py-1">
                  {links.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-indigo-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d={social.icon} />
                      </svg>
                      <span>{social.name}</span>
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
