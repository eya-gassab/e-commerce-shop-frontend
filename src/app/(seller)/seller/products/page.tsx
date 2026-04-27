"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { products as productsApi } from "@/lib/api";
import type { Product } from "@/types";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { toast } from "sonner";

export default function SellerProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  useEffect(() => {
    productsApi.getAll({ size: 50 })
      .then(r => setItems(r?.data?.content ?? []))
      .catch(() => toast.error("Impossible de charger vos produits"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number, nom: string) => {
    if (!confirm(`Désactiver "${nom}" ?`)) return;
    setDeleting(id);
    try {
      await productsApi.delete(id);
      setItems(prev => prev.filter(p => p.id !== id));
      toast.success("Produit désactivé");
    } catch { toast.error("Erreur lors de la désactivation"); }
    finally { setDeleting(null); }
  };

  const filtered = items.filter(p => p.nom.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mes produits</h1>
        <Button asChild>
          <Link href="/admin/add-product"><Plus className="h-4 w-4 mr-2" />Nouveau produit</Link>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                          {p.images?.[0] && <Image src={p.images[0]} alt={p.nom} fill className="object-cover" unoptimized />}
                        </div>
                        <span className="font-medium text-sm line-clamp-1">{p.nom}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{(p.prixPromo ?? p.prix).toFixed(2)} €</TableCell>
                    <TableCell>
                      <Badge variant={p.stock === 0 ? "destructive" : p.stock < 5 ? "secondary" : "outline"}>
                        {p.stock === 0 ? "Épuisé" : p.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={p.actif ? "default" : "secondary"}>{p.actif ? "Actif" : "Inactif"}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/products/edit/${p.id}`}><Edit className="h-4 w-4" /></Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500"
                          disabled={deleting === p.id} onClick={() => handleDelete(p.id, p.nom)}>
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
