"use client";

import { Badge } from "@/components/ui/badge";
import { Loader2, History, Database, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function AdminAuditView({ logs, loading }: { logs: any[]; loading?: boolean }) {
    console.log(logs)
    const getActionColor = (action: string) => {
        if (action.includes("CREATE")) return "bg-green-500/10 text-green-600 border-green-500/20";
        if (action.includes("UPDATE") || action.includes("PATCH")) return "bg-blue-500/10 text-blue-600 border-blue-500/20";
        if (action.includes("DELETE")) return "bg-red-500/10 text-red-600 border-red-500/20";
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    };

    return (
        <div className="h-full bg-gray-50/50 p-6 space-y-6 rounded-2xl border border-gray-100 shadow-sm">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                        <History className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">Security Audit Logs</h1>
                        <p className="text-sm text-gray-500">Track all sensitive system operations and access</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                    <h2 className="text-sm font-semibold text-gray-700">Audit Trail</h2>
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">
                        {loading ? "Streaming..." : `${logs.length} events recorded`}
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/70 hover:bg-gray-50/70 border-gray-100">
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide pl-6">Timestamp</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Action Performed</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Resource</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Associated ID</TableHead>
                                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-right pr-6">Initiated By</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                            <Loader2 className="h-10 w-10 animate-spin text-orange-500/20" />
                                            <p className="text-sm font-medium">Processing log streams...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : logs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
                                            <History className="h-10 w-10 text-gray-300" />
                                            <p className="text-sm font-medium">No audit logs found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                logs.map((log) => (
                                    <TableRow key={log.id} className="hover:bg-orange-50/30 transition-colors border-gray-50 group">
                                        <TableCell className="pl-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(log.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg",
                                                getActionColor(log.action)
                                            )}>
                                                {log.action}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                             <div className="flex items-center gap-2">
                                                  <Database className="w-3.5 h-3.5 text-gray-300" />
                                                  <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">{log.entityType}</span>
                                             </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                                {log.entityId}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="flex flex-col items-end gap-1">
                                                    <span className="text-[10px] font-bold text-gray-700 uppercase">
                                                        {log.user ? log.user.name : "System / Unknown"}
                                                    </span>
                                                    <div className="flex items-center gap-1.5">
                                                        {log.user && (
                                                            <Badge variant="outline" className="text-[8px] h-3.5 px-1.5 border-orange-200 text-orange-600 bg-orange-50 uppercase shadow-sm">
                                                                {log.user.role}
                                                            </Badge>
                                                        )}
                                                        {log.ipAddress ? (
                                                            <span className="text-[9px] font-mono text-gray-500 leading-none bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 shadow-sm">
                                                                {log.ipAddress === "::1" || log.ipAddress === "127.0.0.1" ? "Localhost" : log.ipAddress}
                                                            </span>
                                                        ) : (
                                                            <span className="text-[9px] font-mono text-gray-400 leading-none">
                                                                {log.userId?.slice(-8) || "N/A"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
                                                    <User className="h-4 w-4 text-orange-600" />
                                                </div>
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
