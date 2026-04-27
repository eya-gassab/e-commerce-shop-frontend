"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import RatingStars from "@/components/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { products as productsApi, reviewsApi } from "@/lib/api";
import type { Product, ProductVariant } from "@/types";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [reviewNote, setReviewNote] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    productsApi.getOne(Number(id))
      .then(r => setProduct(r.data))
      .catch(() => router.push("/"))
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast.success(`${quantity} × ${product.nom} ajouté au panier !`);
  };

  const handleReview = async () => {
    if (!product) return;
    setSubmittingReview(true);
    try {
      await reviewsApi.create(product.id, reviewNote, reviewComment);
      toast.success("Avis soumis — en attente de modération");
      setReviewComment("");
      const r = await productsApi.getOne(product.id);
      setProduct(r.data);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Erreur lors de la soumission");
    } finally { setSubmittingReview(false); }
  };

  if (loading) return (
    <div className="min-h-screen"><Navbar />
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <Skeleton className="aspect-square rounded-xl" />
        <div className="space-y-4">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-8" />)}</div>
      </div>
    </div>
  );
  if (!product) return null;

  const price = selectedVariant ? product.prix + selectedVariant.prixDelta : (product.prixPromo ?? product.prix);
  const discount = product.prixPromo ? Math.round((1 - product.prixPromo / product.prix) * 100) : null;

  // Group variants by attribute
  const variantGroups = product.variants.reduce((acc, v) => {
    if (!acc[v.attribut]) acc[v.attribut] = [];
    acc[v.attribut].push(v);
    return acc;
  }, {} as Record<string, ProductVariant[]>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              {product.images?.[activeImg] ? (
                <Image src={product.images[activeImg]} alt={product.nom} fill className="object-cover" unoptimized />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">Pas d'image</div>
              )}
              {discount && <Badge className="absolute top-3 left-3 bg-red-500 text-white text-base px-3 py-1">-{discount}%</Badge>}
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`relative h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${i === activeImg ? "border-primary" : "border-transparent"}`}>
                    <Image src={img} alt="" fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-5">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {product.categories.map(c => <Badge key={c.id} variant="secondary">{c.nom}</Badge>)}
              </div>
              <h1 className="text-3xl font-bold">{product.nom}</h1>
              <p className="text-sm text-muted-foreground mt-1">par {product.seller?.nomBoutique}</p>
            </div>
            <div className="flex items-center gap-3">
              <RatingStars rating={product.averageRating} showValue />
              <span className="text-sm text-muted-foreground">({product.reviews?.length ?? 0} avis)</span>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold">{price.toFixed(2)} €</span>
              {product.prixPromo && <span className="text-lg text-muted-foreground line-through">{product.prix.toFixed(2)} €</span>}
            </div>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variants */}
            {Object.entries(variantGroups).map(([attr, variants]) => (
              <div key={attr}>
                <p className="font-semibold mb-2">{attr}</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map(v => (
                    <Button key={v.id} size="sm" variant={selectedVariant?.id === v.id ? "default" : "outline"}
                      onClick={() => setSelectedVariant(selectedVariant?.id === v.id ? null : v)}>
                      {v.valeur} {v.prixDelta !== 0 && `(+${v.prixDelta}€)`}
                    </Button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="font-semibold">Quantité</span>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="px-4 font-medium">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(q => q + 1)}><Plus className="h-4 w-4" /></Button>
              </div>
              <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
            </div>

            <Button size="lg" className="w-full" disabled={product.stock === 0} onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? "Rupture de stock" : "Ajouter au panier"}
            </Button>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Avis clients ({product.reviews?.length ?? 0})</h2>
            {product.reviews?.length === 0 ? (
              <p className="text-muted-foreground">Soyez le premier à laisser un avis !</p>
            ) : (
              <div className="space-y-4">
                {product.reviews.filter(r => r.approuve).map(r => (
                  <Card key={r.id}>
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{r.customer.prenom} {r.customer.nom}</span>
                        <span className="text-xs text-muted-foreground">{new Date(r.dateCreation).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <RatingStars rating={r.note} size="sm" />
                      <p className="text-sm">{r.commentaire}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated && (
            <Card>
              <CardHeader><CardTitle>Laisser un avis</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Note</p>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} onClick={() => setReviewNote(n)}
                        className={`text-2xl ${n <= reviewNote ? "text-yellow-400" : "text-gray-300"}`}>★</button>
                    ))}
                  </div>
                </div>
                <Textarea placeholder="Votre commentaire..." value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)} rows={4} />
                <Button onClick={handleReview} disabled={submittingReview || !reviewComment}>
                  {submittingReview ? "Envoi..." : "Soumettre l'avis"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
