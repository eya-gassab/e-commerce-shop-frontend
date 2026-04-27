"use client";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import RatingStars from "@/components/rating-stars";
import { products as productsApi } from "@/lib/api";
import type { Product } from "@/types";
import { Plus, Edit, Trash2, Search, Package } from "lucide-react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    productsApi.getAll({ size: 50 })
      .then(r => setItems(r.data.content))
      .catch(() => toast.error("Impossible de charger les produits"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number, nom: string) => {
    if (!confirm(`Désactiver "${nom}" ?`)) return;
    setDeleting(id);
    try {
      await productsApi.delete(id);
      setItems(prev => prev.filter(p => p.id !== id));
      toast.success(`"${nom}" désactivé`);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Erreur lors de la suppression");
    } finally { setDeleting(null); }
  };

  const filtered = items.filter(p =>
    p.nom.toLowerCase().includes(search.toLowerCase()) ||
    p.categories?.some(c => c.nom.toLowerCase().includes(search.toLowerCase()))
  );
=======

import { Product } from "@/app/api/products/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    // In a real app, you would implement delete functionality
    console.log("Delete product:", id);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-muted-foreground">Loading products...</div>
      </div>
    );
  }
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
<<<<<<< HEAD
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="text-muted-foreground">{items.length} produit{items.length !== 1 ? "s" : ""} au total</p>
        </div>
        <Button asChild>
          <Link href="/admin/add-product"><Plus className="h-4 w-4 mr-2" />Ajouter</Link>
        </Button>
=======
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Link href="/admin/add-product">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Link>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
      </div>

      <Card>
        <CardHeader>
<<<<<<< HEAD
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Rechercher un produit..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-muted-foreground">
              <Package className="h-12 w-12 mb-3" />
              <p>{search ? "Aucun résultat" : "Aucun produit"}</p>
=======
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-4">No products found.</p>
              <Link href="/admin/add-product">
                <Button>Add your first product</Button>
              </Link>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
<<<<<<< HEAD
                  <TableHead>Produit</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                          {p.images?.[0] && <Image src={p.images[0]} alt={p.nom} fill className="object-cover" unoptimized />}
                        </div>
                        <div>
                          <p className="font-medium text-sm line-clamp-1">{p.nom}</p>
                          <p className="text-xs text-muted-foreground">{p.seller?.nomBoutique}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell><span className="text-xs">{p.categories?.[0]?.nom ?? "—"}</span></TableCell>
                    <TableCell>
                      <div>
                        {p.prixPromo ? (
                          <>
                            <span className="font-bold text-red-600 text-sm">{p.prixPromo.toFixed(2)} €</span>
                            <span className="text-xs text-muted-foreground line-through ml-1">{p.prix.toFixed(2)} €</span>
                          </>
                        ) : (
                          <span className="font-medium text-sm">{p.prix.toFixed(2)} €</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={p.stock === 0 ? "destructive" : p.stock < 5 ? "secondary" : "outline"}>
                        {p.stock === 0 ? "Épuisé" : `${p.stock} unités`}
                      </Badge>
                    </TableCell>
                    <TableCell><RatingStars rating={p.averageRating} size="sm" showValue /></TableCell>
                    <TableCell>
                      <Badge variant={p.actif ? "default" : "secondary"}>{p.actif ? "Actif" : "Inactif"}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/products/edit/${p.id}`}><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600"
                          disabled={deleting === p.id} onClick={() => handleDelete(p.id, p.nom)}>
=======
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="rounded-lg object-cover"
                          unoptimized
                        />
                        <div>
                          <div className="font-medium">{product.title}</div>
                          <div className="text-muted-foreground text-sm">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.category && (
                        <Badge variant="secondary">{product.category}</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      ${product.price.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
