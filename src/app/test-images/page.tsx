import ProductImage from "@/components/ProductImage";

export default function TestImages() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Teste de Imagens</h1>

      <div className="grid grid-cols-3 gap-4">
        {/* Teste com URL válida */}
        <div className="border p-4">
          <h3>Smartphone (URL válida)</h3>
          <ProductImage
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="Smartphone Pro Max"
            width={200}
            height={200}
          />
        </div>

        {/* Teste com URL válida 2 */}
        <div className="border p-4">
          <h3>Notebook (URL válida)</h3>
          <ProductImage
            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="Notebook Gamer"
            width={200}
            height={200}
          />
        </div>

        {/* Teste com URL válida 3 */}
        <div className="border p-4">
          <h3>Fone (URL válida)</h3>
          <ProductImage
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="Fone Bluetooth"
            width={200}
            height={200}
          />
        </div>

        {/* Teste com URL válida */}
        <div className="border p-4">
          <h3>Smartwatch (URL válida)</h3>
          <ProductImage
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
            alt="Smartwatch Fitness"
            width={200}
            height={200}
          />
        </div>

        {/* Teste com URL inválida */}
        <div className="border p-4">
          <h3>Tablet (URL inválida)</h3>
          <ProductImage
            src="https://images.unsplash.com/photo-INVALID-URL"
            alt="Tablet Pro"
            width={200}
            height={200}
          />
        </div>

        {/* Teste com fallback por erro */}
        <div className="border p-4">
          <h3>Câmera (fallback por erro)</h3>
          <ProductImage
            src="https://images.unsplash.com/photo-INVALID-URL"
            alt="Câmera Mirrorless 4K"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}
