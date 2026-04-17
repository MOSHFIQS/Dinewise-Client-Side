"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { refundServerService } from "@/service/refund.server.service";
import { revalidatePath } from "next/cache";

export const requestRefundAction = async (payload: any) => {
    try {
        const res = await refundServerService.requestRefund(payload);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getRefundsAction = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await refundServerService.getRefunds(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const chefReviewRefundAction = async (id: string, payload: { action: string, note?: string }) => {
    try {
        const res = await refundServerService.chefReviewRefund(id, payload);
        revalidatePath("/dashboard/refunds");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const adminReviewRefundAction = async (id: string, payload: { action: string, note?: string }) => {
    try {
        const res = await refundServerService.adminReviewRefund(id, payload);
        console.log(res)
        revalidatePath("/dashboard/refunds");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
