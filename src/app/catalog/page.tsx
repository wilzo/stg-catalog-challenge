"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  getProducts,
  getUniqueProductCategories,
} from "@/lib/supabase-helpers";
import { Product as ProductType } from "@/types/database";
import ProductImage from "@/components/ProductImageSimple";
import {
  ShoppingCart,
  Plus,
  Check,
  Loader2,
  Search,
  User,
  Filter,
  X,
  Eye,
  Heart,
  Star,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Carregar produtos e categorias do Supabase
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        // Carregar produtos
        const { data: productsData, error: productsError } = await getProducts({
          search: searchTerm,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
        });

        if (productsError) {
          console.error("Erro ao carregar produtos:", productsError);
        } else {
          // Converter para o formato local
          const convertedProducts: Product[] = productsData.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image:
              product.image ||
              "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", // Fallback genérico apenas se necessário
            category: product.category,
            inStock: product.inStock,
          }));
          setProducts(convertedProducts);
        }

        // Carregar categorias únicas
        const { data: categoriesData, error: categoriesError } =
          await getUniqueProductCategories();
        if (categoriesError) {
          console.error("Erro ao carregar categorias:", categoriesError);
        } else {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = async (product: Product) => {
    if (!product.inStock || !user) return;

    setAddingToCart(product.id);

    try {
      // Converter para ProductType do banco
      const productData: ProductType = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        inStock: product.inStock,
      };

      const success = await addItem(productData, 1);

      if (success) {
        setNotification({
          show: true,
          message: "Produto adicionado ao carrinho!",
          productName: product.name,
        });

        // Esconder notificação após 3 segundos
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const getUniqueCategories = () => {
    return ["all", ...categories];
  };

  const getFilteredProducts = () => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    return filtered;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                TechMarket
              </h1>
              <p className="text-sm text-gray-600">Sua loja de tecnologia</p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 bg-transparent"
              >
                <User className="h-5 w-5 mr-2 text-gray-600" />
                <span className="font-medium text-gray-700 hidden sm:inline">
                  {user?.full_name || "Minha Conta"}
                </span>
              </Button>

              <Button
                variant="outline"
                className="relative border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 bg-transparent"
              >
                <ShoppingCart className="h-5 w-5 mr-2 text-blue-600" />
                <span className="font-medium text-blue-700 hidden sm:inline">
                  Carrinho
                </span>
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </Button>

              {selectedCategory !== "all" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    Categoria:
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 border border-blue-200 font-medium"
                    onClick={() => setSelectedCategory("all")}
                  >
                    {selectedCategory}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                </div>
              )}
            </div>

            <span className="text-sm font-medium text-gray-700">
              {getFilteredProducts().length} produtos encontrados
            </span>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {getUniqueCategories().map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-green-500 text-white border-0 shadow-md hover:from-blue-600 hover:to-green-600"
                        : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    {category === "all" ? "Todos" : category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification */}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Produtos em Destaque
          </h2>
          <p className="text-gray-600">
            Descubra os melhores produtos com preços incríveis
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="h-48 bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getFilteredProducts().map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
              >
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Esgotado
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-700 text-xs"
                    >
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-8 h-8 p-0 bg-white/80 hover:bg-white/90 rounded-full shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`Favoritar produto: ${product.name}`);
                      }}
                    >
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-3 w-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        console.log(`Ver detalhes do produto: ${product.name}`)
                      }
                      variant="outline"
                      className="flex-1 font-medium border-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Ver Detalhes</span>
                      <span className="sm:hidden">Ver</span>
                    </Button>

                    <Button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock || addingToCart === product.id}
                      className={`flex-1 font-medium transition-all duration-200 ${
                        product.inStock
                          ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-md hover:shadow-lg"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {addingToCart === product.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          <span className="hidden sm:inline">
                            Adicionando...
                          </span>
                          <span className="sm:hidden">...</span>
                        </>
                      ) : product.inStock ? (
                        <>
                          <Plus className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Adicionar</span>
                          <span className="sm:hidden">+</span>
                        </>
                      ) : (
                        "Indisponível"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && getFilteredProducts().length === 0 && (
          <div className="text-center py-12">
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
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                TechMarket
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

            {/* Quick Links */}
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

            {/* Customer Service */}
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

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contato</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <Mail className="h-2 w-2 text-white" />
                  </div>
                  <span className="text-gray-300">contato@techmarket.com</span>
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

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 TechMarket. Todos os direitos reservados.
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
