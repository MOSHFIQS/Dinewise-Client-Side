import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const paymentServerService = {
     createPaymentIntent: (orderId: string) =>
          apiFetchServerMain(`/payment/create-intent/${orderId}`, {
               method: "POST",
          }),

     verifyPayment: (paymentIntentId: string) =>
          apiFetchServerMain("/payment/verify", {
               method: "POST",
               body: JSON.stringify({ paymentIntentId }),
          }),

     getAllPayments: (query?: string) =>
          apiFetchServerMain(`/payment/admin/all?${query || ""}`, {
               method: "GET",
          }),
};
