"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart";
import { toast } from "sonner";
import { ShoppingCart, Star, Plus, Eye, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function MenuGrid({ initialItems, categories, isHome = false, hideFilters = false }: { initialItems: any[], categories?: any[], isHome?: boolean, hideFilters?: boolean }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const selectedCat = searchParams.get("categoryId") || "ALL";

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

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (categoryId === "ALL") {
            params.delete("categoryId");
        } else {
            params.set("categoryId", categoryId);
        }
        params.set("page", "1"); // Reset to first page on filter change
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="w-full">
            {!isHome && !hideFilters && categories && (
                <div className="flex flex-wrap gap-3 justify-center mb-16 px-4">
                     <button 
                        className={cn(
                            "px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all border-2",
                            selectedCat === "ALL" 
                                ? "bg-black text-white border-black shadow-lg shadow-black/20 scale-105" 
                                : "bg-white/80 backdrop-blur-sm text-black border-black/10 hover:border-black/50"
                        )}
                        onClick={() => handleCategoryChange("ALL")}
                     >
                         All
                     </button>
                     {categories.map((c: any) => (
                          <button 
                              key={c.id} 
                              className={cn(
                                "px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all border-2",
                                selectedCat === c.id 
                                    ? "bg-black text-white border-black shadow-lg shadow-black/20 scale-105" 
                                    : "bg-white/80 backdrop-blur-sm text-black border-black/10 hover:border-black/50"
                            )}
                              onClick={() => handleCategoryChange(c.id)}
                          >
                              {c.name}
                          </button>
                     ))}
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                {initialItems?.map((item: any) => (
                    <div key={item.id} className="group relative bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300">
                        {/* Image Wrapper */}
                        <div className="relative aspect-square overflow-hidden bg-black/5">
                            <Image 
                                src={item.images[0] || "/placeholder-food.jpg"} 
                                alt={item.name} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Overlay Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                {item.discountPrice && (
                                     <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold px-2.5 py-0.5 rounded-full border-none shadow-md text-[10px]">
                                         -{Math.round((1 - item.discountPrice/item.price) * 100)}%
                                     </Badge>
                                )}
                                <Badge variant="secondary" className="bg-white/90 backdrop-blur-md text-black font-bold px-2.5 py-0.5 rounded-full border border-white/50 shadow-sm text-[10px]">
                                    {item.category?.name || "Premium"}
                                </Badge>
                            </div>

                            {/* Desktop hover overlay — View Details shortcut */}
                            <Link href={`/menu/${item.id}`} className="absolute inset-0 hidden md:flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                                <span className="opacity-0 group-hover:opacity-100 bg-white text-black font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-xl transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    View Details
                                </span>
                            </Link>
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <div className="flex items-center gap-1 text-yellow-500 mb-1.5">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-[10px] font-black tracking-tight text-black/60">4.9 (120)</span>
                            </div>
                            
                            <h3 className="font-black text-base text-black line-clamp-1 mb-1 lowercase first-letter:uppercase leading-tight">
                                {item.name}
                            </h3>
                            
                            <p className="text-xs text-black/50 font-medium line-clamp-2 mb-4 leading-relaxed">
                                {item.description}
                            </p>
                            
                            {/* Price row */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex flex-col">
                                     {item.discountPrice ? (
                                         <div className="flex items-end gap-1.5">
                                            <span className="font-black text-lg tracking-tight text-black">${item.discountPrice.toFixed(2)}</span>
                                            <span className="text-[10px] text-black/40 line-through font-bold mb-0.5">${item.price.toFixed(2)}</span>
                                         </div>
                                     ) : (
                                         <span className="font-black text-lg tracking-tight text-black">${item.price.toFixed(2)}</span>
                                     )}
                                </div>
                            </div>

                            {/* Always-visible action buttons — mobile + desktop */}
                            <div className="flex items-center gap-2">
                                <Link href={`/menu/${item.id}`} className="flex-1">
                                    <button className="w-full h-10 rounded-xl bg-black/5 hover:bg-black hover:text-white text-black font-black text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 border border-black/10 hover:border-transparent">
                                        <Eye className="w-3.5 h-3.5" /> View
                                    </button>
                                </Link>
                                <button
                                    onClick={() => handleAdd(item)}
                                    disabled={item.stock === 0}
                                    className="flex-1 h-10 rounded-xl bg-black text-white font-black text-xs uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 hover:bg-black/80 disabled:opacity-40 disabled:pointer-events-none"
                                >
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    {item.stock === 0 ? "Sold" : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {initialItems?.length === 0 && (
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

