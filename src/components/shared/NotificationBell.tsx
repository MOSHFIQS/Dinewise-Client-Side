import { useEffect, useState, useRef } from "react";
import { Bell, Check, Trash2, BellRing, Settings, MoreVertical, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    getMyNotificationsAction, 
    markNotificationReadAction, 
    markAllNotificationsReadAction,
    getUnreadNotificationsCountAction 
} from "@/actions/notification.action";

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const popoverRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        const res = await getMyNotificationsAction();
        if (res.success && res.data) {
             setNotifications(res.data);
             const countRes = await getUnreadNotificationsCountAction();
             if (countRes.success) {
                  setUnreadCount(countRes.data);
             } else {
                  // Fallback to manual count
                  setUnreadCount(res.data.filter((n: any) => !n.isRead).length);
             }
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Polling for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        
        // Close popover when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
             document.removeEventListener("mousedown", handleClickOutside);
             clearInterval(interval);
        };
    }, []);

    const handleMarkRead = async (id: string) => {
          const res = await markNotificationReadAction(id);
          if (res.success) {
               setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
               setUnreadCount(prev => Math.max(0, prev - 1));
          }
    };

    const handleMarkAllRead = async () => {
         const res = await markAllNotificationsReadAction();
         if (res.success) {
              setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
              setUnreadCount(0);
         }
    };

    return (
        <div className="relative" ref={popoverRef}>
             <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full hover:bg-muted transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
             >
                  {unreadCount > 0 ? (
                       <>
                           <BellRing className="w-5 h-5 animate-pulse text-primary" />
                           <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-background shadow-sm">
                               {unreadCount > 9 ? "9+" : unreadCount}
                           </span>
                       </>
                  ) : (
                       <Bell className="w-5 h-5 text-muted-foreground" />
                  )}
             </Button>

             {isOpen && (
                  <div className="absolute right-0 mt-3 w-[360px] bg-card border rounded-2xl shadow-2xl overflow-hidden z-50 transform origin-top-right transition-all duration-200 ease-out animate-in fade-in zoom-in-95">
                       <div className="p-4 border-b bg-muted/20 flex justify-between items-center bg-gradient-to-r from-muted/50 to-transparent">
                            <div>
                                 <h4 className="font-bold text-sm">Notifications</h4>
                                 <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Recent Activity</p>
                            </div>
                            <div className="flex items-center gap-2">
                                 {unreadCount > 0 && (
                                      <Button 
                                           variant="ghost" 
                                           size="sm" 
                                           className="h-8 text-[11px] font-semibold text-primary/80 hover:text-primary hover:bg-primary/10 rounded-lg px-2 flex gap-1.5 items-center transition-colors"
                                           onClick={handleMarkAllRead}
                                      >
                                           <CheckCheck className="w-3.5 h-3.5" />
                                           Mark all as read
                                      </Button>
                                 )}
                            </div>
                       </div>
                       
                       <div className="max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted">
                            {notifications.length === 0 ? (
                                 <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center space-y-3">
                                      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center">
                                           <Bell className="w-8 h-8 opacity-20" />
                                      </div>
                                      <div className="space-y-1">
                                           <p className="font-medium text-sm">No notifications</p>
                                           <p className="text-[11px] opacity-70">We'll notify you when something happens.</p>
                                      </div>
                                 </div>
                            ) : (
                                 notifications.map((n, idx) => (
                                      <div 
                                           key={n.id} 
                                           className={`p-4 border-b last:border-0 hover:bg-muted/40 transition-all duration-200 cursor-default group ${!n.isRead ? 'bg-primary/[0.03]' : ''}`}
                                      >
                                           <div className="flex justify-between items-start gap-3">
                                                <div className="flex-1 space-y-1.5">
                                                     <div className="flex items-center gap-2">
                                                          {!n.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.5)]" />}
                                                          <p className={`text-xs uppercase tracking-widest font-black ${!n.isRead ? 'text-primary' : 'text-muted-foreground/60'}`}>{n.type?.replace(/_/g, " ")}</p>
                                                     </div>
                                                     <p className={`text-sm leading-snug ${!n.isRead ? 'text-foreground font-semibold' : 'text-muted-foreground font-medium'}`}>{n.message}</p>
                                                     <p className="text-[10px] text-muted-foreground/70 font-medium">
                                                          {new Date(n.createdAt).toLocaleDateString()} at {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                     </p>
                                                </div>
                                                {!n.isRead && (
                                                     <Button 
                                                          variant="ghost" 
                                                          size="icon" 
                                                          className="h-8 w-8 text-primary/40 hover:text-primary hover:bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all" 
                                                          onClick={() => handleMarkRead(n.id)}
                                                     >
                                                          <Check className="w-4 h-4" />
                                                     </Button>
                                                )}
                                           </div>
                                      </div>
                                 ))
                            )}
                       </div>
                       {notifications.length > 0 && (
                            <div className="p-3 border-t bg-muted/10 text-center">
                                 <button className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">
                                      View All Activity
                                 </button>
                            </div>
                       )}
                  </div>
             )}
        </div>
    );
}
