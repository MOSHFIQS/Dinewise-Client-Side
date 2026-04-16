import { getMyOrdersAction } from "@/actions/order.action";
import CustomerOrderHistoryView from "@/components/dashboard/customer/CustomerOrderHistoryView";

export default async function OrderHistoryPage() {
    const res = await getMyOrdersAction({});
    const initialOrders = res.success && res.data ? res.data : [];
    
    return <CustomerOrderHistoryView initialOrders={initialOrders} />;
}
