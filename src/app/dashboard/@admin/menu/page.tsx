import { getAllMenuItems } from "@/actions/menuItem.action";
import AdminMenuItemsView from "@/components/dashboard/admin/AdminMenuItemsView";
import GlobalPagination from "@/components/shared/pagination/GlobalPagination";

export default async function AllMenuPage({
  searchParams,
}: {
  searchParams: Promise<{
    searchTerm?: string;
    page?: string;
    limit?: string;
    category?: string;
  }>;
}) {
  const { searchTerm, page, limit, category } = await searchParams;

  const res = await getAllMenuItems({
    searchTerm,
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 10,
    category,
  });

  const menuItems = res?.data || [];
  const meta = res?.meta || { page: 1, totalPages: 1, limit: 10 };

  return (
    <div className="space-y-6">
      <AdminMenuItemsView
        initialItems={menuItems}
        totalCount={meta.total}
      />

      <GlobalPagination
        page={meta.page}
        totalPages={meta.totalPages}
        limit={meta.limit}
      />
    </div>
  );
}
