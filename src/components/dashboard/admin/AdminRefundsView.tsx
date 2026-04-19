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
import { adminReviewRefundAction } from "@/actions/refund.action";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">System Refunds</h1>
                        <p className="text-sm text-gray-500">Dispatch chef-approved refund requests via Stripe</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Refund Queue</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {initialRefunds.length} total requests
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6">Reference</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Reason / Notes</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialRefunds.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                            <CreditCard className="h-10 w-10 text-gray-300" />
                                            <p className="text-sm font-medium">No refund requests found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                initialRefunds.map((refund) => (
                                    <TableRow key={refund.id} className="hover:bg-orange-50/30 transition-colors border-gray-50 group">
                                        <TableCell className="pl-6 py-4">
                                            <div className="font-mono text-[10px] font-bold text-orange-600">REF: {refund.id.slice(-6).toUpperCase()}</div>
                                            <div className="text-[9px] text-gray-400 mt-0.5 tracking-tight">ORD: {refund.orderId.slice(-6).toUpperCase()}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm font-semibold text-gray-800">{refund.customer?.name || "Customer"}</div>
                                            <div className="text-[10px] text-gray-400">{refund.customer?.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm font-bold text-gray-900">${refund.amount.toFixed(2)}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-[11px] font-medium text-gray-500 line-clamp-1 max-w-[200px]" title={refund.reason}>{refund.reason}</div>
                                            {refund.chefNote && (
                                                <div className="text-[9px] mt-1 text-blue-600 bg-blue-50/50 px-2 py-0.5 rounded border border-blue-100 w-fit line-clamp-1 max-w-[200px]" title={refund.chefNote}>
                                                    <span className="font-bold underline">Chef:</span> {refund.chefNote}
                                                </div>
                                            )}
                                            {refund.stripeRefundId && (
                                                <div className="text-[10px] mt-1 text-purple-600 font-mono">
                                                    💳 {refund.stripeRefundId}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn("text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg", getStatusColor(refund.status))}>
                                                {refund.status.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            {refund.status === "CHEF_APPROVED" ? (
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        disabled={isSubmitting}
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-tighter hover:border-red-300 hover:text-red-500 transition-colors"
                                                        onClick={() => openActionDialog(refund, "REJECT")}
                                                    >
                                                        Deny
                                                    </Button>
                                                    <Button
                                                        disabled={isSubmitting}
                                                        size="sm"
                                                        className="h-8 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold uppercase tracking-tighter border-0 shadow-sm"
                                                        onClick={() => openActionDialog(refund, "APPROVE")}
                                                    >
                                                        <CreditCard className="w-3.5 h-3.5 mr-1" /> Dispatch
                                                    </Button>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded border border-dashed font-bold uppercase tracking-tight">
                                                    {refund.status === "REQUESTED" ? "Wait for Chef" : "Resolved"}
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
