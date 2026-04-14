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

export function AppSidebar() {
  const { user, logOut } = useAuth()
  const pathname = usePathname()

  let navItems = customerNav
  if (user?.role === "ADMIN") navItems = adminNav
  if (user?.role === "CHEF") navItems = chefNav

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader className="flex h-16 items-center justify-center border-b px-4">
           <div className="flex items-center gap-2 overflow-hidden px-2 py-3 w-full">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground group-data-[collapsible=icon]:mx-auto">
              <UtensilsCrossed className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-semibold tracking-tight text-lg">Dine<span className="text-primary">Wise</span></span>
              <span className="truncate text-xs text-muted-foreground">{user?.role}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2 pt-4">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname === item.url || pathname?.startsWith(`${item.url}/`)}
                  tooltip={item.title}
                >
                  <Link href={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="p-4">
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={logOut} tooltip="Log out" className="text-destructive">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}
