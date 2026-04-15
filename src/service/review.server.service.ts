import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const reviewServerService = {
     create: (menuItemId: string, payload: any) =>
          apiFetchServerMain(`/review/${menuItemId}`, {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     getMenuItemReviews: (menuItemId: string, query?: string) =>
          apiFetchServerMain(`/review/${menuItemId}?${query || ""}`, {
               method: "GET",
          }),

     delete: (id: string) =>
          apiFetchServerMain(`/review/${id}`, {
               method: "DELETE",
          }),
};
