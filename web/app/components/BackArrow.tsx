import React from "react";

export default function BackArrow() {
  return (
    <div>
      <div className="text-azure flex items-center -space-x-1 w-40 cursor-pointer hover:-translate-y-1 duration-150 transition-all ">
        <img src="/arrow.png" alt="" className="w-10" />
        <p>Return Home</p>
      </div>
    </div>
  );
}
