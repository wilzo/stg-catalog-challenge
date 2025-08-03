import { createClient } from "@supabase/supabase-js";
import {
  Database,
  Product,
  CartDetails,
  Category,
  ProductFilters,
  CartSummary,
} from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function getProducts(filters?: ProductFilters) {
  try {
    let query = supabase
      .from("products")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte("price", filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte("price", filters.maxPrice);
    }

    if (filters?.featured !== undefined) {
      query = query.eq("featured", filters.featured);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Erro ao buscar produtos:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getProduct(id: number) {
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

    return { data, error: null };
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
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

    return { data: data || [], error: null };
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getCartSummary(userId: string): Promise<{
  data: CartSummary | null;
  error: string | null;
}> {
  try {
    const { data, error } = await supabase.rpc("get_cart_summary", {
      p_user_id: userId,
    });

    if (error) {
      console.error("Erro ao buscar resumo do carrinho:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Erro ao buscar resumo do carrinho:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getFavorites(userId: string) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select(
        `
        id,
        product_id,
        products (
          id,
          name,
          price,
          image_url,
          category,
          description
        )
      `
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Erro ao buscar favoritos:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function addToFavorites(userId: string, productId: number) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: userId,
        product_id: productId,
      })
      .select()
      .single();

    if (error) {
      console.error("Erro ao adicionar aos favoritos:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Erro ao adicionar aos favoritos:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function removeFromFavorites(userId: string, productId: number) {
  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) {
      console.error("Erro ao remover dos favoritos:", error);
      return { data: null, error: error.message };
    }

    return { data: true, error: null };
  } catch (error) {
    console.error("Erro ao remover dos favoritos:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function addToCart(
  userId: string,
  productId: number,
  quantity: number = 1
) {
  try {
    console.log("🛒 Iniciando addToCart:", { userId, productId, quantity });

    // Verificar se o produto existe
    console.log("🔍 Verificando produto...");
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("id, name")
      .eq("id", productId)
      .maybeSingle();

    if (productError) {
      console.error("❌ Erro ao verificar produto:", productError);
      return {
        data: null,
        error: `Erro ao verificar produto: ${productError.message}`,
      };
    }

    if (!product) {
      console.error("❌ Produto não encontrado:", productId);
      return { data: null, error: "Produto não encontrado" };
    }

    console.log("✅ Produto encontrado:", product);

    // Verificar se o item já existe no carrinho
    console.log("🔍 Verificando item existente...");
    const { data: existingItem, error: selectError } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (selectError) {
      console.error("❌ Erro ao verificar item existente:", selectError);
      console.error("❌ Detalhes:", {
        code: selectError.code,
        message: selectError.message,
      });

      if (selectError.message?.includes("Auth session missing")) {
        return {
          data: null,
          error: "Sessão de autenticação perdida. Faça login novamente.",
        };
      }
      return {
        data: null,
        error: `Erro ao verificar item: ${selectError.message}`,
      };
    }

    console.log(
      "🔍 Item existente:",
      existingItem ? "Encontrado" : "Não encontrado"
    );

    if (existingItem) {
      console.log("📦 Atualizando quantidade existente...");
      const newQuantity = existingItem.quantity + quantity;
      const { data, error } = await supabase
        .from("cart_items")
        .update({
          quantity: newQuantity,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingItem.id)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        console.error("❌ Erro ao atualizar quantidade:", error);
        if (error.message?.includes("Auth session missing")) {
          return {
            data: null,
            error: "Sessão de autenticação perdida. Faça login novamente.",
          };
        }
        return { data: null, error: `Erro ao atualizar: ${error.message}` };
      }

      console.log("✅ Quantidade atualizada com sucesso:", data);
      return { data, error: null };
    } else {
      console.log("🆕 Inserindo novo item...");
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
          hint: error.hint,
        });

        if (error.message?.includes("Auth session missing")) {
          return {
            data: null,
            error: "Sessão de autenticação perdida. Faça login novamente.",
          };
        }
        return { data: null, error: `Erro ao adicionar: ${error.message}` };
      }

      console.log("✅ Item adicionado com sucesso:", data);
      return { data, error: null };
    }
  } catch (error) {
    console.error("❌ Erro geral ao adicionar ao carrinho:", error);
    return {
      data: null,
      error:
        error instanceof Error ? error.message : "Erro interno do servidor",
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
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function removeFromCart(cartItemId: number) {
  try {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId);

    if (error) {
      console.error("Erro ao remover item do carrinho:", error);
      return { data: null, error: error.message };
    }

    return { data: true, error: null };
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
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
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getRating(userId: string, productId: number) {
  try {
    const { data, error } = await supabase
      .from("ratings")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .maybeSingle();

    if (error) {
      console.error("Erro ao buscar rating:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Erro ao buscar rating:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function addOrUpdateRating(
  userId: string,
  productId: number,
  rating: number,
  comment?: string
) {
  try {
    const { data, error } = await supabase
      .from("ratings")
      .upsert({
        user_id: userId,
        product_id: productId,
        rating,
        comment,
      })
      .select()
      .single();

    if (error) {
      console.error("Erro ao salvar rating:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Erro ao salvar rating:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getProductRatings(productId: number) {
  try {
    const { data, error } = await supabase
      .from("ratings")
      .select(
        `
        *,
        profiles (
          name,
          avatar_url
        )
      `
      )
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar ratings do produto:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error("Erro ao buscar ratings do produto:", error);
    return {
      data: [],
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getProductStats(productId: number) {
  try {
    const { data, error } = await supabase.rpc("get_product_stats", {
      p_product_id: productId,
    });

    if (error) {
      console.error("Erro ao buscar estatísticas do produto:", error);
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    console.error("Erro ao buscar estatísticas do produto:", error);
    return {
      data: null,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
