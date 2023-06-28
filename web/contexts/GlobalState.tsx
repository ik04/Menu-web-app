"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { GlobalStateProps } from "@/types/types";
import getUserData from "@/lib/GetUserData";

export const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const callUserData = async () => {
      try {
        const resp = await getUserData();
        console.log(resp);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
    };
    callUserData();
  }, []);
  return (
    <GlobalContext.Provider value={{ isAuthenticated }}>
      {children}
    </GlobalContext.Provider>
  );
};
