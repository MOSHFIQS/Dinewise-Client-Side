"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AppImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const AppImage = ({ src, alt, className, width = 500, height = 500 }: AppImageProps) => {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop" : src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      onError={() => setError(true)}
    />
  );
};
