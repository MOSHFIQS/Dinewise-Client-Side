"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getAllCategories = async () => {
    try {
         const res = await apiFetchServerMain("/category", { method: "GET" });
         return res;
    } catch (error: any) {
         return { success: false, error: error.message };
    }
};

export const createCategoryAction = async (payload: { name: string; description?: string }) => {
    try {
         const res = await apiFetchServerMain("/category", {
              method: "POST",
              body: JSON.stringify(payload),
         });
         return res;
    } catch (error: any) {
         return { success: false, error: error.message };
    }
};

export const deleteCategoryAction = async (id: string) => {
    try {
         const res = await apiFetchServerMain(`/category/${id}`, { method: "DELETE" });
         return res;
    } catch (error: any) {
         return { success: false, error: error.message };
    }
};
