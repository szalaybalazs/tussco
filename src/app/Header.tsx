import Link from "next/link";
import { FunctionComponent } from "react";

interface iHeaderProps {}

const linkClasses =
  "w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-indigo-500 dark:bg-gray-700 dark:text-indigo-300";
const Header: FunctionComponent<iHeaderProps> = () => {
  return (
    <header className="flex flex-shrink-0  backdrop-blur-lg bg-opacity-75 bg-white z-50 sticky top-0 ">
      <div className="flex flex-shrink-0 px-4 md:px-0 items-center max-w-4xl mx-auto w-full border-b border-gray-300 dark:border-gray-600 h-[80px] dark:bg-gray-800">
        <div className="flex-1">
          <Link
            href="/about"
            className="rounded-xl bg-gray-100 dark:bg-gray-700 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-300 hover:scale-105 active:scale-95 block w-fit transition-all"
          >
            About
          </Link>
        </div>
        <Link href="/">
          <h1 className="text-indigo-600 dark:text-indigo-400 font-black text-xl">
            Tuss Co.
          </h1>
        </Link>
        <div className="flex-1 flex gap-4 justify-end">
          <a href="https://twitter.com/tuss" className={linkClasses}>
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
            >
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </a>
          {/* <a href="https://twitter.com/tuss" className={linkClasses}>
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
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
        </a> */}

          <a href="https://twitter.com/tuss" className={linkClasses}>
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
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
