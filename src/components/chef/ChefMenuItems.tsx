"use client";

import { useState } from "react";
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loading from "../Loading";
import { toast } from "sonner";
import { deleteMenuItemAction } from "@/actions/menuItem.action";
import { AppImage } from "../shared/image/AppImage";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Utensils, Search, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

export interface MenuItem {
     id: string;
     name: string;
     images: string[];
     price: number;
     discountPrice?: number;
     stock: number;
     category?: { name: string };
     createdAt: string;
}

interface Props {
     initialItems: MenuItem[];
     totalCount: number;
}

export default function ChefMenuItems({ initialItems, totalCount }: Props) {
     const [actionLoading, setActionLoading] = useState<string>("");
     const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
     const [isDialogOpen, setIsDialogOpen] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
     
     const router = useRouter();
     const searchParams = useSearchParams();

     const openDeleteDialog = (item: MenuItem) => {
          setSelectedItem(item);
          setIsDialogOpen(true);
     };

     const handleDelete = async () => {
          if (!selectedItem) return;
          try {
               setActionLoading(selectedItem.id);
               const res = await deleteMenuItemAction(selectedItem.id);
               if (!res.success) throw new Error(res.error || "Failed to delete item");
               toast.success("Item removed from menu");
               router.refresh();
          } catch (err: any) {
               toast.error(err?.message || "Failed to delete item");
          } finally {
               setActionLoading("");
               setIsDialogOpen(false);
               setSelectedItem(null);
          }
     };

     const handleSearch = (e: React.FormEvent) => {
          e.preventDefault();
          const params = new URLSearchParams(searchParams.toString());
          if (searchTerm) {
               params.set("searchTerm", searchTerm);
          } else {
               params.delete("searchTerm");
          }
          params.set("page", "1");
          router.push(`?${params.toString()}`);
     };

     return (
          <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm">
               {/* Page Header */}
               <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                         <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                              <Utensils className="h-5 w-5 text-orange-600" />
                         </div>
                         <div>
                              <h1 className="text-xl font-semibold text-gray-900">My Menu</h1>
                              <p className="text-sm text-gray-500">{totalCount} culinary creations</p>
                         </div>
                    </div>
                    <Link href="/dashboard/addItems">
                         <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 rounded-lg px-4 shadow-sm border-0">
                              <Plus className="h-4 w-4" />
                              Add New Item
                         </Button>
                    </Link>
               </div>

               {/* Search Bar */}
               <form onSubmit={handleSearch} className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                         placeholder="Search items..."
                         className="pl-10 h-10 rounded-xl border-gray-200 focus:ring-orange-500/20 focus:border-orange-500"
                         value={searchTerm}
                         onChange={(e) => setSearchTerm(e.target.value)}
                    />
               </form>

               {/* Table Card */}
               <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                         <h2 className="text-sm font-semibold text-gray-700">All Items</h2>
                         <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                              {initialItems.length} listed
                         </span>
                    </div>

                    <div className="overflow-x-auto">
                         <Table>
                              <TableHeader>
                                   <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20 pl-6 text-center">Preview</TableHead>
                                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name & Category</TableHead>
                                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pricing</TableHead>
                                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Inventory</TableHead>
                                        <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Actions</TableHead>
                                   </TableRow>
                              </TableHeader>

                              <TableBody>
                                   {initialItems.length === 0 ? (
                                        <TableRow>
                                             <TableCell colSpan={5}>
                                                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                                       <UtensilsCrossed className="h-10 w-10 text-gray-300" />
                                                       <p className="text-sm font-medium">No items found</p>
                                                       <p className="text-xs">Start by adding your first dish</p>
                                                  </div>
                                             </TableCell>
                                        </TableRow>
                                   ) : (
                                        initialItems.map((item) => (
                                             <TableRow
                                                  key={item.id}
                                                  className="hover:bg-orange-50/30 transition-colors border-gray-50 group"
                                             >
                                                  <TableCell className="pl-6">
                                                       <div className="h-12 w-12 rounded-xl overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-300 bg-gray-50">
                                                            <AppImage
                                                                 src={item.images[0]}
                                                                 alt={item.name}
                                                                 className="h-full w-full object-cover"
                                                            />
                                                       </div>
                                                  </TableCell>
                                                  <TableCell>
                                                       <div className="flex flex-col gap-0.5">
                                                            <span className="text-sm font-semibold text-gray-800">{item.name}</span>
                                                            <Badge variant="outline" className="w-fit h-4 text-[9px] font-bold uppercase tracking-wider text-gray-400 border-gray-200 bg-gray-50 px-1.5">
                                                                 {item.category?.name || "Uncategorized"}
                                                            </Badge>
                                                       </div>
                                                  </TableCell>
                                                  <TableCell>
                                                       <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-orange-600">
                                                                 ${(item.discountPrice || item.price).toFixed(2)}
                                                            </span>
                                                            {item.discountPrice && (
                                                                 <span className="text-[10px] text-gray-400 line-through">
                                                                      ${item.price.toFixed(2)}
                                                                 </span>
                                                            )}
                                                       </div>
                                                  </TableCell>
                                                  <TableCell>
                                                       <div className="flex items-center gap-2">
                                                            <div className={cn(
                                                                 "w-1.5 h-1.5 rounded-full shadow-sm",
                                                                 item.stock > 10 ? "bg-green-500 shadow-green-200" : 
                                                                 item.stock > 0 ? "bg-amber-500 shadow-amber-200" : "bg-red-500 shadow-red-200"
                                                            )} />
                                                            <span className={cn(
                                                                 "text-[11px] font-bold uppercase tracking-wider",
                                                                 item.stock > 10 ? "text-green-600" : 
                                                                 item.stock > 0 ? "text-amber-600" : "text-red-600"
                                                            )}>
                                                                 {item.stock > 0 ? `${item.stock} left` : "Out of stock"}
                                                            </span>
                                                       </div>
                                                  </TableCell>
                                                  <TableCell className="text-right pr-6">
                                                       <div className="flex items-center justify-end gap-2">
                                                            <Link href={`/dashboard/myMenu/update/${item.id}`}>
                                                                 <Button
                                                                      size="sm"
                                                                      variant="outline"
                                                                      className="h-8 w-8 p-0 rounded-lg border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                                                 >
                                                                      <Pencil className="h-3.5 w-3.5" />
                                                                 </Button>
                                                            </Link>
                                                            <Button
                                                                 size="sm"
                                                                 variant="ghost"
                                                                 className="h-8 w-8 p-0 border border-transparent rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all"
                                                                 onClick={() => openDeleteDialog(item)}
                                                            >
                                                                 <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                       </div>
                                                  </TableCell>
                                             </TableRow>
                                        ))
                                   )}
                              </TableBody>
                         </Table>
                    </div>
               </div>

               {/* Delete Dialog */}
               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="sm:max-w-md rounded-2xl border-gray-100 p-0 overflow-hidden">
                         <div className="p-6 pb-0">
                              <div className="flex items-center gap-4 mb-4">
                                   <div className="h-11 w-11 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                                        <Trash2 className="h-5 w-5 text-red-500" />
                                   </div>
                                   <DialogHeader className="text-left space-y-0">
                                        <DialogTitle className="text-base font-semibold text-gray-900">Delete Menu Item</DialogTitle>
                                        <p className="text-sm text-gray-500 mt-0.5">This action cannot be undone</p>
                                   </DialogHeader>
                              </div>
                              <p className="text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 leading-relaxed">
                                   You are about to retire <span className="font-bold text-gray-900">{selectedItem?.name}</span> from your menu. 
                                   Customers will no longer be able to order this dish.
                              </p>
                         </div>
                         <DialogFooter className="flex gap-2 p-6 pt-4">
                              <Button
                                   variant="outline"
                                   className="flex-1 rounded-lg border-gray-200 h-10 font-semibold"
                                   onClick={() => setIsDialogOpen(false)}
                                   disabled={actionLoading === selectedItem?.id}
                              >
                                   Cancel
                              </Button>
                              <Button
                                   className="flex-1 rounded-lg bg-red-500 hover:bg-red-600 text-white border-0 shadow-sm h-10 font-semibold"
                                   onClick={handleDelete}
                                   disabled={actionLoading === selectedItem?.id}
                              >
                                   {actionLoading === selectedItem?.id ? "Deleting..." : "Delete Item"}
                              </Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>
          </div>
     );
}

// Utility function duplicated for standalone file, normally imported from '@/lib/utils'
function cn(...inputs: any[]) {
     return inputs.filter(Boolean).join(" ");
}
