"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import OrderStatusBadge from "@/components/order-status-badge";
import { dashboard } from "@/lib/api";
import type { DashboardSeller } from "@/types";
import { TrendingUp, ShoppingCart, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function SellerDashboard() {
  const [data, setData] = useState<DashboardSeller | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboard.seller()
      .then(r => setData(r.data))
      .catch(() => toast.error("Impossible de charger le tableau de bord"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">{[...Array(3)].map((_, i) => <Card key={i}><CardContent className="pt-6"><Skeleton className="h-16" /></CardContent></Card>)}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard vendeur</h1>
        <p className="text-muted-foreground">Vos performances en un coup d'œil</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="pt-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div><p className="text-sm text-muted-foreground">Revenus</p><p className="text-2xl font-bold">{(data?.revenue ?? 0).toFixed(2)} €</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
          </div>
          <div><p className="text-sm text-muted-foreground">Commandes en attente</p><p className="text-2xl font-bold">{data?.pendingOrders ?? 0}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <div><p className="text-sm text-muted-foreground">Stock faible</p><p className="text-2xl font-bold">{data?.lowStockProducts?.length ?? 0}</p></div>
        </CardContent></Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader><CardTitle>Commandes récentes</CardTitle></CardHeader>
          <CardContent>
            {!data?.recentOrders?.length ? (
              <p className="text-sm text-muted-foreground text-center py-8">Aucune commande récente</p>
            ) : (
              <div className="space-y-3">
                {data.recentOrders.slice(0, 5).map(o => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-mono font-medium">{o.numeroCommande}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.dateCommande).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <OrderStatusBadge status={o.statut} />
                      <span className="text-sm font-bold">{o.totalTTC.toFixed(2)} €</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Alertes stock faible</CardTitle>
            <Link href="/seller/products" className="text-xs text-primary hover:underline">Gérer →</Link>
          </CardHeader>
          <CardContent>
            {!data?.lowStockProducts?.length ? (
              <p className="text-sm text-muted-foreground text-center py-8">Tous les stocks sont suffisants ✓</p>
            ) : (
              <div className="space-y-2">
                {data.lowStockProducts.map(p => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm font-medium truncate flex-1">{p.nom}</span>
                    <Badge variant={p.stock === 0 ? "destructive" : "secondary"} className="ml-2">
                      {p.stock === 0 ? "Épuisé" : `${p.stock} restants`}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
