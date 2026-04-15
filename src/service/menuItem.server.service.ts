import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const menuItemServerService = {
     getAll: (query?: string) =>
          apiFetchServerMain(`/menu-item?${query || ""}`, {
               method: "GET",
          }),

     getChefMenuItems: (query?: string) =>
          apiFetchServerMain(`/menu-item/chef?${query || ""}`, {
               method: "GET",
          }),

     getById: (id: string) =>
          apiFetchServerMain(`/menu-item/${id}`, {
               method: "GET",
          }),

     create: (payload: any) =>
          apiFetchServerMain("/menu-item/chef", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     update: (id: string, payload: any) =>
          apiFetchServerMain(`/menu-item/chef/${id}`, {
               method: "PUT",
               body: JSON.stringify(payload),
          }),

     delete: (id: string) =>
          apiFetchServerMain(`/menu-item/chef/${id}`, {
               method: "DELETE",
          }),
};
