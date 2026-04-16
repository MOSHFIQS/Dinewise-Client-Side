import { getAllOrdersAction } from "@/actions/order.action";
import ChefOrdersView from "@/components/dashboard/chef/ChefOrdersView";

export default async function ChefOrdersPage() {
    const res = await getAllOrdersAction({});
    const initialOrders = res.success && res.data ? res.data : [];
    
    return <ChefOrdersView initialOrders={initialOrders} />;
}
