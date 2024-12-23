/*
 * AuthContext.tsx - Global authentication context for the application.
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

import { createContext, useContext } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  two_factor_enabled: boolean;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * useAuth is a custom hook to use the AuthContext.
 * @returns {AuthContextType} - The authentication context
 * @throws {Error} - If the hook is not used within an AuthProvider
 * @example
 * const { user, logout, setUser } = useAuth();
 * setUser({ id: '1', username: 'user', email: 'user@user.com', role: 'user', two_factor_enabled: false });
 * logout();
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};