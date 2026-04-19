import { getAllOrdersAction } from "@/actions/order.action";
import AdminOrdersView from "@/components/dashboard/admin/AdminOrdersView";
import GlobalPagination from "@/components/shared/pagination/GlobalPagination";

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) {
    const { page, limit } = await searchParams;
    console.log(page,limit)
    const res = await getAllOrdersAction({ page, limit });
    console.log(res)
    
    const initialOrders = res.success && res.data ? res.data : [];
    const meta = res.meta || { page: 1, limit: 10, totalPages: 1 };

    console.log(initialOrders)
    
    return (
        <div className="space-y-6 h-full flex flex-col justify-between overflow-hidden pb-2">
            <div className="flex-1 overflow-auto pr-2">
                <AdminOrdersView initialOrders={initialOrders} />
            </div>
            <div className="px-6 py-4 bg-white/50 border-t border-gray-100 backdrop-blur-sm rounded-b-2xl">
                 <GlobalPagination
                      page={meta.page}
                      totalPages={meta.totalPages}
                      limit={meta.limit}
                 />
            </div>
        </div>
    );
}
