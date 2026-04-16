"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createAddressAction, deleteAddressAction } from "@/actions/address.action";
import { Loader2, Plus, MapPin, Trash2, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function CustomerAddressesView({ initialAddresses }: { initialAddresses: any[] }) {
    const [addresses, setAddresses] = useState<any[]>(initialAddresses);
    const [submitting, setSubmitting] = useState(false);
    
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("Bangladesh");
    const [title, setTitle] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
         e.preventDefault();
         setSubmitting(true);
         const res = await createAddressAction({ title, street, city, zipCode, country });
         
         if (res.success) {
              toast.success("Address added");
              setStreet(""); setCity(""); setZipCode(""); setTitle("");
              setIsAdding(false);
              // Optimistic update
              setAddresses(prev => [...prev, res.data]);
         } else {
              toast.error(res.error || "Failed to add address");
         }
         setSubmitting(false);
    };

    const handleDelete = async (id: string) => {
         const prev = [...addresses];
         setAddresses(prev.filter(a => a.id !== id));
         const res = await deleteAddressAction(id);
         if (res.success) {
              toast.success("Address removed");
         } else {
              setAddresses(prev);
              toast.error(res.error || "Failed to remove");
         }
    };

    return (
         <div className="max-w-4xl space-y-6">
              <div className="flex justify-between items-center">
                   <div>
                       <h1 className="text-3xl font-bold tracking-tight">Saved Addresses</h1>
                       <p className="text-muted-foreground">Manage where your food gets delivered.</p>
                   </div>
                   {!isAdding && <Button onClick={() => setIsAdding(true)}><Plus className="w-4 h-4 mr-2" /> Add New</Button>}
              </div>

              {isAdding && (
                   <Card className="border-primary/50 shadow-sm">
                        <CardHeader>
                             <CardTitle>Add New Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <form onSubmit={handleCreate} className="space-y-4">
                                  <div className="space-y-2">
                                       <Label>Label (Home, Office…)</Label>
                                       <Input placeholder="e.g. Home" value={title} onChange={e => setTitle(e.target.value)} />
                                  </div>
                                  <div className="space-y-2">
                                       <Label>Street Address</Label>
                                       <Textarea required value={street} onChange={e => setStreet(e.target.value)} />
                                  </div>
                                  <div className="grid grid-cols-3 gap-4">
                                       <div className="space-y-2">
                                            <Label>City</Label>
                                            <Input required value={city} onChange={e => setCity(e.target.value)} />
                                       </div>
                                       <div className="space-y-2">
                                            <Label>Zip Code</Label>
                                            <Input value={zipCode} onChange={e => setZipCode(e.target.value)} />
                                       </div>
                                       <div className="space-y-2">
                                            <Label>Country</Label>
                                            <Input value={country} onChange={e => setCountry(e.target.value)} />
                                       </div>
                                  </div>
                                  <div className="flex justify-end gap-2 pt-2">
                                       <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                                       <Button type="submit" disabled={submitting}>
                                            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                            Save Address
                                       </Button>
                                  </div>
                             </form>
                        </CardContent>
                   </Card>
              )}

              {addresses.length === 0 ? (
                   <div className="border border-dashed rounded-xl p-12 text-center text-muted-foreground flex flex-col items-center">
                        <MapPin className="w-12 h-12 mb-4 opacity-20" />
                        <p>No addresses saved yet.</p>
                   </div>
              ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map(adr => (
                             <Card key={adr.id} className="relative group overflow-hidden">
                                  <CardContent className="p-6">
                                       <div className="flex items-start gap-4">
                                            <div className="p-3 bg-muted rounded-full flex-shrink-0">
                                                 <MapPin className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="space-y-1 flex-1 min-w-0">
                                                 <div className="flex items-center gap-2 flex-wrap">
                                                      {adr.title && (
                                                           <span className="text-xs font-black uppercase tracking-wide bg-slate-900 text-white px-2 py-0.5 rounded-md">
                                                                {adr.title}
                                                           </span>
                                                      )}
                                                      {adr.isDefault && (
                                                           <span className="text-xs font-black text-primary flex items-center gap-1">
                                                                <Star className="w-3 h-3 fill-primary" /> Default
                                                           </span>
                                                      )}
                                                 </div>
                                                 <p className="font-semibold">{adr.street}</p>
                                                 <p className="text-muted-foreground text-sm">{adr.city}{adr.postalCode ? `, ${adr.postalCode}` : ""}</p>
                                                 <p className="text-muted-foreground text-sm">{adr.country}</p>
                                            </div>
                                       </div>
                                       <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleDelete(adr.id)}
                                       >
                                            <Trash2 className="w-4 h-4" />
                                       </Button>
                                  </CardContent>
                             </Card>
                        ))}
                   </div>
              )}
         </div>
    );
}
