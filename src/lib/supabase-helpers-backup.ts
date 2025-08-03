import { createClient } from "@supabase/supabase-js";
import {
  Database,
  Product,
  CartDetails,
  Category,
  ProductFilters,
  CartSummary,
} from "@/types/database";

const supabaseUrlexport async function addToCart(
  userId: string,
  productId: number,
  quantity: number = 1
) {
  try {
    console.log('🛒 Iniciando addToCart:', { userId, productId, quantity });
    
    // Pular verificação de autenticação - deixar o RLS do Supabase cuidar da segurança
    // O problema está na verificação manual de auth.getUser()
    
    // Verificar se o produto existe
    console.log('🔍 Verificando produto...');_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function getProducts(filters?: ProductFilters) {
  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,category_name.ilike.%${filters.search}%`
      );
    }

    if (filters?.category && filters.category !== "all") {
      query = query.eq("category_name", filters.category);
    }

    if (filters?.minPrice) {
      query = query.gte("price", filters.minPrice);
    }

    if (filters?.maxPrice) {
      query = query.lte("price", filters.maxPrice);
    }

    if (filters?.inStock !== undefined) {
      query = query.eq("in_stock", filters.inStock);
    }

    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar produtos:", error);
      return { data: [], error: error.message };
    }

    const products: Product[] =
      data?.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description || undefined,
        price: product.price,
        image_url: product.image_url || "/placeholder.svg",
        category: product.category_name || "Outros",
        inStock: product.in_stock,
        stockQuantity: product.stock_quantity,
        rating: product.rating,
        ratingCount: product.rating_count,
        featured: product.featured,
      })) || [];

    return { data: products, error: null };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return { data: [], error: "Erro interno do servidor" };
  }
}

export async function getProductById(id: number) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Erro ao buscar produto:", error);
      return { data: null, error: error.message };
    }

    const product: Product = {
      id: data.id,
      name: data.name,
      description: data.description || undefined,
      price: data.price,
      image_url: data.image_url || "/placeholder.svg",
      category: data.category_name || "Outros",
      inStock: data.in_stock,
      stockQuantity: data.stock_quantity,
      rating: data.rating,
      ratingCount: data.rating_count,
      featured: data.featured,
    };

    return { data: product, error: null };
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return { data: null, error: "Erro interno do servidor" };
  }
}

export async function getFeaturedProducts() {
  return getProducts({ featured: true });
}

export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erro ao buscar categorias:", error);
      return { data: [], error: error.message };
    }

    const categories: Category[] =
      data?.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description || undefined,
      })) || [];

    return { data: categories, error: null };
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return { data: [], error: "Erro interno do servidor" };
  }
}

export async function getUniqueProductCategories() {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("category_name")
      .not("category_name", "is", null);

    if (error) {
      console.error("Erro ao buscar categorias dos produtos:", error);
      return { data: [], error: error.message };
    }

    const uniqueCategories = [
      ...new Set(data?.map((item) => item.category_name).filter(Boolean)),
    ] as string[];
    return { data: uniqueCategories, error: null };
  } catch (error) {
    console.error("Erro ao buscar categorias dos produtos:", error);
    return { data: [], error: "Erro interno do servidor" };
  }
}

export async function getCartItems(
  userId: string
): Promise<{ data: CartDetails[]; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from("cart_details")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar carrinho:", error);
      return { data: [], error: error.message };
    }

    const cartItems: CartDetails[] =
      data?.map((item) => ({
        id: item.id,
        userId: item.user_id,
        productId: item.product_id,
        quantity: item.quantity,
        productName: item.product_name,
        productPrice: item.product_price,
        imageUrl: item.image_url,
        categoryName: item.category_name,
        subtotal: item.subtotal,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })) || [];

    return { data: cartItems, error: null };
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    return { data: [], error: "Erro interno do servidor" };
  }
}

export async function addToCart(
  userId: string,
  productId: number,
  quantity: number = 1
) {
  try {
    console.log('🛒 Iniciando addToCart:', { userId, productId, quantity });
    
    // Verificar se o usuário está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('� Usuário autenticado:', user?.id, 'Target userId:', userId);
    
    if (authError || !user || user.id !== userId) {
      console.error('❌ Problema de autenticação:', { authError, user: user?.id, userId });
      return { data: null, error: "Usuário não autenticado corretamente" };
    }

    // Verificar se o produto existe
    console.log('🔍 Verificando produto...');
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name")
      .eq("id", productId)
      .maybeSingle();

    if (productError) {
      console.error("❌ Erro ao verificar produto:", productError);
      return { data: null, error: `Erro ao verificar produto: ${productError.message}` };
    }

    if (!product) {
      console.error("❌ Produto não encontrado:", productId);
      return { data: null, error: "Produto não encontrado" };
    }

    console.log('✅ Produto encontrado:', product);

    // Primeiro, tentar fazer um SELECT simples para testar acesso
    console.log('🔍 Testando acesso à tabela cart_items...');
    const { data: testAccess, error: accessError } = await supabase
      .from("cart_items")
      .select("id")
      .eq("user_id", userId)
      .limit(1);

    if (accessError) {
      console.error("❌ Erro de acesso à tabela cart_items:", accessError);
      if (accessError.code === 'PGRST116') {
        return { data: null, error: "Tabela cart_items não encontrada" };
      }
      if (accessError.code === '42501') {
        return { data: null, error: "Erro de permissão RLS na tabela cart_items" };
      }
      return { data: null, error: `Erro de acesso: ${accessError.message}` };
    }

    console.log('✅ Acesso à tabela OK, dados encontrados:', testAccess?.length || 0);

    // Verificar se o item já existe no carrinho
    console.log('🔍 Verificando item existente...');
    const { data: existingItem, error: selectError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (selectError) {
      console.error("❌ Erro ao verificar item existente:", selectError);
      return { data: null, error: `Erro ao verificar item: ${selectError.message}` };
    }

    console.log('🔍 Item existente:', existingItem ? 'Encontrado' : 'Não encontrado');

    if (existingItem) {
      console.log('📦 Atualizando quantidade existente...');
      const newQuantity = existingItem.quantity + quantity;
      const { data, error } = await supabase
        .from("cart_items")
        .update({ 
          quantity: newQuantity,
          updated_at: new Date().toISOString()
        })
        .eq("id", existingItem.id)
        .select()
        .single();

      if (error) {
        console.error("❌ Erro ao atualizar quantidade:", error);
        return { data: null, error: `Erro ao atualizar: ${error.message}` };
      }

      console.log('✅ Quantidade atualizada com sucesso:', data);
      return { data, error: null };
    } else {
      console.log('🆕 Inserindo novo item...');
      const { data, error } = await supabase
        .from("cart_items")
        .insert({
          user_id: userId,
          product_id: productId,
          quantity,
        })
        .select()
        .single();

      if (error) {
        console.error("❌ Erro ao inserir novo item:", error);
        console.error("❌ Detalhes do erro:", {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return { data: null, error: `Erro ao adicionar: ${error.message}` };
      }

      console.log('✅ Item adicionado com sucesso:', data);
      return { data, error: null };
    }
  } catch (error) {
    console.error("❌ Erro geral ao adicionar ao carrinho:", error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : "Erro interno do servidor" 
    };
  }
}

export async function updateCartQuantity(cartItemId: number, quantity: number) {
  try {
    if (quantity <= 0) {
      return removeFromCart(cartItemId);
    }

    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("id", cartItemId)
      .select()
      .single();

    if (error) {
      console.error("Erro ao atualizar quantidade:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Erro ao atualizar quantidade:", error);
    return { data: null, error: "Erro interno do servidor" };
  }
}

export async function removeFromCart(cartItemId: number) {
  try {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      console.error("Erro ao remover do carrinho:", error);
      return { data: null, error: error.message };
    }

    return { data: true, error: null };
  } catch (error) {
    console.error("Erro ao remover do carrinho:", error);
    return { data: null, error: "Erro interno do servidor" };
  }
}

export async function clearCart(userId: string) {
  try {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error("Erro ao limpar carrinho:", error);
      return { data: null, error: error.message };
    }

    return { data: true, error: null };
  } catch (error) {
    console.error("Erro ao limpar carrinho:", error);
    return { data: null, error: "Erro interno do servidor" };
  }
}

export async function getCartSummary(
  userId: string
): Promise<{ data: CartSummary | null; error: string | null }> {
  try {
    const { data: items, error } = await getCartItems(userId);

    if (error) {
      return { data: null, error };
    }

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0);

    const summary: CartSummary = {
      items,
      totalItems,
      totalAmount,
    };

    return { data: summary, error: null };
  } catch (error) {
    console.error("Erro ao buscar resumo do carrinho:", error);
    return { data: null, error: "Erro interno do servidor" };
  }
}

// =========================================
// FUNÇÕES PARA PEDIDOS
// =========================================

export async function createOrder(
  userId: string,
  customerName: string,
  customerPhone: string,
  customerAddress?: string
) {
  try {
    const { data: cartItems, error: cartError } = await getCartItems(userId);

    if (cartError || !cartItems.length) {
      return { data: null, error: cartError || "Carrinho vazio" };
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Erro ao criar pedido:", orderError);
      return { data: null, error: orderError.message };
    }

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      product_price: item.productPrice,
      quantity: item.quantity,
      subtotal: item.subtotal,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Erro ao criar itens do pedido:", itemsError);
      return { data: null, error: itemsError.message };
    }

    // Limpar carrinho
    await clearCart(userId);

    return { data: order, error: null };
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return { data: null, error: "Erro interno do servidor" };
  }
}

export async function getUserOrders(userId: string) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar pedidos:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return { data: [], error: "Erro interno do servidor" };
  }
}
