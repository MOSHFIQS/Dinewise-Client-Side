import { getAllMenuItems } from "@/actions/menuItem.action";
import { getAllCategories } from "@/actions/category.action";
import MenuGrid from "@/components/menu/MenuGrid";
import GlobalPagination from "@/components/shared/pagination/GlobalPagination";

export default async function MenuPage({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string; categoryId?: string; searchTerm?: string }> }) {
    const { page, limit, categoryId, searchTerm } = await searchParams;
    const [menuRes, categoryRes] = await Promise.all([
        getAllMenuItems({ page, limit, categoryId, searchTerm }),
        getAllCategories({})
    ]);

    const menuItems = menuRes?.success ? menuRes.data : [];
    const categories = categoryRes?.success ? categoryRes.data : [];
    const meta = menuRes?.meta || { page: 1, limit: 10, totalPages: 1 };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Our Menu</h1>
                <p className="text-muted-foreground w-full max-w-2xl mx-auto">
                    Explore our exquisite selection of dishes crafted to perfection by our culinary masters.
                    Filter by categories to find your next favorite meal.
                </p>
            </div>

            <MenuGrid initialItems={menuItems} categories={categories} />
            
            <div className="mt-12 flex justify-end">
                 <GlobalPagination
                      page={meta.page}
                      totalPages={meta.totalPages}
                      limit={meta.limit}
                 />
            </div>
        </div>
    );
}


