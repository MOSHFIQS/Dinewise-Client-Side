module.exports = [
"[project]/src/config/env.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "envVars",
    ()=>envVars
]);
const envVars = {
    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
};
}),
"[project]/src/lib/apiFetchServer.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetchServerMain",
    ()=>apiFetchServerMain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/env.ts [app-rsc] (ecmascript)");
;
;
const apiFetchServerMain = async (endpoint, options = {})=>{
    const { params, headers, ...restOptions } = options;
    let url = new URL(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$env$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["envVars"].BACKEND_URL}/api${endpoint}`);
    if (params) {
        Object.keys(params).forEach((key)=>url.searchParams.append(key, params[key]));
    }
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const token = cookieStore.get("token")?.value;
    const defaultHeaders = {
        "Content-Type": "application/json",
        ...token ? {
            "Cookie": `token=${token}`
        } : {},
        ...headers
    };
    if (restOptions.body && restOptions.body instanceof FormData) {
        delete defaultHeaders["Content-Type"];
    }
    try {
        const response = await fetch(url.toString(), {
            ...restOptions,
            headers: defaultHeaders
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "An error occurred");
        }
        return data;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch");
    }
};
}),
"[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"009b79746ddea04b87602d41e5c0ed31df9a81e0b0":"getMyNotificationsAction","40de5e4cc9d74352302684407ae0012838d4483342":"markNotificationReadAction"},"",""] */ __turbopack_context__.s([
    "getMyNotificationsAction",
    ()=>getMyNotificationsAction,
    "markNotificationReadAction",
    ()=>markNotificationReadAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiFetchServer.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const getMyNotificationsAction = async ()=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/notification/me");
        return res;
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const markNotificationReadAction = async (id)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])(`/notification/${id}/read`, {
            method: "PATCH"
        });
        return res;
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getMyNotificationsAction,
    markNotificationReadAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMyNotificationsAction, "009b79746ddea04b87602d41e5c0ed31df9a81e0b0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(markNotificationReadAction, "40de5e4cc9d74352302684407ae0012838d4483342", null);
}),
"[project]/src/actions/auth.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"005b8d68346e10dc21c9f1cfdc6d66a99ff97d2bb8":"logoutAction","405728879d43842721c98c2b6957c57c7c6a40a047":"loginAction","40d258ea5ddf84f0a94244a2543c2546f9d7a796fe":"registerAction"},"",""] */ __turbopack_context__.s([
    "loginAction",
    ()=>loginAction,
    "logoutAction",
    ()=>logoutAction,
    "registerAction",
    ()=>registerAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiFetchServer.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const loginAction = async (formData)=>{
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });
        if (res.success && res.data?.token) {
            const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
            cookieStore.set("token", res.data.token, {
                httpOnly: false,
                secure: ("TURBOPACK compile-time value", "development") === "production",
                path: "/",
                maxAge: 7 * 24 * 60 * 60
            });
            return {
                success: true
            };
        }
        return {
            success: false,
            error: "Login failed"
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const registerAction = async (formData)=>{
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const role = formData.get("role") || "CUSTOMER";
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/auth/register", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
                role,
                image: null
            })
        });
        if (res.success && res.data?.token) {
            const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
            cookieStore.set("token", res.data.token, {
                httpOnly: false,
                secure: ("TURBOPACK compile-time value", "development") === "production",
                path: "/",
                maxAge: 7 * 24 * 60 * 60
            });
            return {
                success: true
            };
        }
        return {
            success: false,
            error: "Registration failed"
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const logoutAction = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete("token");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    loginAction,
    registerAction,
    logoutAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(loginAction, "405728879d43842721c98c2b6957c57c7c6a40a047", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerAction, "40d258ea5ddf84f0a94244a2543c2546f9d7a796fe", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logoutAction, "005b8d68346e10dc21c9f1cfdc6d66a99ff97d2bb8", null);
}),
"[project]/.next-internal/server/app/(commonLayout)/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/auth.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/auth.action.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/(commonLayout)/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/auth.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "009b79746ddea04b87602d41e5c0ed31df9a81e0b0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMyNotificationsAction"],
    "40d258ea5ddf84f0a94244a2543c2546f9d7a796fe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerAction"],
    "40de5e4cc9d74352302684407ae0012838d4483342",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markNotificationReadAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$commonLayout$292f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$auth$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(commonLayout)/register/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/actions/auth.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/auth.action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_4c3eaa4b._.js.map