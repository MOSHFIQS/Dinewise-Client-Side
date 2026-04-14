"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrdersAction, updateOrderStatusAction } from "@/actions/order.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ChefOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        // Note: The backend /order/all handles chef filtering implicitly or we can rely on it if wired correctly.
        // If it isn't wired perfectly in backend logic for Chef filtering, we still hit the admin/chef accessible endpoint here.
        const res = await getAllOrdersAction();
        if (res.success) {
            setOrders(res.data.data);
        } else {
             toast.error("Failed to fetch orders");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

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
              case "DELIVERED": return "bg-green-100 text-green-800 border-green-200";
              case "CANCELLED": return "bg-destructive/10 text-destructive border-destructive/20";
              case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
              case "PREPARING": return "bg-blue-100 text-blue-800 border-blue-200";
              default: return "bg-slate-100 text-slate-800 border-slate-200";
         }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Manage Orders</h1>
                    <p className="text-muted-foreground">Track and update the status of incoming orders.</p>
                </div>
                <Button variant="outline" size="icon" onClick={fetchOrders} disabled={loading}>
                     <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
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
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && orders.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    No pending orders.
                                </TableCell>
                            </TableRow>
                        )}
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs">
                                    #{order.id.slice(-6).toUpperCase()}
                                </TableCell>
                                <TableCell>
                                     <div className="font-medium">{order.user?.name || "Customer"}</div>
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
                                         disabled={order.status === "DELIVERED" || order.status === "CANCELLED"}
                                    >
                                         <SelectTrigger className="w-[130px] ml-auto h-8 text-xs">
                                              <SelectValue placeholder="Update" />
                                         </SelectTrigger>
                                         <SelectContent>
                                              <SelectItem value="PENDING">PENDING</SelectItem>
                                              <SelectItem value="PREPARING">PREPARING</SelectItem>
                                              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                         </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
