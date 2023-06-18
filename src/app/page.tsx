import Image from "next/image";
import Header from "./Header";
import Link from "next/link";
import { apps } from "./app";

export default function Home() {
  return (
    <>
      <div className="flex-1">
        <div className="flex flex-col items-center mb-32 text-center">
          <img
            className="bg-gray-700 w-36 rounded-[32px] mt-24"
            src="/profile.png"
            alt="Laszlo Tuss"
          />
          <h2 className="text-4xl font-bold mt-12 text-indigo-500">
            Hi, I am László 👋
          </h2>
          <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
            I am an iOS developer & I build indie applications
          </p>
        </div>
      </div>
      <div className="px-4 max-w-4xl lg:max-w-6xl lg:grid-cols-2 2xl:max-w-7xl 2xl:grid-cols-2 4xl:grid-cols-3 4xl:max-w-[1800px] gap-8 mb-12 grid grid-cols-1 w-full mx-auto">
        {apps.map((app, i) => (
          <Link
            key={app.id}
            href={`/${app.id}`}
            style={{ background: app.background }}
            className={`group w-full flex flex-col relative overflow-hidden mx-auto rounded-[48px] h-[420px] shrink-0`}
          >
            {i === 0 && (
              <span className="bg-black block absolute left-8 top-8 text-white rounded-full px-6 py-2">
                Latest
              </span>
            )}
            <img
              src={app.banner}
              alt={app.name}
              className="absolute bottom-0 h-[80%] translate-y-12 left-[50%] transform -translate-x-1/2 group-hover:translate-y-0 group-hover:scale-105 transition-all duration-500 ease-in-out"
            />
            <div
              style={{ color: app.color }}
              className="absolute left-8 bottom-8"
            >
              <h3 className="text-3xl font-medium">{app.name}</h3>
              <p className="opacity-80 pr-8 text-md font-medium mt-1 max-w-sm">
                {app.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
