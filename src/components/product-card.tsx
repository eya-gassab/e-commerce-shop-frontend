"use client";
<<<<<<< HEAD
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingStars from "@/components/rating-stars";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types";
=======

import { Product } from "@/app/api/products/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

<<<<<<< HEAD
export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount = product.prixPromo
    ? Math.round((1 - product.prixPromo / product.prix) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.nom} ajouté au panier`);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.images?.[0] ? (
            <Image src={product.images[0]} alt={product.nom} fill className="object-cover transition-transform duration-300 group-hover:scale-105" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">Pas d'image</div>
          )}
          {discount && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">-{discount}%</Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary">Rupture de stock</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-2">
          <p className="text-xs text-muted-foreground truncate">{product.categories?.[0]?.nom}</p>
          <h3 className="font-semibold line-clamp-2 text-sm leading-snug">{product.nom}</h3>
          <RatingStars rating={product.averageRating} size="sm" showValue />
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {product.prixPromo ? (
                <>
                  <span className="font-bold text-red-600">{product.prixPromo.toFixed(2)} €</span>
                  <span className="text-xs text-muted-foreground line-through">{product.prix.toFixed(2)} €</span>
                </>
              ) : (
                <span className="font-bold">{product.prix.toFixed(2)} €</span>
              )}
            </div>
            <Button size="sm" variant="outline" className="h-8 w-8 p-0" disabled={product.stock === 0} onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
=======
interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="relative block aspect-square h-full w-full">
      <Link href={`/products/${product.id}`}>
        <div className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
          <Image
            src={product.image}
            alt={product.title}
            fill
            unoptimized
            className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
          />

          {/* Bottom overlay with product info */}
          <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
            <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
              <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                {product.title}
              </h3>
              <p className="flex-none rounded-full bg-black p-2 text-white dark:bg-white dark:text-black">
                ${product.price.toFixed(2)}
                <span className="ml-1 inline">USD</span>
              </p>
            </div>
          </div>

          {/* Category badge in top corner */}
          {product.category && (
            <Badge
              className="absolute top-2 left-2 border-neutral-200 bg-white/70 text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white"
              variant="secondary"
            >
              {product.category}
            </Badge>
          )}

          {/* Add to cart button - appears on hover */}
          <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart();
              }}
              size={"icon"}
              className="rounded-full bg-black text-white shadow-lg hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <ShoppingCart />
            </Button>
          </div>
        </div>
      </Link>
    </div>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
  );
}
