"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, Phone, MapPin, Plus, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CustomButton from "@/components/CustomButton";
import OrderHistory from "@/components/OrderHistory";
import OrderModal from "@/components/OrderModal";
import EditProfileModal from "@/components/EditProfileModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getUserProfile, updateUserProfile, UserProfile } from "@/lib/profiles";
import { getUserOrders, Order } from "@/lib/orders";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    memberSince: "",
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Carregar dados reais do perfil e pedidos
    const loadProfileData = async () => {
      setIsLoading(true);

      try {
        // Carregar perfil do usuário
        const profileResult = await getUserProfile();
        if (profileResult.success && profileResult.profile) {
          setProfile(profileResult.profile);
        } else {
          console.error("Erro ao carregar perfil:", profileResult.error);
        }

        // Carregar pedidos do usuário
        const ordersResult = await getUserOrders();
        if (ordersResult.success && ordersResult.orders) {
          setOrders(ordersResult.orders);
        } else {
          console.error("Erro ao carregar pedidos:", ordersResult.error);
          setOrders([]); // Definir como array vazio se não houver pedidos
        }
      } catch (error) {
        console.error("Erro inesperado ao carregar dados:", error);
      }

      setIsLoading(false);
    };

    loadProfileData();
  }, [user, router]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const handleViewAllOrders = () => {
    router.push("/profile/orders");
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async (updatedProfile: UserProfile) => {
    try {
      const result = await updateUserProfile({
        name: updatedProfile.name,
        phone: updatedProfile.phone,
        location: updatedProfile.location,
      });

      if (result.success) {
        // Recarregar o perfil atualizado
        const profileResult = await getUserProfile();
        if (profileResult.success && profileResult.profile) {
          setProfile(profileResult.profile);
        }
        console.log("✅ Perfil atualizado com sucesso!");
      } else {
        console.error("Erro ao atualizar perfil:", result.error);
        alert("Erro ao salvar perfil. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro inesperado ao salvar perfil:", error);
      alert("Erro inesperado. Tente novamente.");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Carregando perfil..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-in slide-in-from-left duration-500">
          <CustomButton
            variant="ghost"
            onClick={() => router.push("/catalog")}
            icon={<ArrowLeft className="h-4 w-4" />}
            className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            Voltar
          </CustomButton>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Perfil do Usuário
            </h1>
            <p className="text-gray-600">Gerencie suas informações e pedidos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 animate-in slide-in-from-left duration-700">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {getInitials(profile.name)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.name}
                </h2>
                <p className="text-gray-600">{profile.email}</p>
              </div>

              <CustomButton
                onClick={handleEditProfile}
                icon={<Edit className="h-4 w-4" />}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6"
              >
                Editar Perfil
              </CustomButton>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Informações Adicionais
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Telefone</p>
                      {profile.phone ? (
                        <p className="font-medium text-gray-900">
                          {profile.phone}
                        </p>
                      ) : (
                        <CustomButton
                          variant="ghost"
                          onClick={handleEditProfile}
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </CustomButton>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">Localização</p>
                      {profile.location ? (
                        <p className="font-medium text-gray-900">
                          {profile.location}
                        </p>
                      ) : (
                        <CustomButton
                          variant="ghost"
                          onClick={handleEditProfile}
                          className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Adicionar
                        </CustomButton>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Membro desde</p>
                      <p className="font-medium text-gray-900">
                        {profile.memberSince}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders History */}
          <div className="lg:col-span-2 animate-in slide-in-from-right duration-700 delay-200">
            <OrderHistory
              orders={orders}
              onViewOrder={handleViewOrder}
              onViewAll={handleViewAllOrders}
            />
          </div>
        </div>
      </div>

      <OrderModal
        order={selectedOrder}
        isOpen={showOrderModal}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
      />

      <EditProfileModal
        profile={profile}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
