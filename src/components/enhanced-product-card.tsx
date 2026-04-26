"use client";

import { useState } from "react";
import { Product } from "@/app/api/products/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { ShoppingCart, Heart, Eye, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

interface EnhancedProductCardProps {
  product: Product;
  discount?: number;
}

export default function EnhancedProductCard({
  product,
  discount = 0,
}: EnhancedProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const discountedPrice =
    discount > 0 ? product.price * (1 - discount / 100) : product.price;

  return (
    <>
      <div className="group relative h-full">
        <Link href={`/products/${product.id}`}>
          <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={product.image}
                alt={product.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="rounded-full bg-red-500 px-3 py-1 text-lg font-bold text-white">
                    -{discount}%
                  </Badge>
                </div>
              )}

              {/* Category Badge */}
              {product.category && (
                <Badge className="absolute top-3 right-3 bg-blue-500 text-white">
                  {product.category}
                </Badge>
              )}

              {/* Overlay Actions - Show on Hover */}
              <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 opacity-0 transition-colors transition-opacity group-hover:bg-black/20 group-hover:opacity-100">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  size="icon"
                  variant="secondary"
                  className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-slate-100"
                >
                  <Eye className="h-5 w-5" />
                </Button>
                <Button
                  onClick={(e) => handleAddToCart(e)}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 h-12 w-12 rounded-full text-white shadow-lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button
                  onClick={handleWishlist}
                  size="icon"
                  variant="secondary"
                  className="h-12 w-12 rounded-full bg-white shadow-lg hover:bg-slate-100"
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col p-4">
              <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
                {product.title}
              </h3>

              {product.description && (
                <p className="mb-3 line-clamp-1 text-xs text-gray-600 dark:text-gray-400">
                  {product.description}
                </p>
              )}

              {/* Price Section */}
              <div className="mt-auto flex items-center gap-2">
                {discount > 0 ? (
                  <>
                    <span className="text-primary text-xl font-bold">
                      ${discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button - Visible on Small Screens */}
              <Button
                onClick={(e) => handleAddToCart(e)}
                className="mt-4 w-full transition-opacity group-hover:opacity-100 md:opacity-0"
                size="sm"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-96 w-full max-w-2xl overflow-y-auto rounded-lg bg-white dark:bg-slate-900">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-bold">Quick View</h2>
              <button
                onClick={() => setShowQuickView(false)}
                className="rounded-full p-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 overflow-hidden rounded-lg bg-slate-100 md:h-80 dark:bg-slate-800">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mb-6 flex items-center gap-2">
                      {discount > 0 ? (
                        <>
                          <span className="text-primary text-2xl font-bold">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-semibold text-red-500">
                            Save ${(product.price - discountedPrice).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {product.category && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Category:</strong> {product.category}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-6">
                    <Button
                      onClick={(e) => {
                        handleAddToCart(e);
                        setShowQuickView(false);
                      }}
                      className="flex-1"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={handleWishlist}
                      variant="outline"
                      size="icon"
                      className="h-12 w-12"
                    >
                      <Heart
                        className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
