import React from "react";
import { Truck, Shield } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCoupon?: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  discount,
  total,
  appliedCoupon,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Resumo do Pedido</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-900 font-medium">Subtotal:</span>
          <span className="text-gray-900 font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-gray-600" />
            <span className="text-gray-900 font-medium">Frete:</span>
          </div>
          <span className="text-gray-900 font-medium">
            {shipping === 0 ? "GRÁTIS" : formatPrice(shipping)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-green-700 font-medium">
              Desconto {appliedCoupon ? `(${appliedCoupon.code})` : ""}:
            </span>
            <span className="text-green-700 font-medium">-{formatPrice(discount)}</span>
          </div>
        )}

        <hr className="border-gray-200" />

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total:</span>
          <span className="text-xl font-bold text-green-600">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800 font-medium">
            Frete grátis para compras acima de R$ 99,00
          </span>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
