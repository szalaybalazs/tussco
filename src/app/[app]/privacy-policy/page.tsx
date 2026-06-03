import { apps } from "@/app/app";
import { Metadata } from "next";
import PrivacyPolicy from "@/app/privacy-policy/PrivacyPolicy";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> => {
  const { app: id } = await params;
  const app = apps.find((app) => app.id === id);

  return {
    title: `Privacy Policy | ${app?.name} | László Tuss`,
    openGraph: {
      images: app?.icon,
    },
  };
};

const index = async ({ params }: { params: Promise<{ app: string }> }) => {
  const { app: id } = await params;
  const app = apps.find((app) => app.id === id);
  return <PrivacyPolicy app={app?.name} />;
};

export default index;
