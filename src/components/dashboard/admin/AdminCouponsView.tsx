"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { createCouponAction, deleteCouponAction } from "@/actions/coupon.action";
import { Label } from "@/components/ui/label";

import { Search, Ticket, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminCouponsView({ initialCoupons }: { initialCoupons: any[] }) {
    const [coupons, setCoupons] = useState<any[]>(initialCoupons);
    const [isCreating, setIsCreating] = useState(false);
    const [open, setOpen] = useState(false);
    
    // Form state
    const [code, setCode] = useState("");
    const [discountType, setDiscountType] = useState("FIXED");
    const [discountValue, setDiscountValue] = useState("");
    const [minOrderValue, setMinOrderValue] = useState("");
    const [validFrom, setValidFrom] = useState(new Date().toISOString().split('T')[0]);
    const [validUntil, setValidUntil] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
         e.preventDefault();
         setIsCreating(true);

         const expiryDate = new Date(validUntil);
         expiryDate.setHours(23, 59, 59, 999);

         const payload = {
              code: code.toUpperCase(),
              discountType,
              discountValue: parseFloat(discountValue),
              minOrderValue: minOrderValue ? parseFloat(minOrderValue) : null,
              validFrom: new Date(validFrom).toISOString(),
              validUntil: expiryDate.toISOString()
         };
         
         const res = await createCouponAction(payload);
         if (res.success) {
              toast.success("Coupon generated");
              setOpen(false);
              // Optimistically update
              setCoupons([res.data, ...coupons]);
              // Reset form
              setCode("");
              setDiscountValue("");
              setMinOrderValue("");
              setValidUntil("");
         } else {
              toast.error(res.error || "Failed to create coupon");
         }
         setIsCreating(false);
    };

    const handleDelete = async (id: string, index: number) => {
         if (!confirm("Delete this coupon permanently?")) return;
         
         // Optimistic delete for snappy UI
         const prev = [...coupons];
         setCoupons(coupons.filter(c => c.id !== id));
         
         const res = await deleteCouponAction(id);
         if (res.success) {
              toast.success("Coupon deleted");
         } else {
              setCoupons(prev);
              toast.error(res.error || "Failed to delete");
         }
    };

    return (
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <Tag className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Active Coupons</h1>
                        <p className="text-sm text-gray-500">Manage and dispatch promotional codes</p>
                    </div>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                     <DialogTrigger asChild>
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-10 px-6 font-semibold shadow-sm border-0 transition-all">
                            <Plus className="w-4 h-4 mr-2" /> Generate Coupon
                          </Button>
                     </DialogTrigger>
                     <DialogContent className="rounded-2xl">
                          <DialogHeader>
                               <DialogTitle className="text-xl font-bold text-gray-900">Create Promotional Code</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreate} className="space-y-4 pt-4">
                               <div className="space-y-2">
                                    <Label className="text-gray-700 font-medium">Coupon Code (e.g. SUMMER25)</Label>
                                    <Input required value={code} onChange={e => setCode(e.target.value)} className="rounded-xl border-gray-200 focus:ring-orange-500/20" />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                         <Label className="text-gray-700 font-medium">Discount Type</Label>
                                         <Select value={discountType} onValueChange={setDiscountType}>
                                              <SelectTrigger className="rounded-xl border-gray-200">
                                                   <SelectValue placeholder="Type" />
                                              </SelectTrigger>
                                              <SelectContent className="rounded-xl">
                                                   <SelectItem value="FIXED">Flat ($)</SelectItem>
                                                   <SelectItem value="PERCENTAGE">Percent (%)</SelectItem>
                                              </SelectContent>
                                         </Select>
                                    </div>
                                    <div className="space-y-2">
                                         <Label className="text-gray-700 font-medium">Discount Value</Label>
                                         <Input type="number" required step="0.01" value={discountValue} onChange={e => setDiscountValue(e.target.value)} className="rounded-xl border-gray-200" />
                                    </div>
                               </div>
                               <div className="space-y-2">
                                    <Label className="text-gray-700 font-medium">Min Order Value (Optional)</Label>
                                    <Input type="number" step="0.01" value={minOrderValue} onChange={e => setMinOrderValue(e.target.value)} placeholder="0.00" className="rounded-xl border-gray-200" />
                               </div>
                               <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                         <Label className="text-gray-700 font-medium">Valid From</Label>
                                         <Input type="date" required value={validFrom} onChange={e => setValidFrom(e.target.value)} className="rounded-xl border-gray-200" />
                                    </div>
                                    <div className="space-y-2">
                                         <Label className="text-gray-700 font-medium">Expiry Date</Label>
                                         <Input type="date" required value={validUntil} onChange={e => setValidUntil(e.target.value)} className="rounded-xl border-gray-200" />
                                    </div>
                               </div>
                               <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-11 font-bold shadow-md transition-all mt-2" disabled={isCreating}>
                                    {isCreating ? "Generating..." : "Issue Coupon"}
                               </Button>
                          </form>
                     </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Active Campaign</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {coupons.length} coupons
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6">Code</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Discount Value</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Min Required</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Expiration</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coupons.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                            <Tag className="h-10 w-10 text-gray-300" />
                                            <p className="text-sm font-medium">No coupons found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                coupons.map((c, idx) => {
                                     const isExpired = new Date(c.validUntil) < new Date();
                                     return (
                                        <TableRow key={c.id} className="hover:bg-orange-50/30 transition-colors border-gray-50 group">
                                            <TableCell className="pl-6 py-4">
                                                <span className="text-sm font-bold tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-100">
                                                    {c.code}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-bold text-gray-900">
                                                    {c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `$${c.discountValue.toFixed(2)}`}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-[11px] font-medium text-gray-500">
                                                    {c.minOrderValue ? `$${c.minOrderValue.toFixed(2)}` : "None"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-[11px] font-medium text-gray-400">
                                                     {new Date(c.validUntil).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                 <Badge variant="outline" className={cn(
                                                    "text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg",
                                                    isExpired ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"
                                                 )}>
                                                      {isExpired ? "EXPIRED" : "ACTIVE"}
                                                 </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                 <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" onClick={() => handleDelete(c.id, idx)}>
                                                      <Trash2 className="w-4 h-4" />
                                                 </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
