import Link from "next/link";
import { getApps, groupByYear } from "./app";
import { RoleStamp } from "./RoleStamp";

export default async function Home() {
  const apps = await getApps();
  const groups = groupByYear(apps);

  return (
    <>
      <div className="flex flex-col items-center text-center md:flex-row md:justify-center md:items-center md:text-left md:gap-10 mt-24 mb-20 px-4">
        <img
          className="bg-gray-700 w-36 rounded-[32px] shrink-0"
          src="/profile.jpg"
          alt="László Tuss"
        />
        <div className="mt-12 md:mt-0">
          <h2 className="text-4xl font-bold text-indigo-500">
            Hi, I am László 👋
          </h2>
          <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
            Experienced iOS Developer with over 10 years in mobile app
            development, working across freelance projects, startups, and
            established companies.
          </p>
        </div>
      </div>

      <section className="flex-1 max-w-2xl w-full mx-auto px-4 pb-24">
        <div className="relative">
          {/* Timeline rail */}
          <span
            aria-hidden
            className="absolute left-2 top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-700"
          />

          {groups.map((group) => (
            <div key={group.year} className="mb-10">
              {/* Year marker */}
              <div className="relative flex items-center mb-4">
                <span
                  aria-hidden
                  className="absolute left-2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-gray-800"
                />
                <h2 className="pl-10 text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {group.year}
                </h2>
              </div>

              {/* Apps released this year */}
              <div className="pl-10 flex flex-col gap-1">
                {group.apps.map((app) => (
                  <Link
                    key={app.id}
                    href={`/${app.id}`}
                    className="group flex items-start gap-4 rounded-3xl p-3 -ml-3 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-16 h-16 rounded-2xl shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-800 dark:text-gray-200 truncate">
                          {app.name}
                        </h3>
                        <RoleStamp role={app.role} />
                      </div>
                      {app.company && (
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {app.company}
                        </p>
                      )}
                      {(app.genre || app.description) && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {[app.genre, app.description]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                    {typeof app.rating === "number" && app.rating > 0 && (
                      <div className="shrink-0 self-center flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <svg
                          className="w-4 h-4 text-amber-400"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.401 8.168L12 18.896l-7.335 3.863 1.401-8.168L.132 9.211l8.2-1.193z" />
                        </svg>
                        <span>{app.rating.toFixed(1)}</span>
                      </div>
                    )}
                    <svg
                      className="shrink-0 self-center text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 transition-colors"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
