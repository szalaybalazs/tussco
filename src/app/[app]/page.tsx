import { getApp } from "../app";
import { Metadata } from "next";
import Link from "next/link";

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

const page = async ({ params }: { params: Promise<{ app: string }> }) => {
  const { app: id } = await params;
  const app = await getApp(id);
  if (!app) throw new Error("App not found");

  return (
    <div className="px-4 max-w-2xl w-full mx-auto mt-12 mb-24">
      <div className="flex items-center gap-5">
        <img
          src={app.icon}
          alt={app.name}
          className="w-28 h-28 rounded-[28px] shadow-md shrink-0"
        />
        <div className="min-w-0">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {app.name}
          </h1>
          {app.genre && (
            <p className="text-gray-500 dark:text-gray-400 mt-0.5">
              {app.genre}
            </p>
          )}
          {app.storeUrl && (
            <a
              className="mt-3 inline-flex items-center gap-2 text-indigo-500 font-bold hover:underline underline-offset-2"
              href={app.storeUrl}
              target="_blank"
            >
              <span>Open in the App Store</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          )}
        </div>
      </div>

      {app.description && (
        <p className="mt-8 whitespace-pre-line leading-loose text-lg font-medium text-gray-600 dark:text-gray-300">
          {app.description}
        </p>
      )}

      <div className="mt-8 pt-8 border-t dark:border-gray-700">
        <Link
          className="flex items-center gap-2 text-indigo-500 font-medium text-lg hover:underline underline-offset-2"
          href={`/${app.id}/privacy-policy`}
        >
          <span>Privacy Policy</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default page;
