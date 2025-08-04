import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "destructive"
    | "secondary"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "default",
  size = "default",
  loading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}) => {
  // Definir classes baseadas na variante
  let variantClasses = "";

  switch (variant) {
    case "outline":
      variantClasses =
        "border-2 border-gray-400 text-gray-700 bg-white hover:bg-gray-100 hover:border-gray-500 transition-all duration-200";
      break;
    case "ghost":
      variantClasses =
        "text-gray-700 bg-transparent hover:bg-gray-200 transition-all duration-200";
      break;
    case "secondary":
      variantClasses =
        "bg-gray-200 text-gray-800 hover:bg-gray-300 transition-all duration-200";
      break;
    case "default":
      variantClasses =
        "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-200";
      break;
    default:
      variantClasses = "";
  }

  const combinedClassName =
    `font-medium transition-all duration-200 ${variantClasses} ${className}`.trim();

  return (
    <Button
      variant={variant}
      size={size}
      disabled={disabled || loading}
      className={combinedClassName}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          <span className="hidden sm:inline">Carregando...</span>
          <span className="sm:hidden">...</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </Button>
  );
};

export default CustomButton;
