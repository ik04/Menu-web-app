import Link from "next/link";
import React from "react";

export default function Nabvar() {
  return (
    <div className="navbar flex w-full justify-around items-center bg-azure h-[70px]">
      <div className="logo text-cream">
        Menu<span className="text-hotorange">Sphere</span>
      </div>
      <div className="flex justify-evenly items-center w-1/5">
        <Link className="text-dalyellow" href="/login">
          Login
        </Link>
        <Link className="text-dalyellow" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}
