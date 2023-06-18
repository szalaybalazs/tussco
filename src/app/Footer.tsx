import Link from "next/link";
import { FunctionComponent } from "react";
import { apps } from "./app";

interface iFooterProps {}

const Footer: FunctionComponent<iFooterProps> = () => {
  return (
    <footer className="flex flex-col px-4 sm:flex-row pt-4 max-w-4xl mb-12 gap-8 sm:gap-0 mx-auto w-full border-t border-gray-300 dark:border-gray-600">
      <div className="flex flex-col flex-1 gap-1">
        <h2 className="text-xl font-black text-indigo-500">Tuss Co.</h2>
        <p className="text-md font-medium text-gray-500 dark:text-gray-400">
          Budapest, Hungary
        </p>
        <a
          className="text-md font-medium mt-4 hover:text-indigo-500 dark:text-gray-300"
          href="mailto:hello@laszlotuss.com"
        >
          hello@laszlotuss.com
        </a>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <span className="text-sm mb-2 font-medium text-gray-500 dark:text-gray-400">
          Apps
        </span>
        {apps.map((app) => {
          return (
            <Link
              className="text-md font-medium hover:underline underline-offset-2 dark:text-gray-300"
              href={`/${app.id}`}
              key={app.id}
            >
              {app.name}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <span className="text-sm mb-2 font-medium text-gray-500 dark:text-gray-400">
          Legal
        </span>
        <Link
          className="text-md font-medium hover:underline underline-offset-2 dark:text-gray-300"
          href={`/privacy-policy`}
        >
          Privacy Policy
        </Link>
        {/* <Link
          className="text-md font-medium hover:underline underline-offset-2"
          href={`/terms-of-service`}
        >
          Terms of Service
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;
