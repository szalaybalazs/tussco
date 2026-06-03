import Link from "next/link";
import { getApps, groupByYear } from "./app";
import { RoleStamp } from "./RoleStamp";

export default async function Home() {
  const apps = await getApps();
  const groups = groupByYear(apps);
  // "Latest" marks the most recent app that's still on the App Store, so a
  // newer-but-delisted app at the top of the timeline doesn't claim the badge.
  const latestId = apps.find((app) => app.storeUrl)?.id;

  return (
    <>
      <div className="flex flex-col items-center mb-20 text-center px-4">
        <img
          className="bg-gray-700 w-36 rounded-[32px] mt-24"
          src="/profile.jpg"
          alt="László Tuss"
        />
        <h2 className="text-4xl font-bold mt-12 text-indigo-500">
          Hi, I am László 👋
        </h2>
        <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
          I am an iOS developer & I build indie applications
        </p>
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
                    className="group flex items-center gap-4 rounded-3xl p-3 -ml-3 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors"
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
                        {app.id === latestId && (
                          <span className="shrink-0 bg-indigo-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                            Latest
                          </span>
                        )}
                      </div>
                      {(app.genre || app.description) && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {[app.genre, app.description]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      )}
                    </div>
                    <RoleStamp role={app.role} />
                    <svg
                      className="shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-indigo-500 transition-colors"
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
