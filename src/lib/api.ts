import { envVars } from "@/config/env";

interface FetchOptions extends RequestInit {
    params?: Record<string, string>;
}

export const apiFetchClient = async (endpoint: string, options: FetchOptions = {}) => {
    const { params, headers, ...restOptions } = options;
    
    let url = new URL(`${envVars.BACKEND_URL}/api${endpoint}`);
    
    if (params) {
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    try {
        const response = await fetch(url.toString(), {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...restOptions,
        });
        
        const data = await response.json();
        
        return {
            success: response.ok,
            status: response.status,
            data: data.data || data,
            message: data.message || (response.ok ? "Success" : "API request failed"),
        };
    } catch (error: any) {
        return {
            success: false,
            status: 0,
            data: null,
            message: error.message || "Network error",
        };
    }
};
