import { supabase } from "./supabase-helpers";

export async function toggleFavorite(userId: string, productId: number) {
  try {
    const { data: existingFavorite } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    if (existingFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("product_id", productId);

      if (error) {
        console.error("Erro ao remover favorito:", error);
        return { data: false, error: error.message };
      }

      return { data: false, error: null };
    } else {
      const { error } = await supabase.from("favorites").insert({
        user_id: userId,
        product_id: productId,
      });

      if (error) {
        console.error("Erro ao adicionar favorito:", error);
        return { data: true, error: error.message };
      }

      return { data: true, error: null };
    }
  } catch (error) {
    console.error("Erro ao alternar favorito:", error);
    return { data: false, error: "Erro interno do servidor" };
  }
}

export async function getUserFavorites(userId: string) {
  try {
    const { data, error } = await supabase
      .from("favorites")
      .select(
        `
        *,
        products (*)
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar favoritos:", error);
      return { data: [], error: error.message };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return { data: [], error: "Erro interno do servidor" };
  }
}

export async function isFavorited(userId: string, productId: number) {
  try {
    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    return { data: !!data, error: null };
  } catch {
    return { data: false, error: null };
  }
}

export async function rateProduct(
  userId: string,
  productId: number,
  rating: number
) {
  console.log("🎯 rateProduct chamada:", { userId, productId, rating });

  try {
    const { data: existingRating } = await supabase
      .from("ratings")
      .select("*")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    console.log("📊 Avaliação existente:", existingRating);

    if (existingRating) {
      const { error } = await supabase
        .from("ratings")
        .update({ rating })
        .eq("user_id", userId)
        .eq("product_id", productId);

      if (error) {
        console.error("❌ Erro ao atualizar avaliação:", error);
        return { data: null, error: error.message };
      }
      console.log("✅ Avaliação atualizada com sucesso");
    } else {
      const { error } = await supabase.from("ratings").insert({
        user_id: userId,
        product_id: productId,
        rating,
      });

      if (error) {
        console.error("❌ Erro ao criar avaliação:", error);
        return { data: null, error: error.message };
      }
      console.log("✅ Nova avaliação criada com sucesso");
    }

    console.log("🔄 Atualizando rating médio do produto...");
    await updateProductRating(productId);

    return { data: true, error: null };
  } catch (error) {
    console.error("❌ Erro geral ao avaliar produto:", error);
    return { data: null, error: "Erro interno do servidor" };
  }
}

export async function getUserRating(userId: string, productId: number) {
  console.log("🔍 getUserRating chamada:", { userId, productId });

  try {
    const { data } = await supabase
      .from("ratings")
      .select("rating")
      .eq("user_id", userId)
      .eq("product_id", productId)
      .single();

    console.log("📈 Rating do usuário encontrado:", data);
    return { data: data?.rating || 0, error: null };
  } catch {
    console.log("⚠️ Nenhum rating encontrado para o usuário");
    return { data: 0, error: null };
  }
}

async function updateProductRating(productId: number) {
  console.log("📊 updateProductRating chamada para produto:", productId);

  try {
    const { data: ratings } = await supabase
      .from("ratings")
      .select("rating")
      .eq("product_id", productId);

    console.log("📈 Ratings encontrados:", ratings);

    if (ratings && ratings.length > 0) {
      const average =
        ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
      const count = ratings.length;

      console.log("📊 Nova média calculada:", { average, count });

      const { error } = await supabase
        .from("products")
        .update({
          rating: Math.round(average * 10) / 10,
          rating_count: count,
        })
        .eq("id", productId);

      if (error) {
        console.error("❌ Erro ao atualizar produto:", error);
      } else {
        console.log("✅ Produto atualizado com nova média");
      }
    } else {
      console.log("⚠️ Nenhum rating encontrado para o produto");
    }
  } catch (error) {
    console.error("❌ Erro ao atualizar rating do produto:", error);
  }
}
