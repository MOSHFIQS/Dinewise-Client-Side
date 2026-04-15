import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
     SidebarInset,
     SidebarProvider,
     SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/roles"
import { sessionService } from "@/service/token.service"
import { ReactNode } from "react"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
     admin,
     chef,
     customer,
}: {
     admin: ReactNode
     chef: ReactNode
     customer: ReactNode
}) {
     const data = await sessionService.getUserFromToken()

     if (!data) {
          redirect("/login")
     }

     const userInfo = {
          role: data?.role as string,
     }

     let content: ReactNode

     switch (userInfo.role) {
          case Roles.ADMIN:
               content = admin
               break
          case Roles.CHEF:
               content = chef
               break
          default:
               content = customer
     }

     return (
          <SidebarProvider>
               <AppSidebar user={userInfo} />
               <SidebarInset className="bg-[#EFE9E3]/30">
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-white/50 backdrop-blur-md sticky top-0 z-10 transition-colors">
                         <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors h-9 w-9" />
                         <Separator orientation="vertical" className="mr-2 h-4 bg-gray-200" />
                         <div className="flex-1" />
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6 bg-transparent">
                         {content}
                    </div>
               </SidebarInset>
          </SidebarProvider>
     )
}

