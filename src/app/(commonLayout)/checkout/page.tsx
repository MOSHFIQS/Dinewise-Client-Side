"use client";

import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createOrderAction } from "@/actions/order.action";
import { validateCouponAction } from "@/actions/coupon.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { ShoppingBag, CreditCard, MapPin, Phone, User, Tag, ArrowRight, Loader2, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
    const { items, totalAmount, clearCart } = useCartStore();
    const { user } = useAuth();
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState<any>(null);
    const [validatingCoupon, setValidatingCoupon] = useState(false);
    
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        if (items.length === 0) {
            router.push("/cart");
        }
    }, [items, router]);

    const handleValidateCoupon = async () => {
        if (!couponCode) return;
        setValidatingCoupon(true);
        const res = await validateCouponAction(couponCode, totalAmount());
        if (res.success) {
            setDiscount(res.data);
            toast.success("Coupon applied! 🎉");
        } else {
            toast.error(res.error || "Invalid coupon code");
            setDiscount(null);
        }
        setValidatingCoupon(false);
    };

    const finalTotal = discount 
        ? totalAmount() - discount.discountValue 
        : totalAmount();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.phone || !formData.address) {
            toast.error("Please provide delivery details");
            return;
        }

        setLoading(true);
        const payload = {
            orderItems: items.map(i => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
            address: formData.address,
            phone: formData.phone,
            couponCode: discount ? couponCode : undefined,
        };

        const res = await createOrderAction(payload);
        if (res.success) {
            toast.success("Order placed successfully! 🥂");
            clearCart();
            router.push(`/dashboard/myOrders`);
        } else {
            toast.error(res.error || "Failed to place order");
        }
        setLoading(false);
    };

    if (items.length === 0) return null;

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20 max-w-7xl animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                
                {/* Left: Delivery Details Form */}
                <div className="flex-1 space-y-12">
                     <div className="border-b border-slate-100 pb-8">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-900 mb-2">Finalize <span className="text-primary">Order</span></h1>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5" /> Secure Checkout • Verified Payment
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10 group">
                        <div className="space-y-6">
                            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-primary" />
                                </div>
                                Delivery Information
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <Input 
                                            placeholder="John Doe" 
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="h-14 rounded-2xl pl-12 border-2 border-slate-50 focus:border-primary/20"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                        <Input 
                                            placeholder="+1 (555) 000-0000" 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="h-14 rounded-2xl pl-12 border-2 border-slate-50 focus:border-primary/20"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Complete Delivery Address</Label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-5 w-4 h-4 text-slate-300" />
                                    <textarea 
                                        placeholder="Flat, Street, Landmark, City..." 
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                        className="w-full h-32 rounded-2xl pl-12 pt-4 border-2 border-slate-50 focus:border-primary/20 focus:ring-0 outline-none transition-all group-hover:border-slate-100"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-orange-100 flex items-center justify-center">
                                    <Tag className="w-4 h-4 text-orange-500" />
                                </div>
                                Apply Coupon
                            </h2>
                            <div className="flex gap-3 bg-slate-50 p-2 rounded-[1.5rem] border border-slate-100">
                                <Input 
                                    placeholder="Enter Code (e.g. WELCOME10)" 
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                    className="h-12 border-none bg-transparent shadow-none focus-visible:ring-0 font-bold uppercase tracking-widest text-slate-600"
                                />
                                <Button 
                                    type="button" 
                                    onClick={handleValidateCoupon}
                                    disabled={validatingCoupon || !couponCode}
                                    className="rounded-xl px-8 font-black uppercase text-xs"
                                >
                                    {validatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : "APPLY"}
                                </Button>
                            </div>
                            {discount && (
                                <div className="bg-green-50 text-green-600 p-4 rounded-2xl border border-green-100 flex items-center justify-between">
                                     <span className="text-sm font-bold uppercase tracking-tight">Voucher Applied: {discount.code}</span>
                                     <span className="font-black">-${discount.discountValue.toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-50 p-6 rounded-3xl border border-dashed flex items-start gap-4">
                             <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                                 <Truck className="w-5 h-5 text-slate-400" />
                             </div>
                             <div>
                                 <p className="text-sm font-black text-slate-800 uppercase tracking-tight mb-1">Express Delivery</p>
                                 <p className="text-xs text-slate-400 font-medium italic">Your order will reach you within 30-45 minutes from our nearest kitchen.</p>
                             </div>
                        </div>
                    </form>
                </div>

                {/* Right: Order Summary Sticky Card */}
                <div className="lg:w-[420px]">
                    <div className="sticky top-24">
                        <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-100 overflow-hidden relative">
                             <div className="absolute top-0 right-0 p-8 text-slate-50 -z-0 opacity-10">
                                 <ShoppingBag className="w-32 h-32 rotate-12" />
                             </div>
                             
                             <div className="relative z-10">
                                <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center justify-between">
                                    Summary
                                    <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-400 font-black tracking-widest">{items.length} ITEMS</span>
                                </h2>

                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar mb-8">
                                    {items.map((item) => (
                                        <div key={item.menuItemId} className="flex gap-4 items-center animate-in fade-in slide-in-from-right-4 duration-500">
                                            <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-slate-50 ring-1 ring-slate-100">
                                                <Image src={item.image || "/placeholder-food.jpg"} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-black text-slate-800 uppercase tracking-tighter line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-slate-400 font-bold">{item.quantity} × ${item.price.toFixed(2)}</p>
                                            </div>
                                            <span className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-slate-50">
                                    <div className="flex justify-between items-center text-slate-400">
                                        <span className="text-[10px] font-black uppercase tracking-widest pl-1">Subtotal</span>
                                        <span className="font-black text-slate-600">${totalAmount().toFixed(2)}</span>
                                    </div>
                                    {discount && (
                                        <div className="flex justify-between items-center text-green-500">
                                            <span className="text-[10px] font-black uppercase tracking-widest pl-1">Discount</span>
                                            <span className="font-black">-${discount.discountValue.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-slate-400">
                                        <span className="text-[10px] font-black uppercase tracking-widest pl-1">Delivery</span>
                                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-md">FREE</span>
                                    </div>
                                    
                                    <div className="mt-8 bg-slate-900 rounded-3xl p-6 text-white shadow-xl shadow-slate-200">
                                        <div className="flex justify-between items-end mb-6">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1 pl-1">Total Payable</p>
                                                <p className="text-4xl font-black tracking-tighter">${finalTotal.toFixed(2)}</p>
                                            </div>
                                            <p className="text-[10px] font-bold text-slate-500 italic mb-2">Secure Link</p>
                                        </div>
                                        
                                        <Button 
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="w-full h-16 rounded-2xl text-lg font-black uppercase tracking-widest gap-3 shadow-xl shadow-primary/25 group/btn overflow-hidden relative"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                    <>CONFIRM ORDER <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
                                                )}
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                             </div>
                        </div>
                        
                        <div className="flex items-center justify-center gap-6 mt-8">
                             <div className="flex items-center gap-2 grayscale group-hover:grayscale-0 transition-all opacity-40">
                                 <CreditCard className="w-4 h-4" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">VISA</span>
                             </div>
                             <div className="flex items-center gap-2 grayscale group-hover:grayscale-0 transition-all opacity-40">
                                 <CreditCard className="w-4 h-4" />
                                 <span className="text-[9px] font-black uppercase tracking-widest">MASTERCARD</span>
                             </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
