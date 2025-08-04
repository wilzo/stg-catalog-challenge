"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Check, Search, Mail, Phone, MapPin } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import ProductDetailView from "@/components/ProductDetailView";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { LoadingSpinner, ProductSkeleton } from "@/components/LoadingSpinner";
import { getProducts } from "@/lib/supabase-helpers";
import { getUniqueProductCategories } from "@/lib/supabase-helpers";
import { Product as ProductType } from "@/types/database";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category: string;
  inStock: boolean;
}

export default function MarketplaceCatalog() {
  const { user, signOut } = useAuth();
  const { addItem, itemCount } = useCart();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    productName: string;
  }>({
    show: false,
    message: "",
    productName: "",
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const { data: productsData, error: productsError } = await getProducts({
          search: searchTerm || undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
        });

        if (productsError) {
          console.error("Erro ao carregar produtos:", productsError);
        } else {
          const convertedProducts: Product[] = productsData.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image_url:
              product.image_url ||
              "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: product.category_name || "Sem Categoria",
            inStock: true,
          }));
          setProducts(convertedProducts);
        }

        const { data: categoriesData, error: categoriesError } =
          await getUniqueProductCategories();

        if (categoriesError) {
          console.error("Erro ao carregar categorias:", categoriesError);
          setCategories(["Eletrônicos", "Acessórios", "Casa", "Esporte"]);
        } else {
          setCategories(categoriesData || []);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm && currentPage !== 1) {
      setCurrentPage(1);
      return;
    }

    loadData();
  }, [searchTerm, selectedCategory, currentPage]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleBackToProducts = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  const convertToProductType = (product: Product): ProductType => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image_url: product.image_url,
    category: product.category,
    inStock: true,
    description: undefined,
    stockQuantity: undefined,
    featured: undefined,
  });

  const handleAddToCartForDetailView = async (
    product: ProductType,
    quantity: number
  ): Promise<boolean> => {
    if (!user) return false;

    try {
      await addItem(product, quantity);
      return true;
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      return false;
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (!user) return;

    console.log("🛒 INÍCIO handleAddToCart:", {
      productId: product.id,
      productName: product.name,
      userId: user.id,
    });

    setAddingToCart(product.id);

    try {
      const productData: ProductType = {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        inStock: true,
      };

      const success = await addItem(productData, 1);

      if (success) {
        setNotification({
          show: true,
          message: "Produto adicionado ao carrinho!",
          productName: product.name,
        });

        setTimeout(() => {
          setNotification({ show: false, message: "", productName: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
  };

  const getFilteredProducts = () => {
    let filtered = products;

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filtered;
  };

  const getPaginatedProducts = () => {
    const filtered = getFilteredProducts();
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filtered.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const filtered = getFilteredProducts();
    return Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 animate-in fade-in duration-500">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchClear={() => setSearchTerm("")}
        userName={user?.full_name}
        cartItemCount={itemCount}
        onLogout={handleLogout}
        onCartClick={() => router.push("/cart")}
        onProfileClick={() => router.push("/profile")}
      />

      {!showProductDetail && (
        <div className="animate-in slide-in-from-top duration-500">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            showFilters={showFilters}
            onToggleFilters={() => setShowFilters(!showFilters)}
            resultsCount={getFilteredProducts().length}
          />
        </div>
      )}

      {notification.show && (
        <div className="fixed top-20 right-4 z-50 bg-white border border-green-200 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {notification.message}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {notification.productName}
              </p>
            </div>
          </div>
        </div>
      )}

      {showProductDetail && selectedProduct ? (
        <div className="animate-in fade-in duration-500">
          <ProductDetailView
            product={convertToProductType(selectedProduct)}
            onBack={handleBackToProducts}
            onAddToCart={handleAddToCartForDetailView}
          />
        </div>
      ) : (
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 animate-in slide-in-from-left duration-700">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Produtos em Destaque
            </h2>
            <p className="text-gray-600">
              Descubra os melhores produtos com preços incríveis
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <LoadingSpinner
                size="lg"
                message="Carregando catálogo..."
                className="py-8"
              />
              <ProductSkeleton count={12} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom duration-700 delay-200">
                {getPaginatedProducts().map((product, index) => (
                  <div
                    key={product.id}
                    className="animate-in scale-in duration-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard
                      product={product}
                      isAddingToCart={addingToCart === product.id}
                      onProductClick={handleProductClick}
                      onAddToCart={handleAddToCart}
                    />
                  </div>
                ))}
              </div>

              {getTotalPages() > 1 && (
                <div className="animate-in slide-in-from-bottom duration-500 delay-300">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={getTotalPages()}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}

          {!isLoading && getFilteredProducts().length === 0 && (
            <div className="text-center py-12 animate-in zoom-in duration-700">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar sua pesquisa ou filtros para encontrar o que
                procura.
              </p>
              <CustomButton
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setCurrentPage(1);
                }}
                variant="outline"
              >
                Limpar filtros
              </CustomButton>
            </div>
          )}
        </main>
      )}

      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Wilson Market
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Sua loja de tecnologia de confiança. Oferecemos os melhores
                produtos com qualidade garantida e preços competitivos.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                  <span className="text-xs font-bold">i</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Links Rápidos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Produtos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Ofertas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Atendimento</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Política de Troca
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Garantia
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contato</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Mail className="h-2 w-2 text-white" />
                  </div>
                  <span className="text-gray-300">
                    contato@wilsonmarket.com
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="h-2 w-2 text-white" />
                  </div>
                  <span className="text-gray-300">(11) 9999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="h-2 w-2 text-white" />
                  </div>
                  <span className="text-gray-300">São Paulo, SP</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Wilson Market. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Termos de Uso
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
