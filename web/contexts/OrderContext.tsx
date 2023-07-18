"use client";
import { OrderContextValue } from "@/types/types";
// import { GlobalContextValue } from "@/types/types";
import React, { createContext } from "react";

export const OrderContext = createContext<Partial<OrderContextValue>>({
  setOrders: () => {},
});
