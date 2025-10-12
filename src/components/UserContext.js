// src/components/UserContext.js
import React, { createContext, useState } from "react";

// Create Context
export const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};