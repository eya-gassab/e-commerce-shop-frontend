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
        </div>
      </div>
    </div>
  );
}
