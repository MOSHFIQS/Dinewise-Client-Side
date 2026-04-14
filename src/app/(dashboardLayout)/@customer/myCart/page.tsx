"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, Tag, CreditCard, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { validateCouponAction } from "@/actions/coupon.action";
import { createOrderAction } from "@/actions/order.action";
import { createPaymentIntentAction } from "@/actions/payment.action";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from "@/components/shared/StripeCheckoutForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mock");

export default function MyCartPage() {
    const { items, removeFromCart, updateQuantity, clearCart, totalAmount } = useCartStore();
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponId, setCouponId] = useState<string | null>(null);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    
    // Stripe State
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const router = useRouter();

    const subTotal = totalAmount();
    const grandTotal = subTotal - discount;

    const handleApplyCoupon = async () => {
        if (!couponCode) return;
        const res = await validateCouponAction(couponCode, subTotal);
        if (res.success && res.data.data) {
             setDiscount(res.data.data.discountAmount);
             setCouponId(res.data.data.id);
             toast.success(`Coupon applied! Saved $${res.data.data.discountAmount.toFixed(2)}`);
        } else {
             toast.error(res.error || "Invalid coupon code");
             setDiscount(0);
             setCouponId(null);
        }
    };

    const handleCheckout = async () => {
         if (items.length === 0) return toast.error("Cart is empty");
         
         setIsCheckingOut(true);

         try {
             // 1. Create the Order
             const orderPayload = {
                  items: items.map(i => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
                  couponId: couponId || undefined,
             };
             
             const orderRes = await createOrderAction(orderPayload);
             
             if (!orderRes.success) {
                  throw new Error(orderRes.error || "Failed to create order");
             }
             
             const orderId = orderRes.data.data.id;
             
             // 2. Generate Stripe Payment Intent
             const intentRes = await createPaymentIntentAction(orderId);
             
             if (!intentRes.success) {
                  throw new Error(intentRes.error || "Failed to initialize payment gateway");
             }
             
             // 3. Mount Stripe Elements
             setClientSecret(intentRes.data.clientSecret);
             setShowPaymentModal(true);
             
         } catch (e: any) {
             toast.error(e.message);
         } finally {
             setIsCheckingOut(false);
         }
    };

    const handlePaymentSuccess = () => {
         toast.success("Order placed successfully!");
         clearCart();
         setShowPaymentModal(false);
         // Redirect to order history
         router.push("/dashboard/payment");
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                     <ShoppingCartIcon className="w-10 h-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Button onClick={() => window.location.href = "/menu"}>Explore Menu</Button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
                <p className="text-muted-foreground">Review your items and proceed to checkout.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="flex-1 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border rounded-2xl bg-card items-center">
                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                 <Image src={item.image || "/placeholder-food.jpg"} alt={item.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                 <h3 className="font-semibold text-lg">{item.name}</h3>
                                 <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-muted rounded-full px-2 py-1">
                                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}>
                                      <Minus className="w-3 h-3" />
                                 </Button>
                                 <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}>
                                      <Plus className="w-3 h-3" />
                                 </Button>
                            </div>
                            <div className="ml-4 flex-shrink-0 font-semibold w-16 text-right">
                                 ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 ml-2" onClick={() => removeFromCart(item.menuItemId)}>
                                 <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Checkout Summary */}
                <div className="w-full lg:w-[350px]">
                    <div className="border rounded-2xl p-6 bg-card sticky top-24 space-y-6">
                        <h3 className="font-bold text-lg border-b pb-4">Order Summary</h3>
                        
                        <div className="space-y-3 text-sm">
                             <div className="flex justify-between">
                                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                                  <span>${subTotal.toFixed(2)}</span>
                             </div>
                             {discount > 0 && (
                                  <div className="flex justify-between text-green-600 font-medium">
                                       <span>Discount applied</span>
                                       <span>-${discount.toFixed(2)}</span>
                                  </div>
                             )}
                             <div className="flex justify-between">
                                  <span className="text-muted-foreground">Delivery Fee</span>
                                  <span>Free</span>
                             </div>
                        </div>

                        <div className="border-t pt-4 flex justify-between items-end">
                             <span className="font-bold">Total</span>
                             <span className="text-2xl font-bold text-primary">${Math.max(0, grandTotal).toFixed(2)}</span>
                        </div>

                        <div className="pt-2">
                             <div className="flex gap-2">
                                  <div className="relative flex-1">
                                       <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                       <Input 
                                            placeholder="Promo code" 
                                            className="pl-9 h-10 w-full"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                       />
                                  </div>
                                  <Button variant="secondary" onClick={handleApplyCoupon}>Apply</Button>
                             </div>
                        </div>

                        <Button 
                             className="w-full h-12 text-lg shadow-lg" 
                             onClick={handleCheckout}
                             disabled={isCheckingOut}
                        >
                             {isCheckingOut ? <><Loader2 className="mr-2 w-5 h-5 animate-spin"/> Processing...</> : <><CreditCard className="mr-2 w-5 h-5" /> Checkout securely</>}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Payment Modal Wrapper */}
            {clientSecret && (
                <Dialog open={showPaymentModal} onOpenChange={(open) => !open && setShowPaymentModal(false)}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Complete Payment</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                             <Elements stripe={stripePromise} options={{ clientSecret }}>
                                  <StripeCheckoutForm totalAmount={grandTotal} onSuccess={handlePaymentSuccess} />
                             </Elements>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
