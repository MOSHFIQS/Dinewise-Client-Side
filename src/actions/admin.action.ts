"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getAllUsersAction = async (searchParams?: Record<string, string>) => {
    try {
        const res = await apiFetchServerMain("/admin/users", {
            method: "GET",
            params: searchParams,
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateUserStatusAction = async (id: string, status: string) => {
    try {
        const res = await apiFetchServerMain(`/admin/users/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getDashboardStatsAction = async () => {
    try {
        const res = await apiFetchServerMain("/admin/stats");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
