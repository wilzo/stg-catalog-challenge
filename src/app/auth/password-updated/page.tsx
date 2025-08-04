"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function PasswordUpdatedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/login");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center p-10">
      <Card className="w-full max-w-lg shadow-2xl border-0 bg-white">
        <CardHeader className="space-y-1 text-center pb-8 px-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Senha Atualizada!
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            {message || "Sua senha foi atualizada com sucesso"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-8">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-900 mb-2">
                Tudo pronto!
              </h3>
              <p className="text-green-700 text-sm">
                Agora você pode fazer login com sua nova senha.
              </p>
            </div>

            <div className="text-sm text-gray-500 space-y-2">
              <p>🔒 Sua conta está segura com a nova senha</p>
              <p>📧 Lembre-se de manter seus dados seguros</p>
              <p className="font-medium">
                Você será redirecionado automaticamente em 10 segundos...
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/auth/login">
              <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 h-12">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Fazer Login Agora
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full h-12">
                <Home className="h-4 w-4 mr-2" />
                Ir para Início
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Precisa de ajuda?{" "}
              <Link
                href="/auth/reset-password"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Redefinir senha novamente
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PasswordUpdatedSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <PasswordUpdatedContent />
    </Suspense>
  );
}
