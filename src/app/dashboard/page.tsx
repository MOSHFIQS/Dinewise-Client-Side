import { redirect } from "next/navigation"

// This page is never directly rendered — the layout handles role-based slot dispatch.
// Redirect to /dashboard for backward compatibility if accessed directly.
export default function DashboardPage() {
     redirect("/dashboard")
}
