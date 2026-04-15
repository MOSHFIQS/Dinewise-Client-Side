"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getAllMenuItems = async (page?: number, limit?: number, searchTerm?: string) => {
    try {
        let query = "";
        const params = new URLSearchParams();
        if (page) params.append("page", String(page));
        if (limit) params.append("limit", String(limit));
        if (searchTerm) params.append("searchTerm", searchTerm);
        
        query = params.toString() ? `?${params.toString()}` : "";
        
        const res = await apiFetchServerMain(`/menu-item${query}`, { method: "GET" });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getChefMenuItemsAction = async (page?: number, limit?: number, searchTerm?: string) => {
    try {
        let query = "";
        const params = new URLSearchParams();
        if (page) params.append("page", String(page));
        if (limit) params.append("limit", String(limit));
        if (searchTerm) params.append("searchTerm", searchTerm);
        
        query = params.toString() ? `?${params.toString()}` : "";
        
        const res = await apiFetchServerMain(`/menu-item/chef${query}`, { method: "GET" });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getMenuItemById = async (id: string) => {
    try {
        const res = await apiFetchServerMain(`/menu-item/${id}`, { method: "GET" });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const createMenuItemAction = async (payload: any) => {
    try {
        const res = await apiFetchServerMain("/menu-item/chef", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateMenuItemAction = async (id: string, payload: any) => {
    try {
        const res = await apiFetchServerMain(`/menu-item/chef/${id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteMenuItemAction = async (id: string) => {
    try {
        const res = await apiFetchServerMain(`/menu-item/chef/${id}`, {
            method: "DELETE",
        });
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

