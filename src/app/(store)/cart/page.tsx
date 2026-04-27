"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { coupons } from "@/lib/api";
import type { Coupon } from "@/types";
import { Minus, Plus, Trash2, ShoppingBag, Tag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  const deliveryFee = totalPrice >= 100 ? 0 : 9.99;
  const discount = appliedCoupon
    ? appliedCoupon.type === "PERCENT"
      ? totalPrice * (appliedCoupon.valeur / 100)
      : appliedCoupon.valeur
    : 0;
  const finalTotal = totalPrice - discount + deliveryFee;

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    try {
      const res = await coupons.validate(couponCode.trim());
      setAppliedCoupon(res.data);
      toast.success(`Coupon "${couponCode}" appliqué !`);
    } catch {
      toast.error("Coupon invalide ou expiré");
    } finally { setCouponLoading(false); }
  };

  if (items.length === 0) return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto px-4 py-24 flex flex-col items-center text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-3">Votre panier est vide</h1>
        <p className="text-muted-foreground mb-8">Ajoutez des produits pour commencer vos achats</p>
        <Button size="lg" asChild><Link href="/catalogue">Parcourir le catalogue</Link></Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mon panier <Badge variant="secondary">{totalItems}</Badge></h1>
          <Button variant="ghost" size="sm" onClick={() => { clearCart(); toast.success("Panier vidé"); }}>
            <Trash2 className="h-4 w-4 mr-1" /> Vider
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4 flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    {item.images?.[0] && <Image src={item.images[0]} alt={item.nom} fill className="object-cover" unoptimized />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`} className="font-semibold hover:underline line-clamp-1">{item.nom}</Link>
                    <p className="text-sm text-muted-foreground">{item.seller?.nomBoutique}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded-lg">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold">{((item.prixPromo ?? item.prix) * item.quantity).toFixed(2)} €</span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          onClick={() => { removeFromCart(item.id); toast.success("Article retiré"); }}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Tag className="h-4 w-4" /> Code promo</CardTitle></CardHeader>
              <CardContent>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950 rounded-lg">
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      {appliedCoupon.code} — {appliedCoupon.type === "PERCENT" ? `-${appliedCoupon.valeur}%` : `-${appliedCoupon.valeur}€`}
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setAppliedCoupon(null)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input placeholder="CODE PROMO" value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} />
                    <Button variant="outline" onClick={handleApplyCoupon} disabled={couponLoading}>
                      {couponLoading ? "..." : "OK"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Totals */}
            <Card>
              <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm"><span>Sous-total</span><span>{totalPrice.toFixed(2)} €</span></div>
                {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Réduction</span><span>-{discount.toFixed(2)} €</span></div>}
                <div className="flex justify-between text-sm"><span>Livraison</span><span>{deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} €`}</span></div>
                {totalPrice < 100 && <p className="text-xs text-muted-foreground">Livraison gratuite dès 100 €</p>}
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span><span>{finalTotal.toFixed(2)} €</span>
                </div>
                <Button size="lg" className="w-full" onClick={() => router.push("/checkout")}>
                  Passer la commande →
                </Button>
                <Button variant="outline" className="w-full" asChild><Link href="/catalogue">Continuer les achats</Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
