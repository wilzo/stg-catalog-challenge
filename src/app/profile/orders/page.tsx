"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Calendar, Package, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import OrderModal from "@/components/OrderModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getUserOrders, Order } from "@/lib/orders";

export default function AllOrdersPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Carregar todos os pedidos reais do usuário
    const loadAllOrders = async () => {
      setIsLoading(true);

      try {
        const result = await getUserOrders();
        if (result.success && result.orders) {
          setOrders(result.orders);
          setFilteredOrders(result.orders);
        } else {
          console.error("Erro ao carregar pedidos:", result.error);
          setOrders([]);
          setFilteredOrders([]);
        }
      } catch (error) {
        console.error("Erro inesperado ao carregar pedidos:", error);
        setOrders([]);
        setFilteredOrders([]);
      }

      setIsLoading(false);
      setIsLoading(false);
    };

    loadAllOrders();
  }, [user, router]);

  useEffect(() => {
    // Filtrar pedidos com base no termo de busca
    if (searchTerm.trim()) {
      const filtered = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.items.some((item) =>
            item.productName.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Carregando pedidos..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-in slide-in-from-left duration-500">
          <CustomButton
            variant="ghost"
            onClick={() => router.push("/profile")}
            icon={<ArrowLeft className="h-4 w-4" />}
            className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            Voltar ao Perfil
          </CustomButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Todos os Pedidos
            </h1>
            <p className="text-gray-600">Histórico completo dos seus pedidos</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 animate-in slide-in-from-right duration-500 delay-200">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar pedidos ou produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 animate-in slide-in-from-bottom duration-700 delay-300">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Package className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredOrders.length} Pedidos Encontrados
                </h2>
                <p className="text-gray-600">
                  Clique em &quot;Ver Pedido&quot; para mais detalhes
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h3>
                <p className="text-gray-600">
                  {searchTerm
                    ? "Tente ajustar sua busca"
                    : "Você ainda não fez nenhum pedido"}
                </p>
              </div>
            ) : (
              filteredOrders.map((order, index) => (
                <div
                  key={order.id}
                  className="p-6 hover:bg-gray-50 transition-colors animate-in slide-in-from-left duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                          #{order.id.slice(-6)}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="h-4 w-4" />
                          {formatDate(order.date)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Produtos</p>
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <p
                                key={item.id}
                                className="text-sm font-medium text-gray-900"
                              >
                                {item.quantity}x {item.productName}
                              </p>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total</p>
                          <p className="text-xl font-bold text-gray-900">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="ml-6">
                      <CustomButton
                        variant="ghost"
                        onClick={() => handleViewOrder(order)}
                        icon={<Eye className="h-4 w-4" />}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        Ver Pedido
                      </CustomButton>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        order={selectedOrder}
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
}
