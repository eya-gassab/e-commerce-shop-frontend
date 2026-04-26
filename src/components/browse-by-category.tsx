"use client";

import Link from "next/link";
import {
  Laptop,
  Watch,
  Smartphone,
  Dumbbell,
  Home,
  Gamepad2,
  Tv,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  link: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Laptop & PC",
    icon: <Laptop className="h-8 w-8" />,
    link: "/products?category=laptop-pc",
  },
  {
    id: 2,
    name: "Watches",
    icon: <Watch className="h-8 w-8" />,
    link: "/products?category=watches",
  },
  {
    id: 3,
    name: "Mobile & Tablets",
    icon: <Smartphone className="h-8 w-8" />,
    link: "/products?category=mobile-tablets",
  },
  {
    id: 4,
    name: "Health & Sports",
    icon: <Dumbbell className="h-8 w-8" />,
    link: "/products?category=health-sports",
  },
  {
    id: 5,
    name: "Home Appliances",
    icon: <Home className="h-8 w-8" />,
    link: "/products?category=home-appliances",
  },
  {
    id: 6,
    name: "Games & Videos",
    icon: <Gamepad2 className="h-8 w-8" />,
    link: "/products?category=games-videos",
  },
  {
    id: 7,
    name: "Televisions",
    icon: <Tv className="h-8 w-8" />,
    link: "/products?category=televisions",
  },
];

export default function BrowseByCategory() {
  return (
    <section className="bg-white py-16 md:py-24 dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Browse by Category
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={category.link}>
              <div className="group cursor-pointer rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-8 dark:from-slate-800 dark:to-slate-900">
                <div className="text-primary mb-4 flex justify-center transition-transform group-hover:scale-110">
                  {category.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 md:text-base dark:text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
