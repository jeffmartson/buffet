/*
 * ThemeProvider.tsx - Global dark/light theme provider for the application.
 * Copyright (C) 2024, Kieran Gordon
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { useState, useEffect, FC, ReactNode } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { useMediaQuery } from "react-responsive";

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * ThemeProvider is the global dark/light theme provider for the application.
 * @param {ThemeProviderProps} props - The properties of the component
 * @returns {ReactNode} - The theme provider component
 * @example
 * return (
 *  <ThemeProvider>
 *      <App />
 *  </ThemeProvider>
 * );
 */
const ThemeProvider: FC<ThemeProviderProps> = ({ children }: ThemeProviderProps) => {
    const isDarkMode = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
    const [theme, setTheme] = useState(isDarkMode ? "dark" : "light");

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? "dark" : "light");
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        document.body.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;