import { getCustomerStatsAction } from "@/actions/stats.action";
import { ShoppingBag, DollarSign, Clock, Utensils } from "lucide-react";
import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { OrderStatusChart } from "@/components/dashboard/shared/OrderStatusChart";
import { RecentOrdersTable } from "@/components/dashboard/shared/RecentOrdersTable";

export default async function CustomerDashboard() {
     const res = await getCustomerStatsAction();
     
     if (!res?.success) {
          return (
               <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <p className="text-rose-500 font-bold uppercase tracking-widest text-xs">Failed to load your activity</p>
                    <p className="text-slate-400 text-sm">{res?.message || "Internal server error"}</p>
               </div>
          );
     }

     const stats = res.data;

     return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-12">
               <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">Welcome Back!</h1>
                    <p className="text-muted-foreground text-lg">Track your orders and cravings in one place.</p>
               </div>

               {/* KPI Cards */}
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <StatsCard 
                         title="Total Spent" 
                         value={`$${stats.totalSpent.toFixed(2)}`} 
                         icon={DollarSign} 
                         color="text-primary"
                         description="Gross successful orders"
                    />
                    <StatsCard 
                         title="Total Orders" 
                         value={stats.totalOrders} 
                         icon={ShoppingBag} 
                         color="text-blue-600"
                         description="Orders you've placed"
                    />
                    <StatsCard 
                         title="Recent Activity" 
                         value={stats.recentOrders.length} 
                         icon={Clock} 
                         color="text-slate-600"
                         description="New orders this session"
                    />
               </div>

               {/* Activity Row */}
               <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                         <RecentOrdersTable orders={stats.recentOrders} />
                    </div>
                    <div>
                         <OrderStatusChart data={stats.orderBreakdown} />
                    </div>
               </div>
          </div>
     );
}
