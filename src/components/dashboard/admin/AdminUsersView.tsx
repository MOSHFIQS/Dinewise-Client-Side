"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateUserStatusAction } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck, Search, Users, Shield, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthProvider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AdminUsersView({ initialUsers }: { initialUsers: any[] }) {
    const [users, setUsers] = useState<any[]>(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const { user: currentUser } = useAuth();

    const toggleStatus = async (userId: string, currentStatus: string) => {
        const newStatus = currentStatus === "BANNED" ? "ACTIVE" : "BANNED";
        const actionText = newStatus === "BANNED" ? "BAN" : "ACTIVATE";
        
        if (!confirm(`Are you sure you want to ${actionText} this user account?`)) return;

        try {
            const res = await updateUserStatusAction(userId, newStatus);
            if (res.success) {
                toast.success(`User successfully ${newStatus === "BANNED" ? "banned" : "unbanned"}`);
                setUsers((prev) => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u));
            } else {
                toast.error(res.error || "Failed to update user");
            }
        } catch (e: any) {
             toast.error(e.message);
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">User Governance</h1>
                        <p className="text-sm text-gray-500">Monitor and moderate all platform accounts</p>
                    </div>
                </div>
            </div>

            {/* Existing Search Bar Styling Updated */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                    placeholder="Filter by name, email or role..." 
                    className="pl-10 h-10 rounded-xl border-gray-200 focus:ring-orange-500/20 focus:border-orange-500 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Account Registry</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {filteredUsers.length} total users
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6">Identity</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Platform Role</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Account Status</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Registered</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Governance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                            <Search className="h-10 w-10 text-gray-300" />
                                            <p className="text-sm font-medium">No users found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredUsers.map((u) => (
                                    <TableRow key={u.id} className="hover:bg-orange-50/30 transition-colors border-gray-50 group">
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-gray-100 shadow-sm">
                                                    <AvatarImage src={`https://ui-avatars.com/api/?name=${u.name}&background=random`} />
                                                    <AvatarFallback className="font-bold bg-orange-50 text-orange-600">{u.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-800">{u.name}</span>
                                                    <span className="text-[10px] text-gray-400">{u.email}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg",
                                                u.role === "ADMIN" ? "bg-slate-900 text-white border-slate-900" :
                                                u.role === "CHEF" ? "bg-orange-50 text-orange-600 border-orange-100" :
                                                "bg-gray-50 text-gray-500 border-gray-100"
                                            )}>
                                                {u.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full",
                                                    u.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                                                )} />
                                                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-600">
                                                    {u.status}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                             <span className="text-[11px] font-medium text-gray-400">
                                                  {new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                             </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            {u.id !== currentUser?.id && u.role !== "ADMIN" && (
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    className={cn(
                                                        "h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all",
                                                        u.status === "BANNED" 
                                                            ? "text-green-600 hover:bg-green-50 border border-green-100" 
                                                            : "text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100"
                                                    )}
                                                    onClick={() => toggleStatus(u.id, u.status)}
                                                >
                                                    {u.status === "BANNED" ? (
                                                        <><ShieldCheck className="w-3.5 h-3.5 mr-1" /> Restore</>
                                                    ) : (
                                                        <><ShieldAlert className="w-3.5 h-3.5 mr-1" /> Ban</>
                                                    )}
                                                </Button>
                                            )}
                                            {u.id === currentUser?.id && (
                                                 <Badge variant="outline" className="bg-gray-50 text-gray-400 uppercase text-[9px] font-bold px-2 py-0.5 border-dashed">Self</Badge>
                                            )}
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
