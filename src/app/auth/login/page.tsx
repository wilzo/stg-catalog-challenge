"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
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

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const { signIn } = useAuth();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const newErrors: FormErrors = {};

    if (!loginForm.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = "Email inválido";
    }

    if (!loginForm.password) {
      newErrors.password = "Senha é obrigatória";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await signIn(loginForm.email, loginForm.password);
        setMessage({
          type: "success",
          text: "Login realizado com sucesso! Redirecionando...",
        });
        setTimeout(() => {
          router.push("/catalog");
        }, 1500);
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Erro ao fazer login",
        });
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-10 relative">
      <div className="absolute top-6 right-6 "></div>

      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white">
        <CardHeader className="space-y-1 text-center pb-8 px-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Entrar
          </CardTitle>
          <CardDescription className="text-gray-600">
            Entre na sua conta para continuar
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
                htmlFor="login-email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  className={`pl-10 h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "focus:border-blue-500"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="login-password"
                className="text-sm font-medium text-gray-700"
              >
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
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

            <div className="flex items-center justify-end">
              <Link href="/auth/reset-password" tabIndex={-1}>
                <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline">
                  Esqueceu sua senha?
                </span>
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3 h-12"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link
                href="/auth/register"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
