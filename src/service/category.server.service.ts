import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const categoryServerService = {
     getAll: (query?: string) =>
          apiFetchServerMain(`/category?${query || ""}`, {
               method: "GET",
          }),

     getById: (id: string) =>
          apiFetchServerMain(`/category/${id}`, {
               method: "GET",
          }),

     create: (payload: any) =>
          apiFetchServerMain("/category", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     update: (id: string, payload: any) =>
          apiFetchServerMain(`/category/${id}`, {
               method: "PUT",
               body: JSON.stringify(payload),
          }),

     delete: (id: string) =>
          apiFetchServerMain(`/category/${id}`, {
               method: "DELETE",
          }),
};
