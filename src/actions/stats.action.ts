"use server"

import { statsServerService } from "@/service/stats.server.service";

export const getAdminStatsAction = async () => {
     try {
          const res = await statsServerService.getAdminStats();
          return { success: true, data: res.data };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to fetch admin stats" };
     }
};

export const getChefStatsAction = async () => {
     try {
          const res = await statsServerService.getChefStats();
          return { success: true, data: res.data };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to fetch chef stats" };
     }
};

export const getCustomerStatsAction = async () => {
     try {
          const res = await statsServerService.getCustomerStats();
          return { success: true, data: res.data };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to fetch customer stats" };
     }
};
