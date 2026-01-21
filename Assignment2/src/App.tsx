import { ThemeProvider } from "./ContextProvider";
import ThemeComponent from "./ThemeComponent";
import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  const [theme, setTheme] = useState<boolean>();

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(mediaQuery);
    console.log(mediaQuery)
  }, []);

  return (
    <ThemeProvider value={{ theme, setTheme }}>
      <ThemeComponent />
    </ThemeProvider>
  );
}
