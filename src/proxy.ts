import { NextRequest, NextResponse } from "next/server"
import { Roles } from "./constants/roles"
import { sessionService } from "./service/token.service"

export const dynamic = "force-dynamic"

export async function proxy(request: NextRequest) {
     const pathname = request.nextUrl.pathname

     const data = await sessionService.getUserFromToken()

     const role = data?.role

     const isAdmin = role === Roles.ADMIN
     const isChef = role === Roles.CHEF
     const isCustomer = role === Roles.CUSTOMER

     // -----------------------------
     // 🔒 Protect dashboard routes
     // -----------------------------
     const isDashboardRoute = pathname.startsWith("/dashboard")

     if (!data?.id && isDashboardRoute) {
          return NextResponse.redirect(
               new URL(`/login?redirect=${pathname}`, request.url)
          )
     }

     // -----------------------------
     // 🚫 Prevent logged-in users from visiting auth pages
     // -----------------------------
     const isAuthRoute =
          pathname.startsWith("/login") ||
          pathname.startsWith("/register")

     if (data?.id && isAuthRoute) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
     }

     // -----------------------------
     // 🔁 Role-based cross-access guards
     // -----------------------------
     // Only admins should access /dashboard/allUsers, /dashboard/allOrders etc.
     // (future-proof: those are handled by slot rendering, not URL blocking)

     // If a CUSTOMER tries a chef-only path, redirect to dashboard root
     if (isCustomer && pathname.startsWith("/dashboard/addItems")) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
     }
     if (isCustomer && pathname.startsWith("/dashboard/myMenu")) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
     }
     if (isCustomer && pathname.startsWith("/dashboard/allUsers")) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
     }

     // If a CHEF tries admin-only paths, redirect to dashboard root
     if (isChef && pathname.startsWith("/dashboard/allUsers")) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
     }
     if (isChef && pathname.startsWith("/dashboard/audit")) {
          return NextResponse.redirect(new URL("/dashboard", request.url))
     }

     return NextResponse.next()
}

export const config = {
     matcher: [
          "/dashboard/:path*",
          "/login",
          "/register",
     ],
}
