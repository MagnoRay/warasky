// src/components/common/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

// Named export del provider
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook para usar el contexto
export function useTheme() {
  return useContext(ThemeContext);
}
