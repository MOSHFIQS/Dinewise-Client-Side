export const envVars = {
    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
    JWT_SECRET: process.env.JWT_SECRET as string,
    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
};

// Defensive check for critical frontend environment variables
if (typeof window !== 'undefined' && !envVars.STRIPE_PUBLISHABLE_KEY) {
    console.error("❌ CRITICAL ERROR: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is missing from .env file!");
}
