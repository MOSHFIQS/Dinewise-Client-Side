"use client";

import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
    admin,
    chef,
    customer,
}: {
    admin: React.ReactNode;
    chef: React.ReactNode;
    customer: React.ReactNode;
}) {
    // Note: the conditional role rendering logic in Next.js 14+ parallel routes 
    // happens on the page.tsx or layout file via cookies.
    // For simplicity, we are capturing the role and rendering the slot.
    // Real implementation would use server component for the Layout and check `cookies().get("token")`

    return (
        <div className="flex h-screen w-full bg-muted/40 overflow-hidden">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto h-full p-4 lg:p-8">
                {/* Normally we'd return a slot based on the role here */}
                {admin}
                {chef}
                {customer}
            </main>
        </div>
    );
}
