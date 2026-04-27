"use client";

import Link from "next/link";
import { Share2, MapPin, Mail, Phone, Heart } from "lucide-react";

export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-100">
      {/* Main Footer */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">EcomStore</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                Your one-stop shop for amazing products at unbeatable prices.
                Discover quality and excellence in every purchase.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                  aria-label="Facebook"
                >
                  <Share2 className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                  aria-label="Twitter"
                >
                  <Share2 className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                  aria-label="Instagram"
                >
                  <Share2 className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Share2 className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: "Shop", href: "/products" },
                  { name: "Cart", href: "/cart" },
                  { name: "Wishlist", href: "/wishlist" },
                  { name: "About Us", href: "#" },
                  { name: "Contact", href: "#" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <ul className="space-y-2">
                {[
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms & Conditions", href: "#" },
                  { name: "Refund Policy", href: "#" },
                  { name: "FAQ", href: "#" },
                  { name: "Blog", href: "#" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex gap-3 text-sm text-slate-400">
                  <MapPin className="text-primary h-5 w-5 flex-shrink-0" />
                  <span>685 Market Street, Las Vegas, LA 95820, USA</span>
                </div>
                <div className="flex gap-3 text-sm text-slate-400">
                  <Phone className="text-primary h-5 w-5 flex-shrink-0" />
                  <a
                    href="tel:+0995327869843"
                    className="transition-colors hover:text-white"
                  >
                    (+099) 532-786-9843
                  </a>
                </div>
                <div className="flex gap-3 text-sm text-slate-400">
                  <Mail className="text-primary h-5 w-5 flex-shrink-0" />
                  <a
                    href="mailto:support@ecomstore.com"
                    className="transition-colors hover:text-white"
                  >
                    support@ecomstore.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-400">
            © {currentYear} EcomStore. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            <span>by EcomStore Team</span>
          </div>

          <div className="flex gap-3">
            {["Visa", "Mastercard", "PayPal", "Google Pay"].map((payment) => (
              <div
                key={payment}
                className="rounded bg-slate-800 px-3 py-1 text-xs text-slate-400"
              >
                {payment}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
