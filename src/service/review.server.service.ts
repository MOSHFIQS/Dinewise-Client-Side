import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const reviewServerService = {
     create: (menuItemId: string, payload: any) =>
          apiFetchServerMain(`/review/${menuItemId}`, {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     getMenuItemReviews: (menuItemId: string, query?: string) =>
          apiFetchServerMain(`/review/menu/${menuItemId}?${query || ""}`, {
               method: "GET",
          }),

     getMyReviews: (query?: string) =>
          apiFetchServerMain(`/review/me?${query || ""}`, {
               method: "GET",
          }),

     getAllReviews: (query?: string) =>
          apiFetchServerMain(`/review/all?${query || ""}`, {
               method: "GET",
          }),

     getChefReviews: (query?: string) =>
          apiFetchServerMain(`/review/chef?${query || ""}`, {
               method: "GET",
          }),

     canReview: (menuItemId: string) =>
          apiFetchServerMain(`/review/can-review/${menuItemId}`, {
               method: "GET",
          }),

     update: (id: string, payload: any) =>
          apiFetchServerMain(`/review/${id}`, {
               method: "PATCH",
               body: JSON.stringify(payload),
          }),

     delete: (id: string) =>
          apiFetchServerMain(`/review/${id}`, {
               method: "DELETE",
          }),
};
