"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PromoItem {
  id: number;
  title: string;
  description: string;
  discount: string;
  cta: string;
  link: string;
  image?: string;
  bgColor: string;
}

const promos: PromoItem[] = [
  {
    id: 1,
    title: "iPhone 14 Premium",
    description:
      "iPhone 14 has the same superspeedy chip that's in iPhone 13 Pro, A15 Bionic, with a 5‑core GPU, powers all the latest features.",
    discount: "UP TO 30% OFF",
    cta: "Purchase Now",
    link: "/products",
    bgColor: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Foldable Motorised Treadmill",
    description:
      "Workout at home with our latest foldable treadmill collection",
    discount: "Flat 20% off",
    cta: "Grab the deal",
    link: "/products",
    bgColor: "from-green-500 to-green-600",
  },
  {
    id: 3,
    title: "Apple Watch Ultra",
    description:
      "The aerospace-grade titanium case strikes the perfect balance of everything.",
    discount: "Up to 40% off",
    cta: "Grab the deal",
    link: "/products",
    bgColor: "from-purple-500 to-purple-600",
  },
];

export default function PromotionalBanners() {
  return (
    <section className="bg-white py-16 md:py-24 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {promos.map((promo) => (
            <Link key={promo.id} href={promo.link}>
              <div
                className={`bg-gradient-to-br ${promo.bgColor} group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-lg p-8 text-white transition-all duration-300 hover:shadow-2xl`}
              >
                {/* Background effect */}
                <div className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20">
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-white blur-3xl"></div>
                </div>

                <div className="relative z-10">
                  <div className="mb-4 inline-block rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                    <span className="text-sm font-bold">{promo.discount}</span>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold md:text-3xl">
                    {promo.title}
                  </h3>

                  <p className="mb-6 text-sm leading-relaxed text-white/90">
                    {promo.description}
                  </p>
                </div>

                <div className="relative z-10">
                  <Button
                    className="w-full bg-white font-semibold text-slate-900 hover:bg-slate-100 md:w-auto"
                    variant="default"
                  >
                    {promo.cta}
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
