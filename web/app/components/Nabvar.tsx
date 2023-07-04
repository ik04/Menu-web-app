"use client";
import { GlobalContext } from "@/contexts/GlobalContext";
import logout from "@/lib/Logout";
import Link from "next/link";
import React, { useContext } from "react";

export default function Nabvar() {
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
  return (
    <div className="navbar flex w-full justify-around items-center bg-azure h-[70px]">
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
