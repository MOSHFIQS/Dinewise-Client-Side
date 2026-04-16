import { getAllUsersAction } from "@/actions/admin.action";
import AdminUsersView from "@/components/dashboard/admin/AdminUsersView";

export default async function AllUsersPage() {
    const res = await getAllUsersAction({});
    const initialUsers = res.success && res.data ? res.data : [];
    
    return <AdminUsersView initialUsers={initialUsers} />;
}
