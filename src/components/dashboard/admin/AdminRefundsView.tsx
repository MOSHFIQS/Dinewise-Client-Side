"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle2, XCircle, CreditCard } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  adminReviewRefundAction } from "@/actions/refund.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function AdminRefundsView({ initialRefunds }: { initialRefunds: any[] }) {
   
    const [selectedRefund, setSelectedRefund] = useState<any | null>(null);
    const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | null>(null);
    const [note, setNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

 

    const openActionDialog = (refund: any, action: "APPROVE" | "REJECT") => {
        setSelectedRefund(refund);
        setActionType(action);
        setNote("");
    };

    const submitAction = async () => {
        if (!selectedRefund || !actionType) return;
        if (actionType === "REJECT" && !note.trim()) {
             toast.error("A reason is required when rejecting a refund");
             return;
        }

        setIsSubmitting(true);
        try {
             // Admin approves to trigger Stripe refund and PROCESSED status
             const res = await adminReviewRefundAction(selectedRefund.id, { action: actionType, note });
             console.log(res)
             if (res.success) {
                  toast.success(`Refund successfully ${actionType === "APPROVE" ? "processed" : "rejected"}`);
                  setSelectedRefund(null);
             } else {
                  toast.error(res.error || `Failed to ${actionType.toLowerCase()} refund`);
             }
        } catch {
             toast.error("An error occurred during submission");
        }
        setIsSubmitting(false);
    };

    const getStatusColor = (status: string) => {
         switch (status) {
              case "REQUESTED": return "bg-yellow-100 text-yellow-800 border-yellow-200";
              case "CHEF_APPROVED": return "bg-blue-100 text-blue-800 border-blue-200 ring-2 ring-blue-500/50";
              case "CHEF_REJECTED": return "bg-red-100 text-red-800 border-red-200 opacity-60";
              case "ADMIN_APPROVED": return "bg-green-100 text-green-800 border-green-200";
              case "ADMIN_REJECTED": return "bg-red-100 text-red-800 border-red-200 opacity-60";
              case "PROCESSED": return "bg-purple-100 text-purple-800 border-purple-200";
              default: return "bg-slate-100 text-slate-800 border-slate-200";
         }
    };

    // Admin usually only processes CHEF_APPROVED
    // We group them nicely.
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Refunds</h1>
                    <p className="text-muted-foreground">Manage and dispatch chef-approved refund requests via Stripe integrations.</p>
                </div>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                            <TableHead>Reference</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Reason / Notes</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialRefunds.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No refund requests found across the system.
                                </TableCell>
                            </TableRow>
                        )}
                        {initialRefunds.map((refund) => (
                            <TableRow key={refund.id}>
                                <TableCell>
                                     <div className="font-mono text-xs font-semibold text-primary">REF: {refund.id.slice(-6).toUpperCase()}</div>
                                     <div className="text-[11px] text-muted-foreground mt-1 tracking-tight">ORD: {refund.orderId.slice(-6).toUpperCase()}</div>
                                </TableCell>
                                <TableCell>
                                     <div className="font-medium text-sm">{refund.customer?.name || "Customer"}</div>
                                     <div className="text-xs text-muted-foreground">{refund.customer?.email}</div>
                                </TableCell>
                                <TableCell className="font-bold text-foreground">
                                    ${refund.amount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                     <div className="text-sm font-medium line-clamp-1 max-w-[250px]" title={refund.reason}>{refund.reason}</div>
                                     {refund.chefNote && (
                                         <div className="text-xs mt-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-sm line-clamp-1 max-w-[250px]" title={refund.chefNote}>
                                             <span className="font-bold">Chef:</span> {refund.chefNote}
                                         </div>
                                     )}
                                     {refund.stripeRefundId && (
                                         <div className="text-[10px] mt-1 text-purple-600 font-mono">
                                             💳 {refund.stripeRefundId}
                                         </div>
                                     )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={getStatusColor(refund.status)}>
                                         {refund.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {refund.status === "CHEF_APPROVED" ? (
                                         <div className="flex justify-end gap-2">
                                              <Button 
                                                  disabled={isSubmitting}
                                                  size="sm" 
                                                  variant="outline" 
                                                  className="h-8 text-xs font-medium focus:ring-0"
                                                  onClick={() => openActionDialog(refund, "REJECT")}
                                              >
                                                   Deny
                                              </Button>
                                              <Button 
                                                  disabled={isSubmitting}
                                                  size="sm" 
                                                  className="h-8 text-xs font-medium focus:ring-0 shadow-sm"
                                                  onClick={() => openActionDialog(refund, "APPROVE")}
                                              >
                                                   <CreditCard className="w-3 h-3 mr-1.5" /> Process via Stripe
                                              </Button>
                                         </div>
                                    ) : (
                                         <span className="text-[11px] font-medium text-muted-foreground/50 border border-dashed rounded px-2 py-1 bg-gray-50 uppercase">
                                              {refund.status === "REQUESTED" ? "Awaiting Chef" : "Resolved"}
                                         </span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Action Modal */}
            <Dialog open={!!selectedRefund} onOpenChange={(open) => !open && setSelectedRefund(null)}>
                 <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                           <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2">
                                {actionType === "APPROVE" ? <><CreditCard className="text-primary" /> Process Refund</> : <><XCircle className="text-destructive" /> Reject Refund Request</>}
                           </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                           {actionType === "APPROVE" && (
                                <div className="p-3 bg-purple-50 text-purple-800 border border-purple-200 rounded-lg text-sm mb-4">
                                     <strong>Notice:</strong> This action will irreversibly initiate a real partial/full refund using the Stripe API gateway for the resolved amount.
                                </div>
                           )}
                           <div className="flex flex-col gap-1 text-sm bg-gray-50/80 p-3 rounded-lg border">
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">Gateway Load:</span> <strong className="text-primary text-base">${selectedRefund?.amount.toFixed(2)}</strong></div>
                                <div className="flex justify-between items-center"><span className="text-muted-foreground">Order Ref:</span> <span className="font-mono text-xs">{selectedRefund?.orderId.slice(-8).toUpperCase()}</span></div>
                           </div>
                           <div className="space-y-2 pt-2">
                                <label className="text-sm font-semibold">Admin Dispatch Note (Optional)</label>
                                <Textarea 
                                     placeholder={actionType === "REJECT" ? "Reason for administrative denial..." : "Stripe successfully processed. Sent email to client..."}
                                     value={note}
                                     onChange={(e) => setNote(e.target.value)}
                                     rows={3}
                                     className="resize-none"
                                />
                           </div>
                      </div>
                      <DialogFooter>
                           <Button variant="ghost" onClick={() => setSelectedRefund(null)}>Close</Button>
                           <Button 
                                onClick={submitAction}
                                disabled={isSubmitting || (actionType === "REJECT" && !note.trim())}
                                variant={actionType === "REJECT" ? "destructive" : "default"}
                                className={actionType === "APPROVE" ? "bg-purple-600 hover:bg-purple-700 shadow-md transition-all" : ""}
                           >
                                {isSubmitting ? "Executing Transaction..." : `Execute ${actionType === "APPROVE" ? "Payment Reversal" : "Rejection"}`}
                           </Button>
                      </DialogFooter>
                 </DialogContent>
            </Dialog>
        </div>
    );
}
