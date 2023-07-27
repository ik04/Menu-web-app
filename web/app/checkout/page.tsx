"use client";
import { OrderContext } from "@/contexts/OrderContext";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { OrderButton } from "../components/OrderButton";
import { useRouter } from "next/navigation";

export default function page() {
  const { orders, ordersCount } = useContext(OrderContext);
  const router = useRouter();
  console.log(ordersCount);
  useEffect(() => {
    if (ordersCount === 0) {
      router.push("/");
    }
  }, [ordersCount]);
  return (
    <div className="overflow-hidden">
      <div className="translate-y-24 font-mono font-bold text-hotorange text-4xl text-center">
        Checkout
      </div>
      <div className="h-screen flex justify-center items-center translate-y-24">
        <div className="flex-col bg-white border border-black">
          <p className="uppercase font-mono text-2xl text-center">Bill</p>
          {orders.map((order, index) => {
            if (order.quantity != 0)
              return (
                <div
                  key={index}
                  className="text-black text-xl p-5 items-center flex space-x-5"
                >
                  <Image
                    src={`http://localhost:8000${order.image}`}
                    alt="order img"
                    className=""
                    width={100}
                    height={100}
                  />
                  <p>{order.name}</p>
                  <OrderButton orderMode={false} itemUuid={order.item_uuid} />
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
