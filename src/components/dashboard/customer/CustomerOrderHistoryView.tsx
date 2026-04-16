"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyOrdersAction } from "@/actions/order.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/shared/StripeCheckoutForm";
import { createPaymentIntentAction } from "@/actions/payment.action";
import { envVars } from "@/config/env";

const stripePromise = loadStripe(envVars.STRIPE_PUBLISHABLE_KEY);

export default function CustomerOrderHistoryView({ initialOrders }: { initialOrders: any[] }) {
    const [orders, setOrders] = useState<any[]>(initialOrders);
    const [payOrderId, setPayOrderId] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isInitPayment, setIsInitPayment] = useState(false);
    const [payAmount, setPayAmount] = useState<number>(0);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handlePay = async (orderId: string, amount: number) => {
        setIsInitPayment(true);
        setPayOrderId(orderId);
        setPayAmount(amount);
        try {
            const res = await createPaymentIntentAction(orderId);
            if (res.success) {
                setClientSecret(res.data.clientSecret);
                setIsPaymentModalOpen(true);
            } else {
                toast.error(res.error || "Failed to initialize payment");
                setPayOrderId(null);
            }
        } catch {
            toast.error("An error occurred");
            setPayOrderId(null);
        }
        setIsInitPayment(false);
    };

    const handlePaymentSuccess = async () => {
         setIsPaymentModalOpen(false);
         setPayOrderId(null);
         setClientSecret(null);
         // Refresh orders from server
         const res = await getMyOrdersAction({});
         if (res.success && res.data) setOrders(res.data);
    };

    const handleModalClose = (open: boolean) => {
         setIsPaymentModalOpen(open);
         if (!open) {
              setPayOrderId(null);
              setClientSecret(null);
         }
    };

    const getStatusColor = (status: string) => {
         switch (status) {
              case "DELIVERED": return "bg-green-100 text-green-800 border-green-200";
              case "CANCELLED": return "bg-destructive/10 text-destructive border-destructive/20";
              case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
              default: return "bg-blue-100 text-blue-800 border-blue-200";
         }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
                <p className="text-muted-foreground">View all your past purchases and current order statuses.</p>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total Items</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    <div className="flex flex-col items-center gap-2">
                                        <History className="w-10 h-10 opacity-20" />
                                        No orders found.
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="whitespace-nowrap font-mono text-xs">
                                    #{order.id.slice(-8).toUpperCase()}
                                </TableCell>
                                <TableCell>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{order.items?.length || 0} items</TableCell>
                                <TableCell className="font-semibold text-primary">
                                    ${order.totalPrice.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={getStatusColor(order.status)}>
                                         {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right whitespace-nowrap">
                                     {(order.status === "PLACED" || order.status === "PENDING") && order.payment?.status !== "SUCCESS" ? (
                                         <Button 
                                             size="sm" 
                                             onClick={() => handlePay(order.id, order.totalPrice)}
                                             disabled={isInitPayment && payOrderId === order.id}
                                             className="rounded-full px-4 h-8"
                                         >
                                              {isInitPayment && payOrderId === order.id ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : "Pay Now"}
                                         </Button>
                                     ) : (
                                         <span className="text-muted-foreground text-xs">—</span>
                                     )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isPaymentModalOpen} onOpenChange={handleModalClose}>
                <DialogContent className="sm:max-w-md">
                     <DialogHeader>
                          <DialogTitle className="text-xl font-black uppercase tracking-tight">Complete Payment</DialogTitle>
                     </DialogHeader>
                     {clientSecret && envVars.STRIPE_PUBLISHABLE_KEY ? (
                          <div className="pt-4">
                               <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <StripeCheckoutForm totalAmount={payAmount} onSuccess={handlePaymentSuccess} />
                               </Elements>
                          </div>
                     ) : (
                          <div className="p-8 text-center">
                               <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                               <p className="text-xs text-muted-foreground mt-2">Initializing...</p>
                          </div>
                     )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
