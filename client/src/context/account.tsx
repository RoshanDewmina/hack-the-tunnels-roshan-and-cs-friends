import React, { createContext, useContext, useEffect, useState } from "react";
import { ServiceAPI } from "../infrastructure";
import { useCookies } from "react-cookie";

interface ProviderProps {
  storedToken?: string;
  children: React.ReactNode;
}

interface AccountProviderContextState {
  jwt?: string;
  loggedIn: () => boolean;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
}

export const AccountStateContext = createContext<
  AccountProviderContextState | undefined
>(undefined);

export function AccountProvider({ storedToken, children }: ProviderProps) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [, setCookie, removeCookie] = useCookies(["jwt"]);

  useEffect(() => {
    if (storedToken) {
      setToken(storedToken);
    }
  }, [storedToken]);

  const storeJwt = async (token) => {
    setCookie("jwt", token);
    setToken(token);
  };

  const logout = async () => {
    removeCookie("jwt");
    setToken(undefined);
  };

  const login = async (email: string, password: string): Promise<string> => {
    const json = await ServiceAPI.login(email, password);

    if (json.error !== null) {
      return json.error;
    }
    storeJwt(json.data.token);
    return "Succesfully Logged In!";
  };

  const loggedIn = () => {
    return token !== undefined;
  };

  const value = {
    jwt: token,
    login: login,
    loggedIn: loggedIn,
    logout: logout,
  };

  return (
    <AccountStateContext.Provider value={value}>
      {children}
    </AccountStateContext.Provider>
  );
}

export function useAccountContext() {
  const context = useContext(AccountStateContext);

  if (context === undefined) {
    throw new Error("useAccountContext must be used within a AccountProvider");
  }

  return context;
}
