"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getMyProfileAction = async () => {
    try {
        const res = await apiFetchServerMain("/user/me");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateMyProfileAction = async (payload: any) => {
    try {
        const res = await apiFetchServerMain("/user/me", {
            method: "PUT",
            body: JSON.stringify(payload),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
