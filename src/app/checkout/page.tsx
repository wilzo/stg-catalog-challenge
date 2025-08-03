"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  MessageCircle,
  Check,
  User,
  Mail,
  ShoppingBag,
  Truck,
  Shield,
  AlertCircle,
  Loader2,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  const { cartSummary } = useCart();

  const [customerData, setCustomerData] = useState<CustomerData>({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isConfirming, setIsConfirming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [appliedCoupon] = useState<AppliedCoupon | null>(null);

  const cartItems = cartSummary?.items || [];

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
    } else if (customerData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!customerData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    const items = cartItems
      .map(
        (item) =>
          `• ${item.productName} - Qtd: ${item.quantity} - ${formatPrice(
            item.productPrice * item.quantity
          )}`
      )
      .join("\n");

    const message = `🛒 *Pedido Wilson Market*

*Cliente:*
Nome: ${customerData.name}
Email: ${customerData.email}

*Produtos:*
${items}

*Resumo:*
Subtotal: ${formatPrice(calculateSubtotal())}
Frete: ${calculateShipping() === 0 ? "GRÁTIS" : formatPrice(calculateShipping())}${
      appliedCoupon
        ? `\nDesconto (${appliedCoupon.code}): -${formatPrice(calculateDiscount())}`
        : ""
    }
*Total: ${formatPrice(calculateTotal())}*

Gostaria de finalizar este pedido! 😊`;

    return encodeURIComponent(message);
  };

  const handleConfirmOrder = async () => {
    if (!validateForm()) return;

    setIsConfirming(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setShowSuccess(true);

    setTimeout(() => {
      const message = generateWhatsAppMessage();
      window.open(
        `https://wa.me/5565999999999?text=${message}`,
        "_blank"
      );
      router.push("/catalog");
    }, 1500);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (cartItems.length === 0) {
    router.push("/cart");
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center animate-in fade-in duration-500">
        <div className="text-center space-y-6 animate-in zoom-in duration-700">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Check className="h-12 w-12 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Pedido Confirmado!
            </h2>
            <p className="text-gray-600">Redirecionando para o WhatsApp...</p>
          </div>
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <CustomButton
            variant="ghost"
            onClick={() => router.push("/cart")}
            icon={<ArrowLeft className="h-4 w-4" />}
            className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-transparent"
          >
            Voltar ao Carrinho
          </CustomButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Confirmação do Pedido
            </h1>
            <p className="text-gray-600">Revise seus dados e finalize sua compra</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6 animate-in slide-in-from-left duration-700">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Dados do Cliente
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={customerData.name}
                      onChange={(e) =>
                        setCustomerData({ ...customerData, name: e.target.value })
                      }
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={customerData.email}
                      onChange={(e) =>
                        setCustomerData({ ...customerData, email: e.target.value })
                      }
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Resumo do Pedido
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    Subtotal ({getTotalItems()} itens)
                  </span>
                  <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    Frete
                  </span>
                  <span className="font-medium">
                    {calculateShipping() === 0 ? (
                      <span className="text-green-600 font-bold">GRÁTIS</span>
                    ) : (
                      formatPrice(calculateShipping())
                    )}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600 flex items-center gap-1">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                        {appliedCoupon.code}
                      </span>
                      Desconto
                    </span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(calculateDiscount())}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Compra 100% segura e protegida</span>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-in slide-in-from-right duration-700">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Seus Produtos</h2>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mb-1 inline-block">
                            {item.categoryName || "Produto"}
                          </span>
                          <h3 className="font-medium text-gray-900 text-sm leading-tight truncate">
                            {item.productName}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1">
                            {item.quantity}x {formatPrice(item.productPrice)}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-bold text-gray-900">
                            {formatPrice(item.productPrice * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <CustomButton
                  onClick={handleConfirmOrder}
                  disabled={
                    isConfirming ||
                    !customerData.name.trim() ||
                    !customerData.email.trim()
                  }
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                  icon={
                    isConfirming ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <MessageCircle className="h-5 w-5" />
                    )
                  }
                >
                  {isConfirming
                    ? "Processando Pedido..."
                    : "Confirmar e Enviar para WhatsApp"}
                </CustomButton>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Ao confirmar, você será redirecionado para o WhatsApp com o resumo
                  do seu pedido
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
