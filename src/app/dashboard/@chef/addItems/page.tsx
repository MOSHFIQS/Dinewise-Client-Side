import { getAllCategories } from "@/actions/category.action";
import CreateMenuItem from "@/components/chef/CreateMenuItem";

export default async function AddMenuItemPage() {
     const res = await getAllCategories();
     
     // Handle both wrapped and unwrapped data
     const categories = res.success ? (res.data?.data || res.data || []) : [];

     return <CreateMenuItem categories={categories} />;
}

