"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LoginContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

export const useLogin = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error("useLogin must be used within a LoginProvider");
    }
    return context;
};

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};