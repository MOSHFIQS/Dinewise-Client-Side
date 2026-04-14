"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const createPaymentIntentAction = async (orderId: string) => {
    try {
        const res = await apiFetchServerMain(`/payment/create-intent/${orderId}`, {
            method: "POST",
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getAllPaymentsAction = async () => {
    try {
        const res = await apiFetchServerMain("/payment/all", {
            method: "GET",
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
