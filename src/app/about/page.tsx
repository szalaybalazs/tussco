interface iRole {
  title: string;
  company: string;
  period: string;
  points: string[];
}

const experience: iRole[] = [
  {
    title: "Senior iOS Developer",
    company: "Teleprompter Kft.",
    period: "Dec 2022 – Mar 2025",
    points: [
      "Restructured and modernized a large legacy codebase while keeping compatibility across many device and OS generations.",
      "Ported several apps to native macOS, with platform-specific features and interfaces.",
      "Redesigned the architecture around SwiftUI and Combine — cutting boilerplate and breaking up overgrown components.",
      "Built new VIPER submodules and collaborated across international teams through code review and pull requests.",
    ],
  },
  {
    title: "Indie App Developer",
    company: "Self-employed · Since 2017",
    period: "Since 2017",
    points: [
      "Image-manipulation apps built with CoreML, CoreImage and the Vision framework.",
      "Repackaged my own frameworks as Swift Package Manager modules with Bitrise CI.",
      "iOS app extensions using shared containers and iCloud-synced data.",
      "Continuously adopt new Apple frameworks and beta APIs to keep products future-ready.",
    ],
  },
  {
    title: "Lead iOS Developer",
    company: "beam.space Kft.",
    period: "Apr 2018 – Mar 2021",
    points: [
      "Mentored junior developers and led architectural decisions for cross-platform interoperability.",
      "Built real-time AR scenes with on-demand model and texture fetching against complex data models.",
      "Optimized CPU and memory for multiple 2K streams feeding Metal shaders, keeping older iPads responsive.",
      "Kept data consistent between native ARKit / SceneKit / OpenCV / Metal and a React Native UI.",
    ],
  },
  {
    title: "Freelance iOS Developer",
    company: "laszlotuss.com",
    period: "Mar 2017 – Jan 2018",
    points: [
      "Rewrote the Italian Food travel guide (Blue Guides) with a shared iOS, macOS and watchOS interface.",
      "Delivered an Arizona-based real-estate app and mentored smaller in-house projects.",
      "Contributed to an internal tool for McKinsey, and launched my first App Store app under my own name.",
    ],
  },
  {
    title: "iOS Developer & Co-owner",
    company: "Tappointment Kft.",
    period: "Sep 2012 – Nov 2016",
    points: [
      "Co-founded the startup and drove the mobile product from idea to App Store launch.",
      "Designed a scalable iOS architecture for appointment-scheduling systems.",
      "Shipped customer apps and internal tools, including Philips Hue control (HUE Power) and offline navigation (Blazing Saddles SF).",
    ],
  },
];

const skills: [string, string][] = [
  ["Languages", "Swift, SwiftUI, Objective-C, Python, TypeScript (React Native)"],
  ["Architecture", "MVVM, MVC, VIPER, modularization"],
  ["Data", "Core Data, Realm, Firebase, CloudKit, iCloud, MySQL"],
  ["Tooling", "Xcode Cloud, Bitrise, SPM, CocoaPods, Git, SwiftLint, SwiftFormat, Instruments"],
  ["Design", "Figma, Sketch, Affinity Designer, Photoshop"],
  ["Process", "Scrum, Kanban, Jira, Trello, Notion, Basecamp"],
];

const education: [string, string, string][] = [
  [
    "Computer Science",
    "Eötvös Loránd University — Faculty of Informatics, Budapest",
    "2012 – 2018",
  ],
  [
    "Software Developer",
    "BMSZC Petrik Lajos Technical School, Budapest",
    "2011 – 2012",
  ],
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-14 mb-5 text-sm font-bold uppercase tracking-widest text-indigo-500">
    {children}
  </h2>
);

const page = () => {
  return (
    <div className="flex-1 px-4 max-w-2xl w-full mx-auto pt-16 pb-24">
      {/* Intro */}
      <img
        src="/profile.jpg"
        alt="László Tuss"
        className="w-28 h-28 rounded-[28px] shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        Hi 👋🏻 I&apos;m László.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
        An iOS developer with more than 10 years of experience designing,
        building and maintaining mobile apps for startups, international
        companies and my own indie projects. I work in Swift, SwiftUI and
        Objective-C with deep knowledge of the iOS frameworks and app
        architecture — system optimization, modularization and product
        lifecycle. I enjoy mentoring junior developers, working with
        cross-functional teams, and translating technical solutions for
        technical and non-technical audiences alike.
      </p>

      {/* Experience */}
      <SectionHeading>Experience</SectionHeading>
      <div className="flex flex-col gap-8">
        {experience.map((role) => (
          <div key={role.title + role.period}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {role.title}
              </h3>
              <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
                {role.period}
              </span>
            </div>
            <p className="font-medium text-indigo-500">{role.company}</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400 leading-relaxed">
              {role.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills */}
      <SectionHeading>Skills</SectionHeading>
      <dl className="flex flex-col gap-3">
        {skills.map(([group, items]) => (
          <div key={group} className="sm:flex sm:gap-3">
            <dt className="font-semibold text-gray-700 dark:text-gray-300 sm:w-32 sm:shrink-0">
              {group}
            </dt>
            <dd className="text-gray-600 dark:text-gray-400">{items}</dd>
          </div>
        ))}
      </dl>

      {/* Education */}
      <SectionHeading>Education</SectionHeading>
      <div className="flex flex-col gap-4">
        {education.map(([degree, school, period]) => (
          <div
            key={degree}
            className="flex flex-wrap items-baseline justify-between gap-x-3"
          >
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200">
                {degree}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{school}</p>
            </div>
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500">
              {period}
            </span>
          </div>
        ))}
      </div>

      {/* Languages */}
      <SectionHeading>Languages</SectionHeading>
      <p className="text-gray-600 dark:text-gray-400">
        Hungarian (native) · English (B2)
      </p>
    </div>
  );
};

export default page;
