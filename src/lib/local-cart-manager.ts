// Arquivo temporário para testar o carrinho sem banco de dados
// Use este código como fallback enquanto configura o Supabase

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productPrice: number;
  imageUrl: string;
  quantity: number;
  categoryName?: string;
}

interface ProductData {
  id: number;
  name: string;
  price: number;
  image_url?: string;
  category_name?: string;
}

class LocalCartManager {
  private static STORAGE_KEY = "temp_cart_items";

  static getCartItems(): CartItem[] {
    if (typeof window === "undefined") return [];

    try {
      const items = localStorage.getItem(this.STORAGE_KEY);
      return items ? JSON.parse(items) : [];
    } catch {
      return [];
    }
  }

  static addToCart(product: ProductData, quantity: number = 1): boolean {
    try {
      const cartItems = this.getCartItems();
      const existingIndex = cartItems.findIndex(
        (item) => item.productId === product.id
      );

      if (existingIndex >= 0) {
        cartItems[existingIndex].quantity += quantity;
      } else {
        const newItem: CartItem = {
          id: Date.now(), // ID temporário
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          imageUrl: product.image_url || "/placeholder.svg",
          quantity,
          categoryName: product.category_name || "Produto",
        };
        cartItems.push(newItem);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartItems));
      return true;
    } catch {
      return false;
    }
  }

  static updateQuantity(productId: number, quantity: number): boolean {
    try {
      const cartItems = this.getCartItems();
      const itemIndex = cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          cartItems.splice(itemIndex, 1);
        } else {
          cartItems[itemIndex].quantity = quantity;
        }
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cartItems));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  static removeFromCart(productId: number): boolean {
    try {
      const cartItems = this.getCartItems();
      const filteredItems = cartItems.filter(
        (item) => item.productId !== productId
      );
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredItems));
      return true;
    } catch {
      return false;
    }
  }

  static clearCart(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static getItemCount(): number {
    return this.getCartItems().reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
}

export default LocalCartManager;
