// src/ConfigContext.js
import React, { createContext, useContext } from "react";

// Create the ConfigContext
const ConfigContext = createContext();

// Create the ConfigProvider component
export const ConfigProvider = ({
  children,
  URL,
  token,
  WatchlistEnteries,
  FavoriteEnteries,
}) => {
  return (
    <ConfigContext.Provider
      value={{ URL, token, WatchlistEnteries, FavoriteEnteries }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

// Create the useConfig hook
export const useConfig = () => useContext(ConfigContext);
