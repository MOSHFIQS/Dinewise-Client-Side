import { getMyAddressesAction } from "@/actions/address.action";
import CustomerAddressesView from "@/components/dashboard/customer/CustomerAddressesView";

export default async function DeliveryAddressesPage() {
    const res = await getMyAddressesAction();
    const initialAddresses = res.success && res.data ? (Array.isArray(res.data) ? res.data : res.data.data || []) : [];

    return <CustomerAddressesView initialAddresses={initialAddresses} />;
}
