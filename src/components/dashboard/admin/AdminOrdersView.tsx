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
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Orders</h1>
                    <p className="text-muted-foreground">Monitor and manage all customer orders.</p>
                </div>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                        {orders.map((order) => {
                            const nextStatuses = getNextPossibleStatuses(order.status);
                            const canUpdate = nextStatuses.length > 0;

                            return (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono text-xs">
                                        #{order.id.slice(-6).toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                         <div className="font-medium">{order.user?.name || "Unknown"}</div>
                                         <div className="text-xs text-muted-foreground">{order.user?.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="font-semibold text-primary">
                                        ${order.totalPrice.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={getStatusColor(order.status)}>
                                             {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Select 
                                             value={order.status} 
                                             onValueChange={(val) => handleStatusUpdate(order.id, val)}
                                             disabled={!canUpdate}
                                        >
                                             <SelectTrigger className="w-[140px] ml-auto h-8 text-xs">
                                                  <SelectValue placeholder="Update Status" />
                                             </SelectTrigger>
                                             <SelectContent>
                                                  {/* Always include current status as disabled or visible */}
                                                  <SelectItem value={order.status} disabled>{order.status}</SelectItem>
                                                  {nextStatuses.map(status => (
                                                      <SelectItem key={status} value={status}>{status}</SelectItem>
                                                  ))}
                                             </SelectContent>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
