import clsx from "clsx";
import Footer from "./Footer";
import Header from "./Header";
import { FaviconRefresh } from "./FaviconRefresh";
import "./globals.scss";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "László Tuss",
  description: "Indie iOS developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "dark:bg-gray-800")}>
        <FaviconRefresh />
        <Header />
        {children}
        <Footer />
        <Script
          src="https://cdn.undicat.com/analytics.js"
          strategy="afterInteractive"
          {...({
            apikey: "ud_live_OPzWKqcF43pmhLMZkul-gysOiWWC9-pd",
            spa: "auto",
          } as any)}
        />
      </body>
    </html>
  );
}
