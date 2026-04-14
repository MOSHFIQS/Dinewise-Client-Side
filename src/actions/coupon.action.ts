"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const createCouponAction = async (payload: any) => {
    try {
        const res = await apiFetchServerMain("/coupon", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getAllCouponsAction = async () => {
    try {
        const res = await apiFetchServerMain("/coupon", { method: "GET" });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const validateCouponAction = async (code: string, cartTotal: number) => {
    try {
        const res = await apiFetchServerMain("/coupon/validate", {
            method: "POST",
            body: JSON.stringify({ code, cartTotal }),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteCouponAction = async (id: string) => {
    try {
        const res = await apiFetchServerMain(`/coupon/${id}`, { method: "DELETE" });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
