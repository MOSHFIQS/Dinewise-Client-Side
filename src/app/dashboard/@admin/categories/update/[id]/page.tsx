import { getCategoryByIdAction } from "@/actions/category.action";
import UpdateCategory from "@/components/updateCategory/UpdateCategory";

export default async function UpdateCategoryPage({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
     const catRes = await getCategoryByIdAction(id);

     const category = catRes.success ? (catRes.data?.data || catRes.data) : null;

     if (!category) {
          return (
               <div className="p-6">
                    <p className="text-red-500 font-medium bg-red-50 p-4 rounded-xl border border-red-100">
                         Category not found or failed to load.
                    </p>
               </div>
          );
     }

     return <UpdateCategory category={category} />;
}
