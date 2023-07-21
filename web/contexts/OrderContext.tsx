"use client";
import { OrderContextValue } from "@/types/types";
import React, { createContext } from "react";

export const OrderContext = createContext<OrderContextValue>({
  orders: [],
  setOrders: () => {},
  ordersCount: 0,
  setOrdersCount: () => {},
});
