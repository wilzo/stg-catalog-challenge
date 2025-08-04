"use client";

import { X, Calendar, User, Mail, Package } from "lucide-react";
import CustomButton from "./CustomButton";
import { Order } from "@/lib/orders";

interface OrderModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({
  order,
  isOpen,
  onClose,
}: OrderModalProps) {
  if (!isOpen || !order) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Detalhes do Pedido
              </h2>
              <p className="text-gray-600">Pedido #{order.id.slice(-6)}</p>
            </div>
            <CustomButton
              variant="ghost"
              onClick={onClose}
              icon={<X className="h-5 w-5" />}
              className="text-gray-400 hover:text-gray-600"
            >
              Fechar
            </CustomButton>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Data do Pedido</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(order.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cliente</p>
                  <p className="font-semibold text-gray-900">
                    {order.customerName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {order.customerEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">
                  Resumo do Pedido
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "item" : "itens"}
                  </span>
                  <span className="font-medium">
                    {formatPrice(order.total)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-green-600 font-bold">GRÁTIS</span>
                </div>

                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Produtos
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {item.productName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quantidade: {item.quantity} • Preço unitário:{" "}
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex justify-end gap-3">
            <CustomButton variant="ghost" onClick={onClose} className="px-6">
              Fechar
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
