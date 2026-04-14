import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";

export default function Home() {
    return (
        <section className="relative w-full py-20 lg:py-32 xl:py-48 overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-sm space-x-2">
                    <Utensils className="h-4 w-4" />
                    <span>Experience Luxury Dining at Home</span>
                </div>

                <div className="space-y-4 max-w-4xl">
                    <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                        A Premium Culinary <br className="hidden sm:block" />
                        <span className="text-gradient">Experience</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Discover exquisite dishes crafted by world-class chefs. Delivered fresh to your door with uncompromising quality.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link href="/menu" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full sm:w-auto rounded-full h-12 px-8 text-base shadow-lg shadow-primary/25 group">
                            Explore Menu
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/ourShop" className="w-full sm:w-auto">
                        <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full h-12 px-8 text-base border-primary/20 hover:bg-primary/5">
                            Special Offers
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
