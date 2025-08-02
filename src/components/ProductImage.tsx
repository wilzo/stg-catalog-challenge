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

  // URLs de fallback para diferentes categorias de produtos
  const getCategoryPlaceholder = (productName: string): string => {
    const name = productName.toLowerCase();

    if (
      name.includes("smartphone") ||
      name.includes("celular") ||
      name.includes("iphone") ||
      name.includes("galaxy") ||
      name.includes("pixel")
    ) {
      return "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop";
    }
    if (
      name.includes("notebook") ||
      name.includes("laptop") ||
      name.includes("macbook") ||
      name.includes("dell") ||
      name.includes("gaming pc")
    ) {
      return "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop";
    }
    if (
      name.includes("fone") ||
      name.includes("headphone") ||
      name.includes("áudio") ||
      name.includes("sony") ||
      name.includes("caixa") ||
      name.includes("microfone")
    ) {
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
    }
    if (
      name.includes("smartwatch") ||
      name.includes("relógio") ||
      name.includes("watch") ||
      name.includes("garmin")
    ) {
      return "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop";
    }
    if (
      name.includes("tablet") ||
      name.includes("ipad") ||
      name.includes("surface")
    ) {
      return "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop";
    }
    if (
      name.includes("câmera") ||
      name.includes("camera") ||
      name.includes("foto") ||
      name.includes("sony") ||
      name.includes("lente") ||
      name.includes("drone")
    ) {
      return "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop";
    }
    if (
      name.includes("console") ||
      name.includes("game") ||
      name.includes("xbox") ||
      name.includes("playstation") ||
      name.includes("nintendo") ||
      name.includes("controle")
    ) {
      return "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop";
    }
    if (
      name.includes("monitor") ||
      name.includes("display") ||
      name.includes("samsung") ||
      name.includes("dell")
    ) {
      return "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop";
    }
    if (
      name.includes("teclado") ||
      name.includes("keyboard") ||
      name.includes("mouse") ||
      name.includes("webcam") ||
      name.includes("mesa") ||
      name.includes("corsair") ||
      name.includes("razer") ||
      name.includes("logitech") ||
      name.includes("wacom")
    ) {
      return "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop";
    }

    // Fallback genérico para eletrônicos
    return "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop";
  };

  const getImageSrc = (): string => {
    // Se houve erro na imagem, usa fallback baseado no produto
    if (imageError) {
      return getCategoryPlaceholder(alt);
    }

    // Usa a URL fornecida
    return src;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const imageClasses = cn(
    "transition-opacity duration-300",
    isLoading ? "opacity-0" : "opacity-100",
    className || ""
  );

  return (
    <div className="relative">
      {fill ? (
        <Image
          src={getImageSrc()}
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
          src={getImageSrc()}
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
