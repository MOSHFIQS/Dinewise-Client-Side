"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyOrdersAction } from "@/actions/order.action";

export default function OrderHistoryPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        const res = await getMyOrdersAction();
        if (res.success) {
            setOrders(res.data.data);
        } else {
             toast.error("Failed to fetch order history");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
         switch (status) {
              case "DELIVERED": return "bg-green-100 text-green-800 border-green-200";
              case "CANCELLED": return "bg-destructive/10 text-destructive border-destructive/20";
              case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-200";
              default: return "bg-blue-100 text-blue-800 border-blue-200";
         }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
                <p className="text-muted-foreground">View all your past purchases and current order statuses.</p>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total Items</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && orders.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground flex flex-col items-center">
                                    <History className="w-10 h-10 mb-2 opacity-20" />
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="whitespace-nowrap font-mono text-xs">
                                    #{order.id.slice(-8).toUpperCase()}
                                </TableCell>
                                <TableCell>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{order.orderItems?.length || 0} items</TableCell>
                                <TableCell className="font-semibold text-primary">
                                    ${order.totalPrice.toFixed(2)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={getStatusColor(order.status)}>
                                         {order.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
