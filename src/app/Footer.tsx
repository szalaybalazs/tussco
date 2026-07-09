import Link from "next/link";
import { socials, appStore, buyMeCoffee } from "./socials";

const iconClasses =
  "w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-gray-600 hover:text-indigo-500 dark:bg-gray-700 dark:text-indigo-300";

const CreditLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-indigo-500 hover:underline underline-offset-2"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="max-w-4xl mx-auto w-full px-4 mb-4 pt-4 border-t border-gray-300 dark:border-gray-600">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-xl font-black text-indigo-500">László Tuss</h2>
          <p className="text-md font-medium text-gray-500 dark:text-gray-400">
            Budapest, Hungary
          </p>
          <div className="mt-1 flex items-center gap-3">
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/support", label: "Support" },
            ].map(({ href, label }, i, arr) => (
              <span key={href} className="flex items-center gap-3">
                <Link
                  href={href}
                  className="text-sm font-semibold text-indigo-500 hover:underline underline-offset-2"
                >
                  {label}
                </Link>
                {i < arr.length - 1 && (
                  <span aria-hidden className="text-gray-300 dark:text-gray-600">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[buyMeCoffee, appStore, ...socials].map((social) => (
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
        <CreditLink href="https://laszlotuss.com">László Tuss</CreditLink> @{" "}
        <CreditLink href="https://catnip.media">Catnip Media</CreditLink> and{" "}
        <CreditLink href="https://szalay.me">Balázs Szalay</CreditLink> @{" "}
        <CreditLink href="https://actegon.com">Actegon</CreditLink> · 2026
      </p>
    </footer>
  );
};

export default Footer;
