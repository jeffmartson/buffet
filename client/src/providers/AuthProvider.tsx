import { useState, useEffect, FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, User } from "../contexts/AuthContext";
import { getUserDetails, logOut } from "../api/AccountsAPI";

interface AuthProviderProps {
    children: ReactNode;
}
/**
 * AuthProvider component to provide user authentication and logout functionality to the application.
 * @param {AuthProviderProps} props - The properties of the component
 * @returns {ReactNode} - The authentication provider component
 * @example
 * return (
 *  <AuthProvider>
 *   <App />
 * </AuthProvider>
 * );
 */
const AuthProvider: FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && window.location.pathname !== "/") {
            getUserDetails().then((response) => {
                if (response.status === 200) {
                    setUser(response.data as User);
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }
            });
        }
    }, [user]);

    /**
     * logout function to log the user out of the application.
     * @returns {void}
     * @example
     * logout();
     * navigate("/");
     * navigate(0);
     */
    const logout = (): void => {
        logOut().then((response: { status: number; }) => {
            if (response.status === 200) {
                navigate("/");
                navigate(0);
                setUser(null);
                sessionStorage.removeItem("user");
            }
        });
    };

    return (
        <AuthContext.Provider value={{ user, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;