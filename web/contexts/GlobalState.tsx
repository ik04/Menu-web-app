"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { GlobalStateProps, UserData } from "@/types/types";
import getUserData from "@/lib/GetUserData";
import axios, { AxiosResponse } from "axios";

export const GlobalState: React.FC<GlobalStateProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userUuid, setUserUuid] = useState<string>("");
  const updateIsAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
  };
  useEffect(() => {
    const callUserData = async () => {
      try {
        const resp: AxiosResponse<UserData> = await getUserData();
        console.log(resp);
        setEmail(resp.data.email);
        setName(resp.data.name);
        setUserUuid(resp.data.user_uuid); // odd type
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${resp.data.access_token}`;
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
      }
    };
    callUserData();
  }, []);
  return (
    <GlobalContext.Provider
      value={{ updateIsAuthenticated, isAuthenticated, email, name, userUuid }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
