"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CountdownData {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  title?: string;
  description?: string;
  productLink?: string;
  image?: string;
}

export default function CountdownTimer({
  title = "Enhance Your Music Experience",
  description = "MacBook Air M1 chip, 8/256GB",
  productLink = "/products",
  image = "https://via.placeholder.com/300x300?text=Product",
}: CountdownTimerProps) {
  const [countdown, setCountdown] = useState<CountdownData>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      // Set end time to 24 hours from now
      const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const now = new Date();
      const diff = endTime.getTime() - now.getTime();

      if (diff > 0) {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-primary flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold text-white md:h-16 md:w-16 md:text-2xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-xs font-semibold text-gray-600 md:text-sm dark:text-gray-400">
        {label}
      </span>
    </div>
  );

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                {title}
              </h2>
              <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>

            {/* Countdown */}
            <div className="flex gap-3 md:gap-4">
              <CountdownBox value={countdown.days} label="Days" />
              <CountdownBox value={countdown.hours} label="Hours" />
              <CountdownBox value={countdown.minutes} label="Minutes" />
              <CountdownBox value={countdown.seconds} label="Seconds" />
            </div>

            <Link href={productLink}>
              <Button size="lg" className="w-full md:w-auto">
                Check it Out!
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="hidden items-center justify-center lg:flex">
            <img
              src={image}
              alt="Countdown Product"
              className="h-auto max-w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
