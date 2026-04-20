import LoginForm from "@/components/login-form";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="relative flex-1 w-full min-h-[calc(100vh-64px)] flex items-center justify-center p-4 overflow-hidden bg-white">
            {/* Ambient Background Accents */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse delay-700" />
            
            <div className="relative z-10 w-full max-w-md" data-aos="zoom-in">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                        <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        <p className="text-muted-foreground animate-pulse font-medium">Preparing your experience...</p>
                    </div>
                }>
                    <LoginForm />
                </Suspense>
            </div>
        </main>
    );
}
