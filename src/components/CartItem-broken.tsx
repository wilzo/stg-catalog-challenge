import React from "react";
import Image from "next/image";
import { Trash2, Plus,              <CustomButton
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (item.quantity <= 1) {
                    onRemoveItem(item.id);
                  } else {
                    onUpdateQuantity(item.id, item.quantity - 1);
                  }
                }}
                disabled={isUpdating || isRemoving}
                className="h-8 w-8 p-0 rounded-none border-0 hover:bg-gray-100"
              >
                <Minus className="h-3 w-3 text-gray-700" />
              </CustomButton>oader2 } from "lucide-react";
import CustomButton from "./CustomButton";

interface CartItemProps {
  item: {
    id: number;
    productId: number;
    productName: string;
    productPrice: number;
    imageUrl: string | null;
    quantity: number;
    subtotal: number;
    categoryName?: string;
  };
  onUpdateQuantity: (itemId: number, newQuantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  isUpdating?: boolean;
  isRemoving?: boolean;
}

export const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  isUpdating = false,
  isRemoving = false,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex-shrink-0">
        <Image
          src={item.imageUrl || "/placeholder-product.jpg"}
          alt={item.productName}
          width={100}
          height={100}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200"
        />
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
            {item.productName}
          </h3>
          {item.categoryName && (
            <p className="text-sm text-gray-600">{item.categoryName}</p>
          )}
          <p className="text-lg font-bold text-green-600">
            {formatPrice(item.productPrice)}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">Quantidade:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <CustomButton
                variant="ghost"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
                className="h-8 w-8 p-0 rounded-none border-0 hover:bg-gray-100"
              >
                <Minus className="h-3 w-3 text-gray-700" />
              </CustomButton>
              
              <span className="px-3 py-1 bg-gray-50 text-sm font-medium text-gray-900 min-w-[40px] text-center">
                {isUpdating ? (
                  <Loader2 className="h-3 w-3 animate-spin mx-auto" />
                ) : (
                  item.quantity
                )}
              </span>
              
              <CustomButton
                variant="ghost"
                size="sm"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                disabled={isUpdating}
                className="h-8 w-8 p-0 rounded-none border-0 hover:bg-gray-100"
              >
                <Plus className="h-3 w-3 text-gray-700" />
              </CustomButton>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Subtotal:</p>
              <p className="font-semibold text-gray-900">
                {formatPrice(item.subtotal)}
              </p>
            </div>
            
            <CustomButton
              variant="ghost"
              size="sm"
              onClick={() => onRemoveItem(item.id)}
              disabled={isRemoving}
              loading={isRemoving}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
              icon={!isRemoving ? <Trash2 className="h-4 w-4" /> : undefined}
            >
              <span className="sr-only">Remover item</span>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
