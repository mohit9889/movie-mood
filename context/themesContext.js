import React, { createContext, useState, useContext } from "react";

const ThemesContext = createContext();

export const ThemesProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  const changeThemeContext = (theme) => {
    setThemeMode(theme);
  };

  return (
    <ThemesContext.Provider value={{ themeMode, changeThemeContext }}>
      {children}
    </ThemesContext.Provider>
  );
};

export const useThemes = () => useContext(ThemesContext);
