"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRefundsAction, chefReviewRefundAction } from "@/actions/refund.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChefRefundsView({ initialRefunds }: { initialRefunds: any[] }) {
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
             const res = await chefReviewRefundAction(selectedRefund.id, { action: actionType, note });
             if (res.success) {
                  toast.success(`Refund successfully ${actionType.toLowerCase()}d`);
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
              case "REQUESTED": return "bg-yellow-50 text-yellow-600 border-yellow-100";
              case "CHEF_APPROVED": return "bg-blue-50 text-blue-600 border-blue-100";
              case "CHEF_REJECTED": return "bg-red-50 text-red-600 border-red-100";
              case "ADMIN_APPROVED": return "bg-green-50 text-green-600 border-green-100";
              case "ADMIN_REJECTED": return "bg-red-50 text-red-600 border-red-100";
              case "PROCESSED": return "bg-purple-50 text-purple-600 border-purple-100";
              default: return "bg-gray-50 text-gray-600 border-gray-100";
         }
    };

    return (
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Refund Requests</h1>
                        <p className="text-sm text-gray-500">Review and moderate refund requests for your menu items</p>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Pending Reviews</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {initialRefunds.length} requests
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6 py-4">Refund Details</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialRefunds.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                                            <CreditCard className="h-12 w-12 text-gray-200" />
                                            <p className="text-sm font-medium">No refund requests found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                initialRefunds.map((refund) => (
                                    <TableRow key={refund.id} className="hover:bg-orange-50/30 transition-all duration-200 border-gray-50 group">
                                        <TableCell className="pl-6 py-5">
                                             <div className="flex flex-col gap-1">
                                                <span className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-wider">
                                                    REF: {refund.id.slice(-6)}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-mono">ORD: {refund.orderId.slice(-6).toUpperCase()}</span>
                                             </div>
                                        </TableCell>
                                        <TableCell>
                                             <div className="flex flex-col">
                                                 <span className="text-sm font-semibold text-gray-800">{refund.customer?.name || "Customer"}</span>
                                                 <span className="text-[10px] text-gray-400">{refund.customer?.email || "No contact"}</span>
                                             </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-bold text-gray-900">${refund.amount.toFixed(2)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-[11px] font-medium text-gray-500 line-clamp-2 max-w-[200px]" title={refund.reason}>
                                                {refund.reason}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg", getStatusColor(refund.status))}>
                                                 {refund.status.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            {refund.status === "REQUESTED" ? (
                                                 <div className="flex justify-end gap-2">
                                                      <Button 
                                                          disabled={isSubmitting}
                                                          size="sm" 
                                                          variant="outline" 
                                                          className="h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-tighter hover:bg-red-50 hover:text-red-600 hover:border-red-200 border-gray-200 transition-colors"
                                                          onClick={() => openActionDialog(refund, "REJECT")}
                                                      >
                                                           <XCircle className="w-3.5 h-3.5 mr-1" /> Deny
                                                      </Button>
                                                      <Button 
                                                          disabled={isSubmitting}
                                                          size="sm" 
                                                          className="h-8 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold uppercase tracking-tighter shadow-sm border-0 transition-colors"
                                                          onClick={() => openActionDialog(refund, "APPROVE")}
                                                      >
                                                           <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                                                      </Button>
                                                 </div>
                                            ) : (
                                                 <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-lg border border-dashed border-gray-200">
                                                      Reviewed ({refund.status.startsWith("CHEF") ? refund.status.split("_")[1] : "PROCESSED"})
                                                 </span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Action Modal */}
            <Dialog open={!!selectedRefund} onOpenChange={(open) => !open && setSelectedRefund(null)}>
                 <DialogContent className="rounded-2xl border-gray-100 p-0 overflow-hidden sm:max-w-md">
                      <div className="p-6 pb-0">
                          <DialogHeader>
                               <DialogTitle className="text-xl font-bold text-gray-900">
                                    {actionType === "APPROVE" ? "Approve Refund Request" : "Reject Refund Request"}
                               </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                               <div className="flex justify-between items-center text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <span className="text-gray-500 font-medium">Refund Amount: <strong className="text-gray-900 text-base">${selectedRefund?.amount.toFixed(2)}</strong></span>
                                    <span className="font-mono text-xs text-gray-400 font-bold uppercase">ORD: {selectedRefund?.orderId.slice(-6)}</span>
                               </div>
                               <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Add a note (Optional for approval, required for rejection)</label>
                                    <Textarea 
                                         placeholder={actionType === "REJECT" ? "Please provide a reason for rejecting the refund..." : "Any internal notes..."}
                                         value={note}
                                         onChange={(e) => setNote(e.target.value)}
                                         rows={4}
                                         className="rounded-xl border-gray-200 focus:ring-orange-500/20 resize-none"
                                    />
                               </div>
                          </div>
                      </div>
                      <DialogFooter className="flex gap-2 p-6 pt-4 bg-gray-50/50 border-t border-gray-100">
                           <Button variant="outline" className="flex-1 rounded-xl border-gray-200 h-11 font-semibold" onClick={() => setSelectedRefund(null)}>Cancel</Button>
                           <Button 
                                onClick={submitAction}
                                disabled={isSubmitting || (actionType === "REJECT" && !note.trim())}
                                className={cn("flex-1 rounded-xl h-11 font-bold text-white shadow-md transition-colors border-0", actionType === "REJECT" ? "bg-red-500 hover:bg-red-600" : "bg-orange-500 hover:bg-orange-600")}
                           >
                                {isSubmitting ? "Processing..." : `Confirm ${actionType === "APPROVE" ? "Approval" : "Rejection"}`}
                           </Button>
                      </DialogFooter>
                 </DialogContent>
            </Dialog>
        </div>
    );

}
