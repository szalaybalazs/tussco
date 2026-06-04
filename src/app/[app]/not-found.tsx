import Link from "next/link";

const NotFound = () => (
  <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32">
    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
      App not found
    </h1>
    <p className="mt-3 text-gray-500 dark:text-gray-400">
      This app doesn&apos;t exist or is no longer listed.
    </p>
    <Link
      href="/"
      className="mt-6 inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold rounded-full px-5 py-2.5 transition-all"
    >
      Back home
    </Link>
  </div>
);

export default NotFound;
