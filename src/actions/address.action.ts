"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getMyAddressesAction = async () => {
    try {
        const res = await apiFetchServerMain("/address", { method: "GET" });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const createAddressAction = async (payload: any) => {
    try {
        const res = await apiFetchServerMain("/address", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteAddressAction = async (id: string) => {
    try {
        const res = await apiFetchServerMain(`/address/${id}`, { method: "DELETE" });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
