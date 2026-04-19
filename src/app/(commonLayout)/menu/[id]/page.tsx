import { getMenuItemById, getAllMenuItems } from "@/actions/menuItem.action";
import MenuItemView from "@/components/menu/MenuItemView";
import { notFound } from "next/navigation";

export default async function MenuItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const result = await getMenuItemById(id);
    console.log(result.data)

    if (!result.success || !result.data) {
        notFound();
    }

    const item = result.data;

    // Fetch related items from the same category
    let relatedItems: any[] = [];
    if (item.categoryId) {
        const relatedResult = await getAllMenuItems({ categoryId: item.categoryId });
        if (relatedResult.success && relatedResult.data) {
            relatedItems = (Array.isArray(relatedResult.data) ? relatedResult.data : [])
                .filter((i: any) => i.id !== id)
                .slice(0, 4);
        }
    }

    return (
        <div className="w-full bg-gradient-to-br from-[#eff3e3] via-[#faede0] to-[#fadcc6] min-h-screen text-black">
            <MenuItemView item={item} relatedItems={relatedItems} />
        </div>
    );
}
