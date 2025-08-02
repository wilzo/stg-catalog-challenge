// =========================================
// TIPOS PARA INTEGRAÇÃO COM SUPABASE
// =========================================

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category_id: number | null;
          category_name: string | null;
          in_stock: boolean;
          stock_quantity: number;
          rating: number;
          rating_count: number;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          category_id?: number | null;
          category_name?: string | null;
          in_stock?: boolean;
          stock_quantity?: number;
          rating?: number;
          rating_count?: number;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          category_id?: number | null;
          category_name?: string | null;
          in_stock?: boolean;
          stock_quantity?: number;
          rating?: number;
          rating_count?: number;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: number;
          user_id: string;
          product_id: number;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          product_id: number;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          product_id?: number;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: number;
          user_id: string;
          total_amount: number;
          status: string;
          customer_name: string;
          customer_phone: string;
          customer_address: string | null;
          whatsapp_sent: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          total_amount: number;
          status?: string;
          customer_name: string;
          customer_phone: string;
          customer_address?: string | null;
          whatsapp_sent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          user_id?: string;
          total_amount?: number;
          status?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_address?: string | null;
          whatsapp_sent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: number;
          order_id: number;
          product_id: number | null;
          product_name: string;
          product_price: number;
          quantity: number;
          subtotal: number;
          created_at: string;
        };
        Insert: {
          id?: number;
          order_id: number;
          product_id?: number | null;
          product_name: string;
          product_price: number;
          quantity: number;
          subtotal: number;
          created_at?: string;
        };
        Update: {
          id?: number;
          order_id?: number;
          product_id?: number | null;
          product_name?: string;
          product_price?: number;
          quantity?: number;
          subtotal?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      cart_details: {
        Row: {
          id: number;
          user_id: string;
          product_id: number;
          quantity: number;
          product_name: string;
          product_price: number;
          image_url: string | null;
          category_name: string | null;
          subtotal: number;
          created_at: string;
          updated_at: string;
        };
      };
      products_with_category: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          category_id: number | null;
          category_name: string | null;
          in_stock: boolean;
          stock_quantity: number;
          rating: number;
          rating_count: number;
          featured: boolean;
          created_at: string;
          updated_at: string;
          category_full_name: string | null;
          category_description: string | null;
        };
      };
    };
    Functions: {
      get_cart_total: {
        Args: {
          user_uuid: string;
        };
        Returns: number;
      };
    };
  };
}

// =========================================
// TIPOS PARA O FRONTEND
// =========================================

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  inStock: boolean;
  stockQuantity?: number;
  rating?: number;
  ratingCount?: number;
  featured?: boolean;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  product?: Product;
  subtotal?: number;
}

export interface CartDetails {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
  imageUrl: string | null;
  categoryName: string | null;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Order {
  id: number;
  userId: string;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  whatsappSent: boolean;
  items?: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId?: number;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

// =========================================
// TIPOS PARA FORMS E UI
// =========================================

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  featured?: boolean;
}

export interface CheckoutForm {
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
}

export interface AddToCartRequest {
  productId: number;
  quantity?: number;
}

export interface UpdateCartRequest {
  cartItemId: number;
  quantity: number;
}

// =========================================
// TIPOS PARA RESPOSTAS DA API
// =========================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CartSummary {
  items: CartDetails[];
  totalItems: number;
  totalAmount: number;
}
