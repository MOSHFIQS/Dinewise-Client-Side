"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface OrderStatusChartProps {
     data: Record<string, number>;
}

const COLORS: Record<string, string> = {
     placed: "#3b82f6",     // blue
     confirmed: "#6366f1",  // indigo
     processing: "#f59e0b", // amber
     shipped: "#a855f7",    // purple
     delivered: "#10b981",  // emerald
     cancelled: "#ef4444",  // red
};

export function OrderStatusChart({ data }: OrderStatusChartProps) {
     const chartData = Object.entries(data).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value,
          color: COLORS[name.toLowerCase()] || "#94a3b8"
     })).filter(d => d.value > 0);

     if (chartData.length === 0) {
          return (
               <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] p-2 flex items-center justify-center h-[300px]">
                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">No order data available</p>
               </Card>
          );
     }

     return (
          <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] p-2">
               <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Order Status</CardTitle>
               </CardHeader>
               <CardContent>
                    <div className="h-[250px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                   <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                   >
                                        {chartData.map((entry, index) => (
                                             <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                   </Pie>
                                   <Tooltip
                                        content={({ active, payload }) => {
                                             if (active && payload && payload.length) {
                                                  const data = payload[0].payload;
                                                  return (
                                                       <div className="bg-white p-3 border-none shadow-2xl rounded-2xl">
                                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{data.name}</p>
                                                            <p className="text-lg font-black text-slate-900">{data.value} Orders</p>
                                                       </div>
                                                  );
                                             }
                                             return null;
                                        }}
                                   />
                                   <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        content={({ payload }) => (
                                             <ul className="flex flex-wrap justify-center gap-4 mt-4">
                                                  {payload?.map((entry: any, index) => (
                                                       <li key={`item-${index}`} className="flex items-center gap-1.5">
                                                            <span className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{entry.value}</span>
                                                       </li>
                                                  ))}
                                             </ul>
                                        )}
                                   />
                              </PieChart>
                         </ResponsiveContainer>
                    </div>
               </CardContent>
          </Card>
     );
}
