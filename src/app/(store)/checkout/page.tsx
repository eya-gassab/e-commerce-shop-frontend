"use client";
<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { addresses as addressesApi, orders } from "@/lib/api";
import type { Address } from "@/types";
import { MapPin, Plus, CheckCircle, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, isLoading } = useAuth();
  const [myAddresses, setMyAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [newAddr, setNewAddr] = useState({ rue: "", ville: "", codePostal: "", pays: "Tunisie" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) { router.push("/login"); return; }
    if (isAuthenticated) {
      addressesApi.getAll().then(r => {
        setMyAddresses(r.data);
        const principal = r.data.find(a => a.principal);
        if (principal) setSelectedAddressId(principal.id);
        else if (r.data.length > 0) setSelectedAddressId(r.data[0].id);
        else setShowNewAddress(true);
      }).catch(() => setShowNewAddress(true));
    }
  }, [isAuthenticated, isLoading, router]);

  const handleAddAddress = async () => {
    if (!newAddr.rue || !newAddr.ville || !newAddr.codePostal) { toast.error("Remplissez tous les champs"); return; }
    try {
      const res = await addressesApi.create(newAddr);
      setMyAddresses(prev => [...prev, res.data]);
      setSelectedAddressId(res.data.id);
      setShowNewAddress(false);
      toast.success("Adresse ajoutée");
    } catch { toast.error("Erreur lors de l'ajout de l'adresse"); }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) { toast.error("Sélectionnez une adresse de livraison"); return; }
    setPlacing(true);
    try {
      await orders.createFromCart(selectedAddressId);
      clearCart();
      toast.success("Commande passée avec succès !");
      router.push("/checkout/success");
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Erreur lors de la commande");
    } finally { setPlacing(false); }
  };

  const deliveryFee = totalPrice >= 100 ? 0 : 9.99;

  if (items.length === 0) return (
    <div className="min-h-screen"><Navbar />
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <Button asChild><Link href="/catalogue">Parcourir le catalogue</Link></Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Finaliser la commande</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Address selection */}
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Adresse de livraison</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {myAddresses.map(addr => (
                  <button key={addr.id} onClick={() => setSelectedAddressId(addr.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${selectedAddressId === addr.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{addr.rue}</p>
                        <p className="text-sm text-muted-foreground">{addr.codePostal} {addr.ville}, {addr.pays}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {addr.principal && <Badge variant="secondary" className="text-xs">Principal</Badge>}
                        {selectedAddressId === addr.id && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                    </div>
                  </button>
                ))}

                <Button variant="outline" className="w-full" onClick={() => setShowNewAddress(!showNewAddress)}>
                  <Plus className="h-4 w-4 mr-2" /> Nouvelle adresse
                </Button>

                {showNewAddress && (
                  <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                    <h4 className="font-semibold">Ajouter une adresse</h4>
                    <div>
                      <Label>Rue</Label>
                      <Input placeholder="123 Rue de la Paix" value={newAddr.rue} onChange={e => setNewAddr(p => ({...p, rue: e.target.value}))} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Ville</Label><Input placeholder="Tunis" value={newAddr.ville} onChange={e => setNewAddr(p => ({...p, ville: e.target.value}))} /></div>
                      <div><Label>Code postal</Label><Input placeholder="1000" value={newAddr.codePostal} onChange={e => setNewAddr(p => ({...p, codePostal: e.target.value}))} /></div>
                    </div>
                    <div><Label>Pays</Label><Input value={newAddr.pays} onChange={e => setNewAddr(p => ({...p, pays: e.target.value}))} /></div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddAddress}>Enregistrer</Button>
                      <Button variant="outline" onClick={() => setShowNewAddress(false)}>Annuler</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delivery info */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Livraison standard — {deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} €`}</p>
                    <p className="text-muted-foreground">Livraison gratuite dès 100 € d'achat · 3-5 jours ouvrés</p>
                  </div>
=======

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const checkoutFormSchema = z.object({
  // Shipping Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),

  // Payment Information
  cardNumber: z.string().min(16, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Expiry date must be MM/YY format"),
  cvv: z.string().min(3, "CVV must be 3 digits"),
  cardholderName: z.string().min(2, "Cardholder name is required"),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    console.log("Form values:", values);
    try {
      // Simulate API call
      toast.loading("Processing your order...");

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear the cart
      clearCart();

      toast.success("Order placed successfully!");

      // Redirect to success page
      router.push("/checkout/success");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to process order. Please try again.");
    }
  };

  const shippingCost = totalPrice >= 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6 text-center">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-muted-foreground">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          {/* Checkout Form */}
          <div className="space-y-8 lg:col-span-2">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="(555) 123-4567"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="NY">New York</SelectItem>
                            <SelectItem value="CA">California</SelectItem>
                            <SelectItem value="TX">Texas</SelectItem>
                            <SelectItem value="FL">Florida</SelectItem>
                            <SelectItem value="IL">Illinois</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="US">United States</SelectItem>
                          <SelectItem value="CA">Canada</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                          <SelectItem value="AU">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardholderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Lock className="h-4 w-4" />
                  Your payment information is secure and encrypted
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
                </div>
              </CardContent>
            </Card>
          </div>

<<<<<<< HEAD
          {/* Order summary */}
          <Card className="h-fit sticky top-4">
            <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      {item.images?.[0] && <Image src={item.images[0]} alt={item.nom} fill className="object-cover" unoptimized />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.nom}</p>
                      <p className="text-xs text-muted-foreground">× {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">{((item.prixPromo ?? item.prix) * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm"><span>Sous-total</span><span>{totalPrice.toFixed(2)} €</span></div>
                <div className="flex justify-between text-sm"><span>Livraison</span><span>{deliveryFee === 0 ? "Gratuite" : `${deliveryFee.toFixed(2)} €`}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total</span><span>{(totalPrice + deliveryFee).toFixed(2)} €</span>
                </div>
              </div>
              <Button size="lg" className="w-full" onClick={handlePlaceOrder}
                disabled={placing || !selectedAddressId}>
                {placing ? "Traitement..." : "Confirmer la commande"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">🔒 Paiement sécurisé · Satisfait ou remboursé</p>
            </CardContent>
          </Card>
        </div>
      </div>
=======
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="relative h-12 w-12 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="rounded-md object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {item.title}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Subtotal (
                      {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      items)
                    </span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Processing..."
                    : "Place Order"}
                </Button>

                <div className="text-muted-foreground space-y-1 text-xs">
                  <p>✓ Secure 256-bit SSL encryption</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Free returns on all orders</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
    </div>
  );
}
