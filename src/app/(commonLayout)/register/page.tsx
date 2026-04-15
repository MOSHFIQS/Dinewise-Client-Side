import RegisterForm from "@/components/signup-form";
import { Suspense } from "react";

export default function RegisterPage() {
    return (
        <main className="flex-1 w-full flex items-center justify-center bg-muted/30">
            <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]">Loading...</div>}>
                <RegisterForm />
            </Suspense>
        </main>
    );
}
