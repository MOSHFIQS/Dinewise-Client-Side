import { useState } from "react";
import { toast } from "sonner";
import { envVars } from "@/config/env";

export const useImageUpload = () => {
     const [images, setImages] = useState<string[]>([]);
     const [isUploading, setIsUploading] = useState(false);

     const handleImageUpload = async (file: File) => {
          if (!file) return;

          setIsUploading(true);
          const formData = new FormData();
          formData.append("file", file);

          try {
               const response = await fetch(`${envVars.BACKEND_URL}/api/file/upload`, {
                    method: "POST",
                    body: formData,
               });

               const result = await response.json();
               if (result.success) {
                    setImages((prev) => [...prev, result.data.url]);
                    toast.success("Image uploaded successfully");
               } else {
                    toast.error(result.message || "Failed to upload image");
               }
          } catch (error) {
               console.error("Upload error:", error);
               toast.error("An error occurred during upload");
          } finally {
               setIsUploading(false);
          }
     };

     const removeImage = async (url: string) => {
          try {
               const response = await fetch(`${envVars.BACKEND_URL}/api/file/delete`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
               });

               const result = await response.json();
               if (result.success) {
                    setImages((prev) => prev.filter((img) => img !== url));
                    toast.success("Image removed successfully");
               } else {
                    toast.error(result.message || "Failed to delete image");
               }
          } catch (error) {
               console.error("Delete error:", error);
               toast.error("Failed to delete image");
          }
     };

     return {
          images,
          setImages,
          isUploading,
          handleImageUpload,
          removeImage,
     };
};
