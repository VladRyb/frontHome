import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material";
import getTheme from "../theme";

export const useDarkMode = (): [string] => {
  const [themeMode, setTheme] = useState("light");

  const setMode = (mode: string) => {
    try {
      window.localStorage.setItem("themeMode", mode);
    } catch {
      /* do nothing */
    }

    setTheme(mode);
  };

  useEffect(() => {
    try {
      const localTheme = window.localStorage.getItem("themeMode");
      localTheme ? setTheme(localTheme) : setMode("light");
    } catch {
      setMode("light");
    }
  }, []);

  return [themeMode];
};

const Layout = (props: any) => {
  const [themeMode] = useDarkMode();

  return (
    <ThemeProvider theme={getTheme(themeMode)}>
      <div className="layout">
        <div className="header"></div>
        <div className="layout_block">{props.children}</div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
