"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function StripeCheckoutForm({ 
     totalAmount, 
     onSuccess 
}: { 
     totalAmount: number, 
     onSuccess: () => void 
}) {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
             elements,
             confirmParams: {
                  // Make sure to configure the return_url appropriately for production
                  return_url: `${window.location.origin}/dashboard/payment`,
             },
             redirect: "if_required", // We handle the result natively without redirecting instantly if possible
        });

        if (error) {
             toast.error(error.message || "An unexpected error occurred during payment.");
             setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
             // Webhook will flip the order status in the backend. 
             // We can proceed to clear the cart and redirect.
             onSuccess();
        } else {
             toast.error("Payment requires further action or is pending.");
             setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <Button 
                 type="submit" 
                 disabled={!stripe || isProcessing} 
                 className="w-full h-12 text-lg shadow-lg mt-4"
            >
                 {isProcessing ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing Payment...</>
                 ) : (
                      `Pay $${totalAmount.toFixed(2)}`
                 )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
                Payments are securely processed by Stripe.
            </p>
        </form>
    );
}
