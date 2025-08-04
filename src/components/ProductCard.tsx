import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Plus } from "lucide-react";
import ProductImage from "@/components/ProductImageSimple";
import CustomButton from "@/components/CustomButton";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  isAddingToCart?: boolean;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAddingToCart = false,
  onProductClick,
  onAddToCart,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <Card
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <div className="relative h-48 overflow-hidden">
        <ProductImage
          src={product.image_url}
          alt={product.name}
          width={500}
          height={192}
          className="object-cover group-hover:scale-105 transition-transform duration-300 w-full h-full"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />

        <div className="absolute top-3 left-3">
          <Badge
            variant="secondary"
            className="bg-white/90 text-gray-700 text-xs"
          >
            {product.category}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="flex gap-2">
          <CustomButton
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            variant="outline"
            className="flex-1 font-medium border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            icon={<Eye className="h-4 w-4" />}
          >
            <span className="hidden sm:inline">Ver Detalhes</span>
            <span className="sm:hidden">Ver</span>
          </CustomButton>

          <CustomButton
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            loading={isAddingToCart}
            className={`flex-1 font-medium transition-all duration-200 ${
              product.inStock
                ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            icon={!isAddingToCart ? <Plus className="h-4 w-4" /> : undefined}
          >
            {isAddingToCart ? (
              <>
                <span className="hidden sm:inline">Adicionando...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : product.inStock ? (
              <>
                <span className="hidden sm:inline">Adicionar</span>
                <span className="sm:hidden">+</span>
              </>
            ) : (
              "Indisponível"
            )}
          </CustomButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
