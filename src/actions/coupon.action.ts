"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { couponServerService } from "@/service/coupon.server.service";
import { revalidatePath } from "next/cache";

export const createCouponAction = async (payload: any) => {
    try {
        const res = await couponServerService.create(payload);
        revalidatePath("/dashboard/admin/coupons");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getAllCouponsAction = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await couponServerService.getAll(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const validateCouponAction = async (code: string, cartTotal: number) => {
    try {
        const res = await couponServerService.validate(code, cartTotal);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteCouponAction = async (id: string) => {
    try {
        const res = await couponServerService.delete(id);
        revalidatePath("/dashboard/admin/coupons");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
