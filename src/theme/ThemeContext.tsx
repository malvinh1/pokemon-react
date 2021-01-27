import { ThemeProvider as ThemeProviderEmotion } from "@emotion/react";
import React, { useContext, useState } from "react";

import { darkTheme, lightTheme } from "./theme";

const ThemeUpdateContext = React.createContext(() => {});

export const useThemeUpdate = () => useContext(ThemeUpdateContext);

export const ThemeProvider: React.FC = ({ children }) => {
  const [useDarkTheme, setDarkTheme] = useState(false);

  const toggleTheme = () => setDarkTheme(!useDarkTheme);

  return (
    <ThemeProviderEmotion theme={useDarkTheme ? darkTheme : lightTheme}>
      <ThemeUpdateContext.Provider value={toggleTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeProviderEmotion>
  );
};
