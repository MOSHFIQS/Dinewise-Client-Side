import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const notificationServerService = {
     getMyNotifications: (query?: string) =>
          apiFetchServerMain(`/notification/me?${query || ""}`, {
               method: "GET",
          }),

     markAsRead: (id: string) =>
          apiFetchServerMain(`/notification/${id}/read`, {
               method: "PATCH",
          }),
};
