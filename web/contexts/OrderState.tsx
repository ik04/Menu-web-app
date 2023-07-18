"use client";
import React, { useContext, useEffect } from "react";
import { OrderContext } from "./OrderContext";
import { OrderStateProps } from "@/types/types";
import getUserPendingOrders from "@/lib/GetUserPendingOrders";
import { GlobalContext } from "./GlobalContext";
export const OrderState: React.FC<OrderStateProps> = ({ children }) => {
  const { isAuthenticated } = useContext(GlobalContext);
  //   console.log(isAuthenticated);
  useEffect(() => {
    const callUserOrders = async () => {
      console.log(isAuthenticated);
      if (isAuthenticated) {
        const ordersResponse = await getUserPendingOrders();
        console.log(ordersResponse.data.orders);
      } else {
        console.log("not logged in");
      }
    };
    callUserOrders();
  }, [isAuthenticated]);

  return <OrderContext.Provider value={{}}>{children}</OrderContext.Provider>;
};
