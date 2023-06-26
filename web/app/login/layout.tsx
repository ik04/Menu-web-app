import React, { ReactNode } from "react";
import Nabvar from "../components/Nabvar";
import Link from "next/link";
import BackArrow from "../components/BackArrow";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <Link href={"/"}>
        <BackArrow />
      </Link>
      {children}
    </div>
  );
}
