"use server";

import { addressServerService } from "@/service/address.server.service";
import { revalidatePath } from "next/cache";

export const getMyAddressesAction = async () => {
    try {
        const res = await addressServerService.getAddresses();
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const createAddressAction = async (payload: any) => {
    try {
        const res = await addressServerService.create(payload);
        revalidatePath("/checkout");
        revalidatePath("/dashboard/customer/address");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const deleteAddressAction = async (id: string) => {
    try {
        const res = await addressServerService.delete(id);
        revalidatePath("/checkout");
        revalidatePath("/dashboard/customer/address");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
