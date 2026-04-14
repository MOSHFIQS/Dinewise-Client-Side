"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart";
import { toast } from "sonner";
import { ShoppingCart, Star, Plus, Eye, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MenuGrid({ initialItems, categories, isHome = false }: { initialItems: any[], categories?: any[], isHome?: boolean }) {
    const [selectedCat, setSelectedCat] = useState<string>("ALL");
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAdd = (item: any) => {
         addToCart({
              menuItemId: item.id,
              name: item.name,
              price: item.discountPrice || item.price,
              image: item.images[0] || null,
         });
         toast.success(`${item.name} added! 🍴`);
    };

    const filtered = selectedCat === "ALL" 
         ? initialItems 
         : initialItems.filter(i => i.categoryId === selectedCat);

    return (
        <div className="w-full">
            {!isHome && categories && (
                <div className="flex flex-wrap gap-3 justify-center mb-16 px-4">
                     <button 
                        className={cn(
                            "px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all border-2",
                            selectedCat === "ALL" 
                                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                                : "bg-white text-slate-400 border-slate-100 hover:border-primary/20 hover:text-primary"
                        )}
                        onClick={() => setSelectedCat("ALL")}
                     >
                         All
                     </button>
                     {categories.map((c: any) => (
                          <button 
                              key={c.id} 
                              className={cn(
                                "px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all border-2",
                                selectedCat === c.id 
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                                    : "bg-white text-slate-400 border-slate-100 hover:border-primary/20 hover:text-primary"
                            )}
                              onClick={() => setSelectedCat(c.id)}
                          >
                              {c.name}
                          </button>
                     ))}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filtered?.map((item: any) => (
                    <div key={item.id} className="group relative bg-white rounded-[2.5rem] border border-slate-100 p-2 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500">
                        {/* Image Wrapper */}
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-50 ring-1 ring-slate-100/50">
                            <Image 
                                src={item.images[0] || "/placeholder-food.jpg"} 
                                alt={item.name} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Overlay Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {item.discountPrice && (
                                     <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 rounded-full border-none shadow-lg">
                                         -{Math.round((1 - item.discountPrice/item.price) * 100)}%
                                     </Badge>
                                )}
                                <Badge variant="secondary" className="bg-white/80 backdrop-blur-md text-primary font-bold px-3 py-1 rounded-full border-none shadow-sm">
                                    {item.category?.name || "Premium"}
                                </Badge>
                            </div>

                            {/* Hover Actions */}
                            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                                 <Link href={`/menu/${item.id}`}>
                                     <Button variant="secondary" size="icon" className="h-12 w-12 rounded-2xl bg-white shadow-xl hover:bg-primary hover:text-white transition-all">
                                          <Eye className="w-5 h-5" />
                                     </Button>
                                 </Link>
                                 <Button size="icon" className="h-12 w-12 rounded-2xl bg-primary text-white shadow-xl hover:scale-110 transition-all" onClick={() => handleAdd(item)}>
                                      <ShoppingCart className="w-5 h-5" />
                                 </Button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 pt-5">
                            <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span className="text-xs font-black tracking-tight text-slate-800">4.9 (120)</span>
                            </div>
                            
                            <h3 className="font-black text-xl text-slate-900 group-hover:text-primary transition-colors line-clamp-1 mb-1 lowercase first-letter:uppercase">
                                <Link href={`/menu/${item.id}`}>{item.name}</Link>
                            </h3>
                            
                            <p className="text-sm text-slate-400 font-medium line-clamp-2 mb-6">
                                {item.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto bg-slate-50/50 p-3 rounded-2xl border border-slate-50">
                                <div className="flex flex-col">
                                     {item.discountPrice ? (
                                         <div className="flex items-end gap-2">
                                            <span className="font-black text-xl tracking-tight text-slate-900">${item.discountPrice.toFixed(2)}</span>
                                            <span className="text-[10px] text-slate-400 line-through font-bold mb-1">${item.price.toFixed(2)}</span>
                                         </div>
                                     ) : (
                                         <span className="font-black text-xl tracking-tight text-slate-900">${item.price.toFixed(2)}</span>
                                     )}
                                </div>
                                <Button size="sm" className="h-10 px-5 rounded-xl bg-white text-slate-900 border border-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all font-black text-xs gap-2 group/btn" onClick={() => handleAdd(item)}>
                                    ADD <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {(filtered?.length === 0 || initialItems?.length === 0) && (
                 <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-[3rem] border-4 border-dashed border-white shadow-inner">
                      <div className="bg-white p-6 rounded-full shadow-lg mb-6">
                           <Utensils className="w-12 h-12 text-slate-200" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">Kitchen is Empty</h3>
                      <p className="text-muted-foreground font-medium italic">No masterpieces found in this category yet.</p>
                 </div>
            )}
        </div>
    );
}

