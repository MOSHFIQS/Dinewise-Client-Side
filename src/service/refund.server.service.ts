import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const refundServerService = {
     requestRefund: (payload: any) =>
          apiFetchServerMain("/refund", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     getRefunds: (query?: string) =>
          apiFetchServerMain(`/refund?${query || ""}`, {
               method: "GET",
          }),

     chefReviewRefund: (id: string, payload: { action: string, note?: string }) =>
          apiFetchServerMain(`/refund/${id}/chef`, {
               method: "PATCH",
               body: JSON.stringify(payload),
          }),

     adminReviewRefund: (id: string, payload: { action: string, note?: string }) =>
          apiFetchServerMain(`/refund/${id}/admin`, {
               method: "PATCH",
               body: JSON.stringify(payload),
          }),
};
