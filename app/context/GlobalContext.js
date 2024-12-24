"use client";
import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();

export const GlobalProvider = ({ children, initialData }) => {
  const [globalState, setGlobalState] = useState({
    initialData: initialData || {},
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
    language: "en",
  });

  const login = (userData) => {
    setGlobalState((prevState) => ({
      ...prevState,
      isAuthenticated: true,
      user: userData,
    }));
  };

  const logout = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      isAuthenticated: false,
      user: null,
    }));
  };

  const setLoading = (isLoading) => {
    setGlobalState((prev) => ({ ...prev, isLoading }));
  };

  const setError = (error) => {
    setGlobalState((prev) => ({ ...prev, error }));
  };

  const setLanguage = (language) =>
    setGlobalState((prev) => ({ ...prev, language }));

  return (
    <GlobalContext.Provider
      value={{
        globalState,
        setGlobalState,
        login,
        logout,
        setLoading,
        setError,
        setLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext must be used within GlobalProvider");
  return context;
};
