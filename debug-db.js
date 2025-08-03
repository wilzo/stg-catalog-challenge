const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://zqlwokuscrlagplwkzlm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHdva3VzY3JsYWdwbHdremxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNDY3ODgsImV4cCI6MjA2OTcyMjc4OH0.PoamQVeBBDwaPUaOI-Hx8shLS4ghPbmDD5BRqFQnFps"
);

async function testDatabase() {
  console.log("🔍 Testando consulta da tabela products...");

  // Primeiro, vamos ver se conseguimos consultar os produtos
  const { data: products, error: selectError } = await supabase
    .from("products")
    .select("id, name, image_url, price")
    .limit(3);

  if (selectError) {
    console.error("❌ Erro ao consultar produtos:", selectError);
    return;
  }

  console.log("✅ Produtos encontrados:", products);

  if (products && products.length > 0) {
    const firstProduct = products[0];
    console.log("\n🧪 Testando atualização do primeiro produto...");
    console.log("ID:", firstProduct.id);
    console.log("Nome:", firstProduct.name);
    console.log("URL atual:", firstProduct.image_url);

    // Vamos tentar atualizar a image_url
    const testUrl = `https://example.com/test-${Date.now()}.jpg`;
    const { data: updateData, error: updateError } = await supabase
      .from("products")
      .update({ image_url: testUrl })
      .eq("id", firstProduct.id)
      .select();

    if (updateError) {
      console.error("❌ Erro ao atualizar produto:", updateError);
    } else {
      console.log("✅ Produto atualizado com sucesso:", updateData);

      // Vamos consultar novamente para confirmar
      const { data: verification, error: verifyError } = await supabase
        .from("products")
        .select("id, name, image_url")
        .eq("id", firstProduct.id)
        .single();

      if (verifyError) {
        console.error("❌ Erro ao verificar atualização:", verifyError);
      } else {
        console.log("🔍 Verificação - URL atual:", verification.image_url);
        console.log(
          "✅ Atualização confirmada:",
          verification.image_url === testUrl
        );
      }
    }
  }
}

testDatabase().catch(console.error);
