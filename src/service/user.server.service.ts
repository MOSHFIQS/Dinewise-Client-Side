import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const userServerService = {
     getProfile: () =>
          apiFetchServerMain("/user/me", {
               method: "GET",
          }),

     updateProfile: (payload: any) =>
          apiFetchServerMain("/user/me", {
               method: "PUT",
               body: JSON.stringify(payload),
          }),
};
