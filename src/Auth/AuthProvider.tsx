import {createContext, ReactNode, useContext, useMemo, useState,} from 'react';
import {jwtDecode} from "jwt-decode";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: string;
}

/** Raw payload that comes out of jwt-decode */
interface RawJwt {
    sub: string;
    email?: string;
    name?: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
}

export function normalise(raw: RawJwt): UserInfo {
    return {
        id: raw.sub,
        email: raw.email ?? '',
        name: raw.name ?? '',
        role:
            raw[
                'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                ] ?? '',
    };
}
interface AuthContextValue {
    user: UserInfo | null;
    token: string | null;
    login: (jwt: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: { children: ReactNode }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    const user = useMemo<UserInfo | null>(() => {
        if (!token) return null;
        try {
            return normalise(jwtDecode(token));
        } catch {
            return null;
        }
    }, [token]);

    function login(jwt: string) {
        localStorage.setItem('token', jwt);
        setToken(jwt);
    }

    function logout() {
        localStorage.removeItem('token');
        setToken(null);
    }

    const value = {user, token, login, logout};

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be inside <AuthProvider>');
    return ctx;
}
