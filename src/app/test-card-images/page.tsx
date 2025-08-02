"use client";

import { Card, CardContent } from "@/components/ui/card";
import ProductImage from "@/components/ProductImageSimple";

export default function TestCardImages() {
  const testImages = [
    {
      url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      name: "Smartphone",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      name: "Notebook",
    },
    {
      url: "/placeholder.svg",
      name: "Placeholder",
    },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Teste de Imagens nos Cards</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <h2 className="col-span-full text-xl font-semibold mb-4">Com Cards:</h2>
        {testImages.map((img, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductImage
                src={img.url}
                alt={img.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{img.name}</h3>
              <p className="text-sm text-gray-500">URL: {img.url}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <h2 className="col-span-full text-xl font-semibold mb-4">
          Sem Cards (Divs normais):
        </h2>
        {testImages.map((img, index) => (
          <div
            key={index}
            className="rounded-xl shadow-sm border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductImage
                src={img.url}
                alt={img.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{img.name}</h3>
              <p className="text-sm text-gray-500">URL: {img.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
