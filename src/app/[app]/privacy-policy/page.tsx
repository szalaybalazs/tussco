import { apps } from "@/app/app";
import { FunctionComponent } from "react";
import { Metadata } from "next";
import PrivacyPolicy from "@/app/privacy-policy/PrivacyPolicy";

interface iindexProps {
  params: { app: string };
}

export const generateMetadata = ({
  params,
}: {
  params: { app: string };
}): Metadata => {
  const id = params.app;
  const app = apps.find((app) => app.id === id);

  return {
    title: `Privacy Policy | ${app?.name} | László Tuss`,
    openGraph: {
      images: app?.icon,
    },
  };
};

const index: FunctionComponent<iindexProps> = ({ params: { app: id } }) => {
  const app = apps.find((app) => app.id === id);
  return <PrivacyPolicy app={app?.name} />;
};

export default index;
