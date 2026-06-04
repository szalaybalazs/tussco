import { LegacyRedirect } from "../LegacyRedirect";

// Legacy privacy-policy URL from older app builds (e.g. /ppp/?app=…#EULA).
const page = () => <LegacyRedirect />;

export default page;
