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
         <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Saved Addresses</h1>
                        <p className="text-sm text-gray-500">Manage where your food gets delivered</p>
                    </div>
                </div>
                {!isAdding && (
                    <Button onClick={() => setIsAdding(true)} className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-sm border-0 gap-2">
                        <Plus className="w-4 h-4" /> Add New Address
                    </Button>
                )}
            </div>

              {isAdding && (
                   <Card className="border-orange-100/50 shadow-sm rounded-xl overflow-hidden">
                        <CardHeader className="bg-gray-50/30 border-b border-gray-100 pb-4">
                             <CardTitle className="text-sm font-semibold text-gray-700">Add New Address</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                             <form onSubmit={handleCreate} className="space-y-4">
                                  <div className="space-y-2">
                                       <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Label (Home, Office…)</Label>
                                       <Input className="rounded-xl border-gray-200 focus:ring-orange-500/20" placeholder="e.g. Home" value={title} onChange={e => setTitle(e.target.value)} />
                                  </div>
                                  <div className="space-y-2">
                                       <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Street Address</Label>
                                       <Textarea className="rounded-xl border-gray-200 focus:ring-orange-500/20" required value={street} onChange={e => setStreet(e.target.value)} />
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                       <div className="space-y-2">
                                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">City</Label>
                                            <Input className="rounded-xl border-gray-200 focus:ring-orange-500/20" required value={city} onChange={e => setCity(e.target.value)} />
                                       </div>
                                       <div className="space-y-2">
                                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Zip Code</Label>
                                            <Input className="rounded-xl border-gray-200 focus:ring-orange-500/20" value={zipCode} onChange={e => setZipCode(e.target.value)} />
                                       </div>
                                       <div className="space-y-2">
                                            <Label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Country</Label>
                                            <Input className="rounded-xl border-gray-200 focus:ring-orange-500/20" value={country} onChange={e => setCountry(e.target.value)} />
                                       </div>
                                  </div>
                                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-6">
                                       <Button type="button" variant="outline" className="rounded-xl border-gray-200" onClick={() => setIsAdding(false)}>Cancel</Button>
                                       <Button type="submit" disabled={submitting} className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                                            {submitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                            Save Address
                                       </Button>
                                  </div>
                             </form>
                        </CardContent>
                   </Card>
              )}

              {addresses.length === 0 ? (
                   <div className="border border-dashed border-gray-200 bg-white rounded-xl p-12 text-center text-gray-400 flex flex-col items-center">
                        <MapPin className="w-12 h-12 mb-4 text-gray-200" />
                        <p className="text-sm font-medium">No addresses saved yet.</p>
                   </div>
              ) : (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {addresses.map(adr => (
                             <Card key={adr.id} className="relative group overflow-hidden rounded-xl border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-orange-100 bg-white">
                                  <CardContent className="p-6">
                                       <div className="flex items-start gap-4">
                                            <div className="p-3 bg-orange-50 rounded-xl flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                                                 <MapPin className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div className="space-y-1 flex-1 min-w-0">
                                                 <div className="flex items-center gap-2 flex-wrap mb-1">
                                                      {adr.title && (
                                                           <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md">
                                                                {adr.title}
                                                           </span>
                                                      )}
                                                      {adr.isDefault && (
                                                           <span className="text-[10px] font-bold uppercase tracking-wider text-orange-500 flex items-center gap-1">
                                                                <Star className="w-3 h-3 fill-orange-500" /> Default
                                                           </span>
                                                      )}
                                                 </div>
                                                 <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{adr.street}</p>
                                                 <p className="text-gray-500 text-sm">{adr.city}{adr.postalCode ? `, ${adr.postalCode}` : ""}</p>
                                                 <p className="text-gray-400 text-xs">{adr.country}</p>
                                            </div>
                                       </div>
                                       <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="absolute top-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 transition-all rounded-lg h-8 w-8"
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
