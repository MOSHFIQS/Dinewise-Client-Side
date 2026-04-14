"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const createReviewAction = async (menuItemId: string, payload: any) => {
    try {
        const res = await apiFetchServerMain(`/review/${menuItemId}`, {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getReviewsAction = async (menuItemId: string, searchParams?: Record<string, string>) => {
    try {
        const res = await apiFetchServerMain(`/review/${menuItemId}`, {
            method: "GET",
            params: searchParams,
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteReviewAction = async (id: string) => {
    try {
        const res = await apiFetchServerMain(`/review/${id}`, {
            method: "DELETE",
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
