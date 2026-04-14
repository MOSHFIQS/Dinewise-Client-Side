import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import AdminDashboard from "./@admin/page";
import ChefDashboard from "./@chef/page";
import CustomerDashboard from "./@customer/page";

// Actual Dashboard Route layout logic
export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) return <CustomerDashboard />; 
    
    try {
        const decoded = jwt.decode(token) as { role: string };
        const role = decoded?.role || "CUSTOMER";

        if (role === "ADMIN") return <AdminDashboard />;
        if (role === "CHEF") return <ChefDashboard />;
        return <CustomerDashboard />;
    } catch {
        return <CustomerDashboard />;
    }
}
