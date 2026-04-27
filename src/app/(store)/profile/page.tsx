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
import { useAuth } from "@/contexts/auth-context";
import { auth as authApi, addresses as addressesApi } from "@/lib/api";
import type { Address } from "@/types";
import { User, MapPin, Plus, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showNewAddr, setShowNewAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ rue: "", ville: "", codePostal: "", pays: "Tunisie" });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) { router.push("/login"); return; }
    if (user) { setPrenom(user.prenom); setNom(user.nom); }
    addressesApi.getAll().then(r => setAddresses(r.data)).catch(() => {});
  }, [user, isAuthenticated, isLoading, router]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await authApi.updateProfile({ prenom, nom });
      toast.success("Profil mis à jour !");
    } catch { toast.error("Erreur lors de la mise à jour"); }
    finally { setSaving(false); }
  };

  const handleAddAddress = async () => {
    try {
      const res = await addressesApi.create(newAddr);
      setAddresses(prev => [...prev, res.data]);
      setNewAddr({ rue: "", ville: "", codePostal: "", pays: "Tunisie" });
      setShowNewAddr(false);
      toast.success("Adresse ajoutée");
    } catch { toast.error("Erreur lors de l'ajout"); }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await addressesApi.delete(id);
      setAddresses(prev => prev.filter(a => a.id !== id));
      toast.success("Adresse supprimée");
    } catch { toast.error("Impossible de supprimer"); }
  };

  const handleSetPrincipal = async (id: number) => {
    try {
      await addressesApi.setPrincipal(id);
      setAddresses(prev => prev.map(a => ({ ...a, principal: a.id === id })));
      toast.success("Adresse principale définie");
    } catch { toast.error("Erreur"); }
  };

  return (
    <div className="min-h-screen bg-background"><Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile card */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Informations personnelles</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="text-center mb-4">
                <Badge variant="secondary">{user?.role}</Badge>
                <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Prénom</Label><Input value={prenom} onChange={e => setPrenom(e.target.value)} /></div>
                <div><Label>Nom</Label><Input value={nom} onChange={e => setNom(e.target.value)} /></div>
              </div>
              <div><Label>Email</Label><Input value={user?.email ?? ""} disabled className="bg-muted" /></div>
              <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Mes adresses</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {addresses.length === 0 && !showNewAddr && (
                <p className="text-muted-foreground text-sm text-center py-4">Aucune adresse enregistrée</p>
              )}
              {addresses.map(addr => (
                <div key={addr.id} className={`p-3 rounded-lg border ${addr.principal ? "border-primary bg-primary/5" : "border-border"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium">{addr.rue}</p>
                      <p className="text-xs text-muted-foreground">{addr.codePostal} {addr.ville}, {addr.pays}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {!addr.principal && (
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => handleSetPrincipal(addr.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" /> Principale
                        </Button>
                      )}
                      {addr.principal && <Badge className="text-xs">Principal</Badge>}
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500" onClick={() => handleDeleteAddress(addr.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => setShowNewAddr(!showNewAddr)}>
                <Plus className="h-4 w-4 mr-2" /> Ajouter une adresse
              </Button>
              {showNewAddr && (
                <div className="border rounded-lg p-4 space-y-3 bg-muted/30">
                  <div><Label>Rue</Label><Input placeholder="123 Rue..." value={newAddr.rue} onChange={e => setNewAddr(p => ({...p, rue: e.target.value}))} /></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><Label>Ville</Label><Input value={newAddr.ville} onChange={e => setNewAddr(p => ({...p, ville: e.target.value}))} /></div>
                    <div><Label>Code postal</Label><Input value={newAddr.codePostal} onChange={e => setNewAddr(p => ({...p, codePostal: e.target.value}))} /></div>
                  </div>
                  <div><Label>Pays</Label><Input value={newAddr.pays} onChange={e => setNewAddr(p => ({...p, pays: e.target.value}))} /></div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddAddress}>Enregistrer</Button>
                    <Button size="sm" variant="outline" onClick={() => setShowNewAddr(false)}>Annuler</Button>
                  </div>
                </div>
              )}
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
import { Textarea } from "@/components/ui/textarea";

import { useAuth } from "@/contexts/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const profileFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { isAdmin } = useAuth();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: isAdmin ? "Admin" : "John",
      lastName: isAdmin ? "User" : "Doe",
      email: isAdmin ? "admin@ecomstore.com" : "john.doe@example.com",
      phone: "(555) 123-4567",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      bio: isAdmin ? "Administrator of EcomStore" : "Customer since 2024",
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      // Simulate API call
      toast.loading("Updating profile...");

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Profile updated:", values);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
        <div className="mt-2">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary/10 mb-4 flex h-24 w-24 items-center justify-center rounded-full">
                  <User className="text-primary h-12 w-12" />
                </div>
                <h3 className="text-xl font-semibold">
                  {form.watch("firstName")} {form.watch("lastName")}
                </h3>
                <p className="text-muted-foreground">{form.watch("email")}</p>
                {isAdmin && (
                  <span className="mt-2 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    Administrator
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <span>{form.watch("email")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="text-muted-foreground h-4 w-4" />
                  <span>{form.watch("phone")}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="text-muted-foreground h-4 w-4" />
                  <span>
                    {form.watch("city")}, {form.watch("state")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="text-muted-foreground h-4 w-4" />
                  <span>Member since January 2024</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Orders</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="font-semibold">$1,247.85</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wishlist Items</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Loyalty Points</span>
                <span className="font-semibold">1,248 pts</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Personal Information
                    </h3>
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
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself..."
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address Information</h3>
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
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
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
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="flex-1"
                    >
                      {form.formState.isSubmitting
                        ? "Updating..."
                        : "Update Profile"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </Form>
>>>>>>> 3d2ca38e0b5a15ab3d1000c2394426c1b16e36e6
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
