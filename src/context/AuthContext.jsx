import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const isExpired = (jwt) => {
    if (!jwt) return true;

    try {
        const { exp } = jwtDecode(jwt);
        return Boolean(exp && exp * 1000 <= Date.now());
    } catch {
        return true;
    }
};

const getStoredToken = () => {
    const savedToken = localStorage.getItem("token");
    if (!isExpired(savedToken)) return savedToken;

    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    return null;
};

const getUserName = (token) => {
    if (!token) return null;

    try {
        const claims = jwtDecode(token);
        const name = claims.fullName
            || claims.FullName
            || claims.Name
            || claims.name
            || claims.unique_name
            || claims.given_name
            || claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

        if (name) return name;

        const email = claims.email || claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        return email ? email.split("@")[0] : null;
    } catch {
        return null;
    }
};

const getUserId = (token) => {
    if (!token) return null;
    try {
        const claims = jwtDecode(token);
        return claims.sub
            || claims.nameid
            || claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    } catch {
        return null;
    }
};

const getUserRole = (token) => {
    if (!token) return null;
    try {
        const claims = jwtDecode(token);
        return claims.role || claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    } catch {
        return null;
    }
};

export function AuthProvider({ children }) {
    const [token, setToken] = useState(getStoredToken);
    const [userName, setUserName] = useState(() => localStorage.getItem("userName"));

    const login = (jwt, name) => {
        localStorage.setItem("token", jwt);
        localStorage.removeItem("registeredFullName");
        const displayName = name || getUserName(jwt);
        if (displayName) {
            localStorage.setItem("userName", displayName);
            setUserName(displayName);
        } else {
            localStorage.removeItem("userName");
            setUserName(null);
        }
        setToken(jwt);
    };

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("registeredFullName");
        setToken(null);
        setUserName(null);
    }, []);

    useEffect(() => {
        const handleSessionExpired = () => logout();
        window.addEventListener("auth:expired", handleSessionExpired);
        return () => window.removeEventListener("auth:expired", handleSessionExpired);
    }, [logout]);

    useEffect(() => {
        if (!token) return undefined;

        try {
            const { exp } = jwtDecode(token);
            if (!exp) return undefined;

            const delay = exp * 1000 - Date.now();
            if (delay <= 0) {
                const timeoutId = window.setTimeout(logout, 0);
                return () => window.clearTimeout(timeoutId);
            }

            const timeoutId = window.setTimeout(logout, delay);
            return () => window.clearTimeout(timeoutId);
        } catch {
            const timeoutId = window.setTimeout(logout, 0);
            return () => window.clearTimeout(timeoutId);
        }
    }, [token, logout]);

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated: !!token,
                userId: getUserId(token),
                userRole: getUserRole(token),
                userName: userName || getUserName(token),
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
