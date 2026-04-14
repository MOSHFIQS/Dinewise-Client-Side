"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, Check, Trash2, BellRing } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getMyNotificationsAction, markNotificationReadAction } from "@/actions/notification.action";

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        const res = await getMyNotificationsAction();
        if (res.success) {
             setNotifications(res.data.data);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Close popover when clicking outside
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const handleMarkRead = async (id: string) => {
         const res = await markNotificationReadAction(id);
         if (res.success) {
              setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
         }
    };

    return (
        <div className="relative" ref={popoverRef}>
             <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full hover:bg-muted"
                onClick={() => setIsOpen(!isOpen)}
             >
                  {unreadCount > 0 ? (
                       <>
                           <BellRing className="w-5 h-5 animate-pulse text-primary" />
                           <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-background">
                               {unreadCount}
                           </span>
                       </>
                  ) : (
                       <Bell className="w-5 h-5 text-muted-foreground" />
                  )}
             </Button>

             {isOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-card border rounded-2xl shadow-xl overflow-hidden z-50">
                       <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
                            <h4 className="font-semibold text-sm">Notifications</h4>
                            <Badge variant="secondary">{unreadCount} new</Badge>
                       </div>
                       
                       <div className="max-h-[400px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                 <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center">
                                      <Bell className="w-8 h-8 mb-2 opacity-20" />
                                      You're all caught up!
                                 </div>
                            ) : (
                                 notifications.map(n => (
                                      <div key={n.id} className={`p-4 border-b last:border-0 hover:bg-muted/50 transition-colors ${!n.isRead ? 'bg-primary/5' : ''}`}>
                                           <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1 space-y-1">
                                                     <p className={`text-sm ${!n.isRead ? 'font-semibold' : 'text-muted-foreground'}`}>{n.message}</p>
                                                     <p className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</p>
                                                </div>
                                                {!n.isRead && (
                                                     <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:bg-primary/20" onClick={() => handleMarkRead(n.id)}>
                                                          <Check className="w-3 h-3" />
                                                     </Button>
                                                )}
                                           </div>
                                      </div>
                                 ))
                            )}
                       </div>
                  </div>
             )}
        </div>
    );
}
