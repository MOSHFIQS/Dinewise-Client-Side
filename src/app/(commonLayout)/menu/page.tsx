import { getAllMenuItems } from "@/actions/menuItem.action";
import { getAllCategories } from "@/actions/category.action";
import MenuGrid from "@/components/shared/MenuGrid";

export default async function MenuPage() {
    const [menuRes, categoryRes] = await Promise.all([
        getAllMenuItems({}),
        getAllCategories({})
    ]);

    const menuItems = menuRes?.success ? menuRes.data : [];
    const categories = categoryRes?.success ? categoryRes.data : [];

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
        </div>
    );
}


