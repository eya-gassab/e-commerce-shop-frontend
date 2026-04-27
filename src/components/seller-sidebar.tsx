"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, ShoppingCart, LogOut, Store } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/seller", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "Mes produits", icon: Package },
  { href: "/seller/orders", label: "Commandes reçues", icon: ShoppingCart },
];

export default function SellerSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  return (
    <aside className="w-64 border-r bg-card flex flex-col">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 mb-1">
          <Store className="h-5 w-5 text-primary" />
          <span className="font-bold text-lg">Espace Vendeur</span>
        </div>
        <p className="text-xs text-muted-foreground">{user?.prenom} {user?.nom}</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href}>
            <span className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}>
              <Icon className="h-4 w-4" />{label}
            </span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={logout}>
          <LogOut className="h-4 w-4 mr-2" />Se déconnecter
        </Button>
      </div>
    </aside>
  );
}
