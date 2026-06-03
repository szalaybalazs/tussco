import { getApp } from "../app";
import { Metadata } from "next";
import Link from "next/link";
import { RoleStamp } from "../RoleStamp";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> => {
  const { app: id } = await params;
  const app = await getApp(id);

  return {
    title: `${app?.name} | László Tuss`,
    openGraph: {
      images: app?.icon,
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
  if (!app) throw new Error("App not found");

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

  return (
    <div className="flex-1 px-4 max-w-3xl w-full mx-auto mt-10 mb-24">
      {/* Hero */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <img
          src={app.icon}
          alt={app.name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-[28px] shadow-md shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {app.name}
            </h1>
            <RoleStamp role={app.role} />
          </div>
          {(app.genre || app.developer) && (
            <p className="mt-1 text-gray-500 dark:text-gray-400 font-medium">
              {[app.genre, app.developer].filter(Boolean).join(" · ")}
            </p>
          )}
          {typeof app.rating === "number" && app.rating > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Stars rating={app.rating} />
              <span>
                {app.rating.toFixed(1)}
                {app.ratingCount ? ` · ${app.ratingCount.toLocaleString()} ratings` : ""}
              </span>
            </div>
          )}
          {app.storeUrl && (
            <a
              href={app.storeUrl}
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold rounded-full px-5 py-2.5 transition-all"
            >
              <span>View on the App Store</span>
              <ArrowOut />
            </a>
          )}
        </div>
      </div>

      {/* Screenshots */}
      {app.screenshots.length > 0 && (
        <div className="mt-10 -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none">
          {app.screenshots.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${app.name} screenshot ${i + 1}`}
              loading="lazy"
              className="h-[440px] w-auto rounded-2xl shadow-md shrink-0 snap-start"
            />
          ))}
        </div>
      )}

      {/* Description */}
      {app.description && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
            About
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-lg font-medium text-gray-600 dark:text-gray-300">
            {app.description}
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

      {/* Privacy — only for my own (indie) App Store apps */}
      {app.role === "indie" && app.appid && (
        <div className="mt-10 pt-8 border-t dark:border-gray-700">
          <Link
            className="flex items-center gap-2 text-indigo-500 font-medium text-lg hover:underline underline-offset-2"
            href={`/${app.id}/privacy-policy`}
          >
            <span>Privacy Policy</span>
            <ArrowOut size={16} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
