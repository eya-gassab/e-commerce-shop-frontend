"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { auth as authApi, addresses as addressesApi } from "@/lib/api";
import type { Address } from "@/types";
import { User, MapPin, Plus, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ rue: "", ville: "", codePostal: "", pays: "Tunisie" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) { router.push("/login"); return; }
    if (user) { setPrenom(user.prenom); setNom(user.nom); }
    addressesApi.getAll().then(r => setAddresses(r.data)).catch(() => {});
  }, [user, isAuthenticated, isLoading, router]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await authApi.updateProfile({ prenom, nom });
      toast.success("Profil mis à jour !");
    } catch { toast.error("Erreur lors de la mise à jour"); }
    finally { setSaving(false); }
  };

  const handleAddAddress = async () => {
    try {
      const res = await addressesApi.create(newAddr);
      setAddresses(prev => [...prev, res.data]);
      setNewAddr({ rue: "", ville: "", codePostal: "", pays: "Tunisie" });
      setShowNewAddr(false);
      toast.success("Adresse ajoutée");
    } catch { toast.error("Erreur lors de l'ajout"); }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await addressesApi.delete(id);
      setAddresses(prev => prev.filter(a => a.id !== id));
      toast.success("Adresse supprimée");
    } catch { toast.error("Impossible de supprimer"); }
  };

  const handleSetPrincipal = async (id: number) => {
    try {
      await addressesApi.setPrincipal(id);
      setAddresses(prev => prev.map(a => ({ ...a, principal: a.id === id })));
      toast.success("Adresse principale définie");
    } catch { toast.error("Erreur"); }
  };

  return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile card */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Informations personnelles</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-center mb-4">
                <Badge variant="secondary">{user?.role}</Badge>
                <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Prénom</Label><Input value={prenom} onChange={e => setPrenom(e.target.value)} /></div>
                <div><Label>Nom</Label><Input value={nom} onChange={e => setNom(e.target.value)} /></div>
              </div>
              <div><Label>Email</Label><Input value={user?.email ?? ""} disabled className="bg-muted" /></div>
              <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Mes adresses</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {addresses.length === 0 && !showNewAddr && (
                <p className="text-muted-foreground text-sm text-center py-4">Aucune adresse enregistrée</p>
              )}
              {addresses.map(addr => (
                <div key={addr.id} className={`p-3 rounded-lg border ${addr.principal ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{addr.rue}</p>
                      <p className="text-xs text-muted-foreground">{addr.codePostal} {addr.ville}, {addr.pays}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!addr.principal && (
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => handleSetPrincipal(addr.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" /> Principale
                        </Button>
                      )}
                      {addr.principal && <Badge className="text-xs">Principal</Badge>}
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => handleDeleteAddress(addr.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => setShowNewAddr(!showNewAddr)}>
                <Plus className="h-4 w-4 mr-2" /> Ajouter une adresse
              </Button>
              {showNewAddr && (
                <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                  <div><Label>Rue</Label><Input placeholder="123 Rue..." value={newAddr.rue} onChange={e => setNewAddr(p => ({...p, rue: e.target.value}))} /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Ville</Label><Input value={newAddr.ville} onChange={e => setNewAddr(p => ({...p, ville: e.target.value}))} /></div>
                    <div><Label>Code postal</Label><Input value={newAddr.codePostal} onChange={e => setNewAddr(p => ({...p, codePostal: e.target.value}))} /></div>
                  </div>
                  <div><Label>Pays</Label><Input value={newAddr.pays} onChange={e => setNewAddr(p => ({...p, pays: e.target.value}))} /></div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddAddress}>Enregistrer</Button>
                    <Button size="sm" variant="outline" onClick={() => setShowNewAddr(false)}>Annuler</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
