"use server";

import { buildQueryString, QueryParams } from "@/utils/buildQueryString";
import { categoryServerService } from "@/service/category.server.service";
import { revalidatePath } from "next/cache";

export const getAllCategories = async (params: QueryParams = {}) => {
    try {
          const query = buildQueryString(params);
          const res = await categoryServerService.getAll(query);
          return res;
    } catch (error: any) {
          return { success: false, error: error.message };
    }
};

export const getCategoryByIdAction = async (id: string) => {
     try {
          const res = await categoryServerService.getById(id);
          return res;
     } catch (error: any) {
          return { success: false, error: error.message };
     }
};

export const createCategoryAction = async (payload: { name: string; description?: string; image?: string }) => {
    try {
         const res = await categoryServerService.create(payload);
         revalidatePath("/dashboard/admin/category");
         return res;
    } catch (error: any) {
         return { success: false, error: error.message };
    }
};

export const updateCategoryAction = async (id: string, payload: Partial<{ name: string; description: string; image: string }>) => {
     try {
          const res = await categoryServerService.update(id, payload);
          revalidatePath("/dashboard/admin/category");
          return res;
     } catch (error: any) {
          return { success: false, error: error.message };
     }
};

export const deleteCategoryAction = async (id: string) => {
    try {
         const res = await categoryServerService.delete(id);
         revalidatePath("/dashboard/admin/category");
         return res;
    } catch (error: any) {
         return { success: false, error: error.message };
    }
};

