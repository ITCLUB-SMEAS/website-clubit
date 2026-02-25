"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Star,
  X,
  Heart,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const products = [
  {
    id: 1,
    name: "IT Club Hoodie",
    price: 250000,
    originalPrice: 300000,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800",
      "https://images.unsplash.com/photo-1551488852-0801751ac367?w=800",
    ],
    category: "Apparel",
    badge: "bestSeller",
    rating: 4.9,
    sold: 120,
    description: "Premium quality hoodie with embroidered IT Club logo. Perfect for coding sessions and tech events.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Grey"],
  },
  {
    id: 2,
    name: "Tech T-Shirt",
    price: 150000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800",
    ],
    category: "Apparel",
    badge: "new",
    rating: 4.8,
    sold: 85,
    description: "Comfortable cotton t-shirt with minimalist tech-inspired design.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Blue"],
  },
  {
    id: 3,
    name: "Coding Mug",
    price: 75000,
    originalPrice: 100000,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
    ],
    category: "Accessories",
    badge: null,
    rating: 4.7,
    sold: 200,
    description: "Ceramic mug for your coding fuel. Features 'Code & Coffee' print.",
    sizes: ["350ml", "500ml"],
    colors: ["White", "Black"],
  },
  {
    id: 4,
    name: "Laptop Sticker Pack",
    price: 50000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    ],
    category: "Accessories",
    badge: "popular",
    rating: 4.9,
    sold: 350,
    description: "20 premium vinyl stickers for your laptop. Tech brands, logos, and fun designs.",
    sizes: ["Pack"],
    colors: ["Mixed"],
  },
  {
    id: 5,
    name: "Tech Backpack",
    price: 350000,
    originalPrice: 450000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800",
    ],
    category: "Bags",
    badge: "limited",
    rating: 4.8,
    sold: 45,
    description: "Water-resistant backpack with laptop compartment. Perfect for tech enthusiasts on the go.",
    sizes: ["Standard"],
    colors: ["Black", "Grey"],
  },
  {
    id: 6,
    name: "Notebook Set",
    price: 65000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800",
    ],
    category: "Stationery",
    badge: null,
    rating: 4.6,
    sold: 150,
    description: "Set of 3 dotted notebooks for sketching wireframes and taking notes.",
    sizes: ["A5", "A4"],
    colors: ["Mixed"],
  },
];

// 3D Tilt Card Component
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Product Modal Component
function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  t,
}: {
  product: typeof products[0] | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: typeof products[0], size: string, color: string, qty: number) => void;
  t: (key: string) => string;
}) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setCurrentImage(0);
    }
  }, [product]);

  useBodyScrollLock(isOpen);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);

  const getBadgeText = (badge: string | null) => {
    if (!badge) return null;
    return t(`badges.${badge}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image Gallery */}
              <div className="relative aspect-square bg-slate-100">
                <Image
                  src={product.images[currentImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {product.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentImage ? "bg-white w-6" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h2 className="text-3xl font-black text-slate-900 mb-2">{product.name}</h2>
                
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-slate-400">({product.sold} {t("sold")})</span>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-black text-slate-900">
                    Rp {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-slate-400 line-through">
                      Rp {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-slate-600 mb-6">{product.description}</p>

                {/* Size Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t("size")}</label>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all ${
                          selectedSize === size
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t("color")}</label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                          selectedColor === color
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t("quantity")}</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  {t("addToCart")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Merchandise() {
  const t = useTranslations("merchandise");
  const tProduct = useTranslations("merchandise.product");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<{ product: typeof products[0]; size: string; color: string; qty: number }[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const categories = [
    { id: "All", label: t("categories.all") },
    { id: "Apparel", label: t("categories.apparel") },
    { id: "Accessories", label: t("categories.accessories") },
    { id: "Bags", label: t("categories.bags") },
    { id: "Stationery", label: t("categories.stationery") },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
    toast.success(wishlist.includes(productId) ? t("removedFromWishlist") : t("addedToWishlist"));
  };

  const addToCart = (product: typeof products[0], size: string, color: string, qty: number) => {
    setCart([...cart, { product, size, color, qty }]);
    toast.success(t("addedToCart", { name: product.name }));
  };

  const getBadgeText = (badge: string | null) => {
    if (!badge) return null;
    return t(`badges.${badge}`);
  };

  return (
    <section id="merchandise" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-8">
          <div>
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-4">
              {t("badge")}
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
              {t("title")}
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-xl">
              {t("description")}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === category.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <TiltCard key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200 transition-all hover:shadow-xl"
                style={{ transform: "translateZ(30px)" }}
              >
                {/* Image */}
                <div
                  className="relative aspect-square overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                      {getBadgeText(product.badge)}
                    </div>
                  )}

                  {/* Wishlist */}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        wishlist.includes(product.id)
                          ? "text-red-500 fill-red-500"
                          : "text-slate-400"
                      }`}
                    />
                  </button>

                  {/* Quick View */}
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-all"
                  >
                    {t("quickView")}
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
                    {product.category}
                  </p>
                  <h3
                    className="text-lg font-bold text-slate-900 mb-2 cursor-pointer hover:text-sky-600 transition-colors"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                    <span className="text-sm text-slate-400">({product.sold} {t("sold")})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-slate-900">
                      Rp {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">
                        Rp {product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors">
            {t("viewAll")}
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
        t={tProduct}
      />
    </section>
  );
}
