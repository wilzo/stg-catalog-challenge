import React from "react";
import { Search, X } from "lucide-react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  error?: string;
  containerClassName?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  clearable = false,
  onClear,
  error,
  containerClassName = "",
  className = "",
  value,
  ...props
}) => {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <input
          value={value}
          className={`
            w-full 
            ${icon ? "pl-10" : "pl-4"} 
            ${clearable && value ? "pr-10" : "pr-4"} 
            py-2 
            border border-gray-300
            rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent 
            outline-none 
            transition-all 
            text-gray-900
            placeholder-gray-500
            bg-white
            ${error ? "border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {clearable && value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
    </div>
  );
};

// Componente específico para busca
export const SearchInput: React.FC<Omit<CustomInputProps, "icon">> = ({
  onChange,
  ...props
}) => {
  return (
    <CustomInput
      icon={<Search className="h-4 w-4" />}
      placeholder="Buscar produtos..."
      clearable
      onChange={onChange}
      {...props}
    />
  );
};

export default CustomInput;
