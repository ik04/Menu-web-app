import FinishOrders from "@/lib/FinishOrders";
import React from "react";
import { toast } from "react-hot-toast";

export default async function FinishButton() {
  const handleFinishOrders = async () => {
    const finishOrders = await FinishOrders();
    console.log(finishOrders);
    toast.success("Order Placed!");
    setTimeout(() => {
      location.href = "/";
    }, 2000);
  };

  return (
    <div>
      <button
        className="bg-azure text-white text-xl rounded-full p-2 w-[200px]"
        onClick={handleFinishOrders}
      >
        Place Order
      </button>
    </div>
  );
}
