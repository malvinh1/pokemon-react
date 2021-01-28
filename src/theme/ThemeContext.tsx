import { ThemeProvider as ThemeProviderEmotion } from "@emotion/react";
import React, { useContext, useState } from "react";

import { darkTheme, lightTheme } from "./theme";

const ThemeContext = React.createContext(false);
const ThemeUpdateContext = React.createContext(() => {});

export const useThemeUpdate = () => useContext(ThemeUpdateContext);
export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [useDarkTheme, setDarkTheme] = useState(
    window.localStorage.getItem("theme") === "true" ? true : false
  );

  const toggleTheme = () => {
    window.localStorage.setItem("theme", String(!useDarkTheme));
    setDarkTheme(!useDarkTheme);
  };

  return (
    <ThemeProviderEmotion theme={useDarkTheme ? darkTheme : lightTheme}>
      <ThemeContext.Provider value={useDarkTheme}>
        <ThemeUpdateContext.Provider value={toggleTheme}>
          {children}
        </ThemeUpdateContext.Provider>
      </ThemeContext.Provider>
    </ThemeProviderEmotion>
  );
};
