import React from "react";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/CustomButton";

interface FilterPanelProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  resultsCount: number;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  showFilters,
  onToggleFilters,
  resultsCount,
}) => {
  const getUniqueCategories = () => {
    return ["all", ...categories];
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CustomButton
              variant="outline"
              onClick={onToggleFilters}
              icon={<Filter className="h-4 w-4" />}
            >
              Filtros
            </CustomButton>

            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  Categoria:
                </span>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 border border-blue-200 font-medium"
                  onClick={() => onCategoryChange("all")}
                >
                  {selectedCategory}
                  <X className="h-3 w-3 ml-1" />
                </Badge>
              </div>
            )}
          </div>

          <span className="text-sm font-medium text-gray-900">
            {resultsCount} produtos encontrados
          </span>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {getUniqueCategories().map((category) => (
                <CustomButton
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => onCategoryChange(category)}
                  className="text-xs"
                >
                  {category === "all" ? "Todos" : category}
                </CustomButton>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
