import { getChefMenuItemsAction } from "@/actions/menuItem.action";
import ChefMenuItems from "@/components/chef/ChefMenuItems";
import GlobalPagination from "@/components/shared/pagination/GlobalPagination";

export default async function MyMenuPage({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string; searchTerm?: string }> }) {
     const { page, limit, searchTerm } = await searchParams;
     
     const pageNum = page ? parseInt(page) : 1;
     const limitNum = limit ? parseInt(limit) : 10;
     
     const res = await getChefMenuItemsAction({ page: pageNum.toString(), limit: limitNum.toString(), searchTerm });

     if (!res.success) {
          return (
               <div className="p-6">
                    <p className="p-6 text-red-600 font-medium bg-red-50 rounded-2xl border border-red-100">
                         Failed to load your kitchen records: {res.error}
                    </p>
               </div>
          );
     }

     const items = res.data || [];
     const meta = res.meta || { page: pageNum, limit: limitNum, totalPages: 1, total: items.length };

     return (
          <div className="space-y-6 h-full flex flex-col justify-between py-2 overflow-hidden">
               <div className="flex-1 overflow-auto">
                    <ChefMenuItems initialItems={items} totalCount={meta.total} />
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

