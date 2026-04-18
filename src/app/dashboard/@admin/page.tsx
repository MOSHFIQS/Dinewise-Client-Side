import { getAdminStatsAction } from "@/actions/stats.action";
import { Users, ShoppingBag, DollarSign, Activity, Utensils, Layers, Ticket, Star, TrendingUp, TrendingDown } from "lucide-react";
import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { RevenueChart } from "@/components/dashboard/shared/RevenueChart";
import { OrderStatusChart } from "@/components/dashboard/shared/OrderStatusChart";
import { RecentOrdersTable } from "@/components/dashboard/shared/RecentOrdersTable";
import { TopSellingItemsList } from "@/components/dashboard/shared/TopSellingItemsList";

export default async function AdminDashboard() {
     const res = await getAdminStatsAction();
     
     if (!res?.success) {
          return (
               <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <p className="text-rose-500 font-bold uppercase tracking-widest text-xs">Failed to load platform overview</p>
                    <p className="text-slate-400 text-sm">{res?.message || "Internal server error"}</p>
               </div>
          );
     }

     const stats = res.data;

     return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-12">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                         <h1 className="text-4xl font-black tracking-tight text-slate-900">Platform Overview</h1>
                         <p className="text-muted-foreground text-lg">Real-time health and performance metrics of DineWise.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-2xl px-4 py-2 self-start md:self-auto">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Status</span>
                    </div>
               </div>

               {/* KPI Cards - Primary Metrics */}
               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard 
                         title="Total Revenue" 
                         value={`$${stats.totalRevenue.toFixed(2)}`} 
                         icon={DollarSign} 
                         color="text-orange-600"
                         description={`Daily: +$${stats.revenue24h.toFixed(2)}`}
                         trend={{ value: 12, isUp: true }}
                    />
                    <StatsCard 
                         title="Total Orders" 
                         value={stats.totalOrders} 
                         icon={ShoppingBag} 
                         color="text-green-600"
                         description={`Daily: +${stats.newOrders24h} orders`}
                    />
                    <StatsCard 
                         title="Total Users" 
                         value={stats.totalUsers} 
                         icon={Users} 
                         color="text-blue-600"
                         description={`New: +${stats.newUsers24h} joined`}
                    />
                    <StatsCard 
                         title="Avg Order Value" 
                         value={`$${stats.avgOrderValue.toFixed(2)}`} 
                         icon={Activity} 
                         color="text-primary"
                         description="Revenue per order"
                    />
               </div>

               {/* KPI Cards - Entity Metrics */}
               <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
                    <div className="flex items-center gap-4 bg-white rounded-3xl p-4 border border-slate-50 shadow-sm">
                         <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Utensils className="h-5 w-5" />
                         </div>
                         <div>
                              <div className="text-lg font-black text-slate-900">{stats.totalMenuItems}</div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Dishes</div>
                         </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white rounded-3xl p-4 border border-slate-50 shadow-sm">
                         <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Layers className="h-5 w-5" />
                         </div>
                         <div>
                              <div className="text-lg font-black text-slate-900">{stats.totalCategories}</div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Categories</div>
                         </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white rounded-3xl p-4 border border-slate-50 shadow-sm">
                         <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                              <Ticket className="h-5 w-5" />
                         </div>
                         <div>
                              <div className="text-lg font-black text-slate-900">{stats.totalCoupons}</div>
                              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Coupons</div>
                         </div>
                    </div>
               </div>

               {/* Charts Row */}
               <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                         <RevenueChart data={stats.dailyRevenue} title="Platform Revenue (Last 7 Days)" />
                    </div>
                    <div>
                         <OrderStatusChart data={stats.orderBreakdown} />
                    </div>
               </div>

               {/* Tables Row */}
               <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                         <RecentOrdersTable orders={stats.recentOrders} />
                    </div>
                    <div>
                         <TopSellingItemsList items={stats.topSellingItems} />
                    </div>
               </div>

               {/* Simple Review Summary */}
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                    <div className="relative z-10 text-center md:text-left">
                         <h3 className="text-2xl font-black tracking-tight mb-2">Customer Satisfaction</h3>
                         <p className="text-slate-400 text-sm max-w-xs">Total feedback received across all dishes and dining experiences.</p>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2">
                         <div className="flex items-center gap-3">
                              <Star className="h-8 w-8 text-amber-400 fill-amber-400" />
                              <span className="text-5xl font-black">{stats.totalReviews}</span>
                         </div>
                         <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Verified Reviews</div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-24 -mb-24" />
               </div>
          </div>
     );
}
