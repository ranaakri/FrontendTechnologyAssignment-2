import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface Theme {
  theme: boolean;
  setTheme: Dispatch<SetStateAction<boolean>>;
}
export const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
