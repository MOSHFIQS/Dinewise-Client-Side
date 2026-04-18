"use server"

import { reviewServerService } from "@/service/review.server.service";
import { revalidatePath } from "next/cache";

export const createReviewAction = async (menuItemId: string, payload: any) => {
     try {
          const res = await reviewServerService.create(menuItemId, payload);
          revalidatePath(`/menu/${menuItemId}`);
          return { success: true, message: "Review posted successfully", data: res.data };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to post review" };
     }
};

export const updateReviewAction = async (id: string, payload: any, menuItemId?: string) => {
     try {
          const res = await reviewServerService.update(id, payload);
          if (menuItemId) revalidatePath(`/menu/${menuItemId}`);
          revalidatePath("/dashboard/customer/reviews");
          return { success: true, message: "Review updated successfully", data: res.data };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to update review" };
     }
};

export const deleteReviewAction = async (id: string, menuItemId?: string) => {
     try {
          await reviewServerService.delete(id);
          if (menuItemId) revalidatePath(`/menu/${menuItemId}`);
          revalidatePath("/dashboard/customer/reviews");
          revalidatePath("/dashboard/admin/reviews");
          return { success: true, message: "Review deleted successfully" };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to delete review" };
     }
};

export const getMyReviewsAction = async (query?: string) => {
     try {
          const res = await reviewServerService.getMyReviews(query);
          return { success: true, data: res.data, meta: res.meta };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to fetch your reviews" };
     }
};

export const getAllReviewsAction = async (query?: string) => {
     try {
          const res = await reviewServerService.getAllReviews(query);
          return { success: true, data: res.data, meta: res.meta };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to fetch all reviews" };
     }
};

export const getChefReviewsAction = async (query?: string) => {
     try {
          const res = await reviewServerService.getChefReviews(query);
          return { success: true, data: res.data, meta: res.meta };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to fetch chef reviews" };
     }
};

export const checkReviewEligibilityAction = async (menuItemId: string) => {
     try {
          const res = await reviewServerService.canReview(menuItemId);
          return { success: true, data: res.data };
     } catch (error: any) {
          return { success: false, message: error.message || "Failed to check eligibility" };
     }
};
