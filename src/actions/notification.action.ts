"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getMyNotificationsAction = async () => {
    try {
        const res = await apiFetchServerMain("/notification/me");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const markNotificationReadAction = async (id: string) => {
    try {
        const res = await apiFetchServerMain(`/notification/${id}/read`, {
            method: "PATCH",
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
