import { apiFetchClient } from "@/lib/api"

export const authService = {
     signUp: (payload: any) =>
          apiFetchClient("/auth/register", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     signIn: (payload: { email: string; password: string }) =>
          apiFetchClient("/auth/login", {
               method: "POST",
               body: JSON.stringify(payload),
          }),
}
