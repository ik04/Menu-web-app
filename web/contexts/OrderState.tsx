"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { OrderContext } from "./OrderContext";
import { Order, OrderStateProps } from "@/types/types";
import getUserPendingOrders from "@/lib/GetUserPendingOrders";
import { GlobalContext } from "./GlobalContext";
export const OrderState: React.FC<OrderStateProps> = ({ children }) => {
  const { isAuthenticated } = useContext(GlobalContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [orderTotalPrice, setOrderTotalPrice] = useState(0);
  const updateOrder = (value: Order[]) => {
    setOrders(value);
  };
  const callUserOrders = useMemo(async () => {
    if (isAuthenticated) {
      try {
        const ordersResponse = await getUserPendingOrders();
        console.log(ordersResponse);
        return ordersResponse;
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      return [];
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      const ordersResponse = await callUserOrders;
      setOrders(ordersResponse);
      setOrdersCount(ordersResponse.length);
      ordersResponse.forEach((order) => {
        setOrderTotalPrice((prev) => prev + order.total_price);
      });
    };

    fetchUserOrders();
  }, [callUserOrders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        ordersCount,
        setOrdersCount,
        orderTotalPrice,
        setOrderTotalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
