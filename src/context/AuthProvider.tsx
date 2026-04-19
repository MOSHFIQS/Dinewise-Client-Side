"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/user.types";

type AuthContextType = {
     user: User | null;
     token: string | null;
     isLoading: boolean;
     setCookie: (userData: User, token: string) => void;
     setUser: (user: User | null) => void;
     logOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) throw new Error("useAuth must be used within AuthProvider");
     return context;
};

export default function AuthProvider({ children }: { children: ReactNode }) {
     const [user, setUser] = useState<User | null>(null);
     const [token, setToken] = useState<string | null>(null);
     const [isLoading, setIsLoading] = useState(true);

     useEffect(() => {
          const cookieToken = Cookies.get("token");
          const cookieUser = Cookies.get("user");
          
          if (cookieToken) setToken(cookieToken);
          if (cookieUser) {
               try {
                    setUser(JSON.parse(cookieUser));
               } catch (error) {
                    console.error("Failed to parse user cookie", error);
                    Cookies.remove("user");
               }
          }
          setIsLoading(false);
     }, []);

     const setCookie = (userData: User, token: string) => {
          setUser(userData);
          setToken(token);
          Cookies.set("token", token, { expires: 7 });
          Cookies.set("user", JSON.stringify(userData), { expires: 7 });
     };

     const logOut = () => {
          setUser(null);
          setToken(null);
          Cookies.remove("token");
          Cookies.remove("user");
          // Full reload to clear any server-side state/middleware cache
          window.location.href = "/login";
     };

     return (
          <AuthContext.Provider value={{ user, token, isLoading, setUser, logOut, setCookie }}>
               {children}
          </AuthContext.Provider>
     );
}
