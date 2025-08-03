"use client";

import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import ImageUploadAuth from "@/components/ImageUploadAuth";
import { supabase } from "@/lib/supabase-helpers";

interface Product {
  id: number;
  name: string;
  image_url: string;
  price: number;
}

interface PendingImageUpdate {
  productId: number;
  newImageUrl: string;
  productName: string;
}

export default function UploadImagesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingUpdates, setPendingUpdates] = useState<PendingImageUpdate[]>(
    []
  );
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        console.log("✅ Usuário autenticado:", session.user.email);
        setIsAuthenticated(true);
      } else {
        console.log("⚠️ Usuário não autenticado");
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("❌ Erro ao verificar autenticação:", err);
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCheckingAuth(false);
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, image_url, price")
        .order("name");

      if (error) {
        setError(error.message);
        return;
      }

      setProducts(data || []);
    } catch (err) {
      setError("Erro ao carregar produtos");
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpdate = async (productId: number, newImageUrl: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // Atualizar apenas o preview no estado local
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, image_url: newImageUrl }
          : product
      )
    );

    // Adicionar ou atualizar nas alterações pendentes
    setPendingUpdates((prev) => {
      const existingIndex = prev.findIndex(
        (update) => update.productId === productId
      );
      const newUpdate: PendingImageUpdate = {
        productId,
        newImageUrl,
        productName: product.name,
      };

      if (existingIndex >= 0) {
        // Atualizar existente
        const updated = [...prev];
        updated[existingIndex] = newUpdate;
        return updated;
      } else {
        // Adicionar novo
        return [...prev, newUpdate];
      }
    });

    console.log("📝 Imagem adicionada às alterações pendentes:", {
      productId,
      newImageUrl,
    });
  };

  const handleSaveAllChanges = async () => {
    if (pendingUpdates.length === 0) {
      alert("Nenhuma alteração pendente para salvar.");
      return;
    }

    setSaving(true);
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    try {
      console.log("💾 Salvando alterações:", pendingUpdates);

      // Processar cada atualização
      for (const update of pendingUpdates) {
        try {
          // Usar o cliente autenticado para a atualização
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session) {
            throw new Error("Sessão expirada. Faça login novamente.");
          }

          const { error } = await supabase
            .from("products")
            .update({ image_url: update.newImageUrl })
            .eq("id", update.productId);

          if (error) {
            console.error(`❌ Erro ao salvar ${update.productName}:`, error);
            errors.push(`${update.productName}: ${error.message}`);
            errorCount++;
          } else {
            console.log(`✅ ${update.productName} salvo com sucesso`);
            successCount++;
          }
        } catch (err) {
          console.error(
            `❌ Erro inesperado ao salvar ${update.productName}:`,
            err
          );
          const errorMessage =
            err instanceof Error ? err.message : "Erro inesperado";
          errors.push(`${update.productName}: ${errorMessage}`);
          errorCount++;
        }
      }

      // Limpar alterações pendentes se todas foram salvas com sucesso
      if (errorCount === 0) {
        setPendingUpdates([]);
        alert(
          `✅ Todas as ${successCount} alterações foram salvas com sucesso!`
        );
      } else {
        alert(
          `Resultado: ${successCount} salvos, ${errorCount} erros.\n\nErros:\n${errors.join(
            "\n"
          )}`
        );
      }

      // Recarregar produtos para confirmar as alterações
      await loadProducts();
    } catch (err) {
      console.error("❌ Erro geral ao salvar:", err);
      alert("Erro inesperado ao salvar as alterações.");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    if (pendingUpdates.length === 0) return;

    if (
      confirm(`Descartar ${pendingUpdates.length} alteração(ões) pendente(s)?`)
    ) {
      setPendingUpdates([]);
      loadProducts(); // Recarregar estado original
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-blue-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <ImageUploadAuth onAuthSuccess={handleAuthSuccess} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 text-blue-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 bg-red-50 p-4 rounded-lg">❌ {error}</p>
          <button
            onClick={loadProducts}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gerenciar Imagens dos Produtos
              </h1>
              <p className="text-gray-600">
                Faça upload das imagens dos produtos. As alterações são salvas
                quando você clica em &quot;Salvar Alterações&quot;.
              </p>
            </div>
            <button
              onClick={loadProducts}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              {loading ? "Carregando..." : "Recarregar"}
            </button>
          </div>
        </div>

        {/* Status e Controles de Salvamento */}
        {pendingUpdates.length > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-blue-900">
                  {pendingUpdates.length} alteração(ões) pendente(s)
                </h3>
                <p className="text-sm text-blue-700">
                  Produtos com novas imagens:{" "}
                  {pendingUpdates.map((u) => u.productName).join(", ")}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDiscardChanges}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  Descartar
                </button>
                <button
                  onClick={handleSaveAllChanges}
                  disabled={saving}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const hasPendingUpdate = pendingUpdates.some(
              (u) => u.productId === product.id
            );
            return (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-md p-6 ${
                  hasPendingUpdate ? "ring-2 ring-blue-300 bg-blue-50" : ""
                }`}
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 flex items-center gap-2">
                    {product.name}
                    {hasPendingUpdate && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Pendente
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-500">
                    R$ {product.price.toFixed(2)}
                  </p>
                </div>

                <ImageUpload
                  productId={product.id}
                  productName={product.name}
                  currentImageUrl={product.image_url}
                  onUploadComplete={(newImageUrl) =>
                    handleImageUpdate(product.id, newImageUrl)
                  }
                  className="w-full"
                />

                {product.image_url && (
                  <div className="mt-3 text-xs text-gray-500 break-all">
                    <strong>URL atual:</strong> {product.image_url}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
            <p className="text-gray-400">
              Adicione produtos primeiro para fazer upload das imagens
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
