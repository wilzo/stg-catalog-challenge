"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import {
  getCartSummary,
  addToCart as addToCartDb,
  updateCartQuantity as updateCartQuantityDb,
  removeFromCart as removeFromCartDb,
  clearCart as clearCartDb,
} from "@/lib/supabase-helpers";
import { CartSummary, Product } from "@/types/database";

interface CartContextType {
  cartSummary: CartSummary | null;
  loading: boolean;
  error: string | null;
  addItem: (product: Product, quantity?: number) => Promise<boolean>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<boolean>;
  removeItem: (cartItemId: number) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
  itemCount: number;
  total: number;
  items: CartSummary["items"]; // Para compatibilidade com código existente
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: cartError } = await getCartSummary(user.id);

      if (cartError) {
        setError(cartError);
        console.error("Erro ao carregar carrinho:", cartError);
      } else {
        setCartSummary(data);
      }
    } catch (err) {
      const errorMessage = "Erro ao carregar carrinho";
      setError(errorMessage);
      console.error(errorMessage, err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Carregar carrinho quando usuário logar
  useEffect(() => {
    if (user?.id) {
      refreshCart();
    } else {
      setCartSummary(null);
    }
  }, [user?.id, refreshCart]);

  const addItem = async (
    product: Product,
    quantity: number = 1
  ): Promise<boolean> => {
    if (!user?.id) {
      setError("Usuário não logado");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: addError } = await addToCartDb(
        user.id,
        product.id,
        quantity
      );

      if (addError) {
        setError(addError);
        console.error("Erro ao adicionar ao carrinho:", addError);
        return false;
      }

      await refreshCart();
      return true;
    } catch (err) {
      const errorMessage = "Erro ao adicionar produto ao carrinho";
      setError(errorMessage);
      console.error(errorMessage, err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (
    cartItemId: number,
    quantity: number
  ): Promise<boolean> => {
    if (!user?.id) {
      setError("Usuário não logado");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: updateError } = await updateCartQuantityDb(
        cartItemId,
        quantity
      );

      if (updateError) {
        setError(updateError);
        console.error("Erro ao atualizar quantidade:", updateError);
        return false;
      }

      await refreshCart();
      return true;
    } catch (err) {
      const errorMessage = "Erro ao atualizar quantidade";
      setError(errorMessage);
      console.error(errorMessage, err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId: number): Promise<boolean> => {
    if (!user?.id) {
      setError("Usuário não logado");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: removeError } = await removeFromCartDb(cartItemId);

      if (removeError) {
        setError(removeError);
        console.error("Erro ao remover item:", removeError);
        return false;
      }

      await refreshCart();
      return true;
    } catch (err) {
      const errorMessage = "Erro ao remover item do carrinho";
      setError(errorMessage);
      console.error(errorMessage, err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (): Promise<boolean> => {
    if (!user?.id) {
      setError("Usuário não logado");
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: clearError } = await clearCartDb(user.id);

      if (clearError) {
        setError(clearError);
        console.error("Erro ao limpar carrinho:", clearError);
        return false;
      }

      await refreshCart();
      return true;
    } catch (err) {
      const errorMessage = "Erro ao limpar carrinho";
      setError(errorMessage);
      console.error(errorMessage, err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Propriedades para compatibilidade
  const itemCount = cartSummary?.totalItems || 0;
  const total = cartSummary?.totalAmount || 0;
  const items = cartSummary?.items || [];

  const contextValue: CartContextType = {
    cartSummary,
    loading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
    itemCount,
    total,
    items,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
