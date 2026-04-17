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
import { AppImage } from "../../shared/image/AppImage";
import { Utensils, Search, UtensilsCrossed, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  name: string;
  images: string[];
  price: number;
  discountPrice?: number;
  stock: number;
  category?: { name: string };
  chef?: { 
    name: string;
    email: string;
  };
  createdAt: string;
}

interface Props {
  initialItems: MenuItem[];
  totalCount: number;
}

export default function AdminMenuItemsView({ initialItems, totalCount }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

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
          <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <Utensils className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">All Menu Items</h1>
            <p className="text-sm text-gray-500">{totalCount} items listed platform-wide</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search items by name..."
          className="pl-10 h-10 rounded-xl border-gray-200 focus:ring-purple-500/20 focus:border-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
          <h2 className="text-sm font-semibold text-gray-700">Database Records</h2>
          <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
            {initialItems.length} showing
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide w-20 pl-6 text-center">Preview</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Name & Category</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Chef / Restaurant</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pricing</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Inventory</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {initialItems.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                      <UtensilsCrossed className="h-10 w-10 text-gray-300" />
                      <p className="text-sm font-medium">No menu items found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                initialItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-purple-50/30 transition-colors border-gray-50 group"
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
                        <span className="text-sm font-medium text-gray-700">{item.chef?.name || "Global Chef"}</span>
                        <span className="text-[10px] text-gray-400">{item.chef?.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-purple-600">
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
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
