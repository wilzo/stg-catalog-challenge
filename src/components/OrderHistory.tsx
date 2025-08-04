"use client";

import { Eye, Calendar, Package, ShoppingBag } from "lucide-react";
import CustomButton from "./CustomButton";
import { Order } from "@/lib/orders";

interface OrderHistoryProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onViewAll: () => void;
}

export default function OrderHistory({
  orders,
  onViewOrder,
  onViewAll,
}: OrderHistoryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const recentOrders = orders.slice(0, 3);

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Pedidos Recentes</h2>
        </div>

        <div className="text-center py-8">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum pedido encontrado
          </h3>
          <p className="text-gray-600">
            Seus pedidos aparecerão aqui após serem enviados para o WhatsApp
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Package className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Pedidos Recentes</h2>
        </div>

        {orders.length > 3 && (
          <CustomButton
            variant="ghost"
            onClick={onViewAll}
            className="text-blue-600 hover:text-blue-700"
          >
            Ver Todos
          </CustomButton>
        )}
      </div>

      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-medium">
                    Pedido #{order.id.slice(-6)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {formatDate(order.date)}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "item" : "itens"}
                </p>

                <p className="font-bold text-gray-900">
                  {formatPrice(order.total)}
                </p>
              </div>

              <CustomButton
                variant="ghost"
                onClick={() => onViewOrder(order)}
                icon={<Eye className="h-4 w-4" />}
                className="text-blue-600 hover:text-blue-700"
              >
                Ver Pedido
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
