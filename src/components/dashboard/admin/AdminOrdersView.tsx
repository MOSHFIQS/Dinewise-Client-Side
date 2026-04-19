"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateOrderStatusAction } from "@/actions/order.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const OrderStatusOptions = ["PLACED", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];

export default function AdminOrdersView({ initialOrders }: { initialOrders: any[] }) {
    const [orders, setOrders] = useState<any[]>(initialOrders);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
         const res = await updateOrderStatusAction(id, newStatus);
         if (res.success) {
              toast.success(`Order status updated to ${newStatus}`);
              setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
         } else {
              toast.error(res.error || "Failed to update status");
         }
    };

    const getStatusColor = (status: string) => {
         switch (status) {
              case "DELIVERED": return "bg-emerald-100 text-emerald-800 border-emerald-200";
              case "CANCELLED": return "bg-red-100 text-red-800 border-red-200";
              case "REFUNDED": return "bg-purple-100 text-purple-800 border-purple-200";
              case "PLACED": return "bg-blue-100 text-blue-800 border-blue-200";
              case "CONFIRMED": return "bg-indigo-100 text-indigo-800 border-indigo-200";
              case "PROCESSING": return "bg-amber-100 text-amber-800 border-amber-200";
              case "SHIPPED": return "bg-orange-100 text-orange-800 border-orange-200";
              default: return "bg-slate-100 text-slate-800 border-slate-200";
         }
    };

    const getNextPossibleStatuses = (currentStatus: string) => {
        const transitions: Record<string, string[]> = {
            "PLACED": ["CONFIRMED", "CANCELLED"],
            "CONFIRMED": ["PROCESSING", "CANCELLED"],
            "PROCESSING": ["SHIPPED", "CANCELLED"],
            "SHIPPED": ["DELIVERED"],
            "DELIVERED": [],
            "CANCELLED": [],
            "REFUNDED": [],
        };
        return transitions[currentStatus] || [];
    };

    return (
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <RefreshCw className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">System Orders</h1>
                        <p className="text-sm text-gray-500">Monitor and manage all customer orders</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Recent Transactions</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {orders.length} records
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6">Order ID</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Amount</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-16 text-gray-400 font-medium">
                                        No orders found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => {
                                    const nextStatuses = getNextPossibleStatuses(order.status);
                                    const canUpdate = nextStatuses.length > 0;

                                    return (
                                        <TableRow key={order.id} className="hover:bg-orange-50/30 transition-colors border-gray-50 group">
                                            <TableCell className="pl-6 py-4 font-mono text-xs font-semibold text-gray-600">
                                                #{order.id.slice(-6).toUpperCase()}
                                            </TableCell>
                                            <TableCell>
                                                 <div className="text-sm font-semibold text-gray-800">{order.user?.name || "Unknown"}</div>
                                                 <div className="text-[10px] text-gray-400">{order.user?.email}</div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-[11px] font-medium text-gray-500">
                                                    {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm font-bold text-orange-600">
                                                    ${order.totalPrice.toFixed(2)}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg", getStatusColor(order.status))}>
                                                     {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Select 
                                                     value={order.status} 
                                                     onValueChange={(val) => handleStatusUpdate(order.id, val)}
                                                     disabled={!canUpdate}
                                                >
                                                     <SelectTrigger className="w-[130px] ml-auto h-8 text-[11px] font-semibold border-gray-200 rounded-lg focus:ring-orange-500/20">
                                                          <SelectValue placeholder="Update Status" />
                                                     </SelectTrigger>
                                                     <SelectContent className="rounded-xl">
                                                          <SelectItem value={order.status} disabled className="text-[11px] font-semibold">{order.status}</SelectItem>
                                                          {nextStatuses.map(status => (
                                                              <SelectItem key={status} value={status} className="text-[11px] font-semibold">{status}</SelectItem>
                                                          ))}
                                                     </SelectContent>
                                                </Select>
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
