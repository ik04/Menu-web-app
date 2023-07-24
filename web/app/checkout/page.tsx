"use client";
import { OrderContext } from "@/contexts/OrderContext";
import Image from "next/image";
import React, { useContext } from "react";

export default function page() {
  const { orders } = useContext(OrderContext);
  return (
    <div className="overflow-hidden">
      <div className="translate-y-24 font-mono font-bold text-hotorange text-4xl text-center">
        Checkout
      </div>
      <div className="h-screen flex justify-center items-center translate-y-24">
        <div className="flex-col bg-white border border-black">
          {orders.map((order, index) => (
            <div
              key={index}
              className="text-black text-xl p-5 items-center flex space-x-2"
            >
              <Image
                src={`http://localhost:8000${order.image}`}
                alt="order img"
                width={100}
                height={100}
              />
              <p>{order.name}</p>
              <p>x</p>
              <p>{order.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
