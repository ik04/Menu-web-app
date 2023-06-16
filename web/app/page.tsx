import React from "react";
import Nabvar from "./components/Nabvar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "home",
  description: "Home page for The Menu Sphere Web app",
};

export default function page() {
  return (
    <div className="bg-cream text-black h-screen">
      <Nabvar />
    </div>
  );
}

// todo : add meta data to each page (dynamic using ssr?)
