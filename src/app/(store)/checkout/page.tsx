"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { addresses as addressesApi, orders } from "@/lib/api";
import type { Address } from "@/types";
import { MapPin, Plus, CheckCircle, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, isLoading } = useAuth();
  const [myAddresses, setMyAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [newAddr, setNewAddr] = useState({ rue: "", ville: "", codePostal: "", pays: "Tunisie" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) { router.push("/login"); return; }
    if (isAuthenticated) {
      addressesApi.getAll().then(r => {
        setMyAddresses(r.data);
        const principal = r.data.find(a => a.principal);
        if (principal) setSelectedAddressId(principal.id);
        else if (r.data.length > 0) setSelectedAddressId(r.data[0].id);
        else setShowNewAddress(true);
      }).catch(() => setShowNewAddress(true));
    }
  }, [isAuthenticated, isLoading, router]);

  const handleAddAddress = async () => {
    if (!newAddr.rue || !newAddr.ville || !newAddr.codePostal) { toast.error("Remplissez tous les champs"); return; }
    try {
      const res = await addressesApi.create(newAddr);
      setMyAddresses(prev => [...prev, res.data]);
      setSelectedAddressId(res.data.id);
      setShowNewAddress(false);
      toast.success("Adresse ajoutée");
    } catch { toast.error("Erreur lors de l'ajout de l'adresse"); }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) { toast.error("Sélectionnez une adresse de livraison"); return; }
    setPlacing(true);
    try {
      await orders.createFromCart(selectedAddressId);
      clearCart();
      toast.success("Commande passée avec succès !");
      router.push("/checkout/success");
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Erreur lors de la commande");
    } finally { setPlacing(false); }
  };

  const deliveryFee = totalPrice >= 100 ? 0 : 9.99;

  if (items.length === 0) return (
    <div className="min-h-screen"><Navbar />
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <Button asChild><Link href="/catalogue">Parcourir le catalogue</Link></Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Address selection */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Adresse de livraison</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {myAddresses.map(addr => (
                  <button key={addr.id} onClick={() => setSelectedAddressId(addr.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${selectedAddressId === addr.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{addr.rue}</p>
                        <p className="text-sm text-muted-foreground">{addr.codePostal} {addr.ville}, {addr.pays}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {addr.principal && <Badge variant="secondary" className="text-xs">Principal</Badge>}
                        {selectedAddressId === addr.id && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                  </button>
                ))}

                <Button variant="outline" className="w-full" onClick={() => setShowNewAddress(!showNewAddress)}>
                  <Plus className="h-4 w-4 mr-2" /> Nouvelle adresse
                </Button>

                {showNewAddress && (
                  <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                    <h4 className="font-semibold">Ajouter une adresse</h4>
                    <div>
                      <Label>Rue</Label>
                      <Input placeholder="123 Rue de la Paix" value={newAddr.rue} onChange={e => setNewAddr(p => ({...p, rue: e.target.value}))} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Ville</Label><Input placeholder="Tunis" value={newAddr.ville} onChange={e => setNewAddr(p => ({...p, ville: e.target.value}))} /></div>
                      <div><Label>Code postal</Label><Input placeholder="1000" value={newAddr.codePostal} onChange={e => setNewAddr(p => ({...p, codePostal: e.target.value}))} /></div>
                    </div>
                    <div><Label>Pays</Label><Input value={newAddr.pays} onChange={e => setNewAddr(p => ({...p, pays: e.target.value}))} /></div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddAddress}>Enregistrer</Button>
                      <Button variant="outline" onClick={() => setShowNewAddress(false)}>Annuler</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery info */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Livraison standard — {deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} €`}</p>
                    <p className="text-muted-foreground">Livraison gratuite dès 100 € d'achat · 3-5 jours ouvrés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <Card className="h-fit sticky top-4">
            <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      {item.images?.[0] && <Image src={item.images[0]} alt={item.nom} fill className="object-cover" unoptimized />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.nom}</p>
                      <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">{((item.prixPromo ?? item.prix) * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm"><span>Sous-total</span><span>{totalPrice.toFixed(2)} €</span></div>
                <div className="flex justify-between text-sm"><span>Livraison</span><span>{deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} €`}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span><span>{(totalPrice + deliveryFee).toFixed(2)} €</span>
                </div>
              </div>
              <Button size="lg" className="w-full" onClick={handlePlaceOrder}
                disabled={placing || !selectedAddressId}>
                {placing ? "Traitement..." : "Confirmer la commande"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">🔒 Paiement sécurisé · Satisfait ou remboursé</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
