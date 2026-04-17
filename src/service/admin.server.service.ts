import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const adminServerService = {
     getAllUsers: (query?: string) =>
          apiFetchServerMain(`/admin/users?${query || ""}`, {
               method: "GET",
          }),

     updateUserStatus: (id: string, status: string) =>
          apiFetchServerMain(`/admin/users/${id}`, {
               method: "PATCH",
               body: JSON.stringify({ status }),
          }),

     getDashboardStats: () =>
          apiFetchServerMain("/admin/stats", {
               method: "GET",
          }),

     getAuditLogs: (query?: string) =>
          apiFetchServerMain(`/audit?${query || ""}`, {
               method: "GET",
          }),
};
