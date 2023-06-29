"use client";
import { UserData } from "@/types/types";
import React, { createContext } from "react";

interface GlobalContextValue extends UserData {
  isAuthenticated: boolean;
}

export const GlobalContext = createContext<Partial<GlobalContextValue>>({});
