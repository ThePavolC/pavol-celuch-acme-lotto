import React from "react";
import { createContext } from "react";

const CachedAuthProviderContext = createContext({});

export const CachedAuthProvider = ({ children }) => {
    const cachedAuth = JSON.parse(sessionStorage.getItem("storedToken"));
    const setCachedAuth = (t) =>
        sessionStorage.setItem("storedToken", JSON.stringify(t));

    return (
        <CachedAuthProviderContext.Provider
            value={{ cachedAuth, setCachedAuth }}
        >
            {children}
        </CachedAuthProviderContext.Provider>
    );
};

export default CachedAuthProviderContext;
