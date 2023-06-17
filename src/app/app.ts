import appList from "./apps.json";

interface iApp {
  id: string;
  name: string;
  banner: string;
  icon?: string;
  href?: string;
  releaseDate: string;
  description?: string;
  color?: string;
  background?: string;
  content?: string;
  markdown?: string;
}

export const apps = (appList as iApp[]).sort(
  (a, b) =>
    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
);
