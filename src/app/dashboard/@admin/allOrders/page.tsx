import { getAllOrdersAction } from "@/actions/order.action";
import AdminOrdersView from "@/components/dashboard/admin/AdminOrdersView";

export default async function AdminOrdersPage() {
    const res = await getAllOrdersAction({});
    const initialOrders = res.success && res.data ? res.data : [];
    
    return <AdminOrdersView initialOrders={initialOrders} />;
}
