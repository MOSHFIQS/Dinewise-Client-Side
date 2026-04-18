"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RevenueChartProps {
     data: { date: string; amount: number }[];
     title?: string;
}

export function RevenueChart({ data, title = "Revenue Trend" }: RevenueChartProps) {
     const formattedData = data.map(d => ({
          ...d,
          date: new Date(d.date).toLocaleDateString("en-US", { weekday: 'short' }),
          rawDate: d.date
     }));

     return (
          <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] p-2">
               <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">{title}</CardTitle>
               </CardHeader>
               <CardContent>
                    <div className="h-[250px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                   <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                             <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                                             <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                        </linearGradient>
                                   </defs>
                                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                   <XAxis
                                        dataKey="date"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                        dy={10}
                                   />
                                   <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                                        tickFormatter={(val) => `$${val}`}
                                   />
                                   <Tooltip
                                        content={({ active, payload }) => {
                                             if (active && payload && payload.length) {
                                                  return (
                                                       <div className="bg-white p-3 border-none shadow-2xl rounded-2xl">
                                                            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">{payload[0].payload.rawDate}</p>
                                                            <p className="text-lg font-black text-slate-900">${payload[0].value}</p>
                                                       </div>
                                                  );
                                             }
                                             return null;
                                        }}
                                   />
                                   <Area
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRev)"
                                        animationBegin={0}
                                        animationDuration={1500}
                                   />
                              </AreaChart>
                         </ResponsiveContainer>
                    </div>
               </CardContent>
          </Card>
     );
}
