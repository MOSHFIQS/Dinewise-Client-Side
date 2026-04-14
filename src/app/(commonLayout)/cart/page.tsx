"use client";

import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, totalAmount, totalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center animate-in fade-in duration-700">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 ring-8 ring-primary/[0.02]">
                    <ShoppingBag className="w-10 h-10 text-primary opacity-20" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-4 uppercase">Your Cart is Empty</h1>
                <p className="text-muted-foreground text-center max-w-sm mb-10 text-lg leading-relaxed">
                    It looks like you haven't added any of our culinary masterpieces to your order yet.
                </p>
                <Link href="/menu">
                    <Button size="lg" className="rounded-full h-14 px-10 font-black uppercase tracking-tight gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Explore Full Menu <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col lg:flex-row gap-16">
                
                {/* Cart Items List */}
                <div className="flex-1 space-y-8">
                    <div className="flex items-end justify-between border-b border-slate-100 pb-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-2">Shopping <span className="text-primary">Cart</span></h1>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <ShoppingBag className="w-3.5 h-3.5" /> {items.length} items ready for delivery
                            </p>
                        </div>
                        <Link href="/menu" className="hidden sm:flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] hover:translate-x-1 transition-transform">
                            Continue Browsing <ChevronLeft className="w-3 h-3 rotate-180" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.menuItemId} className="group flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all">
                                <div className="relative h-32 w-32 rounded-3xl overflow-hidden bg-slate-50 flex-shrink-0 ring-4 ring-white shadow-sm">
                                    <Image src={item.image || "/placeholder-food.jpg"} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-between h-full py-1 text-center sm:text-left">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-1">{item.name}</h3>
                                        <p className="text-primary font-black text-lg tracking-tighter">${item.price.toFixed(2)} / unit</p>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0">
                                        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                                            <Button 
                                                variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm"
                                                onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="w-10 text-center font-black text-slate-900">{item.quantity}</span>
                                            <Button 
                                                variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm"
                                                onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        
                                        <div className="hidden sm:block h-8 w-px bg-slate-100" />
                                        
                                        <button 
                                            onClick={() => removeFromCart(item.menuItemId)}
                                            className="text-xs font-black uppercase tracking-widest text-slate-300 hover:text-destructive flex items-center gap-1.5 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="hidden lg:flex flex-col items-end pr-4">
                                     <p className="text-[10px] uppercase font-black text-slate-300 mb-1">Subtotal</p>
                                     <p className="text-2xl font-black tracking-tighter text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="lg:w-[400px]">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200">
                            <h2 className="text-2xl font-black tracking-tight mb-8 uppercase flex items-center gap-3">
                                Summary <ShoppingBag className="w-5 h-5 text-primary" />
                            </h2>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="text-sm font-bold uppercase tracking-widest">Base Total</span>
                                    <span className="font-black text-white text-lg">${totalAmount().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="text-sm font-bold uppercase tracking-widest">Delivery</span>
                                    <span className="font-black text-green-400 text-sm uppercase">Free</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span className="text-sm font-bold uppercase tracking-widest">Service Fee</span>
                                    <span className="font-black text-white text-sm">$0.00</span>
                                </div>
                                
                                <div className="h-px bg-white/10 my-4" />
                                
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">Grand Total</p>
                                        <p className="text-4xl font-black tracking-tighter">${totalAmount().toFixed(2)}</p>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-500 italic mb-2">VAT Included</p>
                                </div>
                            </div>

                            <Link href="/checkout">
                                <Button className="w-full h-16 rounded-2xl mt-10 text-lg font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/25 group">
                                    Secure Checkout
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <div className="flex items-center justify-center gap-4 mt-8 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                                <CreditCard className="w-5 h-5" />
                                <div className="h-4 w-px bg-white/20" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Safe & Encrypted</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex items-center gap-4">
                             <div className="bg-white h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm">
                                  <ShoppingBag className="w-5 h-5 text-primary" />
                             </div>
                             <div>
                                  <p className="text-sm font-black text-slate-800 uppercase tracking-tight">Need help?</p>
                                  <p className="text-xs text-slate-400 font-medium italic">Our chefs are standing by.</p>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
