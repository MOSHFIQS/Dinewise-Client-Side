"use client";

import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function CartView() {
    const { items, updateQuantity, removeFromCart, totalAmount } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    const subtotal = totalAmount();
    const deliveryFee = 5;
    const tax = subtotal * 0.1;
    const grandTotal = subtotal + deliveryFee + tax;

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center animate-in fade-in duration-700">
                <div className="w-24 h-24 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-8 border border-white shadow-sm">
                    <ShoppingBag className="w-10 h-10 text-black/20" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-black mb-4 uppercase">Your Cart is Empty</h1>
                <p className="text-black/60 font-medium text-center max-w-sm mb-10 text-lg leading-relaxed">
                    It looks like you haven't added any of our culinary masterpieces to your order yet.
                </p>
                <Link href="/menu">
                    <Button size="lg" className="rounded-full h-14 px-10 font-black uppercase tracking-tight gap-2 bg-black text-white shadow-xl shadow-black/20 hover:scale-105 transition-all border-0">
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
                    <div className="flex items-end justify-between border-b border-black/10 pb-8">
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-black mb-2">Shopping <span className="font-light italic">Cart</span></h1>
                            <p className="text-black/50 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                <ShoppingBag className="w-3.5 h-3.5" /> {items.length} items ready for delivery
                            </p>
                        </div>
                        <Link href="/menu" className="hidden sm:flex items-center gap-2 text-black font-black uppercase tracking-widest text-[10px] hover:translate-x-1 transition-transform opacity-60 hover:opacity-100">
                            Continue Browsing <ChevronLeft className="w-3 h-3 rotate-180" />
                        </Link>
                    </div>

                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.menuItemId} className="group flex flex-col sm:flex-row items-center gap-6 bg-white/70 backdrop-blur-sm p-6 rounded-[2.5rem] border border-white hover:border-black/10 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                                <div className="relative h-32 w-32 rounded-3xl overflow-hidden bg-white flex-shrink-0 ring-4 ring-white shadow-md">
                                    <Image src={item.image || "/placeholder-food.jpg"} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>

                                <div className="flex-1 flex flex-col justify-between h-full py-1 text-center sm:text-left">
                                    <div>
                                        <h3 className="text-xl font-black text-black uppercase tracking-tight mb-1">{item.name}</h3>
                                        <p className="text-black/60 font-black text-lg tracking-tighter">${item.price.toFixed(2)} / unit</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 sm:mt-0">
                                        <div className="flex items-center gap-2 bg-black/5 p-1.5 rounded-2xl">
                                            <Button
                                                variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm text-black"
                                                onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </Button>
                                            <span className="w-10 text-center font-black text-black">{item.quantity}</span>
                                            <Button
                                                variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:shadow-sm text-black"
                                                onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="hidden sm:block h-8 w-px bg-black/10" />

                                        <button
                                            onClick={() => removeFromCart(item.menuItemId)}
                                            className="text-xs font-black uppercase tracking-widest text-black/30 hover:text-red-500 flex items-center gap-1.5 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="hidden lg:flex flex-col items-end pr-4">
                                    <p className="text-[10px] uppercase font-black text-black/30 mb-1">Subtotal</p>
                                    <p className="text-2xl font-black tracking-tighter text-black">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="lg:w-[400px]">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-black text-white rounded-[2.5rem] p-10 shadow-2xl shadow-black/20">
                            <h2 className="text-2xl font-black tracking-tight mb-8 uppercase flex items-center gap-3">
                                Summary <ShoppingBag className="w-5 h-5 text-white/60" />
                            </h2>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center text-white/50">
                                    <span className="text-sm font-bold uppercase tracking-widest">Base Total</span>
                                    <span className="font-black text-white text-lg">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-white/50">
                                    <span className="text-sm font-bold uppercase tracking-widest">Tax (10%)</span>
                                    <span className="font-black text-white text-sm">${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-white/50">
                                    <span className="text-sm font-bold uppercase tracking-widest">Delivery</span>
                                    <span className="font-black text-white text-sm">${deliveryFee.toFixed(2)}</span>
                                </div>

                                <div className="h-px bg-white/10 my-4" />

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1">Grand Total</p>
                                        <p className="text-4xl font-black tracking-tighter">${grandTotal.toFixed(2)}</p>
                                    </div>
                                    <p className="text-[10px] font-bold text-white/30 italic mb-2">Secure Checkout</p>
                                </div>
                            </div>

                            {
                                pathname === '/dashboard/cart' ?

                                    <Link href="/dashboard/checkout">
                                        <Button className="w-full h-16 rounded-2xl mt-10 text-lg font-black uppercase tracking-widest gap-3 bg-white text-black hover:bg-white/90 shadow-xl group border-0">
                                            Secure Checkout
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                    :
                                    <Link href="/checkout">
                                        <Button className="w-full h-16 rounded-2xl mt-10 text-lg font-black uppercase tracking-widest gap-3 bg-white text-black hover:bg-white/90 shadow-xl group border-0">
                                            Secure Checkout
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                            }

                            <div className="flex items-center justify-center gap-4 mt-8 opacity-40">
                                <CreditCard className="w-5 h-5" />
                                <div className="h-4 w-px bg-white/20" />
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Safe & Encrypted</span>
                            </div>
                        </div>

                        <div className="bg-white/50 backdrop-blur-sm rounded-[2rem] p-8 border border-white/50 flex items-center gap-4 shadow-sm">
                            <div className="bg-black h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm">
                                <ShoppingBag className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-black text-black uppercase tracking-tight">Need help?</p>
                                <p className="text-xs text-black/50 font-medium italic">Our chefs are standing by.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
