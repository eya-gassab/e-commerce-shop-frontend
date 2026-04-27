"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrderStatusBadge from "@/components/order-status-badge";
import { orders as ordersApi } from "@/lib/api";
import type { Order, OrderStatus } from "@/types";
import { toast } from "sonner";

const STATUSES: OrderStatus[] = ["PENDING","PAID","PROCESSING","SHIPPED","DELIVERED","CANCELLED"];

export default function SellerOrdersPage() {
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    ordersApi.getMyOrders()
      .then(r => setMyOrders(r.data))
      .catch(() => toast.error("Impossible de charger les commandes"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusUpdate = async (orderId: number, statut: string) => {
    setUpdating(orderId);
    try {
      await ordersApi.updateStatus(orderId, statut);
      setMyOrders(prev => prev.map(o => o.id === orderId ? { ...o, statut: statut as OrderStatus } : o));
      toast.success("Statut mis à jour");
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Erreur");
    } finally { setUpdating(null); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Commandes reçues</h1>
        <p className="text-muted-foreground">{myOrders.length} commande{myOrders.length !== 1 ? "s" : ""}</p>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(4)].map((_, i) => <Card key={i}><CardContent className="pt-4"><Skeleton className="h-24" /></CardContent></Card>)}</div>
      ) : myOrders.length === 0 ? (
        <Card><CardContent className="flex items-center justify-center py-16 text-muted-foreground">Aucune commande reçue</CardContent></Card>
      ) : (
        <div className="space-y-4">
          {myOrders.map(order => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base font-mono">{order.numeroCommande}</CardTitle>
                    <p className="text-sm text-muted-foreground">{new Date(order.dateCommande).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.statut} />
                    <span className="font-bold">{order.totalTTC.toFixed(2)} €</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  {order.lignes.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.product.nom} × {item.quantite}</span>
                      <span>{(item.prixUnitaire * item.quantite).toFixed(2)} €</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <span className="text-sm font-medium">Mettre à jour le statut :</span>
                  <Select value={order.statut} disabled={updating === order.id}
                    onValueChange={v => handleStatusUpdate(order.id, v)}>
                    <SelectTrigger className="w-44 h-8 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {updating === order.id && <span className="text-xs text-muted-foreground">Mise à jour...</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
