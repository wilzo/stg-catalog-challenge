"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export default function ProductImage({
  src,
  alt,
  className,
  fill = false,
  width,
  height,
  sizes,
  priority = false,
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // Fallback simples apenas para erros
  const imageSrc = imageError
    ? "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    : src;

  const imageClasses = cn(
    "transition-opacity duration-300",
    isLoading ? "opacity-0" : "opacity-100",
    className || ""
  );

  return (
    <div className="relative">
      {fill ? (
        <Image
          src={imageSrc}
          alt={alt}
          fill
          onLoad={handleLoad}
          onError={handleError}
          className={imageClasses}
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={width || 400}
          height={height || 400}
          onLoad={handleLoad}
          onError={handleError}
          className={imageClasses}
          sizes={sizes}
          priority={priority}
        />
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
