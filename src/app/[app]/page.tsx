import { getApp } from "../app";
import { Metadata } from "next";
import Link from "next/link";
import { RoleStamp } from "../RoleStamp";
import { Screenshots } from "./Screenshots";
import { HashScroll } from "./HashScroll";
import { fetchLinkPreview } from "../linkPreview";
import { AppDescription } from "./AppDescription";
import { notFound } from "next/navigation";

// Apple's help article for iMessage apps, shown on my sticker apps.
const STICKER_SUPPORT_URL = "https://support.apple.com/en-us/104969";
const STICKER_SUPPORT_TITLE =
  "How to use iMessage apps on your iPhone and iPad";
const SUBSCRIPTION_SUPPORT_URL = "https://support.apple.com/en-us/HT202039";
const SUBSCRIPTION_SUPPORT_TITLE =
  "View, change, or cancel your subscriptions";
const WATCH_SUPPORT_URL = "https://support.apple.com/en-us/109023";
const WATCH_SUPPORT_TITLE = "Set up and use Apple Watch";
const PIP_SUPPORT_URL =
  "https://support.apple.com/guide/iphone/multitask-with-picture-in-picture-iphcc3587b5d/ios";
const PIP_SUPPORT_TITLE = "Use Picture in Picture on iPhone";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> => {
  const { app: id } = await params;
  const app = await getApp(id);
  if (!app) return { title: "Not found | László Tuss" };

  return {
    // The per-app browser-tab favicon comes from the icon.tsx route.
    title: `${app.name} | László Tuss`,
    openGraph: {
      images: app.icon,
    },
  };
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Stars = ({ rating }: { rating: number }) => {
  const pct = `${(Math.min(Math.max(rating, 0), 5) / 5) * 100}%`;
  return (
    <span className="relative inline-block leading-none align-middle">
      <span className="text-gray-300 dark:text-gray-600 tracking-wide">
        ★★★★★
      </span>
      <span
        className="absolute inset-0 overflow-hidden whitespace-nowrap text-amber-400 tracking-wide"
        style={{ width: pct }}
      >
        ★★★★★
      </span>
    </span>
  );
};

const ArrowOut = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const page = async ({ params }: { params: Promise<{ app: string }> }) => {
  const { app: id } = await params;
  const app = await getApp(id);
  if (!app) notFound();

  const infoRows: [string, string | undefined][] = [
    ["Developer", app.developer],
    ["Category", app.genre],
    ["Released", app.releaseDate ? formatDate(app.releaseDate) : undefined],
    ["Version", app.version],
    ["Size", app.size],
    [
      "Compatibility",
      app.minimumOsVersion
        ? `${
            /[a-z]/i.test(app.minimumOsVersion)
              ? app.minimumOsVersion
              : `iOS ${app.minimumOsVersion}`
          } or later`
        : undefined,
    ],
  ];
  const rows = infoRows.filter(([, value]) => Boolean(value));

  // Support cards — sticker first, then subscription, then any support.apple
  // link found in the description (deduped by URL).
  const isSticker = !!app.sticker || /sticker/i.test(app.genre || "");
  const descSupport = app.description
    .match(/(?:https?:\/\/)?support\.apple\.com\/\S+/i)?.[0]
    ?.replace(/[.,;)]+$/, "");
  const descSupportUrl = descSupport
    ? descSupport.startsWith("http")
      ? descSupport
      : `https://${descSupport}`
    : undefined;

  const supportLinks: { url: string; fallbackTitle: string }[] = [];
  if (isSticker)
    supportLinks.push({
      url: STICKER_SUPPORT_URL,
      fallbackTitle: STICKER_SUPPORT_TITLE,
    });
  if (app.subscription)
    supportLinks.push({
      url: SUBSCRIPTION_SUPPORT_URL,
      fallbackTitle: SUBSCRIPTION_SUPPORT_TITLE,
    });
  if (app.watch || app.screenshotGroups.some((g) => g.platform === "watchOS"))
    supportLinks.push({
      url: WATCH_SUPPORT_URL,
      fallbackTitle: WATCH_SUPPORT_TITLE,
    });
  if (app.pip)
    supportLinks.push({ url: PIP_SUPPORT_URL, fallbackTitle: PIP_SUPPORT_TITLE });
  if (descSupportUrl)
    supportLinks.push({ url: descSupportUrl, fallbackTitle: "Support" });

  const seen = new Set<string>();
  const supportCards = supportLinks.filter(
    (l) => !seen.has(l.url) && seen.add(l.url)
  );
  const supportPreviews = await Promise.all(
    supportCards.map((l) => fetchLinkPreview(l.url))
  );

  return (
    <div className="flex-1 px-4 max-w-3xl w-full mx-auto mt-10 mb-12">
      <HashScroll />
      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <img
          src={app.icon}
          alt={app.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] shadow-md shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {app.name}
          </h1>
          <div className="mt-1 flex items-baseline gap-1.5 flex-wrap text-gray-500 dark:text-gray-400 font-medium">
            {(app.genre || app.company) && (
              <>
                <span>{[app.genre, app.company].filter(Boolean).join(" · ")}</span>
                <span aria-hidden>·</span>
              </>
            )}
            <RoleStamp role={app.role} />
          </div>
          {typeof app.rating === "number" && app.rating > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Stars rating={app.rating} />
              <span>
                {app.rating.toFixed(1)}
                {app.ratingCount ? ` · ${app.ratingCount.toLocaleString()} ratings` : ""}
              </span>
            </div>
          )}
          {(app.storeUrl || app.website) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {app.storeUrl && (
                <a
                  href={app.storeUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold rounded-full px-5 py-2.5 transition-all"
                >
                  <span>View on the App Store</span>
                  <ArrowOut />
                </a>
              )}
              {app.website && (
                <a
                  href={app.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95 text-gray-800 dark:text-gray-100 font-semibold rounded-full px-5 py-2.5 transition-all"
                >
                  <span>Website</span>
                  <ArrowOut />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Screenshots — platform groups with an App Store-style picker. */}
      <Screenshots
        groups={app.screenshotGroups}
        banner={app.screenshotBanner}
        appName={app.name}
      />

      {/* Description */}
      {app.description && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            About
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-lg font-medium text-gray-600 dark:text-gray-300">
            <AppDescription
              text={app.description}
              appId={app.id}
              appName={app.name}
            />
          </p>
        </section>
      )}

      {/* Information */}
      {rows.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            Information
          </h2>
          <dl className="rounded-3xl bg-gray-50 dark:bg-gray-700/30 px-5 divide-y divide-gray-200 dark:divide-gray-700">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-4 py-3.5"
              >
                <dt className="text-gray-500 dark:text-gray-400 font-medium">
                  {label}
                </dt>
                <dd className="text-gray-800 dark:text-gray-200 font-semibold text-right">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Support — sticker / subscription / description support links */}
      {supportCards.length > 0 && (
        <section id="support" className="mt-12 scroll-mt-24">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            Support
          </h2>
          <div className="flex flex-col gap-3">
            {supportCards.map((card, i) => {
              const preview = supportPreviews[i];
              return (
                <a
                  key={card.url}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-3xl border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                >
                  {preview?.image ? (
                    <img
                      src={preview.image}
                      alt=""
                      className="w-16 h-16 rounded-2xl object-cover shrink-0"
                    />
                  ) : (
                    <span className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center shrink-0 text-indigo-500">
                      <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-gray-800 dark:text-gray-200">
                      {preview?.title || card.fallbackTitle}
                    </span>
                    <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {preview?.description || "support.apple.com"}
                    </span>
                  </span>
                  <span className="shrink-0 self-center text-gray-400 dark:text-gray-500 group-hover:text-indigo-500 transition-colors">
                    <ArrowOut size={18} />
                  </span>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Legal — only for my own (indie) App Store apps */}
      {app.role === "indie" && app.appid && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-gray-500 dark:text-gray-400">
          <Link
            href={`/${app.id}/privacy-policy`}
            className="text-indigo-500 hover:underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          <span aria-hidden>·</span>
          <Link
            href={`/${app.id}/privacy-policy#terms`}
            className="text-indigo-500 hover:underline underline-offset-2"
          >
            Terms of Use
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
