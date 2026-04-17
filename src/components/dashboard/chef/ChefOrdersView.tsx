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
        // Chefs handle the core fulfillment flow
        const transitions: Record<string, string[]> = {
            "PLACED": ["CONFIRMED"],
            "CONFIRMED": ["PROCESSING"],
            "PROCESSING": ["SHIPPED"],
            "SHIPPED": ["DELIVERED"], // Chef might also mark as delivered if it's local pickup
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
                    <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
                    <p className="text-muted-foreground">Track and update the status of incoming orders.</p>
                </div>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Time placed</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {initialOrders.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    No pending orders.
                                </TableCell>
                            </TableRow>
                        )}
                        {initialOrders.map((order) => {
                            const nextStatuses = getNextPossibleStatuses(order.status);
                            const canUpdate = nextStatuses.length > 0;

                            return (
                                <TableRow key={order.id}>
                                    <TableCell className="font-mono text-xs">
                                        #{order.id.slice(-6).toUpperCase()}
                                    </TableCell>
                                    <TableCell>
                                         <div className="font-medium">{order.customer?.name || "Customer"}</div>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleTimeString()}
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
                                                  <SelectValue placeholder="Update" />
                                             </SelectTrigger>
                                             <SelectContent>
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
