"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { socials, appStore } from "./socials";

const pillClasses =
  "inline-flex items-center gap-1 rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:scale-105 active:scale-95 w-fit transition-all";

const iconClasses =
  "w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-indigo-500 dark:bg-gray-700 dark:text-indigo-300";

// Top-level routes that aren't an app detail page.
const STATIC_ROUTES = ["about", "privacy-policy"];

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);
  const isAppPage =
    segments.length > 0 && !STATIC_ROUTES.includes(segments[0]);

  return (
    <header className="flex flex-shrink-0 backdrop-blur-lg bg-white/75 dark:bg-gray-800/75 z-50 sticky top-0">
      <div className="flex flex-shrink-0 px-4 md:px-0 items-center max-w-4xl mx-auto w-full border-b border-gray-300 dark:border-gray-600 h-[80px]">
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
        <div className="flex-1 flex gap-2 justify-end">
          {[...socials, appStore].map((social) => (
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
      </div>
    </header>
  );
};

export default Header;
