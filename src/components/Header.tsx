import React, { useState, useRef, useEffect } from "react";
import {
  ShoppingCart,
  User,
  LogOut,
  UserCircle,
  ChevronDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchClear: () => void;
  userName?: string;
  cartItemCount: number;
  onLogout: () => void;
  onCartClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  onSearchChange,
  onSearchClear,
  userName,
  cartItemCount,
  onLogout,
  onCartClick,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Wilson Market
            </h1>
            <p className="text-sm text-gray-600">Sua loja de tecnologia</p>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <SearchInput
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onClear={onSearchClear}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <CustomButton
                variant="outline"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                icon={<User className="h-5 w-5" />}
                className="flex items-center gap-1"
              >
                <span className="hidden sm:inline">Meu Perfil</span>
                <ChevronDown className="h-4 w-4" />
              </CustomButton>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {userName || "Usuário"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Aqui você pode adicionar navegação para perfil
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <UserCircle className="h-4 w-4" />
                    Ver Perfil
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>

            <CustomButton
              variant="outline"
              onClick={onCartClick}
              className="relative border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
              icon={<ShoppingCart className="h-5 w-5 text-blue-600" />}
            >
              <span className="hidden sm:inline text-blue-700">Carrinho</span>
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
            </CustomButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
