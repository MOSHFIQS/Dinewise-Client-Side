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
              case "REQUESTED": return "bg-yellow-100 text-yellow-800 border-yellow-200";
              case "CHEF_APPROVED": return "bg-blue-100 text-blue-800 border-blue-200";
              case "CHEF_REJECTED": return "bg-red-100 text-red-800 border-red-200";
              case "ADMIN_APPROVED": return "bg-green-100 text-green-800 border-green-200";
              case "ADMIN_REJECTED": return "bg-red-100 text-red-800 border-red-200";
              case "PROCESSED": return "bg-purple-100 text-purple-800 border-purple-200";
              default: return "bg-slate-100 text-slate-800 border-slate-200";
         }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Refund Requests</h1>
                    <p className="text-muted-foreground">Review and moderate refund requests for your menu items.</p>
                </div>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Refund ID / Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialRefunds.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No refund requests found.
                                </TableCell>
                            </TableRow>
                        )}
                        {initialRefunds.map((refund) => (
                            <TableRow key={refund.id}>
                                <TableCell>
                                     <div className="font-mono text-xs font-semibold">Refund: #{refund.id.slice(-6).toUpperCase()}</div>
                                     <div className="text-xs text-muted-foreground mt-1">Order: #{refund.orderId.slice(-6).toUpperCase()}</div>
                                </TableCell>
                                <TableCell>
                                     <div className="font-medium">{refund.customer?.name || "Customer"}</div>
                                </TableCell>
                                <TableCell className="font-semibold text-primary">
                                    ${refund.amount.toFixed(2)}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate" title={refund.reason}>
                                    {refund.reason}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={getStatusColor(refund.status)}>
                                         {refund.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    {refund.status === "REQUESTED" ? (
                                         <div className="flex justify-end gap-2">
                                              <Button 
                                                  disabled={isSubmitting}
                                                  size="sm" 
                                                  variant="outline" 
                                                  className="h-8 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                                                  onClick={() => openActionDialog(refund, "REJECT")}
                                              >
                                                   <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                                              </Button>
                                              <Button 
                                                  disabled={isSubmitting}
                                                  size="sm" 
                                                  className="h-8 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                                                  onClick={() => openActionDialog(refund, "APPROVE")}
                                              >
                                                   <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                                              </Button>
                                         </div>
                                    ) : (
                                         <span className="text-xs text-muted-foreground">
                                              Reviewed ({refund.status.startsWith("CHEF") ? refund.status.split("_")[1] : "PROCESSED"})
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
                 <DialogContent>
                      <DialogHeader>
                           <DialogTitle className="text-xl font-bold">
                                {actionType === "APPROVE" ? "Approve Refund Request" : "Reject Refund Request"}
                           </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                           <div className="flex justify-between text-sm bg-gray-50 p-3 rounded-lg border">
                                <span>Amount: <strong className="text-primary">${selectedRefund?.amount.toFixed(2)}</strong></span>
                                <span className="font-mono">Order #{selectedRefund?.orderId.slice(-6).toUpperCase()}</span>
                           </div>
                           <div className="space-y-2">
                                <label className="text-sm font-medium">Add a note (Optional for approval, required for rejection)</label>
                                <Textarea 
                                     placeholder={actionType === "REJECT" ? "Please provide a reason for rejecting the refund..." : "Any internal notes..."}
                                     value={note}
                                     onChange={(e) => setNote(e.target.value)}
                                     rows={4}
                                />
                           </div>
                      </div>
                      <DialogFooter>
                           <Button variant="outline" onClick={() => setSelectedRefund(null)}>Cancel</Button>
                           <Button 
                                onClick={submitAction}
                                disabled={isSubmitting || (actionType === "REJECT" && !note.trim())}
                                variant={actionType === "REJECT" ? "destructive" : "default"}
                           >
                                {isSubmitting ? "Processing..." : `Confirm ${actionType === "APPROVE" ? "Approval" : "Rejection"}`}
                           </Button>
                      </DialogFooter>
                 </DialogContent>
            </Dialog>
        </div>
    );
}
