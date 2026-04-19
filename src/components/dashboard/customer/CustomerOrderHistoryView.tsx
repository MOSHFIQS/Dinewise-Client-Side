"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, History, Undo2, Star, ShoppingBag, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { ReviewDialog } from "../reviews/ReviewDialog";

const stripePromise = loadStripe(envVars.STRIPE_PUBLISHABLE_KEY);

export default function CustomerOrderHistoryView({ initialOrders }: { initialOrders: any[] }) {
    
    
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

    // Review State
    const [isReviewItemsModalOpen, setIsReviewItemsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [reviewMenuItemId, setReviewMenuItemId] = useState<string | null>(null);

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
             } else {
                 toast.error(res.error || "Failed to request refund");
             }
         } catch {
             toast.error("An error occurred");
         }
         setIsSubmittingRefund(false);
    };

    const openReviewItemsModal = (order: any) => {
         setSelectedOrder(order);
         setIsReviewItemsModalOpen(true);
    };

    const openReviewDialog = (menuItemId: string) => {
         setReviewMenuItemId(menuItemId);
         setIsReviewDialogOpen(true);
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

// inside CustomerOrderHistoryView
    return (
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Order History</h1>
                        <p className="text-sm text-gray-500">View all your past purchases and current order statuses</p>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Recent Orders</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {initialOrders.length} history
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6 py-4">Order ID</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Items</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Amount</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                                            <History className="h-12 w-12 text-gray-200" />
                                            <p className="text-sm font-medium">No orders found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                initialOrders.map((order) => {
                                    const activeRefundStatus = getActiveRefundStatus(order);
                                    return (
                                        <TableRow key={order.id} className="hover:bg-orange-50/30 transition-all duration-200 border-gray-50 group">
                                            <TableCell className="pl-6 py-4">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors uppercase">
                                                        #{order.id.slice(-8)}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-xs font-medium">
                                                        {new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-medium text-gray-700">{order.items?.length || 0} items</span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-bold text-gray-900">
                                                    ${order.totalPrice.toFixed(2)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1 items-start">
                                                    <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg", getStatusColor(order.status))}>
                                                        {order.status}
                                                    </Badge>
                                                    {activeRefundStatus && activeRefundStatus !== "PROCESSED" && (
                                                        <Badge variant="secondary" className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-50 border border-purple-100">
                                                            Refund: {activeRefundStatus.replace('_', ' ')}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right whitespace-nowrap pr-6">
                                                <div className="flex justify-end gap-2">
                                                    {(order.status === "PLACED" || order.status === "PENDING") && order.payment?.status !== "SUCCESS" && (
                                                        <Button 
                                                            size="sm" 
                                                            onClick={() => handlePay(order.id, order.totalPrice)}
                                                            disabled={isInitPayment && payOrderId === order.id}
                                                            className="rounded-xl px-4 h-9 bg-orange-500 hover:bg-orange-600 text-white font-bold tracking-tight shadow-sm border-0"
                                                        >
                                                            {isInitPayment && payOrderId === order.id ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : "Pay Now"}
                                                        </Button>
                                                    )}
                                                    
                                                    {isRefundEligible(order) && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline"
                                                            onClick={() => openRefundModal(order.id, order.totalPrice)}
                                                            className="rounded-xl px-4 h-9 text-[10px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 hover:border-red-200 border-gray-200 transition-colors"
                                                        >
                                                            <Undo2 className="w-3.5 h-3.5 mr-1" /> Refund
                                                        </Button>
                                                    )}

                                                    {order.status === "DELIVERED" && (
                                                        <Button 
                                                            size="sm" 
                                                            variant="secondary"
                                                            onClick={() => openReviewItemsModal(order)}
                                                            className="rounded-xl px-4 h-9 text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 border-none transition-colors"
                                                        >
                                                            <Star className="w-3.5 h-3.5 mr-1 fill-orange-600" /> Review
                                                        </Button>
                                                    )}

                                                    {!((order.status === "PLACED" || order.status === "PENDING") && order.payment?.status !== "SUCCESS") && !isRefundEligible(order) && order.status !== "DELIVERED" && (
                                                        <span className="text-gray-300 font-bold">—</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
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

            {/* Review Items Selection Modal */}
            <Dialog open={isReviewItemsModalOpen} onOpenChange={setIsReviewItemsModalOpen}>
                <DialogContent className="sm:max-w-md rounded-[2rem]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase tracking-tight">Review Items</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                        <p className="text-sm text-slate-500">Select an item from your order to review.</p>
                        <div className="space-y-3">
                            {selectedOrder?.items?.map((item: any) => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        {item.menuItemImage && (
                                            <div className="h-10 w-10 rounded-xl overflow-hidden border border-white shadow-sm">
                                                <img src={item.menuItemImage} alt={item.menuItemName} className="h-full w-full object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-black text-slate-900 line-clamp-1">{item.menuItemName}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">${item.unitPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <Button 
                                        size="sm" 
                                        onClick={() => openReviewDialog(item.menuItemId)}
                                        className="h-9 rounded-xl px-4 text-xs font-black uppercase tracking-widest bg-primary hover:bg-primary/90"
                                    >
                                        Review
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Individual Item Review Dialog */}
            {reviewMenuItemId && (
                <ReviewDialog 
                    isOpen={isReviewDialogOpen}
                    onClose={() => setIsReviewDialogOpen(false)}
                    menuItemId={reviewMenuItemId}
                />
            )}
        </div>
    );
}
