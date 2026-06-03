import { getApp } from "@/app/app";
import PrivacyPolicy from "../PrivacyPolicy";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> => {
  const { app: id } = await params;
  const app = await getApp(id);

  return {
    title: `Privacy Policy | ${app?.name} | László Tuss`,
    openGraph: {
      images: app?.icon,
    },
  };
};

const index = async ({ params }: { params: Promise<{ app: string }> }) => {
  const { app: id } = await params;
  const app = await getApp(id);
  return <PrivacyPolicy app={app?.name} />;
};

export default index;
