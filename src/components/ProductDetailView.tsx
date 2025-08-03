"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductImage from "@/components/ProductImageSimple";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
  Check,
  Loader2,
} from "lucide-react";
import { Product } from "@/types/database";

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => Promise<boolean>;
  onToggleFavorite?: (productId: number) => Promise<void>;
  isFavorited?: boolean;
}

export default function ProductDetailView({
  product,
  onBack,
  onAddToCart,
  onToggleFavorite,
  isFavorited,
}: ProductDetailViewProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(product, quantity);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  // Mock data para demonstração - em produção viriam do banco
  const mockImages = [
    product.image_url,
    product.image_url,
    product.image_url,
  ].filter(Boolean);

  const mockFeatures = [
    "Alta qualidade e durabilidade",
    "Tecnologia avançada",
    "Design moderno e elegante",
    "Garantia de 12 meses",
    "Suporte técnico especializado",
    "Entrega rápida e segura",
  ];

  const mockSpecifications = {
    Marca: "TechMarket",
    Modelo: product.name,
    Categoria: product.category,
    Garantia: "12 meses",
    Origem: "Nacional",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 border-2 border-blue-500 text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200 bg-white shadow-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Catálogo
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4 animate-in slide-in-from-left duration-700">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <ProductImage
                src={mockImages[selectedImageIndex] || product.image_url || ""}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 w-10 h-10 p-0 bg-white/80 hover:bg-white/90 rounded-full shadow-sm"
                onClick={() => onToggleFavorite?.(product.id)}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${
                    isFavorited
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </Button>
            </div>

            {/* Thumbnail Images */}
            {mockImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {mockImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "border-blue-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <ProductImage
                      src={image || ""}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6 animate-in slide-in-from-right duration-700">
            {/* Category */}
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {product.category}
              </Badge>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                ou 12x de {formatPrice(product.price / 12)} sem juros
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`font-medium ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "Em estoque" : "Fora de estoque"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Quantidade:</span>
              <div className="flex items-center border-2 border-gray-300 rounded-lg bg-white">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="h-10 w-10 p-0 hover:bg-gray-100 disabled:opacity-50"
                >
                  <Minus className="h-4 w-4 text-gray-700" />
                </Button>
                <span className="px-4 py-2 font-bold text-lg min-w-[3rem] text-center text-gray-900 bg-gray-50">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 p-0 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 text-gray-700" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="flex-1 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Adicionando...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </>
                )}
              </Button>
            </div>

            {/* Shipping and Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Frete Grátis
                  </p>
                  <p className="text-xs text-gray-600">Acima de R$ 99</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Garantia</p>
                  <p className="text-xs text-gray-600">12 meses</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Troca</p>
                  <p className="text-xs text-gray-600">30 dias</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description ||
                  "Produto de alta qualidade com tecnologia avançada e design moderno. Ideal para uso profissional e pessoal."}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">
                Características
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {mockFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">
                Especificações
              </h3>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {Object.entries(mockSpecifications).map(
                  ([key, value], index) => (
                    <div
                      key={key}
                      className={`flex justify-between items-center px-4 py-3 ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
