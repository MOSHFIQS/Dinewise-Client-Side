import { getMenuItemById } from "@/actions/menuItem.action";
import { getAllCategories } from "@/actions/category.action";
import UpdateMenuItem from "@/components/chef/UpdateMenuItem";

export default async function UpdateMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params;
     
     const [itemRes, catRes] = await Promise.all([
          getMenuItemById(id),
          getAllCategories()
     ]);

     const item = itemRes.success ? itemRes.data : null;
     const categories = catRes.success ? (catRes.data || []) : [];

     if (!item) {
          return (
               <div className="p-6">
                    <p className="p-6 text-red-600 font-medium bg-red-50 rounded-2xl border border-red-100 uppercase tracking-widest text-[10px]">
                         Failed to locate dish records. It may have been removed or retired.
                    </p>
               </div>
          );
     }

     return <UpdateMenuItem item={item} categories={categories} />;
}