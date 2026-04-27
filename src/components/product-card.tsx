"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingStars from "@/components/rating-stars";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

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
  );
}
