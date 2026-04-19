"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Loader2 } from "lucide-react";
import ProfileForm from "@/components/dashboard/shared/ProfileForm";
import { getMyProfileAction } from "@/actions/user.action";
import { User } from "@/types/user.types";

export default function SettingsPage() {
    const { isLoading: authLoading } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const res = await getMyProfileAction();
            if (res.success) {
                setUser(res.data);
            }
            setFetching(false);
        };
        fetchProfile();
    }, []);

    if (authLoading || fetching) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground font-medium animate-pulse">Loading settings...</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent">
                    Admin Profile Settings
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Manage your administrative profile and platform control settings.
                </p>
            </div>

            <div className="grid gap-8">
                <ProfileForm user={user} />
            </div>
        </div>
    );
}
