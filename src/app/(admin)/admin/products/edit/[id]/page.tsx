"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { products as productsApi, categories as categoriesApi } from "@/lib/api";
import type { Category } from "@/types";
import { ArrowLeft, Plus, X } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cats, setCats] = useState<Category[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    nom: "", description: "", prix: "", prixPromo: "", stock: "",
    categorieIds: [] as number[],
  });

  useEffect(() => {
    Promise.all([productsApi.getOne(Number(id)), categoriesApi.getAll()])
      .then(([pRes, cRes]) => {
        const p = pRes.data;
        setCats(cRes.data);
        setImages(p.images ?? []);
        setForm({
          nom: p.nom,
          description: p.description,
          prix: String(p.prix),
          prixPromo: p.prixPromo ? String(p.prixPromo) : "",
          stock: String(p.stock),
          categorieIds: p.categories?.map(c => c.id) ?? [],
        });
      })
      .catch(() => { toast.error("Produit introuvable"); router.push("/admin/products"); })
      .finally(() => setLoading(false));
  }, [id, router]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const addImage = () => {
    if (imageUrl.trim()) { setImages(p => [...p, imageUrl.trim()]); setImageUrl(""); }
  };

  const toggleCat = (catId: number) =>
    setForm(p => ({
      ...p,
      categorieIds: p.categorieIds.includes(catId) ? p.categorieIds.filter(c => c !== catId) : [...p.categorieIds, catId],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await productsApi.update(Number(id), {
        nom: form.nom,
        description: form.description,
        prix: parseFloat(form.prix),
        prixPromo: form.prixPromo ? parseFloat(form.prixPromo) : null,
        stock: parseInt(form.stock),
        images,
        categorieIds: form.categorieIds,
      });
      toast.success("Produit mis à jour !");
      router.push("/admin/products");
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Erreur lors de la mise à jour");
    } finally { setSaving(false); }
  };

  if (loading) return (
    <div className="max-w-2xl space-y-4">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2">
          <Link href="/admin/products"><ArrowLeft className="h-4 w-4 mr-2" />Retour</Link>
        </Button>
        <h1 className="text-3xl font-bold">Modifier le produit</h1>
        <p className="text-muted-foreground">{form.nom}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Informations générales</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nom du produit *</Label>
              <Input value={form.nom} onChange={set("nom")} required />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={set("description")} rows={4} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Prix (€) *</Label>
                <Input type="number" step="0.01" min="0" value={form.prix} onChange={set("prix")} required />
              </div>
              <div>
                <Label>Prix promo (€)</Label>
                <Input type="number" step="0.01" min="0" value={form.prixPromo} onChange={set("prixPromo")} />
              </div>
              <div>
                <Label>Stock *</Label>
                <Input type="number" min="0" value={form.stock} onChange={set("stock")} required />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Images</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input placeholder="https://example.com/image.jpg" value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addImage())} />
              <Button type="button" variant="outline" onClick={addImage}><Plus className="h-4 w-4" /></Button>
            </div>
            {images.map((img, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <span className="text-xs flex-1 truncate">{img}</span>
                <Button type="button" variant="ghost" size="sm" className="h-6 w-6 p-0"
                  onClick={() => setImages(p => p.filter((_, j) => j !== i))}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Catégories</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cats.map(c => (
                <button key={c.id} type="button" onClick={() => toggleCat(c.id)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    form.categorieIds.includes(c.id)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:border-primary/50"
                  }`}>
                  {c.nom}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving} className="flex-1">
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
        </div>
      </form>
    </div>
  );
}
