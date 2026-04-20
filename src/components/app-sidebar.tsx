"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar"

import { useAuth } from "@/context/AuthProvider"
import {
  LogOut,
  LayoutDashboard,
  Home,
  UtensilsCrossed,
  ShoppingCart,
  Users,
  Settings,
  History,
  FileBox,
  Undo2,
  Star,
  Tag,
} from "lucide-react"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

type NavItem = {
  title: string
  url: string
  icon: any
}

type NavGroup = {
  title: string
  items: NavItem[]
}

const commonGroups: NavGroup[] = [
  {
    title: "General",
    items: [
      { title: "Home", url: "/", icon: Home },
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    ],
  },
]

const adminGroups: NavGroup[] = [
  {
    title: "Management",
    items: [
      { title: "Users", url: "/dashboard/allUsers", icon: Users },
      { title: "Categories", url: "/dashboard/categories", icon: UtensilsCrossed },
      { title: "Menu Items", url: "/dashboard/menu", icon: UtensilsCrossed },
      { title: "Orders", url: "/dashboard/allOrders", icon: ShoppingCart },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Coupons", url: "/dashboard/coupons", icon: Tag },
      { title: "Reviews", url: "/dashboard/reviews", icon: Star },
      { title: "Audit Logs", url: "/dashboard/audit", icon: History },
      { title: "Refunds", url: "/dashboard/refunds", icon: Undo2 },
    ],
  },
  {
    title: "System",
    items: [{ title: "Settings", url: "/dashboard/settings", icon: Settings }],
  },
]

const chefGroups: NavGroup[] = [
  {
    title: "Kitchen",
    items: [
      { title: "Add Menu Item", url: "/dashboard/menu/create", icon: FileBox },
      { title: "My Menu Items", url: "/dashboard/menu", icon: UtensilsCrossed },
      { title: "My Orders", url: "/dashboard/myOrders", icon: ShoppingCart },
    ],
  },
  {
    title: "Activity",
    items: [
      { title: "Reviews", url: "/dashboard/reviews", icon: Star },
      { title: "Refunds", url: "/dashboard/refunds", icon: Undo2 },
    ],
  },
  {
    title: "System",
    items: [{ title: "Settings", url: "/dashboard/settings", icon: Settings }],
  },
]

const customerGroups: NavGroup[] = [
  {
    title: "Personal",
    items: [
      { title: "My Reviews", url: "/dashboard/reviews", icon: Star },
      { title: "My Addresses", url: "/dashboard/addresses", icon: Star },
      { title: "My Cart", url: "/dashboard/cart", icon: ShoppingCart },
      { title: "Order History", url: "/dashboard/payment", icon: History },
    ],
  },
  {
    title: "System",
    items: [{ title: "Settings", url: "/dashboard/settings", icon: Settings }],
  },
]

export function AppSidebar({ user }: { user: { role: string } }) {
  const { logOut } = useAuth()
  const pathname = usePathname()

  let groups = customerGroups

  if (user?.role === "ADMIN") groups = adminGroups
  if (user?.role === "CHEF") groups = chefGroups

  const mergedGroups = [...commonGroups, ...groups]

  return (
    <Sidebar collapsible="icon" className="border-none">
      <SidebarHeader className="flex h-16 items-center border-b bg-white/50 backdrop-blur-sm rounded-t-xl px-4 group-data-[state=collapsed]:px-2">
        <Link href="/" className="flex items-center gap-3 w-full group-data-[state=collapsed]:justify-center overflow-hidden">
          <Image 
            src="/logo.png" 
            alt="DineWise Logo" 
            width={40} 
            height={40} 
            className="h-8 w-auto min-w-[30px] shrink-0 transition-all duration-300"
          />
          <div className="flex flex-col group-data-[state=collapsed]:hidden min-w-0 overflow-hidden">
            <span className="font-semibold text-lg leading-tight truncate">
              Dine<span className="text-primary">Wise</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground truncate">
              {user?.role} Portal
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-4 bg-white/50 backdrop-blur-sm">
        {mergedGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider group-data-[state=collapsed]:hidden">
              {group.title}
            </p>

            <SidebarMenu>
              {group.items.map((item) => {
                const isActive =
                  item.url === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname === item.url

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
                          className={`h-4 w-4 shrink-0 transition-transform ${isActive ? "text-primary scale-110" : "text-gray-400"
                            }`}
                        />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </div>
        ))}
      </SidebarContent>

      <SidebarSeparator className="bg-gray-100" />

      <SidebarFooter className="p-2 bg-white/50 backdrop-blur-sm rounded-b-xl">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logOut}
              tooltip="Log out"
              className="text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className="group-data-[state=collapsed]:hidden">
                Disconnect
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}