// src/components/UserContext.js
import React, { createContext, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ value, children }) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);
