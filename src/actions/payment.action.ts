"use server";

import { paymentServerService } from "@/service/payment.server.service";
import { revalidatePath } from "next/cache";

export const createPaymentIntentAction = async (orderId: string) => {
    try {
        const res = await paymentServerService.createPaymentIntent(orderId);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const getAllPaymentsAction = async (query?: string) => {
    try {
        const res = await paymentServerService.getAllPayments(query);
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};

export const verifyPaymentAction = async (paymentIntentId: string) => {
    try {
        const res = await paymentServerService.verifyPayment(paymentIntentId);
        revalidatePath("/dashboard/customer/orders");
        return res;
    } catch (error: any) {
        return { success: false, error: error.message };
    }
};
