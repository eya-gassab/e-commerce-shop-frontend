"use client";

import { Truck, RotateCcw, Shield, Headphones } from "lucide-react";

interface ServiceFeature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const services: ServiceFeature[] = [
  {
    id: 1,
    title: "Free Shipping",
    description: "For all orders $200",
    icon: <Truck className="h-8 w-8" />,
  },
  {
    id: 2,
    title: "1 & 1 Returns",
    description: "Cancellation after 1 day",
    icon: <RotateCcw className="h-8 w-8" />,
  },
  {
    id: 3,
    title: "100% Secure Payments",
    description: "Guarantee secure payments",
    icon: <Shield className="h-8 w-8" />,
  },
  {
    id: 4,
    title: "24/7 Dedicated Support",
    description: "Anywhere & anytime",
    icon: <Headphones className="h-8 w-8" />,
  },
];

export default function ServiceFeatures() {
  return (
    <section className="bg-slate-50 py-12 md:py-16 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col items-center rounded-lg bg-white p-6 text-center transition-shadow hover:shadow-lg dark:bg-slate-800"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
