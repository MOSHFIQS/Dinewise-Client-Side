"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export const getAllMenuItems = async (searchParams?: Record<string, string>) => {
     try {
          const res = await apiFetchServerMain("/menu-item", {
               method: "GET",
               params: searchParams,
          });
          return res;
     } catch (error: any) {
          return { success: false, error: error.message };
     }
};

export const getMenuItemById = async (id: string) => {
     try {
          const res = await apiFetchServerMain(`/menu-item/${id}`);
          return res;
     } catch (error: any) {
          return { success: false, error: error.message };
     }
};
