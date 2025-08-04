"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2,
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
}

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const { resetPassword } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email é obrigatório";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email inválido";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await resetPassword(email);
        setEmailSent(true);
        setMessage({
          type: "success",
          text: "Email de redefinição enviado com sucesso!",
        });
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Erro ao enviar email",
        });
      }
    }

    setLoading(false);
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      await resetPassword(email);
      setMessage({
        type: "success",
        text: "Email reenviado com sucesso!",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Erro ao reenviar email",
      });
    }
    setLoading(false);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-10 relative">
        <Card className="w-full max-w-lg shadow-2xl border-0 bg-white">
          <CardHeader className="space-y-1 text-center pb-8 px-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Email Enviado!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Verifique sua caixa de entrada
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-8">
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

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Enviamos um link de redefinição de senha para:
              </p>
              <p className="font-medium text-gray-900 bg-gray-50 py-2 px-4 rounded-lg">
                {email}
              </p>
              <p className="text-sm text-gray-500">
                Clique no link no email para redefinir sua senha. O link expira
                em 1 hora.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                disabled={loading}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Reenviando...
                  </div>
                ) : (
                  "Reenviar Email"
                )}
              </Button>

              <Link href="/auth/login">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Login
                </Button>
              </Link>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Não recebeu o email? Verifique sua pasta de spam ou tente
                reenviar.
              </p>
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
          <Link href="/auth/login">
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-4 p-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Redefinir Senha
          </CardTitle>
          <CardDescription className="text-gray-600">
            Digite seu email para receber o link de redefinição
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-8">
          {message && (
            <div
              className={`p-4 rounded-lg flex items-start gap-3 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-5 w-5 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="text-sm font-medium block">
                  {message.text}
                </span>
                {message.type === "error" &&
                  message.text.includes("Email não encontrado") && (
                    <div className="mt-3 pt-3 border-t border-red-200">
                      <p className="text-xs text-red-600 mb-2">
                        Parece que este email não está cadastrado. Que tal criar
                        uma conta?
                      </p>
                      <Link href="/auth/register">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-700 border-red-300 hover:bg-red-100"
                        >
                          Criar Conta Nova
                        </Button>
                      </Link>
                    </div>
                  )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="reset-email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium py-3 h-12"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </div>
              ) : (
                "Enviar Link de Redefinição"
              )}
            </Button>
          </form>

          <div className="space-y-4">
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Lembrou da sua senha?{" "}
                <Link
                  href="/auth/login"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Fazer login
                </Link>
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">
                    Validação de Segurança:
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Verificamos se o email está cadastrado no sistema</li>
                    <li>
                      • Apenas emails válidos recebem o link de redefinição
                    </li>
                    <li>
                      • Se não encontrarmos seu email, você será informado
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    Instruções:
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Digite o email da sua conta</li>
                    <li>• Verifique sua caixa de entrada e spam</li>
                    <li>• Clique no link para criar nova senha</li>
                    <li>• O link expira em 1 hora</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
