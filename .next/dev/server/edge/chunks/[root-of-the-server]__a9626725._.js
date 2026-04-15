(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__a9626725._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/constants/roles.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// DineWise roles — matches server-side role strings exactly
__turbopack_context__.s([
    "Roles",
    ()=>Roles
]);
const Roles = {
    ADMIN: "ADMIN",
    CHEF: "CHEF",
    CUSTOMER: "CUSTOMER"
};
}),
"[project]/ [middleware-edge] (unsupported edge import 'stream', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`stream`));
}),
"[externals]/node:util [external] (node:util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:util", () => require("node:util"));

module.exports = mod;
}),
"[project]/ [middleware-edge] (unsupported edge import 'crypto', ecmascript)", ((__turbopack_context__, module, exports) => {

__turbopack_context__.n(__import_unsupported(`crypto`));
}),
"[project]/src/service/token.service.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sessionService",
    ()=>sessionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$headers$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/esm/api/headers.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/esm/server/request/cookies.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/index.js [middleware-edge] (ecmascript)");
;
;
const sessionService = {
    getUserFromToken: async ()=>{
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$request$2f$cookies$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get("token")?.value;
        if (!token) return null;
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"].verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log("JWT invalid or expired:", err);
            return null;
        }
    }
};
}),
"[project]/src/proxy.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "dynamic",
    ()=>dynamic,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/roles.ts [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$service$2f$token$2e$service$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/service/token.service.ts [middleware-edge] (ecmascript)");
;
;
;
const dynamic = "force-dynamic";
async function proxy(request) {
    const pathname = request.nextUrl.pathname;
    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$service$2f$token$2e$service$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["sessionService"].getUserFromToken();
    const role = data?.role;
    const isAdmin = role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Roles"].ADMIN;
    const isChef = role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Roles"].CHEF;
    const isCustomer = role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Roles"].CUSTOMER;
    // -----------------------------
    // 🔒 Protect dashboard routes
    // -----------------------------
    const isDashboardRoute = pathname.startsWith("/dashboard");
    if (!data?.id && isDashboardRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
    // -----------------------------
    // 🚫 Prevent logged-in users from visiting auth pages
    // -----------------------------
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
    if (data?.id && isAuthRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    // -----------------------------
    // 🔁 Role-based cross-access guards
    // -----------------------------
    // Only admins should access /dashboard/allUsers, /dashboard/allOrders etc.
    // (future-proof: those are handled by slot rendering, not URL blocking)
    // If a CUSTOMER tries a chef-only path, redirect to dashboard root
    if (isCustomer && pathname.startsWith("/dashboard/addItems")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    if (isCustomer && pathname.startsWith("/dashboard/myMenu")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    if (isCustomer && pathname.startsWith("/dashboard/allUsers")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    // If a CHEF tries admin-only paths, redirect to dashboard root
    if (isChef && pathname.startsWith("/dashboard/allUsers")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    if (isChef && pathname.startsWith("/dashboard/audit")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/register"
    ]
};
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$proxy$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/proxy.ts [middleware-edge] (ecmascript)");
;
function middleware(request) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$proxy$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["proxy"])(request);
}
const config = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$proxy$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["config"];
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__a9626725._.js.map