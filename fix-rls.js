const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://zqlwokuscrlagplwkzlm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHdva3VzY3JsYWdwbHdremxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxNDY3ODgsImV4cCI6MjA2OTcyMjc4OH0.PoamQVeBBDwaPUaOI-Hx8shLS4ghPbmDD5BRqFQnFps"
);

async function fixRLS() {
  console.log("🔧 Corrigindo políticas RLS para a tabela products...");

  // Criar política para permitir atualizações
  const { data, error } = await supabase.rpc("exec_sql", {
    sql: `
      -- Primeiro, remover política existente se houver
      DROP POLICY IF EXISTS "Allow public update access to products" ON products;
      
      -- Criar nova política para permitir atualizações
      CREATE POLICY "Allow public update access to products"
      ON products
      FOR UPDATE
      TO public
      USING (true)
      WITH CHECK (true);
    `,
  });

  if (error) {
    console.error("❌ Erro ao executar SQL:", error);

    // Se exec_sql não funcionar, vamos tentar uma abordagem alternativa
    console.log("🔄 Tentando abordagem alternativa...");

    // Vamos usar a API administrativa se disponível
    const adminSupabase = createClient(
      "https://zqlwokuscrlagplwkzlm.supabase.co",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "fallback"
    );

    const { error: adminError } = await adminSupabase.rpc("exec_sql", {
      sql: `
        DROP POLICY IF EXISTS "Allow public update access to products" ON products;
        CREATE POLICY "Allow public update access to products"
        ON products FOR UPDATE TO public USING (true) WITH CHECK (true);
      `,
    });

    if (adminError) {
      console.error("❌ Erro com admin também:", adminError);
      console.log(
        "⚠️ Você precisa executar este SQL manualmente no Supabase Dashboard:"
      );
      console.log(`
DROP POLICY IF EXISTS "Allow public update access to products" ON products;
CREATE POLICY "Allow public update access to products"
ON products
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);
      `);
    } else {
      console.log("✅ RLS corrigido com sucesso usando admin!");
    }
  } else {
    console.log("✅ RLS corrigido com sucesso!");
  }
}

fixRLS().catch(console.error);
