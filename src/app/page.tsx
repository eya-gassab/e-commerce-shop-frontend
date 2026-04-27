<<<<<<< HEAD
import Navbar from "@/components/navbar";
import HeroSlider from "@/components/hero-slider";
import ProductCard from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product, Category, PagedResponse } from "@/types";
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import Link from "next/link";

// Fetch helpers — server components, direct fetch to backend
async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "http://localhost:8097/api/products?size=8&page=0",
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data: PagedResponse<Product> = await res.json();
    return data.content ?? [];
  } catch {
    return [];
  }
}

async function fetchTopSelling(): Promise<Product[]> {
  try {
    const res = await fetch("http://localhost:8097/api/products/top-selling", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
=======
import { Product } from "@/app/api/products/route";
import Navbar from "@/components/navbar";
import EnhancedProductCard from "@/components/enhanced-product-card";
import HeroSlider from "@/components/hero-slider";
import BrowseByCategory from "@/components/browse-by-category";
import PromotionalBanners from "@/components/promotional-banners";
import CountdownTimer from "@/components/countdown-timer";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import NewsletterSignup from "@/components/newsletter-signup";
import ServiceFeatures from "@/components/service-features";
import EnhancedFooter from "@/components/enhanced-footer";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/products`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
    return [];
  }
}

<<<<<<< HEAD
async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch("http://localhost:8097/api/categories", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

// Aesthetic placeholder categories for when DB is empty - Premium monochrome scheme
const FALLBACK_CATEGORIES = [
  {
    id: 1,
    nom: "Mode & Vêtements",
    icon: "◆",
    color: "from-slate-700 to-slate-900",
    img: "https://images.unsplash.com/photo-1558171813-3afe3b90a3f5?w=400&q=80&fit=crop",
  },
  {
    id: 2,
    nom: "Électronique",
    icon: "◉",
    color: "from-slate-700 to-slate-900",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80&fit=crop",
  },
  {
    id: 3,
    nom: "Maison & Déco",
    icon: "⬥",
    color: "from-slate-700 to-slate-900",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80&fit=crop",
  },
  {
    id: 4,
    nom: "Sport & Fitness",
    icon: "▲",
    color: "from-slate-700 to-slate-900",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80&fit=crop",
  },
  {
    id: 5,
    nom: "Beauté & Soins",
    icon: "✦",
    color: "from-slate-700 to-slate-900",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80&fit=crop",
  },
  {
    id: 6,
    nom: "Livres & Culture",
    icon: "⬢",
    color: "from-slate-700 to-slate-900",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80&fit=crop",
  },
];

// Placeholder product cards for when backend has no data
const PLACEHOLDER_PRODUCTS = [
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&fit=crop",
    name: "Montre Premium",
    price: "249.00",
    promo: "179.00",
  },
  {
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&q=80&fit=crop",
    name: "Soin Visage Luxe",
    price: "89.00",
    promo: null,
  },
  {
    img: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80&fit=crop",
    name: "Baskets Running",
    price: "129.00",
    promo: "99.00",
  },
  {
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80&fit=crop",
    name: 'Laptop 14" Pro',
    price: "1299.00",
    promo: null,
  },
];

const TRUST_FEATURES = [
  { icon: Truck, title: "Livraison gratuite", desc: "Dès 100 € d'achat" },
  { icon: Shield, title: "Paiement sécurisé", desc: "SSL & 3D Secure" },
  {
    icon: RefreshCw,
    title: "Retours 30 jours",
    desc: "Satisfait ou remboursé",
  },
  { icon: Headphones, title: "Support 7j/7", desc: "Réponse sous 24h" },
];

export default async function Home() {
  const [products, topSelling, categories] = await Promise.all([
    fetchProducts(),
    fetchTopSelling(),
    fetchCategories(),
  ]);

  const hasProducts = products.length > 0;
  const promoProducts = products.filter((p) => p.prixPromo);
  const newArrivals = products.slice(0, 8);
=======
export default async function Home() {
  const products = await getProducts();

  // Generate discount percentages for demo purposes
  const getDiscount = (id: number): number => {
    const discounts = [12, 15, 8, 20, 10, 25, 18, 11];
    return discounts[id % discounts.length];
  };

  // Separate products for different sections
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(0, 6);
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
<<<<<<< HEAD
        {/* ── Hero Slider ── */}
        <HeroSlider />

        {/* ── Trust bar ── */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
          <div className="container mx-auto px-4">
            <div className="divide-border grid grid-cols-2 divide-x md:grid-cols-4">
              {TRUST_FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 px-4 py-4 md:py-5"
                >
                  <div className="flex-shrink-0 rounded-full bg-amber-100 p-2">
                    <Icon className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{title}</p>
                    <p className="text-xs text-slate-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Categories ── */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-14">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-bold tracking-widest text-amber-600 uppercase">
                  Explorez
                </p>
                <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                  Nos catégories
                </h2>
              </div>
              <Link
                href="/catalogue"
                className="flex items-center gap-1 text-sm font-semibold text-amber-600 hover:underline"
              >
                Tout voir <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/catalogue?categorieId=${cat.id}`}>
                    <Badge
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground hover:border-primary cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200"
                    >
                      {cat.nom}
                    </Badge>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {FALLBACK_CATEGORIES.map((cat) => (
                  <Link key={cat.id} href="/catalogue" className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src={cat.img}
                        alt={cat.nom}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70 transition-opacity group-hover:opacity-80`}
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white">
                        <span className="mb-1 text-2xl">{cat.icon}</span>
                        <p className="text-center text-xs leading-tight font-bold">
                          {cat.nom}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Elegant Promo Banner ── */}
        {promoProducts.length > 0 && (
          <div className="border-b border-amber-500/30 bg-gradient-to-r from-slate-900 to-slate-800 py-4 text-center text-sm font-semibold tracking-wide text-white">
            <span className="text-amber-400">✨</span> Sélection premium —
            jusqu'à -40% sur nos collections{" "}
            <span className="text-amber-400">✨</span>{" "}
            <Link
              href="/catalogue?promo=true"
              className="font-bold text-amber-400 underline underline-offset-2 hover:no-underline"
            >
              Découvrir →
            </Link>
          </div>
        )}

        {/* ── New Arrivals ── */}
        <section className="bg-gradient-to-b from-white to-slate-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-bold tracking-widest text-amber-600 uppercase">
                  Nouveautés
                </p>
                <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                  Derniers arrivages
                </h2>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/catalogue" className="flex items-center gap-2">
                  Voir tout <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {hasProducts ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                {newArrivals.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              /* Aesthetic placeholders when backend has no data yet */
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
                {PLACEHOLDER_PRODUCTS.map((p, i) => (
                  <div
                    key={i}
                    className="group bg-card overflow-hidden rounded-2xl border shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="bg-muted relative aspect-square overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {p.promo && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          -
                          {Math.round(
                            (1 - parseFloat(p.promo) / parseFloat(p.price)) *
                              100
                          )}
                          %
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 p-4">
                      <p className="text-muted-foreground text-xs">ShopFlow</p>
                      <p className="line-clamp-1 text-sm font-semibold">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        {p.promo ? (
                          <>
                            <span className="text-sm font-bold text-red-600">
                              {p.promo} €
                            </span>
                            <span className="text-muted-foreground text-xs line-through">
                              {p.price} €
                            </span>
                          </>
                        ) : (
                          <span className="text-sm font-bold">{p.price} €</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!hasProducts && (
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  ⚙️ Démarrez Spring Boot sur le port 8097 pour charger les
                  vrais produits
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Best Sellers ── */}
        {topSelling.length > 0 && (
          <section className="bg-gradient-to-b from-slate-50 to-white py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="mb-1 text-xs font-bold tracking-widest text-amber-600 uppercase">
                    Populaires
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                    Meilleures ventes
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                {topSelling.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Promo Section ── */}
        {promoProducts.length > 0 && (
          <section className="bg-gradient-to-b from-slate-50 to-white py-16">
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <p className="mb-1 text-xs font-bold tracking-widest text-amber-600 uppercase">
                  Sélection Premium
                </p>
                <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                  ✨ Nos Promotions Exclusives
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
                {promoProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Full-width CTA Banner ── */}
        <section className="relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80&fit=crop&crop=center"
            alt="Promotions"
            className="h-72 w-full object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center bg-gradient-to-r from-slate-900/80 to-slate-900/40">
            <div className="container mx-auto px-6 md:px-10">
              <p className="mb-2 text-xs font-bold tracking-widest text-amber-300 uppercase">
                Offre exclusive
              </p>
              <h3 className="mb-4 max-w-md text-3xl font-black text-white md:text-4xl">
                Livraison gratuite dès 100 €
              </h3>
              <Button
                size="lg"
                className="bg-white font-bold text-slate-900 hover:bg-amber-50"
                asChild
              >
                <Link href="/catalogue" className="flex items-center gap-2">
                  Découvrir <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-0 border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-lg font-black text-white">ShopFlow</h4>
              <p className="text-xs leading-relaxed text-slate-400">
                Votre marketplace de confiance pour des produits de qualité,
                livrés rapidement et en toute sécurité.
              </p>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-bold text-white">Boutique</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link
                    href="/catalogue"
                    className="transition-colors hover:text-amber-400"
                  >
                    Catalogue
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogue?promo=true"
                    className="transition-colors hover:text-amber-400"
                  >
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/catalogue"
                    className="transition-colors hover:text-amber-400"
                  >
                    Nouveautés
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-bold text-white">Mon compte</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link
                    href="/orders"
                    className="transition-colors hover:text-amber-400"
                  >
                    Mes commandes
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="transition-colors hover:text-amber-400"
                  >
                    Mon profil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="transition-colors hover:text-amber-400"
                  >
                    Connexion
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="mb-3 text-sm font-bold text-white">Aide</h5>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <span className="cursor-pointer text-slate-400 transition-colors hover:text-amber-400">
                    Livraison & retours
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-slate-400 transition-colors hover:text-amber-400">
                    Politique de confidentialité
                  </span>
                </li>
                <li>
                  <span className="cursor-pointer text-slate-400 transition-colors hover:text-amber-400">
                    Contact
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 sm:flex-row">
            <p className="text-xs text-slate-500">
              © 2025 ShopFlow. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2">
              {["◆", "◉", "⬥", "✦"].map((icon, i) => (
                <span key={i} className="text-lg">
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
=======
        {/* Hero Slider */}
        <HeroSlider />

        {/* Browse by Category */}
        <BrowseByCategory />

        {/* Promotional Banners */}
        <PromotionalBanners />

        {/* New Arrivals Section */}
        <section className="bg-white py-16 md:py-24 dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                New Arrivals
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover our latest products and exclusive collections
              </p>
            </div>

            {newArrivals.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {newArrivals.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    discount={getDiscount(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No products available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Countdown Timer Section */}
        <CountdownTimer />

        {/* Best Selling Products Section */}
        <section className="bg-slate-50 py-16 md:py-24 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                Best Selling Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                These top picks are flying off the shelves! Find out what
                everyone's loving right now.
              </p>
            </div>

            {bestSellers.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {bestSellers.map((product) => (
                  <EnhancedProductCard
                    key={product.id}
                    product={product}
                    discount={getDiscount(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  No products available at the moment.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsCarousel />

        {/* Service Features */}
        <ServiceFeatures />

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>

      {/* Footer */}
      <EnhancedFooter />
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
    </div>
  );
}
