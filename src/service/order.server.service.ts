import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const orderServerService = {
     placeOrder: (payload: any) =>
          apiFetchServerMain("/order", {
               method: "POST",
               body: JSON.stringify(payload),
          }),

     getCustomerOrders: (query?: string) =>
          apiFetchServerMain(`/order/my-orders?${query || ""}`, {
               method: "GET",
          }),

     getAllOrders: (query?: string) =>
          apiFetchServerMain(`/order/all?${query || ""}`, {
               method: "GET",
          }),

     getById: (id: string) =>
          apiFetchServerMain(`/order/${id}`, {
               method: "GET",
          }),

     updateStatus: (id: string, action: string) =>
          apiFetchServerMain(`/order/${id}/status`, {
               method: "PATCH",
               body: JSON.stringify({ action }),
          }),
};
