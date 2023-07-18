import { GlobalState } from "@/contexts/GlobalState";
import "./globals.css";
import { Inter } from "next/font/google";
import axios from "axios";
import Nabvar from "./components/Nabvar";

import { Metadata } from "next";
import { OrderState } from "@/contexts/OrderState";

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
      <body className={`${inter.className} bg-cream`}>
        <GlobalState>
          <OrderState>
            <Nabvar />
            {children}
          </OrderState>
        </GlobalState>
      </body>
    </html>
  );
}
