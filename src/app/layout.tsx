import clsx from "clsx";
import Footer from "./Footer";
import Header from "./Header";
import "./globals.scss";
import { Inter } from "next/font/google";

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
