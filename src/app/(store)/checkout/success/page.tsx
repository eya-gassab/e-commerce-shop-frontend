<<<<<<< HEAD
"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <CheckCircle className="h-14 w-14 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Commande confirmée ! 🎉</h1>
        <p className="text-muted-foreground mb-8">
          Votre commande a été passée avec succès.<br />
          Vous pouvez suivre son état dans votre espace client.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/orders"><Package className="h-4 w-4 mr-2" />Suivre ma commande</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/catalogue">Continuer les achats</Link>
          </Button>
=======
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Package } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  // Generate a random order number for demo
  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
          <h1 className="text-3xl font-bold text-green-700">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center">
              <Package className="mr-2 h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="mb-1 text-sm font-medium">Order Number</p>
              <p className="text-2xl font-bold">{orderNumber}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <p className="mb-1 font-medium">Estimated Delivery</p>
                <p className="text-muted-foreground">
                  {new Date(
                    Date.now() + 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="mb-1 font-medium">Order Status</p>
                <p className="text-green-600">Processing</p>
              </div>
            </div>

            <div className="text-muted-foreground space-y-1 text-sm">
              <p>📧 A confirmation email has been sent to your email address</p>
              <p>
                📦 You&apos;ll receive tracking information once your order
                ships
              </p>
              <p>💬 Questions? Contact our support team anytime</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <Link href="/orders" className="w-full">
              <Button className="w-full">
                <Package className="mr-2 h-4 w-4" />
                Track Your Order
              </Button>
            </Link>
          </div>

          <p className="text-muted-foreground text-sm">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
        </div>
      </div>
    </div>
  );
}
