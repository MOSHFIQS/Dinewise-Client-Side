import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const addressServerService = {
     create: (payload: any) =>
          apiFetchServerMain("/address", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     getAddresses: () =>
          apiFetchServerMain("/address", {
               method: "GET",
          }),

     update: (id: string, payload: any) =>
          apiFetchServerMain(`/address/${id}`, {
               method: "PUT",
               body: JSON.stringify(payload),
          }),

     delete: (id: string) =>
          apiFetchServerMain(`/address/${id}`, {
               method: "DELETE",
          }),
};
