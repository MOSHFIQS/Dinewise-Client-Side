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
  FileBox
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const adminNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/dashboard/allUsers", icon: Users },
  { title: "All Orders", url: "/dashboard/allOrders", icon: ShoppingCart },
  { title: "All Menu Items", url: "/dashboard/allMenu", icon: UtensilsCrossed },
  { title: "Audit Logs", url: "/dashboard/audit", icon: History },
]

const chefNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Menu Items", url: "/dashboard/myMenu", icon: UtensilsCrossed },
  { title: "Add Menu Item", url: "/dashboard/addItems", icon: FileBox },
  { title: "My Orders", url: "/dashboard/myOrders", icon: ShoppingCart },
]

const customerNav = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Cart", url: "/dashboard/myCart", icon: ShoppingCart },
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
      <SidebarHeader className="flex h-16 items-center justify-center border-b px-4 bg-white/50 backdrop-blur-sm rounded-t-xl">
        <div className="flex items-center gap-2 overflow-hidden px-2 py-3 w-full">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground group-data-[collapsible=icon]:mx-auto">
            <UtensilsCrossed className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold tracking-tight text-lg">Dine<span className="text-primary">Wise</span></span>
            <span className="truncate text-xs text-muted-foreground underline decoration-primary/30 underline-offset-4">{user?.role} Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-4 bg-white/50 backdrop-blur-sm">
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.url || pathname?.startsWith(`${item.url}/`);

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
                    <item.icon className={`h-4 w-4 ${isActive ? "text-primary scale-110" : "text-gray-400"} transition-transform`} />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator className="bg-gray-100" />
      <SidebarFooter className="p-4 bg-white/50 backdrop-blur-sm rounded-b-xl mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logOut}
              tooltip="Log out"
              className="text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Disconnect</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

