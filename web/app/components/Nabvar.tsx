"use client";
import { GlobalContext } from "@/contexts/GlobalContext";
import logout from "@/lib/Logout";
import Link from "next/link";
import React, { useContext, useState } from "react";

export default function Nabvar() {
  const [navbar, setNavbar] = useState(false);
  const { isAuthenticated, name } = useContext(GlobalContext);
  const callLogout = async () => {
    try {
      console.log("click");
      await logout();
      location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  const changeBackground = () => {
    console.log(window.scrollY);
    if (window.scrollY >= 66) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  // @apply shadow-[0_8px_32px_0_rgba(_31,38,135,0.37_)] backdrop-blur-[_4px_] border rounded-[10px] border-solid border-[rgba(_255,255,255,0.18_)];
  // background: rgba(2, 84, 100, 0.25);
  // -webkit-backdrop-filter: blur(4px);

  return (
    <div
      className={`navbar flex w-full justify-around items-center h-[70px] bg-azure`}
    >
      <div className="logo text-cream">
        Menu<span className="text-hotorange">Sphere</span>
      </div>

      {isAuthenticated ? (
        <>
          <div className="flex justify-evenly items-center w-1/5">
            <Link
              className="text-dalyellow text-xl font-mono font-extrabold"
              href="/"
            >
              Hi {name}
            </Link>
            <button className="text-dalyellow" onClick={callLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-evenly items-center w-1/5">
            <Link className="text-dalyellow" href="/login">
              Login
            </Link>
            <Link className="text-dalyellow" href="/register">
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
