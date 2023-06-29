import { GlobalState } from "@/contexts/GlobalState";
import "./globals.css";
import { Inter } from "next/font/google";
import axios from "axios";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "home",
  description: "Home page for The Menu Sphere Web app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  axios.defaults.withCredentials = true;
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}
