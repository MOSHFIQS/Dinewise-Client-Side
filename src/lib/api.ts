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

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        ...headers,
    };

    if (restOptions.body && restOptions.body instanceof FormData) {
        delete (defaultHeaders as Record<string, string>)["Content-Type"];
    }

    try {
        const response = await fetch(url.toString(), {
            ...restOptions,
            headers: defaultHeaders,
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "An error occurred");
        }
        
        return data;
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch");
    }
};
