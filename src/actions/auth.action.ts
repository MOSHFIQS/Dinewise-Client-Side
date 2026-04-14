"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
     const email = formData.get("email") as string;
     const password = formData.get("password") as string;

     try {
          const res = await apiFetchServerMain("/auth/login", {
               method: "POST",
               body: JSON.stringify({ email, password }),
          });

          if (res.success && res.data?.token) {
               const cookieStore = await cookies();
               cookieStore.set("token", res.data.token, {
                    httpOnly: false, // We need to access it in Next.js middleware and client
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60, // 7 days
               });
               return { success: true };
          }
          return { success: false, error: "Login failed" };
     } catch (error: any) {
          return { success: false, error: error.message };
     }
};

export const registerAction = async (formData: FormData) => {
     const name = formData.get("name") as string;
     const email = formData.get("email") as string;
     const password = formData.get("password") as string;
     const role = formData.get("role") as string || "CUSTOMER";

     try {
          const res = await apiFetchServerMain("/auth/register", {
               method: "POST",
               body: JSON.stringify({ name, email, password, role, image: null }),
          });

          if (res.success && res.data?.token) {
               const cookieStore = await cookies();
               cookieStore.set("token", res.data.token, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
               });
               return { success: true };
          }
          return { success: false, error: "Registration failed" };
     } catch (error: any) {
          return { success: false, error: error.message };
     }
};

export const logoutAction = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
};
