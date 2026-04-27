"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Role } from "@/types";
import { ShoppingBag } from "lucide-react";

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [form, setForm] = useState({ email: "", motDePasse: "", prenom: "", nom: "", role: "CUSTOMER" as Role, nomBoutique: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    try {
      await register({
        email: form.email,
        motDePasse: form.motDePasse,
        prenom: form.prenom,
        nom: form.nom,
        role: form.role,
        ...(form.role === "SELLER" && { nomBoutique: form.nomBoutique }),
      });
    } catch (err: any) {
      setError(err.response?.data?.message ?? err.message ?? "Erreur lors de l'inscription");
    }
  };

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>Rejoignez ShopFlow en tant que client ou vendeur</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Prénom</Label><Input placeholder="Alice" value={form.prenom} onChange={set("prenom")} required /></div>
              <div><Label>Nom</Label><Input placeholder="Dupont" value={form.nom} onChange={set("nom")} required /></div>
            </div>
            <div><Label>Email</Label><Input type="email" placeholder="alice@example.com" value={form.email} onChange={set("email")} required /></div>
            <div><Label>Mot de passe</Label><Input type="password" placeholder="••••••••" value={form.motDePasse} onChange={set("motDePasse")} required /></div>
            <div>
              <Label>Je m'inscris en tant que</Label>
              <Select value={form.role} onValueChange={v => setForm(p => ({ ...p, role: v as Role }))}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="CUSTOMER">🛍️ Client</SelectItem>
                  <SelectItem value="SELLER">🏪 Vendeur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.role === "SELLER" && (
              <div><Label>Nom de la boutique</Label><Input placeholder="Ma Boutique" value={form.nomBoutique} onChange={set("nomBoutique")} required /></div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Création..." : "Créer mon compte"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">Se connecter</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
