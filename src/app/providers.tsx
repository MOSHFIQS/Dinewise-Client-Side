"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import AOS from "aos";
import "aos/dist/aos.css"; // Backup import if globals.css import fails

export default function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
            },
        },
    }));

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out-cubic",
            once: true,
            offset: 50,
            delay: 0,
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
}
