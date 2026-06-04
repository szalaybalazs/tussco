import { findAppByName } from "../app";
import { LegacyRedirect } from "../LegacyRedirect";

// Legacy privacy-policy URL from older app builds (e.g. /ppp/?app=…#EULA).
// Forward to the matched app's privacy policy when ?app resolves, else generic.
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>;
}) => {
  const { app } = await searchParams;
  const matched = app ? await findAppByName(app) : undefined;
  const to = matched
    ? `/${matched.appid || matched.id}/privacy-policy`
    : "/privacy-policy";
  return <LegacyRedirect to={to} />;
};

export default page;
