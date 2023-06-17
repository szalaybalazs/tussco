import { FunctionComponent } from "react";

interface ipageProps {}

const page: FunctionComponent<ipageProps> = () => {
  return (
    <div className="flex-1 px-4 max-w-2xl w-full mx-auto pt-16 text-3xl text-gray-600 leading-relaxed">
      <p>
        <strong className="text-gray-700">Hi, 👋🏻 I&apos;m László.</strong> Lorem
        ipsum, dolor sit amet consectetur adipisicing elit. Fuga ut voluptas
        consectetur?
      </p>
      <p className="mt-4 text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
        similique illum nobis eveniet. Voluptatibus, praesentium ea.
      </p>
      <img
        src="/profile.png"
        alt="Laszlo tuss"
        className="w-full mt-8 max-w-lg mx-auto mb-24"
      />
    </div>
  );
};

export default page;
