"use client";
import { GlobalContext } from "@/contexts/GlobalContext";
import logout from "@/lib/Logout";
import { NavLinks } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { OrderContext } from "@/contexts/OrderContext";

export default function Nabvar() {
  const { isAuthenticated, name } = useContext(GlobalContext);
  const { ordersCount } = useContext(OrderContext);
  console.log(ordersCount);
  const callLogout = async () => {
    try {
      console.log("click");
      await logout();
      location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const unauthenticatedLinks: NavLinks[] = [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ];

  return (
    <div
      className={`z-50 navbar fixed flex w-full justify-around items-center h-[70px] bg-azure`}
    >
      <Link href={"/"} className="logo text-cream cursor-pointer">
        Menu<span className="text-hotorange">Sphere</span>
      </Link>
      {/* add shopping cart is authenticated */}
      {isAuthenticated ? (
        <>
          <div className="flex justify-evenly items-center w-1/5">
            <button className="text-dalyellow" onClick={callLogout}>
              Logout
            </button>
            <Link
              className="text-dalyellow text-xl font-mono font-extrabold"
              href="/"
            >
              Hi {name}
            </Link>
            <Link
              className="text-dalyellow text-xl flex font-mono font-extrabold justify-center items-center"
              href="/"
            >
              <ShoppingCart />
              <p className="rounded-[9px] -ml-[10px] mb-[15px] align-top text-white  bg-red-700 text-center text-xs w-[15px]">
                {ordersCount}
              </p>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-evenly items-center w-1/5">
            {unauthenticatedLinks.map((navlink, index) => (
              <Link key={index} className="text-dalyellow" href={navlink.href}>
                {navlink.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
