import { getAllCategories } from "@/actions/category.action";
import AllCategories from "@/components/dashboard/admin/allCategories";
import GlobalPagination from "@/components/shared/pagination/GlobalPagination";

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) {
     const { page, limit } = await searchParams;

     const pageNum = page ? parseInt(page) : 1;
     const limitNum = limit ? parseInt(limit) : 10;

     const res = await getAllCategories({ page: pageNum.toString(), limit: limitNum.toString() });

     if (!res.success) {
          return <p className="p-6 text-red-600 font-medium bg-red-50 rounded-xl border border-red-100 m-6">Failed to load categories: {res.error}</p>;
     }

     const categories = res.data || [];
     const meta = res.meta || { page: pageNum, limit: limitNum, totalPages: 1 };

     return (
          <div className="space-y-6 h-full flex flex-col justify-between py-2 overflow-hidden">
               <div className="flex-1 overflow-auto">
                    <AllCategories initialCategories={categories} />
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

