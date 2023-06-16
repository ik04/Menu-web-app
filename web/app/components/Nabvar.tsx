import React from "react";

export default function Nabvar() {
  return (
    <div className="navbar flex w-full justify-around items-center bg-azure h-[70px]">
      <div className="logo text-cream">
        Menu<span className="text-hotorange">Sphere</span>
      </div>
      <div className="flex justify-evenly items-center w-1/5">
        <a className="text-dalyellow">Login</a>
        <a className="text-dalyellow" href="/register">
          Register
        </a>
      </div>
    </div>
  );
}
