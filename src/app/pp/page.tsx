import { LegacyRedirect } from "../LegacyRedirect";

// Legacy privacy-policy URL from older app builds (e.g. /pp/?app=…).
const page = () => <LegacyRedirect />;

export default page;
