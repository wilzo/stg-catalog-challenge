import { supabase } from "./supabase-helpers";

export interface UploadResult {
  url: string | null;
  error: string | null;
  fileName?: string;
}

export async function uploadImageToSupabase(
  file: File,
  productName: string
): Promise<UploadResult> {
  try {
    const fileExt = file.name.split(".").pop()?.toLowerCase();

    if (!["jpg", "jpeg", "png", "webp"].includes(fileExt || "")) {
      return {
        url: null,
        error: "Apenas arquivos JPG, PNG e WEBP são permitidos",
      };
    }

    if (file.size > 5 * 1024 * 1024) {
      return {
        url: null,
        error: "Arquivo muito grande. Máximo 5MB",
      };
    }

    // Sanitizar nome do arquivo removendo caracteres especiais
    const sanitizedName = productName
      .toLowerCase()
      .normalize("NFD") // Decompor caracteres acentuados
      .replace(/[\u0300-\u036f]/g, "") // Remover diacríticos
      .replace(/[^a-z0-9\s-]/g, "") // Manter apenas letras, números, espaços e hífens
      .replace(/\s+/g, "-") // Substituir espaços por hífens
      .replace(/-+/g, "-") // Remover hífens consecutivos
      .replace(/^-|-$/g, ""); // Remover hífens do início e fim

    const fileName = `${sanitizedName}-${Date.now()}.${fileExt}`;

    console.log("🔄 Fazendo upload da imagem:", fileName);

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("❌ Erro no upload:", uploadError);
      return {
        url: null,
        error: uploadError.message,
      };
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(fileName);

    console.log("✅ Upload concluído:", publicUrl);

    return {
      url: publicUrl,
      error: null,
      fileName,
    };
  } catch (error) {
    console.error("❌ Erro geral no upload:", error);
    return {
      url: null,
      error: "Erro interno no upload",
    };
  }
}

export async function deleteImageFromSupabase(
  fileName: string
): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from("product-images")
      .remove([fileName]);

    if (error) {
      console.error("❌ Erro ao deletar imagem:", error);
      return false;
    }

    console.log("✅ Imagem deletada:", fileName);
    return true;
  } catch (error) {
    console.error("❌ Erro geral ao deletar:", error);
    return false;
  }
}

export async function updateProductImage(
  productId: number,
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("🔄 Atualizando produto:", { productId, imageUrl });

    const { data, error } = await supabase
      .from("products")
      .update({ image_url: imageUrl })
      .eq("id", productId)
      .select();

    if (error) {
      console.error("❌ Erro ao atualizar produto:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Produto atualizado com nova imagem:", data);
    return { success: true };
  } catch (error) {
    console.error("❌ Erro geral:", error);
    return { success: false, error: "Erro interno" };
  }
}
