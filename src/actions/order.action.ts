"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const createOrderAction = async (payload: any) => {
    try {
        const res = await apiFetchServerMain("/order", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getMyOrdersAction = async (searchParams?: Record<string, string>) => {
    try {
        const res = await apiFetchServerMain("/order/my-orders", {
            method: "GET",
            params: searchParams,
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getOrderByIdAction = async (id: string) => {
    try {
        const res = await apiFetchServerMain(`/order/${id}`);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateOrderStatusAction = async (id: string, actionStatus: string) => {
    try {
        const res = await apiFetchServerMain(`/order/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ action: actionStatus }),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getAllOrdersAction = async (searchParams?: Record<string, string>) => {
    try {
        const res = await apiFetchServerMain("/order/all", {
            method: "GET",
            params: searchParams,
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
