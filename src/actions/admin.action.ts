"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { adminServerService } from "@/service/admin.server.service";
import { revalidatePath } from "next/cache";

export const getAllUsersAction = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await adminServerService.getAllUsers(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateUserStatusAction = async (id: string, status: string) => {
    try {
        const res = await adminServerService.updateUserStatus(id, status);
        revalidatePath("/dashboard/admin/users");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateUserRoleAction = async (id: string, role: string) => {
    try {
        const res = await adminServerService.updateUserRole(id, role);
        revalidatePath("/dashboard/admin/users");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getDashboardStatsAction = async () => {
    try {
        const res = await adminServerService.getDashboardStats();
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getAuditLogsAction = async (page?: number, limit?: number) => {
    try {
        const query = buildQueryString({page, limit});
        const res = await adminServerService.getAuditLogs(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
