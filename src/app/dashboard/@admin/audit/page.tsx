"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Loader2, History, Database, ArrowRight, User, Terminal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetchClient } from "@/lib/api";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AuditLogsPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await apiFetchClient("/audit");
            if (res.success && res.data) {
                // Handle both wrapped and unwrapped data
                const itemsList = Array.isArray(res.data) ? res.data : (res.data.data || []);
                setLogs(itemsList);
            }
        } catch (error: any) {
             console.error("Audit log fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const getActionColor = (action: string) => {
        if (action.includes("CREATE")) return "bg-green-500/10 text-green-600 border-green-500/20";
        if (action.includes("UPDATE") || action.includes("PATCH")) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
        if (action.includes("DELETE")) return "bg-red-500/10 text-red-600 border-red-500/20";
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                        <Terminal className="w-3 h-3" />
                        System Integrity
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">Audit Logs</h1>
                    <p className="text-muted-foreground text-lg">Track system-wide administrative and sensitive actions for security auditing.</p>
                </div>
            </div>

            <div className="border border-slate-100 rounded-[2rem] bg-white overflow-hidden shadow-xl shadow-slate-100/50">
                <Table>
                    <TableHeader className="bg-slate-50/50">
                        <TableRow className="hover:bg-transparent border-slate-100">
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest pl-8">Timestamp</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Action Performed</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Resource Type</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest">Associated ID</TableHead>
                            <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest text-right pr-8">Initiated By</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-24 text-muted-foreground">
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
                                        <p className="font-bold uppercase tracking-widest text-[10px]">Processing Log Streams...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : logs.length === 0 ? (
                             <TableRow>
                                <TableCell colSpan={5} className="text-center py-24">
                                    <div className="flex flex-col items-center gap-4 opacity-40">
                                        <History className="w-16 h-16 text-slate-400" />
                                        <p className="font-black text-xl text-slate-900 uppercase">Archive Empty</p>
                                        <p className="text-sm italic">No sensitive actions have been recorded yet.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : logs.map((log) => (
                            <TableRow key={log.id} className="border-slate-50 group transition-colors hover:bg-slate-50/20">
                                <TableCell className="py-5 pl-8">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-800 uppercase tracking-tight">
                                            {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400">
                                            {new Date(log.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <Badge variant="outline" className={cn(
                                        "font-black tracking-tighter text-[9px] px-3 py-1 rounded-lg border-2",
                                        getActionColor(log.action)
                                    )}>
                                        {log.action}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-5">
                                     <div className="flex items-center gap-2">
                                          <Database className="w-3.5 h-3.5 text-slate-300" />
                                          <span className="font-bold text-slate-600 text-sm">{log.entityType}</span>
                                     </div>
                                </TableCell>
                                <TableCell className="py-5">
                                    <span className="font-mono text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                        {log.entityId}
                                    </span>
                                </TableCell>
                                <TableCell className="py-5 text-right pr-8">
                                    <div className="flex items-center justify-end gap-2 group/user ring-offset-2">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-tighter">System User</span>
                                            <span className="text-[9px] font-mono text-slate-400">{log.userId.slice(0, 12)}...</span>
                                        </div>
                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100">
                                            <User className="h-4 w-4 text-slate-400" />
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            {!loading && logs.length > 0 && (
                 <div className="flex justify-center pt-4">
                      <Button variant="ghost" className="gap-2 text-slate-400 font-bold uppercase tracking-tight text-[10px] hover:text-primary">
                           View Full Security History <ArrowRight className="w-3 h-3" />
                      </Button>
                 </div>
            )}
        </div>
    );
}

