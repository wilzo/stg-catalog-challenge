// Script para verificar o perfil do usuário atual
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zqlwokuscrlagplwkzlm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxbHdva3VzY3JsYWdwbHdremxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMzE2MDMsImV4cCI6MjA1MjYwNzYwM30.LqYYFKO3Bm4aTkMqQV0M9a1NyJHJf8z5yxGWFLjLI6E";

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCurrentUser() {
  try {
    // Tentar fazer login primeiro para obter um usuário autenticado
    console.log("🔍 Verificando usuário atual...");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("❌ Erro ao obter usuário:", userError.message);
      return;
    }

    if (!user) {
      console.log("⚠️ Nenhum usuário autenticado encontrado");
      console.log("💡 Vamos criar um usuário administrativo...");

      // Criar um usuário administrativo
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: "admin@ecommerce.local",
          password: "admin123456",
          options: {
            data: {
              role: "admin",
              name: "Administrador",
            },
          },
        });

      if (signUpError) {
        console.error("❌ Erro ao criar usuário admin:", signUpError.message);
        return;
      }

      console.log("✅ Usuário admin criado:", signUpData.user?.id);
      return signUpData.user?.id;
    }

    console.log("✅ Usuário encontrado:");
    console.log("   ID:", user.id);
    console.log("   Email:", user.email);
    console.log("   Metadata:", user.user_metadata);

    return user.id;
  } catch (error) {
    console.error("❌ Erro inesperado:", error.message);
  }
}

checkCurrentUser();
