"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-16 md:py-24 dark:from-blue-900 dark:to-indigo-900">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 rounded-full bg-white blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-white blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex justify-center">
            <Mail className="h-10 w-10 text-white" />
          </div>

          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Don't Miss Out Latest Trends & Offers
          </h2>

          <p className="mb-8 text-lg text-blue-100">
            Register to receive news about the latest offers & discount codes
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex gap-2 md:gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 bg-white/90 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-white"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-white font-semibold whitespace-nowrap text-blue-600 hover:bg-blue-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-blue-100">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
