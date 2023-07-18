"use client";
import { GlobalContextValue } from "@/types/types";
import React, { createContext } from "react";

export const GlobalContext = createContext<Partial<GlobalContextValue>>({});
