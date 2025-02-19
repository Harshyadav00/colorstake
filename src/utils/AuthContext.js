import React, { createContext, useState, useContext, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores user data
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);

    // Log in method
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        setAccessToken(userData.accessToken);
        setRefreshToken(userData.refreshToken);
        // Optionally, persist to localStorage
        localStorage.setItem("accessToken", userData.accessToken);
        localStorage.setItem("refreshToken", userData.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Log out method
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setAccessToken(null);
        setRefreshToken(null);
        // Clear localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    };

    const updateBalance = (balance) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, balance };
            localStorage.setItem("user", JSON.stringify(updatedUser)); // Save to localStorage
            return updatedUser;
        });
    };

    // Check authentication on app load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const refreshToken  = localStorage.getItem("refreshToken");
        if(!refreshToken) {
            logout();
        }
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            setRefreshToken(JSON.parse(storedUser).refreshToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, accessToken, isAuthenticated, login, logout, updateBalance }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
