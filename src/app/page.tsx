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
    return [];
  }
}

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

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main>
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
    </div>
  );
}
