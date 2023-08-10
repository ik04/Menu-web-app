"use client";
import { OrderContext } from "../../contexts/OrderContext";
import Image from "next/image";
import React, { useContext } from "react";
import { OrderButton } from "../components/OrderButton";
import FinishButton from "./FinishButton";

export default function CheckoutMenu() {
  const { orders, orderTotalPrice } = useContext(OrderContext);
  // get an isloadinf func here
  return (
    <div className="">
      <div className="translate-y-24 font-mono font-bold text-hotorange text-4xl text-center">
        Checkout
      </div>
      <div className="h-screen flex justify-center items-center translate-y-24">
        <div className="flex flex-col justify-around items-center bg-white border min-h-[400px] border-black">
          <p className="capitalize font-mono my-1 text-2xl w-full border-grey-300 p-5 border-dashed border-b-4 text-center font-bold">
            Bill
          </p>

          <div className="">
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
                    <p className="font-semibold font-mono">{order.name}</p>
                    <OrderButton orderMode={false} itemUuid={order.item_uuid} />
                  </div>
                );
            })}
          </div>
          <div className="checkout-section w-full items-center flex flex-col">
            <h2 className="text-center my-5 border-t-4 border-grey-300 pt-5  w-full border-dashed text-2xl font-bold font-mono">
              Total:{orderTotalPrice}
            </h2>
            <div className="my-2">
              <FinishButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
