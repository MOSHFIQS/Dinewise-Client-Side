"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { orderServerService } from "@/service/order.server.service";
import { revalidatePath } from "next/cache";

export const createOrderAction = async (payload: any) => {
    try {
        const res = await orderServerService.placeOrder(payload);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getMyOrdersAction = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await orderServerService.getCustomerOrders(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getOrderByIdAction = async (id: string) => {
    try {
        const res = await orderServerService.getById(id);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateOrderStatusAction = async (id: string, actionStatus: string) => {
    try {
        const res = await orderServerService.updateStatus(id, actionStatus);
        revalidatePath("/dashboard/chef/myOrders");
        revalidatePath("/dashboard/admin/orders");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getAllOrdersAction = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await orderServerService.getAllOrders(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
