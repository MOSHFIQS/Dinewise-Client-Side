"use server";

import { apiFetchServerMain } from "@/lib/apiFetchServer";

export async function uploadImagesAction(formData: FormData) {
     try {
          const res = await apiFetchServerMain("/file/upload", {
               method: "POST",
               body: formData,
          });

          if (!res?.success) {
               return {
                    ok: false,
                    message: res?.message || "Image upload failed",
               };
          }

          return {
               ok: true,
               message: res?.message || "Images uploaded successfully",
               data: res.data,
          };
     } catch (error: any) {
          return {
               ok: false,
               message: error.message || "Something went wrong",
          };
     }
}

export async function deleteImagesAction(payload: {
     url: string | string[];
}) {
     try {
          const res = await apiFetchServerMain("/file/delete", {
               method: "DELETE",
               body: JSON.stringify(payload),
          });

          if (!res?.success) {
               return {
                    ok: false,
                    message: res?.message || "Image delete failed",
               };
          }

          return {
               ok: true,
               message: res?.message || "Images deleted successfully",
               data: res.data,
          };
     } catch (error: any) {
          return {
               ok: false,
               message: error.message || "Something went wrong",
          };
     }
}
