"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { apiFetchClient } from "@/lib/api";

type User = {
     id: string;
     name: string;
     email: string;
     role: string;
     status: string;
     image: string | null;
};

type AuthContextType = {
     user: User | null;
     isLoading: boolean;
     setUser: React.Dispatch<React.SetStateAction<User | null>>;
     logOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
     user: null,
     isLoading: true,
     setUser: () => {},
     logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
     const [user, setUser] = useState<User | null>(null);
     const [isLoading, setIsLoading] = useState(true);
     const router = useRouter();

     useEffect(() => {
          const fetchUser = async () => {
               const token = Cookies.get("token");
               if (token) {
                    try {
                         const response = await apiFetchClient("/user/me", {
                              headers: { "Authorization": `Bearer ${token}` }
                         });
                         if (response.success) {
                              setUser(response.data);
                         }
                    } catch (error) {
                         console.error("Failed to fetch user session", error);
                         Cookies.remove("token");
                    }
               }
               setIsLoading(false);
          };
          fetchUser();
     }, []);

     const logOut = () => {
          Cookies.remove("token");
          setUser(null);
          router.push("/login");
          router.refresh();
     };

     return (
          <AuthContext.Provider value={{ user, isLoading, setUser, logOut }}>
               {children}
          </AuthContext.Provider>
     );
}
