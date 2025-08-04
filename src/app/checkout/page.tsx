"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MessageCircle,
  Check,
  User,
  ShoppingBag,
  Truck,
  Shield,
  Loader2,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { createOrder } from "@/lib/orders";
import { clearCart as clearCartDb } from "@/lib/supabase-helpers";

interface CustomerData {
  name: string;
  email: string;
}

interface AppliedCoupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartSummary, clearCart } = useCart();

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [appliedCoupon] = useState<AppliedCoupon | null>(null);

  const cartItems = cartSummary?.items || [];

  // Preencher automaticamente os dados do usuário logado
  useEffect(() => {
    if (user) {
      setCustomerData({
        name: user.full_name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 99 ? 0 : 15.99;
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    const subtotal = calculateSubtotal();
    if (appliedCoupon.type === "percentage") {
      return (subtotal * appliedCoupon.discount) / 100;
    } else {
      return Math.min(appliedCoupon.discount, subtotal);
    }
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() - calculateDiscount();
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string } = {};

    if (!customerData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!customerData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    let message = `🛒 *Novo Pedido*\n\n`;
    message += `👤 *Cliente:* ${customerData.name}\n`;
    message += `📧 *Email:* ${customerData.email}\n\n`;
    message += `📦 *Itens:*\n`;

    cartItems.forEach((item) => {
      message += `• ${item.productName} (Qtd: ${item.quantity}) - ${formatPrice(
        item.productPrice * item.quantity
      )}\n`;
    });

    message += `\n💰 *Resumo:*\n`;
    message += `Subtotal: ${formatPrice(calculateSubtotal())}\n`;
    if (calculateDiscount() > 0) {
      message += `Desconto: -${formatPrice(calculateDiscount())}\n`;
    }
    message += `Frete: ${formatPrice(calculateShipping())}\n`;
    message += `*Total: ${formatPrice(calculateTotal())}*`;

    return encodeURIComponent(message);
  };

  const handleConfirmOrder = async () => {
    if (!validateForm()) return;

    setIsConfirming(true);

    try {
      console.log("🛒 Dados do pedido:", {
        customer: customerData,
        items: cartItems,
        totals: {
          subtotal: calculateSubtotal(),
          shipping: calculateShipping(),
          discount: calculateDiscount(),
          total: calculateTotal(),
        },
      });

      const orderData = {
        customerName: customerData.name,
        customerEmail: customerData.email,
        items: cartItems.map((item) => {
          const mappedItem = {
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            productPrice: item.productPrice,
          };
          console.log("📦 Item mapeado:", mappedItem);
          return mappedItem;
        }),
        totalAmount: calculateTotal(),
      };

      console.log("🛒 Dados completos do pedido:", orderData);
      console.log("🛒 Itens do carrinho:", cartItems);

      const result = await createOrder(orderData);

      if (!result.success) {
        console.error("Erro ao salvar pedido:", result.error);
        alert("Erro ao salvar pedido. Tente novamente.");
        setIsConfirming(false);
        return;
      }

      console.log("✅ Pedido salvo com sucesso! ID:", result.orderId);

      // 🔥 LIMPEZA SIMPLES E DIRETA - Nova estratégia
      if (user?.id) {
        console.log("🎯 LIMPANDO CARRINHO - User ID:", user.id);

        // Executar limpeza sem await para não bloquear
        clearCart()
          .then((result) => {
            console.log("📊 Resultado clearCart:", result);
          })
          .catch((error) => {
            console.error("❌ Erro clearCart:", error);
          });

        // E também tentar direto no Supabase
        clearCartDb(user.id)
          .then((result) => {
            console.log("📊 Resultado clearCartDb:", result);
          })
          .catch((error) => {
            console.error("❌ Erro clearCartDb:", error);
          });
      }

      // Delay mínimo para UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      setShowSuccess(true);

      setTimeout(() => {
        const message = generateWhatsAppMessage();
        window.open(`https://wa.me/5565999999999?text=${message}`, "_blank");
        router.push("/catalog");
      }, 1500);
    } catch (error) {
      console.error("Erro ao confirmar pedido:", error);
      alert("Erro ao confirmar pedido. Tente novamente.");
    } finally {
      setIsConfirming(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Carrinho Vazio
          </h2>
          <p className="text-gray-600 mb-4">
            Adicione alguns produtos antes de finalizar o pedido
          </p>
          <CustomButton onClick={() => router.push("/catalog")}>
            Ir às Compras
          </CustomButton>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Pedido Confirmado!
            </h2>
            <p className="text-gray-600 mb-6">
              Seu pedido foi enviado com sucesso. Você será redirecionado para o
              WhatsApp em instantes.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Redirecionando...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <CustomButton
            variant="ghost"
            onClick={() => router.push("/cart")}
            icon={<ArrowLeft className="h-4 w-4" />}
            className="mb-4 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            Voltar ao Carrinho
          </CustomButton>

          <h1 className="text-3xl font-bold text-gray-900">Finalizar Pedido</h1>
          <p className="text-gray-600 mt-1">
            Confirme seus dados e finalize via WhatsApp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Customer Information Form */}
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Seus Dados
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) =>
                    setCustomerData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-900 placeholder:text-gray-500 ${
                    errors.name
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder={
                    user?.full_name
                      ? "Nome preenchido automaticamente"
                      : "Digite seu nome completo"
                  }
                  style={{ color: "#111827" }}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) =>
                    setCustomerData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className={`w-full px-4 py-3 border-2 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-900 placeholder:text-gray-500 ${
                    errors.email
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  placeholder={
                    user?.email
                      ? "Email preenchido automaticamente"
                      : "Digite seu email"
                  }
                  style={{ color: "#111827" }}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900">
                    Finalização via WhatsApp
                  </h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Após confirmar, você será redirecionado para o WhatsApp com
                    todos os detalhes do seu pedido pré-preenchidos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden">
                    <Image
                      src={item.imageUrl || "/placeholder-product.png"}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {item.productName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Qtd: {item.quantity} × {formatPrice(item.productPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(item.productPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              {calculateDiscount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span>-{formatPrice(calculateDiscount())}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  Frete
                </span>
                <span>
                  {calculateShipping() === 0
                    ? "Grátis"
                    : formatPrice(calculateShipping())}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                Compra 100% segura e protegida
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                Atendimento personalizado via WhatsApp
              </div>
            </div>

            <CustomButton
              onClick={handleConfirmOrder}
              disabled={isConfirming}
              className="w-full mt-6 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold"
            >
              {isConfirming ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Confirmando...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Confirmar Pedido
                </div>
              )}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
