"use client";
import { GlobalContextValue, UserData } from "@/types/types";
import React, { createContext } from "react";

export const GlobalContext = createContext<Partial<GlobalContextValue>>({});
