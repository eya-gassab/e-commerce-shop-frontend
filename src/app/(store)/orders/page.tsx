"use client";
<<<<<<< HEAD
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
=======

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Clock, Package, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock order data - in a real app, this would come from an API
const mockOrders = [
  {
    id: "ORD-001",
    date: "2025-01-05",
    status: "delivered",
    total: 156.99,
    items: [
      {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 149.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      },
    ],
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2025-01-03",
  },
  {
    id: "ORD-002",
    date: "2025-01-07",
    status: "shipped",
    total: 89.98,
    items: [
      {
        id: 2,
        title: "Ergonomic Office Chair",
        price: 89.98,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
      },
    ],
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2025-01-10",
  },
  {
    id: "ORD-003",
    date: "2025-01-09",
    status: "processing",
    total: 34.99,
    items: [
      {
        id: 3,
        title: "Smartphone Case",
        price: 24.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1601972602288-f64ba92cbc35?w=500&h=500&fit=crop",
      },
      {
        id: 4,
        title: "Screen Protector",
        price: 9.99,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      },
    ],
    trackingNumber: null,
    estimatedDelivery: "2025-01-15",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "processing":
      return <Clock className="h-4 w-4" />;
    case "shipped":
      return <Truck className="h-4 w-4" />;
    case "delivered":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
        <div className="mt-2">
          <h1 className="text-3xl font-bold">My Orders</h1>
          <p className="text-muted-foreground">
            Track your order status and view order history
          </p>
        </div>
      </div>

      {mockOrders.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Package className="text-muted-foreground mb-4 h-16 w-16" />
            <h3 className="mb-2 text-xl font-semibold">No orders found</h3>
            <p className="text-muted-foreground mb-6 text-center">
              You haven&apos;t placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order {order.id}</CardTitle>
                    <p className="text-muted-foreground text-sm">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                    <p className="mt-2 text-lg font-semibold">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="rounded-md object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
                    <div>
                      <p className="text-muted-foreground font-medium">
                        Estimated Delivery
                      </p>
                      <p>
                        {new Date(order.estimatedDelivery).toLocaleDateString()}
                      </p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <p className="text-muted-foreground font-medium">
                          Tracking Number
                        </p>
                        <p className="font-mono">{order.trackingNumber}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground font-medium">
                        Status
                      </p>
                      <p className="capitalize">{order.status}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  {order.trackingNumber && (
                    <Button variant="outline" size="sm">
                      Track Package
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outline" size="sm">
                      Write Review
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Reorder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Additional Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium">Order Questions</h4>
              <p className="text-muted-foreground mb-2">
                Have questions about your order? We&apos;re here to help.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Returns & Exchanges</h4>
              <p className="text-muted-foreground mb-2">
                30-day return policy on all items. Free returns on orders over
                $50.
              </p>
              <Button variant="outline" size="sm">
                Start Return
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
    </div>
  );
}
