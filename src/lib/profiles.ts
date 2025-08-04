import { supabase } from "./supabase-helpers";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  memberSince?: string;
  full_name?: string;
}

export interface UpdateProfileData {
  name: string;
  phone?: string;
  location?: string;
}

/**
 * Busca o perfil do usuário autenticado
 */
export async function getUserProfile(): Promise<{
  success: boolean;
  profile?: UserProfile;
  error?: string;
}> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { success: false, error: "Usuário não autenticado" };
    }

    // Como não temos tabela de profiles, usamos os dados do auth + metadata
    const profile: UserProfile = {
      id: session.user.id,
      name:
        session.user.user_metadata?.full_name ||
        session.user.user_metadata?.name ||
        "Usuário",
      email: session.user.email || "",
      phone: session.user.user_metadata?.phone || "",
      location: session.user.user_metadata?.location || "",
      memberSince: new Date(session.user.created_at).toLocaleDateString(
        "pt-BR"
      ),
      full_name:
        session.user.user_metadata?.full_name ||
        session.user.user_metadata?.name ||
        "Usuário",
    };

    return { success: true, profile };
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    return { success: false, error: "Erro inesperado" };
  }
}

/**
 * Atualiza o perfil do usuário autenticado
 */
export async function updateUserProfile(
  profileData: UpdateProfileData
): Promise<{ success: boolean; error?: string }> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { success: false, error: "Usuário não autenticado" };
    }

    // Atualizar os metadados do usuário no Supabase Auth
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: profileData.name,
        name: profileData.name,
        phone: profileData.phone || "",
        location: profileData.location || "",
      },
    });

    if (error) {
      console.error("Erro ao atualizar perfil:", error);
      return { success: false, error: "Erro ao atualizar perfil" };
    }

    return { success: true };
  } catch (error) {
    console.error("Erro inesperado ao atualizar perfil:", error);
    return { success: false, error: "Erro inesperado" };
  }
}

/**
 * Atualiza apenas o nome do usuário (para ser usado após login/registro)
 */
export async function updateUserName(
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return { success: false, error: "Usuário não autenticado" };
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: name,
        name: name,
      },
    });

    if (error) {
      console.error("Erro ao atualizar nome:", error);
      return { success: false, error: "Erro ao atualizar nome" };
    }

    return { success: true };
  } catch (error) {
    console.error("Erro inesperado ao atualizar nome:", error);
    return { success: false, error: "Erro inesperado" };
  }
}
