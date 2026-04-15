"use client";

import { ImageType } from "@/hooks/usePremiumImageUpload";
import { Plus, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppImage } from "./AppImage";

interface ImageUploaderProps {
  label?: string;
  images: ImageType[];
  onUpload: (file: File) => void;
  onDelete: (img: ImageType) => void;
  multiple?: boolean;
}

export default function ImageUploader({
  label,
  images,
  onUpload,
  onDelete,
  multiple = false,
}: ImageUploaderProps) {
  return (
    <div className="space-y-4 w-full">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex flex-wrap gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative h-28 w-28 rounded-2xl overflow-hidden border border-gray-100 group shadow-sm bg-white"
          >
            <AppImage
              src={img.img}
              alt={img.name}
              className={cn(
                "w-full h-full transition-opacity duration-300",
                img.imageUploading ? "opacity-40" : "opacity-100"
              )}
            />
            {img.imageUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-5 w-5 text-orange-500 animate-spin" />
              </div>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="destructive"
                className="h-8 w-8 p-0 rounded-lg shadow-lg"
                onClick={() => onDelete(img)}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {(multiple || images.length === 0) && (
          <label className="h-28 w-28 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-orange-50/50 hover:border-orange-200 transition-all group shrink-0 bg-white shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-orange-100/50 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
              <Plus className="h-5 w-5 text-orange-500" />
            </div>
            <span className="text-[10px] font-semibold text-gray-400 mt-2 uppercase tracking-wider group-hover:text-orange-600 transition-colors">
              Upload
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onUpload(file);
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
}
