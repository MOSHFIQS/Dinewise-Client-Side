"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { verifyPaymentAction } from "@/actions/payment.action";

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
    const [isReady, setIsReady] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements || !isReady) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard/payment`,
            },
            redirect: "if_required",
        });

        const isSucceeded = paymentIntent?.status === "succeeded" ||
            (error?.payment_intent?.status === "succeeded");
        const finalIntentId = paymentIntent?.id || error?.payment_intent?.id;

        if (isSucceeded && finalIntentId) {
            const res = await verifyPaymentAction(finalIntentId);

            if (res.success) {
                toast.success("Payment verified! Your order is being processed.");
                onSuccess();
            } else {
                toast.error(res.error || "Failed to verify payment with our servers.");
                setIsProcessing(false);
            }
        } else if (error) {
            toast.error(error.message || "An unexpected error occurred during payment.");
            setErrorMessage(error.message || "Payment failed.");
            setIsProcessing(false);
        } else {
            toast.error("Payment requires further action or is pending.");
            setIsProcessing(false);
        }
    };

    if (!stripe) {
        return (
            <div className="p-8 text-center bg-red-50 border border-red-100 rounded-3xl animate-in zoom-in-95">
                <p className="text-red-500 font-black uppercase text-xs tracking-widest mb-2">Configuration Error</p>
                <p className="text-slate-500 text-sm">Stripe failed to initialize. Please check your publishable key.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="min-h-[200px] relative">
                <PaymentElement
                    onReady={() => setIsReady(true)}
                    onChange={() => {
                        // Clear the manual error message when the user interacts with the form
                        if (errorMessage) setErrorMessage(null);
                    }}
                />

                {!isReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl z-20 gap-4">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Securing Connection...</p>
                    </div>
                )}
            </div>

            {errorMessage && (
                <p className="text-xs font-bold text-red-500 bg-red-50 p-3 rounded-xl border border-red-100 animate-in slide-in-from-top-2">
                    {errorMessage}
                </p>
            )}

            <Button
                type="submit"
                disabled={!stripe || isProcessing || !isReady}
                className="w-full h-14 text-lg font-black uppercase tracking-widest shadow-xl mt-4"
            >
                {isProcessing ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Finalizing...</>
                ) : !isReady ? (
                    "Initializing..."
                ) : (
                    `Pay $${totalAmount.toFixed(2)}`
                )}
            </Button>
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                Payments are securely processed by Stripe.
            </p>
        </form>
    );
}
