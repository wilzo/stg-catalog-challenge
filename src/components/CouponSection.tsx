import React, { useState } from "react";
import { Check, X, Tag } from "lucide-react";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";

interface Coupon {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
}

interface CouponSectionProps {
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  isApplyingCoupon?: boolean;
  availableCoupons?: Coupon[];
}

export const CouponSection: React.FC<CouponSectionProps> = ({
  couponCode,
  onCouponCodeChange,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  isApplyingCoupon = false,
  availableCoupons = [],
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const formatDiscount = (coupon: Coupon) => {
    return coupon.type === "percentage"
      ? `${coupon.discount}% OFF`
      : `R$ ${coupon.discount.toFixed(2)} OFF`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-gray-900">Cupom de Desconto</h3>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-900">
              Cupom {appliedCoupon.code} aplicado
            </span>
            <span className="text-sm text-green-700">
              ({formatDiscount(appliedCoupon)})
            </span>
          </div>
          <CustomButton
            variant="ghost"
            size="sm"
            onClick={onRemoveCoupon}
            className="text-green-700 hover:text-green-900 hover:bg-green-100"
            icon={<X className="h-4 w-4" />}
          >
            Remover
          </CustomButton>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <CustomInput
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value.toUpperCase())}
              placeholder="Digite seu cupom"
              className="flex-1"
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <CustomButton
              onClick={() => onApplyCoupon(couponCode)}
              disabled={!couponCode.trim() || isApplyingCoupon}
              loading={isApplyingCoupon}
              className="px-6"
            >
              Aplicar
            </CustomButton>
          </div>

          {showSuggestions && availableCoupons.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-2">
              <p className="text-sm font-medium text-gray-900">Cupons disponíveis:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableCoupons.map((coupon) => (
                  <button
                    key={coupon.code}
                    onClick={() => {
                      onCouponCodeChange(coupon.code);
                      setShowSuggestions(false);
                    }}
                    className="text-left p-2 rounded border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{coupon.code}</div>
                    <div className="text-sm text-gray-600">{formatDiscount(coupon)}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponSection;
