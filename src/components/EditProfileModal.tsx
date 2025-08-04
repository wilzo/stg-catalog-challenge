"use client";

import { useState } from "react";
import { X, User, Mail, Phone, MapPin, Save } from "lucide-react";
import CustomButton from "./CustomButton";
import { UserProfile } from "@/lib/profiles";

interface EditProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: UserProfile) => void;
}

export default function EditProfileModal({
  profile,
  isOpen,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [errors, setErrors] = useState<Partial<UserProfile>>({});
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Partial<UserProfile> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (formData.phone && !/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Formato: (11) 99999-9999";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // Simular delay de salvamento
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in duration-300">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Editar Perfil</h2>
            <CustomButton
              variant="ghost"
              onClick={onClose}
              icon={<X className="h-5 w-5" />}
              className="text-gray-400 hover:text-gray-600"
            >
              Fechar
            </CustomButton>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Seu nome completo"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                value={formData.phone || ""}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="(11) 99999-9999"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Localização
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={formData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                placeholder="São Paulo, SP"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex justify-end gap-3">
            <CustomButton variant="ghost" onClick={onClose} disabled={isSaving}>
              Cancelar
            </CustomButton>
            <CustomButton
              onClick={handleSave}
              disabled={isSaving}
              icon={isSaving ? undefined : <Save className="h-4 w-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? "Salvando..." : "Salvar"}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
