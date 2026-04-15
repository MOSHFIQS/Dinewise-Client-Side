"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getAllUsersAction, updateUserStatusAction } from "@/actions/admin.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck, Loader2, Search, Users, Shield, UserX } from "lucide-react";
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

export default function AllUsersPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const { user: currentUser } = useAuth();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getAllUsersAction();
            if (res.success && res.data) {
                // Handle both wrapped and unwrapped data
                const itemsList = Array.isArray(res.data) ? res.data : (res.data.data || []);
                setUsers(itemsList);
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (error: any) {
             toast.error("An error occurred while fetching the user registry");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                        <Shield className="w-3 h-3" />
                        System Administration
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">User Governance</h1>
                    <p className="text-muted-foreground text-lg">Monitor, manage, and moderate all platform accounts.</p>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Filter by name, email or role..." 
                        className="pl-11 h-12 border-none focus-visible:ring-0 text-base"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="hidden sm:flex items-center gap-2 px-6 border-l border-slate-100">
                     <Users className="w-4 h-4 text-slate-400" />
                     <span className="text-sm font-bold text-slate-500">{filteredUsers.length} total</span>
                </div>
            </div>

            <div className="border border-slate-100 rounded-[2rem] bg-white overflow-hidden shadow-xl shadow-slate-100/50">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest pl-8">Identity</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Platform Role</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Account Status</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Registered</TableHead>
                            <TableHead className="text-right py-6 font-black uppercase text-[10px] tracking-widest pr-8">Governance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-24 text-muted-foreground">
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
                                        <p className="font-bold uppercase tracking-widest text-[10px]">Retrieving User Records...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-24">
                                    <div className="flex flex-col items-center gap-4 opacity-40">
                                        <UserX className="w-16 h-16 text-slate-400" />
                                        <p className="font-black text-xl text-slate-900 uppercase">Registry Empty</p>
                                        <p className="text-sm italic">No users found matching your search criteria.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.map((u) => (
                            <TableRow key={u.id} className="border-slate-50 group transition-colors hover:bg-slate-50/30">
                                <TableCell className="py-5 pl-8">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-slate-100">
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${u.name}&background=random`} />
                                            <AvatarFallback className="font-black bg-slate-100">{u.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 uppercase tracking-tight text-sm">{u.name}</span>
                                            <span className="text-xs text-muted-foreground font-medium">{u.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <Badge variant="outline" className={cn(
                                        "font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-lg",
                                        u.role === "ADMIN" ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200" :
                                        u.role === "CHEF" ? "bg-primary/5 text-primary border-primary/20" :
                                        "bg-slate-50 text-slate-500 border-slate-200"
                                    )}>
                                        {u.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-5">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${u.status === "ACTIVE" ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                                            {u.status}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                     <span className="text-[11px] font-bold text-slate-400 uppercase">
                                          {new Date(u.createdAt).toLocaleDateString()}
                                     </span>
                                </TableCell>
                                <TableCell className="text-right py-5 pr-8">
                                    {u.id !== currentUser?.id && u.role !== "ADMIN" && (
                                        <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className={cn(
                                                "h-10 px-4 rounded-xl font-black uppercase tracking-tighter text-[10px] transition-all",
                                                u.status === "BANNED" 
                                                    ? "text-green-600 hover:text-green-700 hover:bg-green-50 border border-green-100" 
                                                    : "text-destructive hover:text-destructive hover:bg-destructive/5 border border-transparent hover:border-destructive/20"
                                            )}
                                            onClick={() => toggleStatus(u.id, u.status)}
                                        >
                                            {u.status === "BANNED" ? (
                                                <><ShieldCheck className="w-3.5 h-3.5 mr-2" /> Restore Access</>
                                            ) : (
                                                <><ShieldAlert className="w-3.5 h-3.5 mr-2" /> Revoke Access</>
                                            )}
                                        </Button>
                                    )}
                                    {u.id === currentUser?.id && (
                                         <Badge variant="secondary" className="bg-slate-50 text-slate-400 uppercase text-[9px] tracking-widest">Self</Badge>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

