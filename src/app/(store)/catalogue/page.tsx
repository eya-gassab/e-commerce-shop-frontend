"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  products as productsApi,
  categories as categoriesApi,
} from "@/lib/api";
import type { Product, Category } from "@/types";
import { Search, X } from "lucide-react";

function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export default function CataloguePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [categorieId, setCategorieId] = useState(
    searchParams.get("categorieId") ?? ""
  );
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [promoOnly, setPromoOnly] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    categoriesApi
      .getAll()
      .then((r) => setCategories(r.data))
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await productsApi.getAll({
        q: search || undefined,
        categorieId: categorieId ? Number(categorieId) : undefined,
        minPrix: priceRange[0] > 0 ? priceRange[0] : undefined,
        maxPrix: priceRange[1] < 1000 ? priceRange[1] : undefined,
        promo: promoOnly || undefined,
        page,
        size: 12,
      });

      const content = Array.isArray(res?.data?.content) ? res.data.content : [];
      const total =
        typeof res?.data?.totalPages === "number" ? res.data.totalPages : 1;

      setItems(content);
      setTotalPages(total);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [search, categorieId, priceRange, promoOnly, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetFilters = () => {
    setSearch("");
    setCategorieId("");
    setPriceRange([0, 1000]);
    setPromoOnly(false);
    setPage(0);
  };

  const activeFilters = [
    search && `Recherche: "${search}"`,
    categorieId &&
      `Catégorie: ${categories.find((c) => c.id === Number(categorieId))?.nom}`,
    (priceRange[0] > 0 || priceRange[1] < 1000) &&
      `Prix: ${priceRange[0]}€ – ${priceRange[1]}€`,
    promoOnly && "En promotion",
  ].filter(Boolean);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Catalogue produits</h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filters sidebar */}
          <aside className="space-y-6 lg:col-span-1">
            <div>
              <h3 className="mb-3 font-semibold">Recherche</h3>
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(0);
                  }}
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Catégorie</h3>
              <Select
                value={categorieId}
                onValueChange={(v) => {
                  setCategorieId(v === "all" ? "" : v);
                  setPage(0);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">Prix (€)</h3>
              <Slider
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(v) => {
                  setPriceRange(v);
                  setPage(0);
                }}
                className="mt-2"
              />
              <div className="text-muted-foreground mt-2 flex justify-between text-sm">
                <span>{priceRange[0]}€</span>
                <span>{priceRange[1]}€</span>
              </div>
            </div>
            <div>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={promoOnly}
                  onChange={(e) => {
                    setPromoOnly(e.target.checked);
                    setPage(0);
                  }}
                  className="rounded"
                />
                <span className="text-sm font-medium">
                  Promotions uniquement
                </span>
              </label>
            </div>
            {activeFilters.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="w-full"
              >
                <X className="mr-1 h-4 w-4" /> Réinitialiser
              </Button>
            )}
          </aside>

          {/* Products grid */}
          <div className="lg:col-span-3">
            {activeFilters.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {activeFilters.map((f, i) => (
                  <Badge key={i} variant="secondary">
                    {f}
                  </Badge>
                ))}
              </div>
            )}
            {loading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Search className="text-muted-foreground mb-4 h-16 w-16" />
                <h3 className="mb-2 text-xl font-semibold">
                  Aucun produit trouvé
                </h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos filtres
                </p>
                <Button onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-4 text-sm">
                  {items.length} produits
                </p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      disabled={page === 0}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Précédent
                    </Button>
                    <span className="flex items-center px-3 text-sm">
                      Page {page + 1} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      disabled={page >= totalPages - 1}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Suivant
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
