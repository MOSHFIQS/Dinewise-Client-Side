"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart";
import { toast } from "sonner";
import { getMenuItemById } from "@/actions/menuItem.action";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Clock, Flame, ChevronLeft, ChevronRight, Check } from "lucide-react";
import ReviewSection from "@/components/shared/ReviewSection";
import { use } from "react";
import { cn } from "@/lib/utils";

export default function MenuItemDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        const fetchItem = async () => {
            const result = await getMenuItemById(id);
            if (result.success) {
                setItem(result.data);
            } else {
                toast.error("Failed to load item details");
            }
            setLoading(false);
        };
        fetchItem();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center gap-4 animate-pulse">
                <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-muted-foreground font-medium">Preparing dish details...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center gap-6">
                <div className="bg-muted p-6 rounded-full">
                    <Star className="w-12 h-12 text-muted-foreground opacity-20" />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Item Not Found</h2>
                    <p className="text-muted-foreground">The meal you're looking for doesn't exist or has been removed.</p>
                </div>
                <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
            </div>
        );
    }

    const images = item.images?.length > 0 ? item.images : ["/placeholder-food.jpg"];

    const handleAddToCart = () => {
         addToCart({
             menuItemId: item.id,
             name: item.name,
             price: item.discountPrice || item.price,
             image: images[0],
         });
         toast.success(`${item.name} added to your cart! 🍴`);
    };

    return (
        <div className="container mx-auto px-4 py-8 lg:py-16 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                {/* Visual Section: Gallery */}
                <div className="w-full lg:w-[55%] space-y-4">
                    <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-muted transition-all duration-700 bg-white shadow-black/5">
                        <Image 
                            src={images[activeImage]} 
                            alt={item.name} 
                            fill 
                            className="object-cover transition-all duration-700 hover:scale-110"
                            priority
                        />
                        
                        {/* Status Overlay */}
                        <div className="absolute top-6 left-6 flex gap-2">
                             {item.discountPrice && (
                                 <Badge className="bg-red-500 hover:bg-red-600 text-white font-bold border-none px-4 py-1.5 rounded-full shadow-lg">
                                     {Math.round((1 - item.discountPrice/item.price) * 100)}% OFF
                                 </Badge>
                             )}
                             {item.stock < 5 && item.stock > 0 && (
                                 <Badge variant="outline" className="bg-white/80 backdrop-blur-md border-orange-200 text-orange-600 font-bold px-4 py-1.5 rounded-full shadow-sm">
                                     Only {item.stock} left
                                 </Badge>
                             )}
                        </div>

                        {/* Pagination Arrows */}
                        {images.length > 1 && (
                            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                                <Button 
                                    variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm pointer-events-auto border-none shadow-lg hover:bg-primary hover:text-white transition-all"
                                    onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </Button>
                                <Button 
                                    variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm pointer-events-auto border-none shadow-lg hover:bg-primary hover:text-white transition-all"
                                    onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    {images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 px-2 no-scrollbar">
                            {images.map((img: string, i: number) => (
                                <button 
                                    key={i} 
                                    onClick={() => setActiveImage(i)}
                                    className={cn(
                                        "relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2",
                                        activeImage === i 
                                            ? "border-primary scale-105 shadow-md shadow-primary/20" 
                                            : "border-transparent opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <Image src={img} alt={`Thumb ${i}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Content Section: Info */}
                <div className="w-full lg:w-[45%] flex flex-col pt-2">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10 hover:bg-primary/10 transition-colors uppercase font-bold tracking-wider px-3 py-1">
                                {item.category?.name || "Premium Dish"}
                            </Badge>
                            <div className="flex items-center text-yellow-500 gap-1 ml-auto">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-bold text-sm">4.9</span>
                                <span className="text-muted-foreground text-xs font-normal">(120+ Reviews)</span>
                            </div>
                        </div>
                        
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight mb-4 text-slate-900 leading-[1.1]">
                            {item.name}
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {item.description}
                        </p>
                    </div>

                    {/* Meta Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="flex items-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="p-2.5 bg-white rounded-2xl shadow-sm text-primary">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Prep Time</p>
                                <p className="text-sm font-black">15-20 Mins</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="p-2.5 bg-white rounded-2xl shadow-sm text-orange-500">
                                <Flame className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Intensity</p>
                                <p className="text-sm font-black text-orange-600">Hearty & Fresh</p>
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-6 mb-10 bg-slate-900 p-6 rounded-[2rem] text-white shadow-xl shadow-slate-200">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-1">Total Price</span>
                            {item.discountPrice ? (
                                <div className="flex items-end gap-3">
                                    <span className="text-4xl font-black tracking-tighter text-white">
                                        ${item.discountPrice.toFixed(2)}
                                    </span>
                                    <span className="text-xl text-slate-500 line-through font-medium mb-1">
                                        ${item.price.toFixed(2)}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-4xl font-black tracking-tighter text-white">
                                    ${item.price.toFixed(2)}
                                </span>
                            )}
                        </div>
                        <div className="ml-auto flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl">
                             <Check className="w-4 h-4 text-green-400" />
                             <span className="text-sm font-bold">Inclusive GST</span>
                        </div>
                    </div>

                    {/* Ingredients List */}
                    {item.ingredients && item.ingredients.length > 0 && (
                        <div className="mb-10">
                             <h3 className="font-black mb-4 text-lg flex items-center gap-2">
                                 <span className="w-2 h-2 bg-primary rounded-full" />
                                 Fresh Ingredients
                             </h3>
                             <div className="flex flex-wrap gap-2">
                                  {item.ingredients.map((ing: string, i: number) => (
                                      <span key={i} className="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold hover:border-primary hover:text-primary transition-all cursor-default group">
                                          {ing}
                                      </span>
                                  ))}
                             </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-auto space-y-4">
                        <Button 
                            size="lg" 
                            className="w-full h-16 text-lg font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all group overflow-hidden relative" 
                            onClick={handleAddToCart}
                            disabled={item.stock === 0}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                <ShoppingCart className="h-6 w-6 group-hover:rotate-12 transition-transform" /> 
                                {item.stock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                        <p className="text-center text-xs text-muted-foreground font-medium">
                            Premium delivery included for orders above $50
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Reviews Grid */}
             <div className="mt-32 pt-20 border-t border-slate-100">
                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                      <div className="max-w-xl">
                           <h2 className="text-4xl font-black tracking-tight mb-4">Guest Experience</h2>
                           <p className="text-muted-foreground text-lg italic">Read how our community feels about this culinary masterpiece.</p>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-3xl border border-dashed flex items-center gap-6">
                           <div className="text-center">
                               <p className="text-3xl font-black text-primary">4.9</p>
                               <p className="text-[10px] uppercase font-black text-muted-foreground">Global Rating</p>
                           </div>
                           <div className="flex text-yellow-500 gap-0.5">
                               {[1,2,3,4,5].map(n => <Star key={n} className="w-4 h-4 fill-current" />)}
                           </div>
                      </div>
                 </div>
                 <ReviewSection menuItemId={id} />
             </div>
        </div>
    );
}

