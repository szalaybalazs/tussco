import { FunctionComponent } from "react";
import PrivacyPolicy from "./PrivacyPolicy";

interface ipageProps {}

export const metadata = {
  title: "Privacy Policy | László Tuss",
  description: "Because protecting your privacy is important to me.",
};

const page: FunctionComponent<ipageProps> = () => {
  return <PrivacyPolicy />;
};

export default page;
