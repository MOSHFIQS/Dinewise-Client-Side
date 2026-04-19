"use server";

import { userServerService } from "@/service/user.server.service";
import { revalidatePath } from "next/cache";

export const getMyProfileAction = async () => {
    try {
        const res = await userServerService.getProfile();
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const updateMyProfileAction = async (payload: any) => {
    try {
        const res = await userServerService.updateProfile(payload);
        revalidatePath("/dashboard");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
