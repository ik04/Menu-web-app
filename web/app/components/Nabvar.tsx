"use client";
import { GlobalContext } from "@/contexts/GlobalContext";
import logout from "@/lib/Logout";
import { NavLinks } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { OrderContext } from "@/contexts/OrderContext";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { test } from "node:test";

export default function Nabvar() {
  const router = useRouter();
  const { isAuthenticated, name } = useContext(GlobalContext);
  const { ordersCount } = useContext(OrderContext);

  const callLogout = async () => {
    try {
      console.log("click");
      await logout();
      location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  const cartRedirect = () => {
    if (ordersCount != 0) {
      location.href = "/checkout";
    } else {
      toast(
        "Satisfy your taste buds with mouthwatering delights! Add scrumptious treats to your cart and let the flavors dance on your palate! 🍔🌯",
        {
          duration: 6000,
        }
      );
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
      <Toaster />
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

            <button
              className="text-dalyellow text-xl flex font-mono font-extrabold justify-center items-center"
              onClick={cartRedirect}
            >
              <ShoppingCart />
              <p
                className={`rounded-[9px] ${
                  ordersCount === 0 ? "hidden" : ""
                } -ml-[10px] mb-[15px] align-top text-white  bg-red-700 text-center text-xs w-[15px]`}
              >
                {ordersCount}
              </p>
            </button>
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
// todo: add loading state
