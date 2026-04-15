module.exports = [
"[project]/src/config/env.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/actions/menuItem.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40b97850b209dbd801928d7c0664694743db6fdaf4":"getAllMenuItems","40e978e8ec2df5e0021a14d23222eea778a291119c":"getMenuItemById"},"",""] */ __turbopack_context__.s([
    "getAllMenuItems",
    ()=>getAllMenuItems,
    "getMenuItemById",
    ()=>getMenuItemById
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiFetchServer.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const getAllMenuItems = async (searchParams)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/menu-item", {
            method: "GET",
            params: searchParams
        });
        return res;
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const getMenuItemById = async (id)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])(`/menu-item/${id}`);
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
    getAllMenuItems,
    getMenuItemById
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllMenuItems, "40b97850b209dbd801928d7c0664694743db6fdaf4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMenuItemById, "40e978e8ec2df5e0021a14d23222eea778a291119c", null);
}),
"[project]/src/actions/category.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0015fdae16684464bd6f2b4d8a1cf98a222cf92fd9":"getAllCategories","40818a7c6562709774079bcf26cf28e48b7cadf07d":"createCategoryAction","40a994e725519ece85dbe5ea49b4e8c3ad4124b396":"deleteCategoryAction"},"",""] */ __turbopack_context__.s([
    "createCategoryAction",
    ()=>createCategoryAction,
    "deleteCategoryAction",
    ()=>deleteCategoryAction,
    "getAllCategories",
    ()=>getAllCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiFetchServer.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const getAllCategories = async ()=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/category", {
            method: "GET"
        });
        return res;
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const createCategoryAction = async (payload)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/category", {
            method: "POST",
            body: JSON.stringify(payload)
        });
        return res;
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const deleteCategoryAction = async (id)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])(`/category/${id}`, {
            method: "DELETE"
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
    getAllCategories,
    createCategoryAction,
    deleteCategoryAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllCategories, "0015fdae16684464bd6f2b4d8a1cf98a222cf92fd9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createCategoryAction, "40818a7c6562709774079bcf26cf28e48b7cadf07d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteCategoryAction, "40a994e725519ece85dbe5ea49b4e8c3ad4124b396", null);
}),
"[project]/.next-internal/server/app/(commonLayout)/menu/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/menuItem.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/actions/category.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$menuItem$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/menuItem.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/category.action.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(commonLayout)/menu/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/menuItem.action.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/actions/category.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "0015fdae16684464bd6f2b4d8a1cf98a222cf92fd9",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllCategories"],
    "009b79746ddea04b87602d41e5c0ed31df9a81e0b0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMyNotificationsAction"],
    "40818a7c6562709774079bcf26cf28e48b7cadf07d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCategoryAction"],
    "40a994e725519ece85dbe5ea49b4e8c3ad4124b396",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteCategoryAction"],
    "40b97850b209dbd801928d7c0664694743db6fdaf4",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$menuItem$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllMenuItems"],
    "40de5e4cc9d74352302684407ae0012838d4483342",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["markNotificationReadAction"],
    "40e978e8ec2df5e0021a14d23222eea778a291119c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$menuItem$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getMenuItemById"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$commonLayout$292f$menu$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$menuItem$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(commonLayout)/menu/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/actions/menuItem.action.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/actions/category.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$notification$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/notification.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$menuItem$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/menuItem.action.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$category$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/category.action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_a68b6e28._.js.map