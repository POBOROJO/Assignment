import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import { store } from "./store/store";
import "./globals.css";
import { Provider } from "react-redux";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kanban Board",
  description:
    "A Kanban board application built with Next.js, dnd-kit, and Redux Toolkit",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
