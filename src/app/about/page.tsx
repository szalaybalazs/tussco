import { FunctionComponent } from "react";

interface ipageProps {}

const page: FunctionComponent<ipageProps> = () => {
  return (
    <div className="flex-1 px-4 max-w-2xl w-full mx-auto pt-16 text-3xl text-gray-600 dark:text-gray-400 leading-relaxed">
      <p>
        <strong className="text-gray-700 dark:text-gray-300">
          Hi 👋🏻 I&apos;m László.
        </strong>{" "}
        I&apos;m an indie iOS developer based in Budapest, Hungary, and
        I&apos;ve been shipping apps to the App Store since 2014.
      </p>
      <p className="mt-6 text-2xl">
        Over the years I&apos;ve built dozens of iOS apps — my own indie
        projects, a booking startup I co-owned (Tappointment), and contract
        work for clients around the world, from Teleprompter.com to a furniture
        configurator for Wittmann. They span stickers and iMessage, utilities,
        productivity, finance and photo &amp; video.
      </p>
      <p className="mt-6 text-2xl">
        I work mostly in Swift, with a long history of Objective-C, and I enjoy
        the platform&apos;s newer corners — Live Activities, Picture-in-Picture,
        the Dynamic Island, widgets and the Apple Watch. I like taking an idea
        all the way from a sketch to the App Store.
      </p>
      <img
        src="/profile.jpg"
        alt="László Tuss"
        className="w-full mt-10 max-w-lg mx-auto mb-24 rounded-[32px]"
      />
    </div>
  );
};

export default page;
