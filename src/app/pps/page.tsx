import { LegacyRedirect } from "../LegacyRedirect";

// Legacy privacy-policy URL from older app builds (e.g. /pps/?app=…).
const page = () => <LegacyRedirect />;

export default page;
