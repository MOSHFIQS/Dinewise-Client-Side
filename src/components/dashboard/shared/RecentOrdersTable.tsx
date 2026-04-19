import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
     id: string;
     totalPrice: number;
     status: string;
     createdAt: string | Date;
     customer?: {
          name: string;
          email?: string;
     };
}

interface RecentOrdersTableProps {
     orders: Order[];
}

const STATUS_STYLING: Record<string, string> = {
     PLACED: "bg-blue-50 text-blue-600 border-blue-100",
     CONFIRMED: "bg-indigo-50 text-indigo-600 border-indigo-100",
     PROCESSING: "bg-amber-50 text-amber-600 border-amber-100",
     SHIPPED: "bg-purple-50 text-purple-600 border-purple-100",
     DELIVERED: "bg-emerald-50 text-emerald-600 border-emerald-100",
     CANCELLED: "bg-rose-50 text-rose-600 border-rose-100",
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
     return (
          <Card className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] overflow-hidden">
               <CardHeader className="bg-slate-50/50 pb-4">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Recent Orders</CardTitle>
               </CardHeader>
               <CardContent className="p-0">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse">
                              <thead>
                                   <tr className="border-b border-slate-100">
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Customer</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">Date</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                   {orders.map((order) => (
                                        <tr key={order.id} className="group hover:bg-slate-50/50 transition-colors">
                                             <td className="px-6 py-4 text-xs font-bold text-slate-500 font-mono">#{order.id.slice(0, 8)}</td>
                                             <td className="px-6 py-4">
                                                  <div className="text-xs font-black text-slate-900">{order.customer?.name || "Guest"}</div>
                                                  {order.customer?.email && <div className="text-[10px] text-slate-400 font-medium">{order.customer.email}</div>}
                                             </td>
                                             <td className="px-6 py-4 text-xs font-black text-slate-900">${order.totalPrice.toFixed(2)}</td>
                                             <td className="px-6 py-4">
                                                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider border ${STATUS_STYLING[order.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                                                       {order.status}
                                                  </span>
                                             </td>
                                             <td className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">
                                                  {new Date(order.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                                             </td>
                                        </tr>
                                   ))}
                                   {orders.length === 0 && (
                                        <tr>
                                             <td colSpan={5} className="px-6 py-10 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">No recent orders yet</td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </CardContent>
          </Card>
     );
}
