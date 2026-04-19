import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface TopItem {
     menuItemId: string;
     menuItemName: string;
     _sum: {
          quantity: number;
          totalPrice: number;
     };
}

interface TopSellingItemsListProps {
     items: TopItem[];
}

export function TopSellingItemsList({ items }: TopSellingItemsListProps) {
     return (
          <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] overflow-hidden">
               <CardHeader className="bg-slate-50/50 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center justify-between">
                         Top Selling Dishes
                         <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                    <div className="divide-y divide-slate-50">
                         {items.map((item, index) => (
                              <div key={item.menuItemId} className="px-6 py-4 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                                   <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-2xl bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                                             {index + 1}
                                        </div>
                                        <div>
                                             <div className="text-xs font-black text-slate-900 group-hover:text-primary transition-colors">{item.menuItemName}</div>
                                             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item._sum.quantity} Units Sold</div>
                                        </div>
                                   </div>
                                   <div className="text-right">
                                        <div className="text-xs font-black text-slate-900">${item._sum.totalPrice.toFixed(2)}</div>
                                        <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Revenue</div>
                                   </div>
                              </div>
                         ))}
                         {items.length === 0 && (
                              <div className="px-6 py-10 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">No sales data yet</div>
                         )}
                    </div>
               </CardContent>
          </Card>
     );
}
