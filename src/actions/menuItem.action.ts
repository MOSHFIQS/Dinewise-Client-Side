"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { menuItemServerService } from "@/service/menuItem.server.service";
import { revalidatePath } from "next/cache";

export const getAllMenuItems = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await menuItemServerService.getAll(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getChefMenuItemsAction = async (params: QueryParams = {}) => {
    try {
        const query = buildQueryString(params);
        const res = await menuItemServerService.getChefMenuItems(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getMenuItemById = async (id: string) => {
    try {
        const res = await menuItemServerService.getById(id);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const createMenuItemAction = async (payload: any) => {
    try {
        const res = await menuItemServerService.create(payload);
        revalidatePath("/dashboard/chef/menu");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateMenuItemAction = async (id: string, payload: any) => {
    try {
        const res = await menuItemServerService.update(id, payload);
        revalidatePath("/dashboard/chef/menu");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteMenuItemAction = async (id: string) => {
    try {
        const res = await menuItemServerService.delete(id);
        revalidatePath("/dashboard/chef/menu");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

