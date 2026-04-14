"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiFetchClient } from "@/lib/api";
import Cookies from "js-cookie";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Loader2, Search, Plus, ChefHat } from "lucide-react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { EditMenuItemModal } from "@/components/dashboard/EditMenuItemModal";
import Link from "next/link";
import { useAuth } from "@/context/AuthProvider";

export default function MyMenuPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingItem, setEditingItem] = useState<any>(null);
    const { user } = useAuth();

    const fetchMyItems = async () => {
        setLoading(true);
        try {
            const token = Cookies.get("token");
            if (!user?.id) {
                 const userRes = await apiFetchClient("/user/me", { headers: { "Authorization": `Bearer ${token}` } });
                 const res = await apiFetchClient(`/menu-item?chefId=${userRes.data.id}`, { method: "GET" });
                 if (res.success) setItems(res.data.data);
            } else {
                 const res = await apiFetchClient(`/menu-item?chefId=${user.id}`, { method: "GET" });
                 if (res.success) setItems(res.data.data);
            }
        } catch (error: any) {
            toast.error("Failed to connect to kitchen records.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyItems();
    }, [user?.id]);

    const handleDelete = async (id: string) => {
        if (!confirm("Permanently remove this dish from your menu?")) return;
        try {
            const token = Cookies.get("token");
            const res = await apiFetchClient(`/menu-item/${id}`, {
                 method: "DELETE",
                 headers: { "Authorization": `Bearer ${token}` },
            });
            if (res.success) {
                toast.success("Dish retired successfully.");
                setItems((prev) => prev.filter(item => item.id !== id));
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to delete item");
        }
    };

    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                        <ChefHat className="w-3 h-3" />
                        Culinary Portfolio
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">My Menu Items</h1>
                    <p className="text-muted-foreground text-lg">Manage, edit, and curate your published culinary creations.</p>
                </div>
                <Link href="/dashboard/addItems">
                    <Button className="h-12 px-8 rounded-xl font-black uppercase tracking-tight gap-2 shadow-lg shadow-primary/20">
                        <Plus className="w-5 h-5" /> Add New Dish
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search by name or category..." 
                        className="pl-11 h-12 border-none focus-visible:ring-0 text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Badge variant="outline" className="h-12 px-6 rounded-xl font-bold border-slate-100 hidden sm:flex">
                    {filteredItems.length} Products
                </Badge>
            </div>

            <div className="border border-slate-100 rounded-[2rem] bg-white overflow-hidden shadow-xl shadow-slate-100/50">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="w-[100px] py-6 font-black uppercase text-[10px] tracking-widest pl-8">Preview</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Entry Details</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Pricing</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Inventory</TableHead>
                            <TableHead className="text-right py-6 font-black uppercase text-[10px] tracking-widest pr-8">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-24 text-muted-foreground">
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
                                        <p className="font-bold uppercase tracking-widest text-[10px]">Accessing Kitchen Records...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-24 text-muted-foreground">
                                    <div className="flex flex-col items-center gap-4 opacity-40">
                                        <ChefHat className="w-16 h-16 mb-2" />
                                        <p className="font-black text-xl text-slate-900">No Items Found</p>
                                        <p className="max-w-xs mx-auto text-sm italic">You haven't added any dishes matching your current view.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredItems.map((item) => (
                            <TableRow key={item.id} className="border-slate-50 group transition-colors hover:bg-slate-50/30">
                                <TableCell className="py-5 pl-8">
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform">
                                        <Image src={item.images[0] || "/placeholder-food.jpg"} alt={item.name} fill className="object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-black text-slate-800 uppercase tracking-tight">{item.name}</span>
                                        <Badge variant="secondary" className="w-fit bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest rounded-lg">
                                            {item.category?.name || "Uncategorized"}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex flex-col">
                                        <span className="font-black text-primary text-lg tracking-tighter">${(item.discountPrice || item.price).toFixed(2)}</span>
                                        {item.discountPrice && (
                                             <span className="text-[10px] text-muted-foreground line-through font-bold">${item.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.stock > 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`} />
                                        <span className="text-sm font-black text-slate-700 uppercase tracking-tight">
                                            {item.stock > 0 ? `${item.stock} Units` : "Sold Out"}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right py-5 pr-8 space-x-2">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-10 w-10 text-primary hover:bg-primary/5 rounded-xl border border-transparent hover:border-primary/20 transition-all"
                                        onClick={() => setEditingItem(item)}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-10 w-10 text-destructive hover:bg-destructive/5 rounded-xl border border-transparent hover:border-destructive/20 transition-all"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <EditMenuItemModal 
                item={editingItem} 
                isOpen={!!editingItem} 
                onClose={() => setEditingItem(null)} 
                onSuccess={fetchMyItems}
            />
        </div>
    );
}

