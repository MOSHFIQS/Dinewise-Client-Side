"use client";

import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createOrderAction } from "@/actions/order.action";
import { validateCouponAction } from "@/actions/coupon.action";
import { getMyAddressesAction, createAddressAction } from "@/actions/address.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { ShoppingBag, CreditCard, MapPin, Phone, User, Tag, ArrowRight, Loader2, ShieldCheck, Truck, CheckCircle2, Star, PlusCircle } from "lucide-react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/shared/StripeCheckoutForm";
import { createPaymentIntentAction } from "@/actions/payment.action";
import { envVars } from "@/config/env";

const stripePromise = loadStripe(envVars.STRIPE_PUBLISHABLE_KEY);

export default function CheckoutForm() {
    const { items, totalAmount, clearCart } = useCartStore();
    const { user } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState<any>(null);
    const [validatingCoupon, setValidatingCoupon] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);

    // Addresses mapping
    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [useNewAddress, setUseNewAddress] = useState(true);
    const [saveNewAddress, setSaveNewAddress] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: "",
    });

    const [newAddress, setNewAddress] = useState({
        title: "",
        street: "",
        city: "",
        postalCode: "",
        country: "Bangladesh",
    });

    useEffect(() => {
        if (items.length === 0 && !clientSecret) {
            router.push("/cart");
        }
    }, [items, router, clientSecret]);

    useEffect(() => {
        const fetchAddresses = async () => {
             const res = await getMyAddressesAction();
             console.log(res)
             if (res.success) {
                  const data = res.data?.data || res.data;
                  const allAddresses = Array.isArray(data) ? data : [];
                  setAddresses(allAddresses);
                  if (allAddresses.length > 0) {
                       const defaultAddr = allAddresses.find((a: any) => a.isDefault) || allAddresses[0];
                       setSelectedAddressId(defaultAddr.id);
                       setUseNewAddress(false);
                  }
             }
        };
        fetchAddresses();
    }, []);

    const handleValidateCoupon = async () => {
        if (!couponCode) return;
        setValidatingCoupon(true);
        const res = await validateCouponAction(couponCode, totalAmount());
        console.log(res)
        if (res.success) {
            setDiscount(res.data);
            toast.success("Coupon applied! 🎉");
        } else {
            toast.error(res.error || "Invalid coupon code");
            setDiscount(null);
        }
        setValidatingCoupon(false);
    };

    const subtotal = totalAmount();
    const discountAmount = discount ? discount.discountValue : 0;
    const deliveryFee = 5;
    const tax = (subtotal - discountAmount) * 0.1;
    const finalTotal = subtotal - discountAmount + deliveryFee + tax;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const isUsingNew = useNewAddress || addresses.length === 0;

        if (!formData.name || !formData.phone) {
            toast.error("Please provide your name and phone number.");
            return;
        }

        if (isUsingNew && !newAddress.street.trim()) {
            toast.error("Please provide a complete street address.");
            return;
        }

        if (!isUsingNew && !selectedAddressId) {
            toast.error("Please select a delivery address");
            return;
        }

        setLoading(true);

        try {
            if (isUsingNew && saveNewAddress && newAddress.street.trim()) {
                await createAddressAction({
                     title: newAddress.title || "Home",
                     street: newAddress.street,
                     city: newAddress.city,
                     postalCode: newAddress.postalCode,
                     country: newAddress.country,
                     isDefault: addresses.length === 0,
                });
            }

            const activeSelectedAddress = addresses.find(a => a.id === selectedAddressId);
            
            const payload = {
                items: items.map(i => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
                addressSnapshot: isUsingNew ? {
                    name: formData.name,
                    phone: formData.phone,
                    address: `${newAddress.street}, ${newAddress.city}, ${newAddress.postalCode}, ${newAddress.country}`,
                } : {
                    name: formData.name,
                    phone: formData.phone,
                    address: `${activeSelectedAddress?.street}, ${activeSelectedAddress?.city}, ${activeSelectedAddress?.postalCode}, ${activeSelectedAddress?.country}`,
                },
                addressId: !isUsingNew ? selectedAddressId : undefined,
                couponId: discount ? discount.id : undefined,
            };

            const res = await createOrderAction(payload);
            if (res.success) {
                const order = res.data;
                setOrderId(order.id);

                // Step 2: Create Payment Intent
                const paymentRes = await createPaymentIntentAction(order.id);
                if (paymentRes.success) {
                    setClientSecret(paymentRes.data.clientSecret);
                    toast.success("Order registered! Please complete payment. 💳");
                } else {
                    toast.error("Order created but payment initialization failed. Please contact support.");
                    router.push(`/dashboard/orders`);
                }
            } else {
                toast.error(res.error || "Failed to place order");
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred");
        }
        setLoading(false);
    };

    const handlePaymentSuccess = () => {
        toast.success("Order placed successfully! 🥂");
        clearCart();
        router.push(`/dashboard/payment`);
    };

    if (items.length === 0 && !clientSecret) return null;

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20 max-w-7xl animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row gap-16 items-start">

                {/* Left Section */}
                <div className="flex-1 space-y-12">
                    <div className="border-b border-black/10 pb-8">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-black mb-2">
                            {clientSecret ? "Complete " : "Finalize "}
                            <span className="font-light italic">{clientSecret ? "Payment" : "Order"}</span>
                        </h1>
                        <p className="text-black/50 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5" /> Secure Checkout • Cloud Verified
                        </p>
                    </div>

                    {!clientSecret ? (
                        <form onSubmit={handleSubmit} className="space-y-10 group animate-in slide-in-from-left-4 duration-500">
                            
                            <div className="space-y-6 border-b border-black/10 pb-10">
                                <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-black/50 pl-1">Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                                            <Input
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="h-14 rounded-2xl pl-12 bg-white/60 backdrop-blur-sm border border-white/80 focus:border-black/20 focus-visible:ring-0"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-black/50 pl-1">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30" />
                                            <Input
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="h-14 rounded-2xl pl-12 bg-white/60 backdrop-blur-sm border border-white/80 focus:border-black/20 focus-visible:ring-0"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-white" />
                                    </div>
                                    Delivery Address
                                </h2>

                                {addresses.length > 0 && (
                                     <div className="space-y-3">
                                          {addresses.map((addr) => (
                                               <div
                                                    key={addr.id}
                                                    onClick={() => { setSelectedAddressId(addr.id); setUseNewAddress(false); }}
                                                    className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all
                                                    ${selectedAddressId === addr.id && !useNewAddress
                                                                 ? "border-black bg-white shadow-md shadow-black/5 scale-[1.01]"
                                                                 : "border-white/80 hover:border-black/10 bg-white/60 backdrop-blur-sm"
                                                            }`}
                                               >
                                                    <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                                         selectedAddressId === addr.id && !useNewAddress ? "border-black" : "border-black/20"
                                                    }`}>
                                                         {selectedAddressId === addr.id && !useNewAddress && (
                                                              <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                                         )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                         <div className="flex items-center gap-2 flex-wrap mb-1">
                                                              {addr.title && (
                                                                   <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-2 py-0.5 rounded-md">
                                                                        {addr.title}
                                                                   </span>
                                                              )}
                                                              {addr.isDefault && (
                                                                   <span className="text-xs text-black/60 font-black uppercase tracking-widest flex items-center gap-1">
                                                                        <Star className="w-3 h-3 fill-black/60 text-black/60" /> Default
                                                                   </span>
                                                              )}
                                                         </div>
                                                         <p className="text-sm font-bold text-black">
                                                              {addr.street}
                                                         </p>
                                                         <p className="text-xs text-black/50 font-medium">
                                                              {addr.city}, {addr.country} {addr.postalCode ? `- ${addr.postalCode}` : ""}
                                                         </p>
                                                    </div>
                                               </div>
                                          ))}

                                          <button
                                               type="button"
                                               onClick={() => {
                                                    setUseNewAddress(!useNewAddress);
                                                    setSelectedAddressId(null);
                                               }}
                                               className={`flex items-center gap-2 w-full p-4 rounded-2xl border-2 text-sm font-bold uppercase tracking-widest transition-all
                                               ${useNewAddress
                                                         ? "border-black bg-white text-black scale-[1.01] shadow-sm"
                                                         : "border-dashed border-black/20 text-black/40 hover:border-black/40 hover:text-black"
                                                    }`}
                                          >
                                               <PlusCircle className="w-4 h-4 flex-shrink-0" />
                                               Use a different address
                                          </button>
                                     </div>
                                )}

                                {(useNewAddress || addresses.length === 0) && (
                                    <div className="space-y-4 bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/50 animate-in zoom-in-95 duration-300">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-black/50 pl-1">Address Label (Home, Office)</Label>
                                            <Input
                                                placeholder="Label (optional)"
                                                value={newAddress.title}
                                                onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                                                className="h-12 rounded-xl bg-white border-white/80 focus-visible:ring-0"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-black/50 pl-1">Street Address <span className="text-red-500">*</span></Label>
                                            <Input
                                                placeholder="Flat, Street, Landmark..."
                                                value={newAddress.street}
                                                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                                className="h-12 rounded-xl bg-white border-white/80 focus-visible:ring-0"
                                                required={useNewAddress}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-black/50 pl-1">City</Label>
                                                <Input
                                                    placeholder="City"
                                                    value={newAddress.city}
                                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                                    className="h-12 rounded-xl bg-white border-white/80 focus-visible:ring-0"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-black/50 pl-1">ZIP Code</Label>
                                                <Input
                                                    placeholder="Postal Code"
                                                    value={newAddress.postalCode}
                                                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                                    className="h-12 rounded-xl bg-white border-white/80 focus-visible:ring-0"
                                                />
                                            </div>
                                            <div className="space-y-2 col-span-2 md:col-span-1">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-black/50 pl-1">Country</Label>
                                                <Input
                                                    placeholder="Country"
                                                    value={newAddress.country}
                                                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                                    className="h-12 rounded-xl bg-white border-white/80 focus-visible:ring-0"
                                                />
                                            </div>
                                        </div>

                                        <label className="flex items-center gap-3 text-sm cursor-pointer select-none pt-2">
                                                <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${saveNewAddress ? 'bg-black border-black' : 'bg-white border-black/20'}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={saveNewAddress}
                                                        onChange={(e) => setSaveNewAddress(e.target.checked)}
                                                        className="hidden"
                                                    />
                                                    {saveNewAddress && <CheckCircle2 className="w-3 h-3 text-white" />}
                                                </div>
                                                <span className="font-black text-black/70 tracking-tight">Save this address for future orders</span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center">
                                        <Tag className="w-4 h-4 text-white" />
                                    </div>
                                    Apply Coupon
                                </h2>
                                <div className="flex gap-3 bg-white/50 backdrop-blur-sm p-2 rounded-[1.5rem] border border-white/50">
                                    <Input
                                        placeholder="Enter Code (e.g. WELCOME10)"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                        className="h-12 border-none bg-transparent shadow-none focus-visible:ring-0 font-bold uppercase tracking-widest text-black"
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleValidateCoupon}
                                        disabled={validatingCoupon || !couponCode}
                                        className="rounded-xl px-8 font-black uppercase text-xs bg-black text-white hover:bg-black/80 border-0"
                                    >
                                        {validatingCoupon ? <Loader2 className="w-4 h-4 animate-spin" /> : "APPLY"}
                                    </Button>
                                </div>
                                {discount && (
                                    <div className="bg-green-50 text-green-600 p-4 rounded-2xl border border-green-100 flex items-center justify-between animate-in zoom-in-95">
                                        <span className="text-sm font-bold uppercase tracking-tight">Voucher Applied: {discount.code}</span>
                                        <span className="font-black">-${discount.discountValue.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-white/50 flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center shadow-sm flex-shrink-0">
                                    <Truck className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-black uppercase tracking-tight mb-1">Express Delivery</p>
                                    <p className="text-xs text-black/50 font-medium italic">Your order will reach you within 30-45 minutes from our nearest kitchen.</p>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-[2rem] border border-white/50 flex items-center gap-4">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <div>
                                    <p className="font-black uppercase tracking-tight text-black">Delivery Details Saved</p>
                                    <p className="text-xs text-black/50 font-bold">
                                        {useNewAddress ? newAddress.street : addresses.find(a => a.id === selectedAddressId)?.street}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-[2.5rem] p-8 border border-white shadow-sm">
                                <h2 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center">
                                        <CreditCard className="w-4 h-4 text-white" />
                                    </div>
                                    Stripe Secure Payment
                                </h2>

                                {!envVars.STRIPE_PUBLISHABLE_KEY ? (
                                    <div className="p-8 text-center bg-red-50 border border-red-100 rounded-3xl">
                                        <p className="text-red-500 font-black uppercase text-xs tracking-widest mb-2">Checkout Disabled</p>
                                        <p className="text-slate-500 text-sm font-bold uppercase tracking-tight">Configuration Missing</p>
                                        <p className="text-xs text-slate-400 mt-2">The Stripe Publishable Key is not set in the environment variables.</p>
                                    </div>
                                ) : (
                                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                                        <StripeCheckoutForm totalAmount={finalTotal} onSuccess={handlePaymentSuccess} />
                                    </Elements>
                                )}
                            </div>

                            <Button
                                variant="ghost"
                                onClick={() => setClientSecret(null)}
                                className="text-xs text-black/40 hover:text-black font-black uppercase tracking-widest pl-2"
                            >
                                ← Back to Delivery Information
                            </Button>
                        </div>
                    )}
                </div>

                {/* Right: Order Summary Sticky Card */}
                <div className="lg:w-[420px]">
                    <div className="sticky top-24">
                        <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-8 text-black -z-0 opacity-5">
                                <ShoppingBag className="w-32 h-32 rotate-12" />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-black tracking-tight mb-8 flex items-center justify-between text-black">
                                    Summary
                                    <span className="text-xs bg-black/5 px-3 py-1 rounded-full text-black/50 font-black tracking-widest">{items.length} ITEMS</span>
                                </h2>

                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar mb-8">
                                    {items.map((item) => (
                                        <div key={item.menuItemId} className="flex gap-4 items-center animate-in fade-in slide-in-from-right-4 duration-500">
                                            <div className="relative h-14 w-14 rounded-2xl overflow-hidden bg-black/5 ring-1 ring-white">
                                                <Image src={item.image || "/placeholder-food.jpg"} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-black text-black uppercase tracking-tighter line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-black/50 font-bold">{item.quantity} × ${item.price.toFixed(2)}</p>
                                            </div>
                                            <span className="font-black text-black">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-8 border-t border-black/10">
                                    <div className="flex justify-between items-center text-black/50">
                                        <span className="text-[10px] font-black uppercase tracking-widest pl-1">Subtotal</span>
                                        <span className="font-black text-black">${totalAmount().toFixed(2)}</span>
                                    </div>
                                    {discount && (
                                        <div className="flex justify-between items-center text-green-600">
                                            <span className="text-[10px] font-black uppercase tracking-widest pl-1">Discount</span>
                                            <span className="font-black">-${discount.discountValue.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center text-black/50">
                                        <span className="text-[10px] font-black uppercase tracking-widest pl-1">Tax (10%)</span>
                                        <span className="font-black text-black">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-black/50">
                                        <span className="text-[10px] font-black uppercase tracking-widest pl-1">Delivery</span>
                                        <span className="font-black text-black">${deliveryFee.toFixed(2)}</span>
                                    </div>

                                    <div className="mt-8 bg-black rounded-3xl p-6 text-white shadow-2xl shadow-black/20">
                                        <div className="flex justify-between items-end mb-6">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-1 pl-1">Total Payable</p>
                                                <p className="text-4xl font-black tracking-tighter">${finalTotal.toFixed(2)}</p>
                                            </div>
                                            <p className="text-[10px] font-bold text-white/30 italic mb-2">Secure Link</p>
                                        </div>

                                        {!clientSecret ? (
                                            <Button
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                className="w-full h-16 rounded-2xl text-lg font-black uppercase tracking-widest gap-3 bg-white text-black hover:bg-white/90 shadow-xl group/btn border-0"
                                            >
                                                <span className="flex items-center gap-2">
                                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                                        <>CONFIRM & PAY <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></>
                                                    )}
                                                </span>
                                            </Button>
                                        ) : (
                                            <div className="text-center p-4 border border-dashed border-white/20 rounded-2xl">
                                                <p className="text-xs font-bold text-white/40 flex items-center justify-center gap-2">
                                                    <Loader2 className="w-3 h-3 animate-spin" /> Awaiting Stripe Payment...
                                                </p>
                                            </div>
                                        )}
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
