"use client";
<<<<<<< HEAD
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
=======

import { Product } from "@/app/api/products/route";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
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

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-muted-foreground text-xs">
              Products in inventory
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">
              Combined product value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgPrice.toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">Per product</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(products.map((p) => p.category).filter(Boolean)).size}
            </div>
            <p className="text-muted-foreground text-xs">Product categories</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/add-product">
              <Button className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="outline" className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" />
                View All Products
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-muted-foreground">No products yet.</p>
            ) : (
              <div className="space-y-2">
                {products.slice(-3).map((product) => (
                  <div key={product.id} className="flex items-center space-x-3">
                    <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-md">
                      <Package className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.title}</p>
                      <p className="text-muted-foreground text-xs">
                        ${product.price.toFixed(2)}
                      </p>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
<<<<<<< HEAD

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
=======
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
      </div>
    </div>
  );
}
