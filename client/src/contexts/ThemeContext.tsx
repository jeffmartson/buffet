/*
 * ThemeContext.tsx - Global dark/light theme context for the application.
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

import { createContext } from "react";
interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

/**
 * ThemeContext is the global dark/light theme context for the application.
 * @type {React.Context<ThemeContextProps>} - The theme context
 * @property {string} theme - The current theme of the application
 * @property {() => void} toggleTheme - The function to toggle the theme of the application
 * @returns {React.Context<ThemeContextProps>} - The theme context
 */
const ThemeContext: React.Context<ThemeContextProps> = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {
    return;
  },
});

export default ThemeContext;
