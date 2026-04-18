import { getChefStatsAction } from "@/actions/stats.action";
import { Utensils, ShoppingBag, DollarSign } from "lucide-react";
import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { RecentOrdersTable } from "@/components/dashboard/shared/RecentOrdersTable";
import { TopSellingItemsList } from "@/components/dashboard/shared/TopSellingItemsList";
import { RevenueChart } from "@/components/dashboard/shared/RevenueChart";
import { OrderStatusChart } from "@/components/dashboard/shared/OrderStatusChart";

export default async function ChefDashboard() {
     const res = await getChefStatsAction();
     
     if (!res?.success) {
          return (
               <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <p className="text-rose-500 font-bold uppercase tracking-widest text-xs">Failed to load chef performance</p>
                    <p className="text-slate-400 text-sm">{res?.message || "Internal server error"}</p>
               </div>
          );
     }

     const stats = res.data;

     return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-12">
               <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">Chef Dashboard</h1>
                    <p className="text-muted-foreground text-lg">Manage your kitchen and track your earnings.</p>
               </div>

               {/* KPI Cards */}
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <StatsCard 
                         title="Your Revenue" 
                         value={`$${stats.totalRevenue.toFixed(2)}`} 
                         icon={DollarSign} 
                         color="text-emerald-600"
                         description="Earnings from successful orders"
                    />
                    <StatsCard 
                         title="Total Orders" 
                         value={stats.totalOrders} 
                         icon={ShoppingBag} 
                         color="text-blue-600"
                         description="Orders containing your items"
                    />
                    <StatsCard 
                         title="My Menu Items" 
                         value={stats.totalMenuItems} 
                         icon={Utensils} 
                         color="text-primary"
                         description="Dishes you've created"
                    />
               </div>

               {/* Charts Row */}
               <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                         <RevenueChart data={stats.dailyRevenue} title="Your Revenue Trend" />
                    </div>
                    <div>
                         <OrderStatusChart data={stats.orderBreakdown} />
                    </div>
               </div>

               {/* Activity Row */}
               <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                         <RecentOrdersTable orders={stats.recentOrders} />
                    </div>
                    <div>
                         <TopSellingItemsList items={stats.topSellingItems} />
                    </div>
               </div>
          </div>
     );
}
