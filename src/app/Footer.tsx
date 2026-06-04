import { socials, appStore } from "./socials";

const iconClasses =
  "w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-indigo-500 dark:bg-gray-700 dark:text-indigo-300";

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto w-full px-4 mb-12 pt-8 border-t border-gray-300 dark:border-gray-600">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-xl font-black text-indigo-500">László Tuss</h2>
          <p className="text-md font-medium text-gray-500 dark:text-gray-400">
            Budapest, Hungary
          </p>
        </div>
        <div className="flex items-center gap-3">
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
      <p className="mt-8 text-sm font-medium text-gray-400 dark:text-gray-500">
        Made by{" "}
        <a
          href="https://catnip.media"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 hover:underline underline-offset-2"
        >
          Catnip Media
        </a>{" "}
        · 2026
      </p>
    </footer>
  );
};

export default Footer;
