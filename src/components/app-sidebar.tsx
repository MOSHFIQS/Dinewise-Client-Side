"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthProvider"
import {
  LogOut,
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingCart,
  Users,
  Settings,
  History,
  FileBox,
  Undo2,
  Star,
  Tag
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const adminNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/dashboard/allUsers", icon: Users },
  { title: "Categories", url: "/dashboard/categories", icon: UtensilsCrossed },
  { title: "All Menu Items", url: "/dashboard/menu", icon: UtensilsCrossed },
  { title: "All Orders", url: "/dashboard/allOrders", icon: ShoppingCart },
  { title: "Coupons", url: "/dashboard/coupons", icon: Tag },
  { title: "Reviews", url: "/dashboard/reviews", icon: Star },
  { title: "Audit Logs", url: "/dashboard/audit", icon: History },
  { title: "Refunds", url: "/dashboard/refunds", icon: Undo2 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

const chefNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Add Menu Item", url: "/dashboard/menu/create", icon: FileBox },
  { title: "My Menu Items", url: "/dashboard/menu", icon: UtensilsCrossed },
  { title: "My Orders", url: "/dashboard/myOrders", icon: ShoppingCart },
  { title: "Reviews", url: "/dashboard/reviews", icon: Star },
  { title: "Refunds", url: "/dashboard/refunds", icon: Undo2 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

const customerNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Reviews", url: "/dashboard/reviews", icon: Star },
  { title: "My Addresses", url: "/dashboard/addresses", icon: Star },
  { title: "My Cart", url: "/dashboard/cart", icon: ShoppingCart },
  { title: "Order History", url: "/dashboard/payment", icon: History },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar({ user }: { user: { role: string } }) {
  const { logOut } = useAuth()
  const pathname = usePathname()

  let navItems = customerNav
  if (user?.role === "ADMIN") navItems = adminNav
  if (user?.role === "CHEF") navItems = chefNav

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="flex h-16 items-center justify-center border-b bg-white/50 backdrop-blur-sm rounded-t-xl transition-all group-data-[state=collapsed]:p-0">
        <div className="flex items-center gap-2 overflow-hidden p-2 w-full">
          <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto">
            <UtensilsCrossed className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
            <span className="truncate font-semibold tracking-tight text-lg">Dine<span className="text-primary">Wise</span></span>
            <span className="truncate text-xs text-muted-foreground underline decoration-primary/30 underline-offset-4">{user?.role} Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-4 bg-white/50 backdrop-blur-sm">
        <SidebarMenu>
          {navItems.map((item) => {
            const isDashboardRoot = item.url === "/dashboard";

            const isActive = isDashboardRoot
              ? pathname === "/dashboard"
              : pathname === item.url || pathname?.startsWith(`${item.url}/`);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={`transition-all duration-200 ${isActive
                      ? "bg-primary/10 text-primary font-bold shadow-sm"
                      : "text-gray-600 hover:bg-gray-100/50"
                    }`}
                >
                  <Link href={item.url} className="flex items-center gap-3">
                    <item.icon
                      className={`h-4 w-4 shrink-0 ${isActive ? "text-primary scale-110" : "text-gray-400"
                        } transition-transform`}
                    />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="bg-gray-100" />
      <SidebarFooter className="p-2 bg-white/50 backdrop-blur-sm rounded-b-xl mt-auto transition-all">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logOut}
              tooltip="Log out"
              className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg font-medium"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="group-data-[state=collapsed]:hidden">Disconnect</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

