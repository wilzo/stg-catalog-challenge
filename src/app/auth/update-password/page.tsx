"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

export default function UpdatePasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Verificar se existe sessão válida para reset de senha
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsValidSession(!!session);
    };

    checkSession();
  }, [supabase.auth]);

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const newErrors: FormErrors = {};

    if (!passwords.password) {
      newErrors.password = "Nova senha é obrigatória";
    } else if (!validatePassword(passwords.password)) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    if (!passwords.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
    } else if (passwords.password !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Senhas não coincidem";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const { error } = await supabase.auth.updateUser({
          password: passwords.password,
        });

        if (error) {
          throw error;
        }

        setMessage({
          type: "success",
          text: "Senha atualizada com sucesso! Redirecionando...",
        });

        setTimeout(() => {
          router.push(
            "/auth/password-updated?message=Senha atualizada com sucesso!"
          );
        }, 2000);
      } catch (error) {
        setMessage({
          type: "error",
          text:
            error instanceof Error ? error.message : "Erro ao atualizar senha",
        });
      }
    }

    setLoading(false);
  };

  if (isValidSession === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Verificando sessão...</span>
        </div>
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-10">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white">
          <CardHeader className="space-y-1 text-center pb-8 px-8">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Link Inválido
            </CardTitle>
            <CardDescription className="text-gray-600">
              Este link de redefinição de senha expirou ou é inválido
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                O link de redefinição de senha pode ter expirado ou já foi
                usado.
              </p>
              <p className="text-sm text-gray-500">
                Solicite um novo link de redefinição para continuar.
              </p>
            </div>

            <div className="space-y-3">
              <Link href="/auth/reset-password">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                  Solicitar Novo Link
                </Button>
              </Link>

              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-10 relative">
      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white">
        <CardHeader className="space-y-1 text-center pb-8 px-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Nova Senha
          </CardTitle>
          <CardDescription className="text-gray-600">
            Digite sua nova senha abaixo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-8">
          {message && (
            <div
              className={`p-4 rounded-lg flex items-center gap-3 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="new-password"
                className="text-sm font-medium text-gray-700"
              >
                Nova Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua nova senha"
                  value={passwords.password}
                  onChange={(e) =>
                    setPasswords({ ...passwords, password: e.target.value })
                  }
                  className={`pl-10 pr-10 h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-blue-500"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-sm font-medium text-gray-700"
              >
                Confirmar Nova Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirme sua nova senha"
                  value={passwords.confirmPassword}
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`pl-10 pr-10 h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-blue-500"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3 h-12"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Atualizando...
                </div>
              ) : (
                "Atualizar Senha"
              )}
            </Button>
          </form>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">
                  Requisitos da senha:
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Mínimo de 6 caracteres</li>
                  <li>• Use uma senha forte e única</li>
                  <li>• Evite informações pessoais</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
