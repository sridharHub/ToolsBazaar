import { createContext, useState, useEffect, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

type AppThemeProps = {
  children: ReactNode;
};

type ThemeContextType = {
    darkMode: boolean;
    toggleDarkMode: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    darkMode: false,
    toggleDarkMode: () => { },
});

export default function AppTheme({ children }: AppThemeProps) {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(isDarkMode);
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", String(newDarkMode));
    };


    /*  const theme = createTheme({});*/
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
        },
    });

    /* return <ThemeProvider theme={theme}>{children}</ThemeProvider>;*/
    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}
