import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStatsAction } from "@/actions/admin.action";
import { Users, ShoppingBag, DollarSign, Activity } from "lucide-react";

export default async function AdminDashboard() {
     const res = await getDashboardStatsAction();
     const stats = res?.success ? res.data : { totalUsers: 0, totalOrders: 0, totalRevenue: 0, activeMenuPage: 0 };

     const items = [
          { title: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600" },
          { title: "Total Orders", value: stats.totalOrders, icon: ShoppingBag, color: "text-green-600" },
          { title: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: "text-orange-600" },
          { title: "Live Menus", value: stats.activeMenuPage || 0, icon: Activity, color: "text-primary" },
     ];

     return (
          <div className="space-y-8 animate-in fade-in duration-500">
               <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">Platform Overview</h1>
                    <p className="text-muted-foreground text-lg">Real-time health and performance metrics of DineWise.</p>
               </div>

               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {items.map((item, i) => (
                         <Card key={i} className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50">
                                   <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.title}</CardTitle>
                                   <item.icon className={`h-4 w-4 ${item.color}`} />
                              </CardHeader>
                              <CardContent className="pt-4">
                                   <div className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</div>
                                   <div className="mt-2 h-1 w-12 bg-primary/20 rounded-full group-hover:w-full transition-all duration-500" />
                              </CardContent>
                         </Card>
                    ))}
               </div>
          </div>
     )
}
