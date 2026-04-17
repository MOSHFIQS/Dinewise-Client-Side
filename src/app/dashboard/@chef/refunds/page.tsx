import { getRefundsAction } from "@/actions/refund.action";
import ChefRefundsView from "@/components/dashboard/chef/ChefRefundsView";
import GlobalPagination from "@/components/shared/pagination/GlobalPagination";

export default async function ChefRefundsPage({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) {
    const { page, limit } = await searchParams;
    const res = await getRefundsAction({ page, limit });
    
    const initialRefunds = res.success && res.data ? res.data : [];
    const meta = res.meta || { page: 1, limit: 10, totalPages: 1 };
    
    return (
        <div className="space-y-6 h-full flex flex-col justify-between overflow-hidden pb-2">
            <div className="flex-1 overflow-auto pr-2">
                <ChefRefundsView initialRefunds={initialRefunds} />
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
