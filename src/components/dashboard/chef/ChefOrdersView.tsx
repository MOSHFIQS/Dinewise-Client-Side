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
import { ShoppingBag, ChevronRight, Clock } from "lucide-react";


export default function ChefOrdersView({ initialOrders }: { initialOrders: any[] }) {
    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const res = await updateOrderStatusAction(id, newStatus);
        if (res.success) {
            toast.success(`Order status updated to ${newStatus}`);
        } else {
            toast.error(res.error || "Failed to update status");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "CANCELLED": return "bg-red-50 text-red-600 border-red-100";
            case "REFUNDED": return "bg-purple-50 text-purple-600 border-purple-100";
            case "PLACED": return "bg-blue-50 text-blue-600 border-blue-100";
            case "CONFIRMED": return "bg-indigo-50 text-indigo-600 border-indigo-100";
            case "PROCESSING": return "bg-amber-50 text-amber-600 border-amber-100";
            case "SHIPPED": return "bg-orange-50 text-orange-600 border-orange-100";
            default: return "bg-gray-50 text-gray-600 border-gray-100";
        }
    };

    const getNextPossibleStatuses = (currentStatus: string) => {
        // Chefs handle the core fulfillment flow
        const transitions: Record<string, string[]> = {
            "PLACED": ["CONFIRMED"],
            "CONFIRMED": ["PROCESSING"],
            "PROCESSING": ["SHIPPED"],
            "SHIPPED": ["DELIVERED"],
            "DELIVERED": [],
            "CANCELLED": [],
            "REFUNDED": [],
        };
        return transitions[currentStatus] || [];
    };

    return (
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Incoming Orders</h1>
                        <p className="text-sm text-gray-500">Track and fulfill your kitchen's orders</p>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Order Management</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {initialOrders.length} active
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6 py-4">Order Details</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Customer Info</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Timestamp</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Workflow</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
                                            <ShoppingBag className="h-12 w-12 text-gray-200" />
                                            <p className="text-sm font-medium">No pending orders yet</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                initialOrders.map((order) => {
                                    const nextStatuses = getNextPossibleStatuses(order.status);
                                    const canUpdate = nextStatuses.length > 0;

                                    return (
                                        <TableRow key={order.id} className="hover:bg-orange-50/30 transition-all duration-200 border-gray-50 group">
                                            <TableCell className="pl-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                        #{order.id.slice(-6).toUpperCase()}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 font-mono">DINE-WISE-PRO</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-800">{order.customer?.name || "Guest User"}</span>
                                                    <span className="text-[10px] text-gray-400">{order.customer?.email || "No contact"}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5 text-gray-500">
                                                    <Clock className="w-3 h-3" />
                                                    <span className="text-[11px] font-medium">
                                                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg", getStatusColor(order.status))}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <div className="flex justify-end">
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(val) => handleStatusUpdate(order.id, val)}
                                                        disabled={!canUpdate}
                                                    >
                                                        <SelectTrigger className={cn(
                                                            "w-[140px] h-9 text-[10px] font-bold uppercase tracking-wider rounded-xl border-gray-200 focus:ring-orange-500/20",
                                                            canUpdate ? "bg-white text-gray-700 shadow-sm border-orange-100" : "bg-gray-50 text-gray-400"
                                                        )}>
                                                            <SelectValue placeholder="Transition" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                                            <SelectItem value={order.status} disabled className="text-[10px] font-bold uppercase py-2 bg-gray-50">{order.status} (Current)</SelectItem>
                                                            {nextStatuses.map(status => (
                                                                <SelectItem key={status} value={status} className="text-[10px] font-bold uppercase py-2 cursor-pointer hover:bg-orange-50 hover:text-orange-600">
                                                                    Move to {status}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
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
        </div>
    );
}
