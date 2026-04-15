import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const couponServerService = {
     create: (payload: any) =>
          apiFetchServerMain("/coupon", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     getAll: (query?: string) =>
          apiFetchServerMain(`/coupon?${query || ""}`, {
               method: "GET",
          }),

     validate: (code: string, cartTotal: number) =>
          apiFetchServerMain("/coupon/validate", {
               method: "POST",
               body: JSON.stringify({ code, cartTotal }),
          }),

     delete: (id: string) =>
          apiFetchServerMain(`/coupon/${id}`, {
               method: "DELETE",
          }),
};
