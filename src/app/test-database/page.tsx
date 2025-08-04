"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase-helpers";

type Product = {
  id: number;
  name: string;
  image_url?: string | null;
};

export default function TestDatabase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, image_url")
          .limit(5);

        if (error) {
          console.error("Erro:", error);
        } else {
          console.log("Produtos:", data);
          setProducts(data || []);
        }
      } catch (err) {
        console.error("Erro na busca:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Teste do Banco de Dados</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-gray-600">ID: {product.id}</p>
            <p className="text-sm">
              Image URL: {product.image_url || "Sem URL"}
            </p>
            {product.image_url && (
              <div className="relative w-32 h-32 mt-2">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={() => {
                    console.log("Erro ao carregar imagem:", product.image_url);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
