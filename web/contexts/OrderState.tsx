"use client";
import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "./OrderContext";
import { Order, OrderStateProps } from "@/types/types";
import getUserPendingOrders from "@/lib/GetUserPendingOrders";
import { GlobalContext } from "./GlobalContext";
export const OrderState: React.FC<OrderStateProps> = ({ children }) => {
  const { isAuthenticated } = useContext(GlobalContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const updateOrder = (value: Order[]) => {
    setOrders(value);
  };
  useEffect(() => {
    const callUserOrders = async () => {
      const ordersResponse = await getUserPendingOrders();
      // console.log(ordersResponse);
      setOrders(ordersResponse);
    };
    if (isAuthenticated) {
      callUserOrders();
    }
  }, [isAuthenticated]);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
