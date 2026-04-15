"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { notificationServerService } from "@/service/notification.server.service";
import { revalidatePath } from "next/cache";

export const getMyNotificationsAction = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await notificationServerService.getMyNotifications(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const markNotificationReadAction = async (id: string) => {
    try {
        const res = await notificationServerService.markAsRead(id);
        revalidatePath("/dashboard");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
