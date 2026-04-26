"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  discount: string;
  cta: string;
  link: string;
  image: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    title: "iPhone 16 Pro & 16 Pro Max",
    description: "Get your desired phone from featured category",
    discount: "30% SALE OFF",
    cta: "Shop Now",
    link: "/products",
    image: "https://via.placeholder.com/600x400?text=iPhone+16+Pro",
  },
  {
    id: 2,
    title: "MacBook Air M1 chip, 8/256GB",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    discount: "29% SALE OFF",
    cta: "Shop Now",
    link: "/products",
    image: "https://via.placeholder.com/600x400?text=MacBook+Air",
  },
  {
    id: 3,
    title: "Premium Electronics Sale",
    description: "Explore our collection of latest tech gadgets",
    discount: "20% SALE OFF",
    cta: "Shop Now",
    link: "/products",
    image: "https://via.placeholder.com/600x400?text=Electronics",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 5000);
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="relative h-96 md:h-[500px] lg:h-[600px]">
        {/* Slide Container */}
        <div className="relative flex h-full w-full items-center">
          <div className="relative z-10 container mx-auto flex h-full items-center px-4">
            <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
              {/* Content */}
              <div className="space-y-4 md:space-y-6">
                <div className="inline-block">
                  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                    {slide.discount}
                  </span>
                </div>

                <h1 className="text-3xl leading-tight font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                  {slide.title}
                </h1>

                <p className="text-base text-gray-600 md:text-lg dark:text-gray-400">
                  {slide.description}
                </p>

                <Link href={slide.link}>
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    {slide.cta}
                  </Button>
                </Link>
              </div>

              {/* Image */}
              <div className="hidden items-center justify-center lg:flex">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-auto max-w-full rounded-lg object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white md:left-8 md:p-3 dark:bg-slate-800/80 dark:hover:bg-slate-700"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 transition-colors hover:bg-white md:right-8 md:p-3 dark:bg-slate-800/80 dark:hover:bg-slate-700"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "w-2 bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
