module.exports = [
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
"[project]/src/actions/order.action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4006a1a5a61f61a5157e8869df53eb5de50eaa17f1":"getAllOrdersAction","4035d668ab705e075ab8be97507cb7ac719ea9efc8":"getMyOrdersAction","404bab31f18f1e5869f2f82a1afb3036d6dff03c55":"getOrderByIdAction","40821a31599d2903891a2fed819c48082b293c5519":"createOrderAction","60506543a8d2b5933bf683a5528ab7907d6892b3b7":"updateOrderStatusAction"},"",""] */ __turbopack_context__.s([
    "createOrderAction",
    ()=>createOrderAction,
    "getAllOrdersAction",
    ()=>getAllOrdersAction,
    "getMyOrdersAction",
    ()=>getMyOrdersAction,
    "getOrderByIdAction",
    ()=>getOrderByIdAction,
    "updateOrderStatusAction",
    ()=>updateOrderStatusAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiFetchServer.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const createOrderAction = async (payload)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/order", {
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
const getMyOrdersAction = async (searchParams)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/order/my-orders", {
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
const getOrderByIdAction = async (id)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])(`/order/${id}`);
        return res;
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const updateOrderStatusAction = async (id, actionStatus)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])(`/order/${id}/status`, {
            method: "PATCH",
            body: JSON.stringify({
                action: actionStatus
            })
        });
        return res;
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};
const getAllOrdersAction = async (searchParams)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiFetchServer$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["apiFetchServerMain"])("/order/all", {
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createOrderAction,
    getMyOrdersAction,
    getOrderByIdAction,
    updateOrderStatusAction,
    getAllOrdersAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createOrderAction, "40821a31599d2903891a2fed819c48082b293c5519", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMyOrdersAction, "4035d668ab705e075ab8be97507cb7ac719ea9efc8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getOrderByIdAction, "404bab31f18f1e5869f2f82a1afb3036d6dff03c55", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateOrderStatusAction, "60506543a8d2b5933bf683a5528ab7907d6892b3b7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$4_$40$babel$2b$core$40$7$2e$2_07c7b45b0f83eb8e0c4154f920fd2e73$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAllOrdersAction, "4006a1a5a61f61a5157e8869df53eb5de50eaa17f1", null);
}),
"[project]/.next-internal/server/app/dashboard/@admin/allOrders/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/order.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$order$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/order.action.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/.next-internal/server/app/dashboard/@admin/allOrders/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/actions/order.action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4006a1a5a61f61a5157e8869df53eb5de50eaa17f1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$order$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllOrdersAction"],
    "60506543a8d2b5933bf683a5528ab7907d6892b3b7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$order$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateOrderStatusAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$dashboard$2f40$admin$2f$allOrders$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$order$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/dashboard/@admin/allOrders/page/actions.js { ACTIONS_MODULE0 => "[project]/src/actions/order.action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$order$2e$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/order.action.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/.pnpm/next@16.1.4_@babel+core@7.2_07c7b45b0f83eb8e0c4154f920fd2e73/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_7240c121._.js.map