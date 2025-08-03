"use client";

import { MessageCircle } from "lucide-react";
import CustomButton from "./CustomButton";

interface WhatsAppButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function WhatsAppButton({
  onClick,
  disabled = false,
  className = "",
  children,
  variant = "primary",
}: WhatsAppButtonProps) {
  const baseStyles = variant === "primary" 
    ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
    : "bg-green-500 hover:bg-green-600 text-white font-semibold";

  return (
    <CustomButton
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} transition-all duration-300 ${className}`}
      icon={<MessageCircle className="h-5 w-5" />}
    >
      {children}
    </CustomButton>
  );
}
