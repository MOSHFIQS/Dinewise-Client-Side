import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
     title: string;
     value: string | number;
     icon: LucideIcon;
     description?: string;
     color?: string;
     trend?: {
          value: number;
          isUp: boolean;
     };
}

export function StatsCard({ title, value, icon: Icon, description, color = "text-primary", trend }: StatsCardProps) {
     return (
          <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
               <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50">
                    <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">{title}</CardTitle>
                    <Icon className={`h-4 w-4 ${color}`} />
               </CardHeader>
               <CardContent className="pt-4">
                    <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
                    {description && (
                         <p className="text-xs text-muted-foreground mt-1 font-medium">{description}</p>
                    )}
                    {trend && (
                         <div className={`mt-1 flex items-center gap-1 text-[10px] font-bold ${trend.isUp ? "text-emerald-500" : "text-rose-500"}`}>
                              {trend.isUp ? "↑" : "↓"} {trend.value}% vs last month
                         </div>
                    )}
                    <div className={`mt-3 h-1 w-12 rounded-full group-hover:w-full transition-all duration-500 ${color.replace('text-', 'bg-').split(' ')[0]}/20`} />
               </CardContent>
          </Card>
     );
}
