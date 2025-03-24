// src/contexts/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    players: [],
    matches: [],
    favorites: []
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
