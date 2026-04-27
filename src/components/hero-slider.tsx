"use client";

<<<<<<< HEAD
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaSecondary?: string;
  link: string;
  // Unsplash images — direct CDN URLs, no API key needed
  // Format: https://images.unsplash.com/photo-{id}?w=1200&q=80&fit=crop
  image: string;
  imageMobile: string;
  accent: string; // gradient color
  textDark: boolean;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "Nouvelle collection",
    badgeColor: "bg-white/20 text-white border border-white/30",
    title: "Mode & Style",
    subtitle: "Printemps 2025",
    description: "Découvrez les dernières tendances de la saison. Des pièces intemporelles pour compléter votre garde-robe.",
    cta: "Découvrir la collection",
    ctaSecondary: "Voir les promos",
    link: "/catalogue",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=85&fit=crop&crop=center",
    imageMobile: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80&fit=crop&crop=center",
    accent: "from-slate-900/80 via-slate-800/60 to-transparent",
    textDark: false,
  },
  {
    id: 2,
    badge: "Jusqu'à -40%",
    badgeColor: "bg-red-500 text-white",
    title: "High-Tech &",
    subtitle: "Électronique",
    description: "Les meilleurs smartphones, laptops et accessoires tech au meilleur prix. Livraison gratuite dès 100 €.",
    cta: "Voir les offres",
    ctaSecondary: "Comparer",
    link: "/catalogue?categorieId=1",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&q=85&fit=crop&crop=center",
    imageMobile: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80&fit=crop&crop=center",
    accent: "from-blue-950/85 via-blue-900/60 to-transparent",
    textDark: false,
  },
  {
    id: 3,
    badge: "Maison & Déco",
    badgeColor: "bg-amber-100 text-amber-800",
    title: "Transformez",
    subtitle: "votre intérieur",
    description: "Des meubles et accessoires de décoration soigneusement sélectionnés pour créer l'espace de vos rêves.",
    cta: "Explorer",
    ctaSecondary: "Inspirations",
    link: "/catalogue",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85&fit=crop&crop=center",
    imageMobile: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&fit=crop&crop=center",
    accent: "from-stone-900/75 via-stone-800/50 to-transparent",
    textDark: false,
  },
  {
    id: 4,
    badge: "Sport & Fitness",
    badgeColor: "bg-green-500 text-white",
    title: "Dépassez vos",
    subtitle: "limites",
    description: "Équipez-vous avec du matériel de sport professionnel. Performance et confort réunis pour atteindre vos objectifs.",
    cta: "S'équiper maintenant",
    link: "/catalogue",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=85&fit=crop&crop=center",
    imageMobile: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop&crop=center",
    accent: "from-gray-950/80 via-gray-900/55 to-transparent",
    textDark: false,
=======
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
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
  },
];

export default function HeroSlider() {
<<<<<<< HEAD
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const go = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <div className="relative h-[480px] md:h-[580px] lg:h-[680px]">

        {/* Background image with smooth crossfade */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${animating ? "opacity-0" : "opacity-100"}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          {/* Gradient overlay for text legibility */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.accent}`} />
        </div>

        {/* Content */}
        <div className={`relative z-10 flex h-full items-center transition-all duration-500 ${animating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
          <div className="container mx-auto px-6 md:px-10 lg:px-16">
            <div className="max-w-xl space-y-5">

              {/* Badge */}
              <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase ${slide.badgeColor}`}>
                {slide.badge}
              </span>

              {/* Title */}
              <div>
                <h1 className="text-4xl font-black leading-none tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                  {slide.title}
                </h1>
                <h2 className="text-3xl font-black leading-tight text-white/80 md:text-4xl lg:text-5xl drop-shadow-md">
                  {slide.subtitle}
                </h2>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/85 md:text-base max-w-sm drop-shadow">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 font-bold shadow-lg"
                  asChild
                >
                  <Link href={slide.link} className="flex items-center gap-2">
                    {slide.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                {slide.ctaSecondary && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/60 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold"
                    asChild
                  >
                    <Link href="/catalogue">{slide.ctaSecondary}</Link>
                  </Button>
                )}
=======
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
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
              </div>
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/25 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/45 md:left-6 md:p-3"
          aria-label="Précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/25 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/45 md:right-6 md:p-3"
          aria-label="Suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide counter top-right */}
        <div className="absolute top-5 right-6 z-20 text-xs font-bold text-white/70 tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </div>

      {/* Dot nav + progress bar */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex flex-col items-center gap-3">
        {/* Progress bar for current slide */}
        <div className="w-40 h-0.5 rounded-full bg-white/30 overflow-hidden">
          <div
            key={current}
            className="h-full bg-white rounded-full"
            style={{
              animation: paused ? "none" : "progress 6s linear forwards",
            }}
          />
        </div>
        {/* Dots */}
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { go(i); setPaused(true); setTimeout(() => setPaused(false), 8000); }}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-7 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
=======
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
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
    </section>
  );
}
