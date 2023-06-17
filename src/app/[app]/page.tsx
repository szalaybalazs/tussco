import { FunctionComponent } from "react";
import { apps } from "../app";
import { Metadata } from "next";
import { marked } from "marked";

export const generateMetadata = ({
  params,
}: {
  params: { app: string };
}): Metadata => {
  const id = params.app;
  const app = apps.find((app) => app.id === id);

  return {
    title: `${app?.name} | László Tuss`,
    openGraph: {
      images: app?.icon,
    },
  };
};

interface ipageProps {
  params: { app: string };
}

const page: FunctionComponent<ipageProps> = ({ params: { app: id } }) => {
  const app = apps.find((app) => app.id === id);
  if (!app) throw new Error("App not found");
  return (
    <div className="px-4 max-w-4xl w-full mx-auto mt-12 mb-12">
      <div
        style={{ background: app.background }}
        className={`group flex flex-col relative overflow-hidden  mb-12 mx-auto rounded-[48px] h-[420px] shrink-0`}
      >
        <img
          src={app.banner}
          alt={app.name}
          className="absolute bottom-0 h-[80%] translate-y-12 left-[50%] transform -translate-x-1/2 group-hover:translate-y-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
        />
        <div style={{ color: app.color }} className="absolute left-8 bottom-8">
          <h3 className="text-3xl font-medium">{app.name}</h3>
          <p className="opacity-80 pr-8 text-md font-medium mt-1 max-w-sm">
            {app.description}
          </p>
        </div>
      </div>
      <a
        className="ml-8 mb-4 flex items-center gap-2 text-indigo-500 font-bold text-xl hover:underline underline-offset-2"
        href={app.href}
        target="_blank"
      >
        <span>Open in the AppStore</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
      <pre className="px-8 font-sans leading-loose text-lg font-medium text-gray-600">
        {app.content}
      </pre>
      {app.markdown && (
        <div
          className="mx-8 mt-8 border-t markdown"
          dangerouslySetInnerHTML={{ __html: marked.parse(app.markdown) }}
        />
      )}
    </div>
  );
};

export default page;
