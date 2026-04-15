module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/constants/roles.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/config/env.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "envVars",
    ()=>envVars
]);
const envVars = {
    FRONTEND_URL: ("TURBOPACK compile-time value", "http://localhost:3000") || "http://localhost:3000",
    BACKEND_URL: ("TURBOPACK compile-time value", "http://localhost:5000") || "http://localhost:5000",
    JWT_SECRET: process.env.JWT_SECRET
};
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/service/token.service.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sessionService",
    ()=>sessionService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/headers.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/index.js [middleware] (ecmascript)");
;
;
;
const sessionService = {
    getUserFromToken: async ()=>{
        const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["cookies"])();
        const token = cookieStore.get("token")?.value;
        if (!token) return null;
        try {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$jsonwebtoken$40$9$2e$0$2e$3$2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["default"].verify(token, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["envVars"].JWT_SECRET);
        } catch (err) {
            console.log("JWT invalid or expired:", err);
            return null;
        }
    }
};
}),
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "dynamic",
    ()=>dynamic,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/roles.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$service$2f$token$2e$service$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/service/token.service.ts [middleware] (ecmascript)");
;
;
;
const dynamic = "force-dynamic";
async function proxy(request) {
    const pathname = request.nextUrl.pathname;
    const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$service$2f$token$2e$service$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["sessionService"].getUserFromToken();
    const role = data?.role;
    const isAdmin = role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["Roles"].ADMIN;
    const isChef = role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["Roles"].CHEF;
    const isCustomer = role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$roles$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["Roles"].CUSTOMER;
    // -----------------------------
    // 🔒 Protect dashboard routes
    // -----------------------------
    const isDashboardRoute = pathname.startsWith("/dashboard");
    if (!data?.id && isDashboardRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
    // -----------------------------
    // 🚫 Prevent logged-in users from visiting auth pages
    // -----------------------------
    const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
    if (data?.id && isAuthRoute) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    // -----------------------------
    // 🔁 Role-based cross-access guards
    // -----------------------------
    // Only admins should access /dashboard/allUsers, /dashboard/allOrders etc.
    // (future-proof: those are handled by slot rendering, not URL blocking)
    // If a CUSTOMER tries a chef-only path, redirect to dashboard root
    if (isCustomer && pathname.startsWith("/dashboard/addItems")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    if (isCustomer && pathname.startsWith("/dashboard/myMenu")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    if (isCustomer && pathname.startsWith("/dashboard/allUsers")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    // If a CHEF tries admin-only paths, redirect to dashboard root
    if (isChef && pathname.startsWith("/dashboard/allUsers")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    if (isChef && pathname.startsWith("/dashboard/audit")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/register"
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__eb34ef24._.js.map