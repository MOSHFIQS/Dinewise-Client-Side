"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getAllCategories = async (page?: number, limit?: number) => {
    try {
         let query = "";
         if (page || limit) {
              const params = new URLSearchParams();
              if (page) params.append("page", String(page));
              if (limit) params.append("limit", String(limit));
              query = `?${params.toString()}`;
         }
         const res = await apiFetchServerMain(`/category${query}`, { method: "GET" });
         return res;
    } catch (error: any) {
         return { success: false, error: error.message };
    }
};

export const getCategoryByIdAction = async (id: string) => {
     try {
          const res = await apiFetchServerMain(`/category/${id}`, { method: "GET" });
          return res;
     } catch (error: any) {
          return { success: false, error: error.message };
     }
};

export const createCategoryAction = async (payload: { name: string; description?: string; image?: string }) => {
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

export const updateCategoryAction = async (id: string, payload: { name?: string; description?: string; image?: string }) => {
     try {
          const res = await apiFetchServerMain(`/category/${id}`, {
               method: "PUT",
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

