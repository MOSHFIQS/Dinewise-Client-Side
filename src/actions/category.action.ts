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
