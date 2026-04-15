"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllCouponsAction, createCouponAction, deleteCouponAction } from "@/actions/coupon.action";
import { Label } from "@/components/ui/label";

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [open, setOpen] = useState(false);
    
    // Form state
    const [code, setCode] = useState("");
    const [discountAmount, setDiscountAmount] = useState("");
    const [minOrderValue, setMinOrderValue] = useState("");
    const [expiresAt, setExpiresAt] = useState("");

    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const res = await getAllCouponsAction({});
            if (res.success && res.data) {
                // Now data is returned directly in res.data
                setCoupons(res.data);
            } else {
                toast.error("Failed to fetch coupons");
            }
        } catch (error: any) {
             toast.error("An error occurred while fetching coupons");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
         e.preventDefault();
         setIsCreating(true);
         const payload = {
              code: code.toUpperCase(),
              discountAmount: parseFloat(discountAmount),
              minOrderValue: minOrderValue ? parseFloat(minOrderValue) : null,
              expiresAt: new Date(expiresAt).toISOString()
         };
         
         const res = await createCouponAction(payload);
         if (res.success) {
              toast.success("Coupon generated");
              setOpen(false);
              fetchCoupons();
         } else {
              toast.error(res.error || "Failed to create coupon");
         }
         setIsCreating(false);
    };

    const handleDelete = async (id: string) => {
         if (!confirm("Delete this coupon permanently?")) return;
         const res = await deleteCouponAction(id);
         if (res.success) {
              toast.success("Coupon deleted");
              fetchCoupons();
         } else {
              toast.error(res.error || "Failed to delete");
         }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Active Coupons</h1>
                    <p className="text-muted-foreground">Manage and dispatch promotional codes.</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                     <DialogTrigger asChild>
                          <Button><Plus className="w-4 h-4 mr-2" /> Generate Coupon</Button>
                     </DialogTrigger>
                     <DialogContent>
                          <DialogHeader>
                               <DialogTitle>Create Promotional Code</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreate} className="space-y-4 pt-4">
                               <div className="space-y-2">
                                    <Label>Coupon Code (e.g. SUMMER25)</Label>
                                    <Input required value={code} onChange={e => setCode(e.target.value)} />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                         <Label>Flat Discount ($)</Label>
                                         <Input type="number" required step="0.01" value={discountAmount} onChange={e => setDiscountAmount(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                         <Label>Min Order Value</Label>
                                         <Input type="number" step="0.01" value={minOrderValue} onChange={e => setMinOrderValue(e.target.value)} placeholder="0.00" />
                                    </div>
                               </div>
                               <div className="space-y-2">
                                    <Label>Expiry Date</Label>
                                    <Input type="datetime-local" required value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
                               </div>
                               <Button type="submit" className="w-full" disabled={isCreating}>
                                    {isCreating ? "Generating..." : "Issue Coupon"}
                               </Button>
                          </form>
                     </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Code</TableHead>
                            <TableHead>Discount Value</TableHead>
                            <TableHead>Min Required</TableHead>
                            <TableHead>Expiration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-10">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && coupons.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No coupons have been generated yet.
                                </TableCell>
                            </TableRow>
                        )}
                        {coupons.map((c) => {
                             const isExpired = new Date(c.expiresAt) < new Date();
                             return (
                            <TableRow key={c.id}>
                                <TableCell className="font-bold tracking-wider">
                                    {c.code}
                                </TableCell>
                                <TableCell className="font-semibold text-primary">
                                    ${c.discountAmount.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    {c.minOrderValue ? `$${c.minOrderValue.toFixed(2)}` : "None"}
                                </TableCell>
                                <TableCell>
                                     {new Date(c.expiresAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                     <Badge variant={isExpired ? "destructive" : "default"} className={!isExpired ? "bg-green-500 hover:bg-green-600" : ""}>
                                          {isExpired ? "EXPIRED" : "ACTIVE"}
                                     </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                     <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(c.id)}>
                                          <Trash2 className="w-4 h-4" />
                                     </Button>
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
