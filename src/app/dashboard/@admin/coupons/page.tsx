import { getAllCouponsAction } from "@/actions/coupon.action";
import AdminCouponsView from "@/components/dashboard/admin/AdminCouponsView";

export default async function AdminCouponsPage() {
    const res = await getAllCouponsAction({});
    const initialCoupons = res.success && res.data ? res.data : [];
    
    return <AdminCouponsView initialCoupons={initialCoupons} />;
}
