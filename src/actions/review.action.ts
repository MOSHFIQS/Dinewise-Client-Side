"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { reviewServerService } from "@/service/review.server.service";
import { revalidatePath } from "next/cache";

export const createReviewAction = async (menuItemId: string, payload: any) => {
    try {
        const res = await reviewServerService.create(menuItemId, payload);
        revalidatePath(`/menu/${menuItemId}`);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getReviewsAction = async (menuItemId: string, params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await reviewServerService.getMenuItemReviews(menuItemId, query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteReviewAction = async (id: string, menuItemId?: string) => {
    try {
        const res = await reviewServerService.delete(id);
        if (menuItemId) revalidatePath(`/menu/${menuItemId}`);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
