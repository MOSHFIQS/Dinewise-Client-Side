import { getAuditLogsAction } from "@/actions/admin.action";
import AdminAuditView from "@/components/dashboard/admin/AdminAuditView";
import GlobalPagination from "@/components/shared/pagination/GlobalPagination";
import { Terminal } from "lucide-react";

export default async function AuditLogsPage({ searchParams }: { searchParams: Promise<{ page?: string; limit?: string }> }) {
    const { page, limit } = await searchParams;
    const res = await getAuditLogsAction({ page, limit });
    
    const logs = res.success && res.data ? res.data : [];
    const meta = res.meta || { page: 1, limit: 10, totalPage: 1 };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                        <Terminal className="w-3 h-3" />
                        System Integrity
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">Audit Logs</h1>
                    <p className="text-muted-foreground text-lg">Track system-wide administrative and sensitive actions for security auditing.</p>
                </div>
            </div>

            <div className="flex-1 overflow-auto pr-2">
                <AdminAuditView logs={logs} />
            </div>

            <div className="px-6 py-4 bg-white/50 border-t border-gray-100 backdrop-blur-sm rounded-b-2xl">
                 <GlobalPagination
                      page={meta.page}
                      totalPages={meta.totalPage}
                      limit={meta.limit}
                 />
            </div>
        </div>
    );
}

