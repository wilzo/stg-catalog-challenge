"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import CartItem from "@/components/CartItem";
import CouponSection from "@/components/CouponSection";
import OrderSummary from "@/components/OrderSummary";

const mockCoupons = [
  { code: "DESCONTO10", discount: 10, type: "percentage" as const },
  { code: "FRETE15", discount: 15.99, type: "fixed" as const },
  { code: "TECH20", discount: 20, type: "percentage" as const },
  { code: "BEMVINDO", discount: 50, type: "fixed" as const },
];

export default function CartPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cartSummary, updateQuantity, removeItem, itemCount } = useCart();

  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());
  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const cartItems = cartSummary?.items || [];

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "success" });
    }, 3000);
  };

  const handleQuantityChange = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;

    setUpdatingItems((prev) => new Set(prev).add(cartItemId));

    try {
      await updateQuantity(cartItemId, newQuantity);
      showNotification("Quantidade atualizada!", "success");
    } catch {
      showNotification("Erro ao atualizar quantidade", "error");
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cartItemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (cartItemId: number) => {
    setRemovingItems((prev) => new Set(prev).add(cartItemId));

    try {
      const success = await removeItem(cartItemId);
      if (success) {
        showNotification("Item removido do carrinho", "success");
      } else {
        showNotification("Erro ao remover item", "error");
      }
    } catch (error) {
      console.error("Erro ao remover item:", error);
      showNotification("Erro ao remover item", "error");
    } finally {
      setRemovingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cartItemId);
        return newSet;
      });
    }
  };

  const handleApplyCoupon = (code: string) => {
    setIsApplyingCoupon(true);

    setTimeout(() => {
      const coupon = mockCoupons.find((c) => c.code === code);
      if (coupon) {
        setAppliedCoupon(coupon);
        setCouponCode("");
        showNotification(`Cupom ${code} aplicado com sucesso!`, "success");
      } else {
        showNotification("Cupom inválido ou expirado", "error");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showNotification("Cupom removido", "success");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total: number, item) => total + item.productPrice * item.quantity,
      0
    );
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

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 99 ? 0 : 15.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping() - calculateDiscount();
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

    const message = `🛒 *Pedido TechMarket*\n\n${items}\n\n*Resumo:*\nSubtotal: ${formatPrice(
      calculateSubtotal()
    )}\nFrete: ${
      calculateShipping() === 0 ? "GRÁTIS" : formatPrice(calculateShipping())
    }\n${
      appliedCoupon
        ? `Desconto (${appliedCoupon.code}): -${formatPrice(
            calculateDiscount()
          )}\n`
        : ""
    }*Total: ${formatPrice(
      calculateTotal()
    )}*\n\nGostaria de finalizar este pedido! 😊`;

    return encodeURIComponent(message);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Acesso Restrito
          </h2>
          <p className="text-gray-600 mb-4">
            Você precisa estar logado para acessar o carrinho
          </p>
          <CustomButton onClick={() => router.push("/auth/login")}>
            Fazer Login
          </CustomButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div
            className={`p-4 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-100 border border-green-200 text-green-800"
                : "bg-red-100 border border-red-200 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <CustomButton
            variant="ghost"
            onClick={() => router.push("/catalog")}
            icon={<ArrowLeft className="h-4 w-4" />}
            className="mb-4"
          >
            Continuar Comprando
          </CustomButton>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Carrinho de Compras
              </h1>
              <p className="text-gray-600 mt-1">
                {itemCount} {itemCount === 1 ? "item" : "itens"} no carrinho
              </p>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Adicione alguns produtos incríveis ao seu carrinho!
            </p>
            <CustomButton onClick={() => router.push("/catalog")}>
              Explorar Produtos
            </CustomButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    ...item,
                    categoryName:
                      item.categoryName === null
                        ? undefined
                        : item.categoryName,
                  }}
                  onUpdateQuantity={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                  isUpdating={updatingItems.has(item.id)}
                  isRemoving={removingItems.has(item.id)}
                />
              ))}
            </div>

            <div className="space-y-6">
              <CouponSection
                couponCode={couponCode}
                onCouponCodeChange={setCouponCode}
                appliedCoupon={appliedCoupon}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
                isApplyingCoupon={isApplyingCoupon}
                availableCoupons={mockCoupons}
              />

              <OrderSummary
                subtotal={calculateSubtotal()}
                shipping={calculateShipping()}
                discount={calculateDiscount()}
                total={calculateTotal()}
                appliedCoupon={appliedCoupon}
              />

              <CustomButton
                className="w-full py-3 text-lg"
                onClick={() => {
                  const message = generateWhatsAppMessage();
                  window.open(
                    `https://wa.me/5511999999999?text=${message}`,
                    "_blank"
                  );
                }}
                icon={<MessageCircle className="h-5 w-5" />}
              >
                Finalizar no WhatsApp
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
