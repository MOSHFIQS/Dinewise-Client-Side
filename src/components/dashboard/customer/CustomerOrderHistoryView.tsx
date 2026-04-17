"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, History, Undo2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyOrdersAction } from "@/actions/order.action";
import { requestRefundAction } from "@/actions/refund.action";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "@/components/shared/StripeCheckoutForm";
import { createPaymentIntentAction } from "@/actions/payment.action";
import { envVars } from "@/config/env";

const stripePromise = loadStripe(envVars.STRIPE_PUBLISHABLE_KEY);

export default function CustomerOrderHistoryView({ initialOrders }: { initialOrders: any[] }) {
    const [orders, setOrders] = useState<any[]>(initialOrders);
    
    // Payment State
    const [payOrderId, setPayOrderId] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isInitPayment, setIsInitPayment] = useState(false);
    const [payAmount, setPayAmount] = useState<number>(0);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    // Refund State
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
    const [refundOrderId, setRefundOrderId] = useState<string | null>(null);
    const [refundAmount, setRefundAmount] = useState<number>(0);
    const [refundReason, setRefundReason] = useState("");
    const [isSubmittingRefund, setIsSubmittingRefund] = useState(false);
    const [maxRefundAmount, setMaxRefundAmount] = useState<number>(0);

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
         const res = await getMyOrdersAction({});
         if (res.success && res.data) setOrders(res.data);
    };

    const handlePaymentModalClose = (open: boolean) => {
         setIsPaymentModalOpen(open);
         if (!open) {
              setPayOrderId(null);
              setClientSecret(null);
         }
    };

    const openRefundModal = (orderId: string, maxAmt: number) => {
         setRefundOrderId(orderId);
         setMaxRefundAmount(maxAmt);
         setRefundAmount(maxAmt);
         setRefundReason("");
         setIsRefundModalOpen(true);
    };

    const handleRefundSubmit = async () => {
         if (!refundOrderId) return;
         if (refundAmount <= 0 || refundAmount > maxRefundAmount) {
              toast.error("Invalid refund amount");
              return;
         }
         if (!refundReason.trim()) {
              toast.error("Please provide a reason");
              return;
         }

         setIsSubmittingRefund(true);
         try {
             const res = await requestRefundAction({ orderId: refundOrderId, amount: Number(refundAmount), reason: refundReason });
             if (res.success) {
                 toast.success("Refund requested successfully");
                 setIsRefundModalOpen(false);
                 // Refresh orders to fetch newly created refund relation if included, or just refresh to be safe
                 const updated = await getMyOrdersAction({});
                 if (updated.success && updated.data) setOrders(updated.data);
             } else {
                 toast.error(res.error || "Failed to request refund");
             }
         } catch {
             toast.error("An error occurred");
         }
         setIsSubmittingRefund(false);
    };

    const getStatusColor = (status: string) => {
         switch (status) {
              case "DELIVERED": return "bg-green-100 text-green-800 border-green-200";
              case "CANCELLED": return "bg-destructive/10 text-destructive border-destructive/20";
              case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
              case "REFUNDED": return "bg-purple-100 text-purple-800 border-purple-200";
              default: return "bg-blue-100 text-blue-800 border-blue-200";
         }
    };

    const isRefundEligible = (order: any) => {
         console.log("Checking eligibility for order:", order.id, "Status:", order.status);
         
         if (order.status !== "DELIVERED") {
             console.log("-> Not DELIVERED, skipping");
             return false;
         }
         
         if (order.refunds && order.refunds.length > 0) {
              const activeRefund = order.refunds.find((r: any) => 
                  ["REQUESTED", "CHEF_APPROVED", "PROCESSED"].includes(r.status)
              );
              if (activeRefund) {
                  console.log("-> Has active refund, skipping");
                  return false;
              }
         }

         if (order.deliveredAt) {
              const hoursSinceDelivery = (Date.now() - new Date(order.deliveredAt).getTime()) / (1000 * 60 * 60);
              console.log("-> Hours since delivery:", hoursSinceDelivery);
              if (hoursSinceDelivery > 24) {
                   console.log("-> Past 24h, skipping");
                   return false;
              }
         }
         
         console.log("-> Eligible!");
         return true;
    };

    // Checking if there is an active refund to show a badge
    const getActiveRefundStatus = (order: any) => {
         if (!order.refunds || order.refunds.length === 0) return null;
         const active = order.refunds.find((r: any) => !["CHEF_REJECTED", "ADMIN_REJECTED"].includes(r.status));
         return active ? active.status : null;
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
                        {orders.map((order) => {
                            const activeRefundStatus = getActiveRefundStatus(order);
                            return (
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
                                        <div className="flex flex-col gap-1 items-start">
                                            <Badge variant="outline" className={getStatusColor(order.status)}>
                                                {order.status}
                                            </Badge>
                                            {activeRefundStatus && activeRefundStatus !== "PROCESSED" && (
                                                <Badge variant="secondary" className="text-[10px] bg-purple-50 text-purple-700 hover:bg-purple-50">
                                                    Refund: {activeRefundStatus.replace('_', ' ')}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right whitespace-nowrap">
                                        <div className="flex justify-end gap-2">
                                            {(order.status === "PLACED" || order.status === "PENDING") && order.payment?.status !== "SUCCESS" && (
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => handlePay(order.id, order.totalPrice)}
                                                    disabled={isInitPayment && payOrderId === order.id}
                                                    className="rounded-full px-4 h-8"
                                                >
                                                    {isInitPayment && payOrderId === order.id ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : "Pay Now"}
                                                </Button>
                                            )}
                                            
                                            {isRefundEligible(order) && (
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    onClick={() => openRefundModal(order.id, order.totalPrice)}
                                                    className="rounded-full px-4 h-8 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                                >
                                                    <Undo2 className="w-3.5 h-3.5 mr-1.5" /> Request Refund
                                                </Button>
                                            )}

                                            {!((order.status === "PLACED" || order.status === "PENDING") && order.payment?.status !== "SUCCESS") && !isRefundEligible(order) && (
                                                <span className="text-muted-foreground text-xs">—</span>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Payment Modal */}
            <Dialog open={isPaymentModalOpen} onOpenChange={handlePaymentModalClose}>
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

            {/* Refund Request Modal */}
            <Dialog open={isRefundModalOpen} onOpenChange={setIsRefundModalOpen}>
                <DialogContent className="sm:max-w-md">
                     <DialogHeader>
                          <DialogTitle className="text-xl font-black uppercase tracking-tight">Request Refund</DialogTitle>
                     </DialogHeader>
                     <div className="space-y-4 pt-4">
                          <div className="space-y-2">
                               <Label>Refund Amount (Max ${maxRefundAmount.toFixed(2)})</Label>
                               <Input 
                                    type="number" 
                                    step="0.01"
                                    max={maxRefundAmount}
                                    value={refundAmount || ""} 
                                    onChange={(e) => setRefundAmount(Number(e.target.value))} 
                               />
                          </div>
                          <div className="space-y-2">
                               <Label>Reason for Refund</Label>
                               <Textarea 
                                   placeholder="Please explain why you are requesting a refund..."
                                   value={refundReason}
                                   onChange={(e) => setRefundReason(e.target.value)}
                                   rows={4}
                               />
                          </div>
                     </div>
                     <DialogFooter className="mt-6">
                          <Button variant="outline" onClick={() => setIsRefundModalOpen(false)}>Cancel</Button>
                          <Button 
                               onClick={handleRefundSubmit} 
                               disabled={isSubmittingRefund || !refundReason.trim() || refundAmount <= 0 || refundAmount > maxRefundAmount}
                          >
                               {isSubmittingRefund ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Submit Request"}
                          </Button>
                     </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
