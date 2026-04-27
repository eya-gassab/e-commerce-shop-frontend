"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import OrderStatusBadge from "@/components/order-status-badge";
import RatingStars from "@/components/rating-stars";
import { dashboard } from "@/lib/api";
import type { DashboardAdmin } from "@/types";
import { TrendingUp, ShoppingCart, Users, Package, AlertCircle } from "lucide-react";
import { toast } from "sonner";

function StatCard({ title, value, icon: Icon, sub }: { title: string; value: string; icon: any; sub?: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardAdmin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboard.admin()
      .then(r => setData(r.data))
      .catch(() => toast.error("Impossible de charger le tableau de bord"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <Card key={i}><CardContent className="pt-6"><Skeleton className="h-20" /></CardContent></Card>)}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de bord Admin</h1>
        <p className="text-muted-foreground">Vue d'ensemble de la plateforme</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Chiffre d'affaires" value={`${(data?.totalRevenue ?? 0).toFixed(2)} €`} icon={TrendingUp} />
        <StatCard title="Commandes" value={String(data?.totalOrders ?? 0)} icon={ShoppingCart} />
        <StatCard title="Clients" value={String(data?.totalCustomers ?? 0)} icon={Users} />
        <StatCard title="Top produits" value={String(data?.topProducts?.length ?? 0)} icon={Package} />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader><CardTitle>Commandes récentes</CardTitle></CardHeader>
          <CardContent>
            {!data?.recentOrders?.length ? (
              <p className="text-muted-foreground text-sm text-center py-8">Aucune commande récente</p>
            ) : (
              <div className="space-y-3">
                {data.recentOrders.slice(0, 6).map(o => (
                  <div key={o.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-mono font-medium">{o.numeroCommande}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.dateCommande).toLocaleDateString("fr-FR")}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <OrderStatusBadge status={o.statut} />
                      <span className="text-sm font-bold">{o.totalTTC.toFixed(2)} €</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader><CardTitle>Meilleures ventes</CardTitle></CardHeader>
          <CardContent>
            {!data?.topProducts?.length ? (
              <p className="text-muted-foreground text-sm text-center py-8">Aucune donnée disponible</p>
            ) : (
              <div className="space-y-3">
                {data.topProducts.slice(0, 6).map((p, i) => (
                  <div key={p.id} className="flex items-center gap-3 py-2 border-b last:border-0">
                    <span className="text-2xl font-black text-muted-foreground w-8">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.nom}</p>
                      <RatingStars rating={p.averageRating} size="sm" showValue />
                    </div>
                    <span className="text-sm font-bold">{p.prix.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Sellers */}
        {data?.topSellers?.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Meilleurs vendeurs</CardTitle></CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.topSellers.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-3 p-3 rounded-lg border">
                    <span className="text-xl font-black text-muted-foreground">#{i + 1}</span>
                    <div>
                      <p className="font-medium text-sm">{s.nomBoutique}</p>
                      <RatingStars rating={s.note} size="sm" showValue />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
