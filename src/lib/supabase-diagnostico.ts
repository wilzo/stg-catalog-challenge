import { createClient } from "@supabase/supabase-js";

// Função de diagnóstico do Supabase
export async function diagnosticarSupabase() {
  console.log("🔍 INICIANDO DIAGNÓSTICO DO SUPABASE...");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("📋 Configurações:");
  console.log("- URL:", supabaseUrl?.substring(0, 30) + "...");
  console.log("- Key:", supabaseAnonKey?.substring(0, 20) + "...");

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Variáveis de ambiente não configuradas!");
    return false;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    // Teste 1: Verificar usuário atual
    console.log("🔐 Teste 1: Verificando usuário...");
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("❌ Erro ao buscar usuário:", userError);
      return false;
    }

    if (!user) {
      console.error("❌ Usuário não autenticado!");
      return false;
    }

    console.log("✅ Usuário autenticado:", user.id);

    // Teste 2: Verificar se tabela existe
    console.log("🗄️ Teste 2: Verificando tabela cart_items...");
    const { error: tableError } = await supabase
      .from("cart_items")
      .select("count")
      .limit(1);

    if (tableError) {
      console.error("❌ Erro ao acessar tabela:", tableError);
      console.log("💡 Sugestão: Execute o SQL reset-completo-rls.sql");
      return false;
    }

    console.log("✅ Tabela cart_items acessível");

    // Teste 3: Teste de inserção
    console.log("➕ Teste 3: Tentando inserir item de teste...");
    const { data: insertData, error: insertError } = await supabase
      .from("cart_items")
      .insert({
        user_id: user.id,
        product_id: 999999, // ID de teste
        quantity: 1,
      })
      .select();

    if (insertError) {
      console.error("❌ Erro ao inserir:", insertError);
      console.log(
        "💡 Sugestão: Problema de RLS, execute o SQL reset-completo-rls.sql"
      );
      return false;
    }

    console.log("✅ Inserção de teste bem-sucedida:", insertData);

    // Teste 4: Limpeza do teste
    console.log("🧹 Teste 4: Limpando item de teste...");
    const { error: deleteError } = await supabase
      .from("cart_items")
      .delete()
      .eq("product_id", 999999)
      .eq("user_id", user.id);

    if (deleteError) {
      console.warn("⚠️ Erro ao limpar teste:", deleteError);
    } else {
      console.log("✅ Item de teste removido");
    }

    console.log("🎉 DIAGNÓSTICO COMPLETO - SUPABASE FUNCIONANDO!");
    return true;
  } catch (error) {
    console.error("❌ Erro geral no diagnóstico:", error);
    return false;
  }
}

// Função para testar no console do navegador
export function testarCarrinhoNoConsole() {
  console.log("🛒 Para testar o carrinho, execute:");
  console.log("diagnosticarSupabase()");
}
