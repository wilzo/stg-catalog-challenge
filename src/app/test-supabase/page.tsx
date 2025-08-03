"use client";

import { createClient } from "@/lib/supabase/client";

export default function TestSupabase() {
  const testConnection = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Erro de conexão:", error.message);
        alert("Erro de conexão: " + error.message);
        return;
      }

      console.log("Conexão bem-sucedida:", data);
      alert("Conexão com Supabase funcionando!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro: " + error);
    }
  };

  return (
    <div className="p-4">
      <h1>Teste Supabase</h1>
      <button
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Testar Conexão
      </button>
    </div>
  );
}
