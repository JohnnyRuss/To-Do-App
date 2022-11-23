import React, { createContext, useState, useEffect } from "react";

export enum Theme {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

interface ThemeState {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

interface ThemeProviderType {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeState>({
  theme: "",
  setTheme: () => {},
});

const ThemeProvider: React.FC<ThemeProviderType> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;

    function changeBodyPalete(dark: boolean) {
      const textColor = dark ? "#fff" : "#000";
      const bgColor = dark ? "hsl(235, 21%, 11%)" : "hsl(236, 33%, 92%)";

      body.style.color = textColor;
      body.style.background = bgColor;
    }

    if (theme === Theme.DARK) changeBodyPalete(true);
    else if (theme === Theme.LIGHT) changeBodyPalete(false);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
