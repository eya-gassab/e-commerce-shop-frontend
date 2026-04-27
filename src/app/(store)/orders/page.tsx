"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import OrderStatusBadge from "@/components/order-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/auth-context";
import { orders as ordersApi } from "@/lib/api";
import type { Order } from "@/types";
import { Package, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function OrderSkeleton() {
  return <Card><CardContent className="pt-4 space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-5 w-full" />)}</CardContent></Card>;
}

export default function OrdersPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) { router.push("/login"); return; }
    if (isAuthenticated) {
      ordersApi.getMyOrders()
        .then(r => setMyOrders(r.data))
        .catch(() => toast.error("Impossible de charger vos commandes"))
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, isLoading, router]);

  const handleCancel = async (orderId: number) => {
    try {
      await ordersApi.cancel(orderId);
      setMyOrders(prev => prev.map(o => o.id === orderId ? { ...o, statut: "CANCELLED" } : o));
      toast.success("Commande annulée");
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Annulation impossible");
    }
  };

  return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-2"><Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
          <h1 className="text-3xl font-bold">Mes commandes</h1>
          <p className="text-muted-foreground">Suivez l'état de vos commandes</p>
        </div>

        {loading ? (
          <div className="space-y-4">{[...Array(3)].map((_, i) => <OrderSkeleton key={i} />)}</div>
        ) : myOrders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-20">
              <Package className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune commande</h3>
              <p className="text-muted-foreground mb-6">Vous n'avez pas encore passé de commande</p>
              <Button asChild><Link href="/catalogue">Commencer vos achats</Link></Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {myOrders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-base font-mono">{order.numeroCommande}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(order.dateCommande).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                    <div className="text-right">
                      <OrderStatusBadge status={order.statut} />
                      <p className="font-bold text-lg mt-1">{order.totalTTC.toFixed(2)} €</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-2">
                    {order.lignes.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.product.nom} × {item.quantite}</span>
                        <span className="font-medium">{(item.prixUnitaire * item.quantite).toFixed(2)} €</span>
                      </div>
                    ))}
                  </div>

                  {/* Address */}
                  <div className="border-t pt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Livraison : </span>
                    {order.adresseLivraison?.rue}, {order.adresseLivraison?.ville}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {(order.statut === "PENDING" || order.statut === "PAID") && (
                      <Button variant="destructive" size="sm" onClick={() => handleCancel(order.id)}>
                        Annuler la commande
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
