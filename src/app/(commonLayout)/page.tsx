import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";
import { FeaturesSection, PopularDishesSection, TestimonialsSection, HowItWorksSection, ServicesSection, StatisticsSection, NewsletterSection } from "@/components/home/HomeSections";

export default function Home() {
    return (
        <div className="flex flex-col w-full bg-gradient-to-br from-[#eff3e3] via-[#faede0] to-[#fadcc6] min-h-screen text-slate-900 pb-20 space-y-10">
            {/* Hero Section */}
            <section className="relative w-full py-20 lg:py-32 xl:py-48 pb-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8">
                    <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-sm space-x-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Utensils className="h-4 w-4" />
                        <span>Experience Luxury Dining at Home</span>
                    </div>

                    <div className="space-y-4 max-w-4xl">
                        <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            A Premium Culinary <br className="hidden sm:block" />
                            <span className="text-gradient">Experience</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                            Discover exquisite dishes crafted by world-class chefs. Delivered fresh to your door with uncompromising quality and taste.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
                        <Link href="/menu" className="w-full sm:w-auto">
                            <Button size="lg" className="w-full sm:w-auto rounded-full h-12 px-8 text-base shadow-lg shadow-primary/25 group">
                                Explore Menu
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/menu" className="w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full h-12 px-8 text-base border-primary/20 hover:bg-primary/5">
                                Order Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <HowItWorksSection />
            <FeaturesSection />
            <ServicesSection />
            <PopularDishesSection />
            <StatisticsSection />
            <TestimonialsSection />
            <NewsletterSection />
            
            {/* CTA Section */}
            <section className="pt-20 pb-10">
                <div className="container px-4 mx-auto text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">Ready to Taste Perfection?</h2>
                        <p className="text-muted-foreground text-lg">Join thousands of food lovers who enjoy the DineWise experience every single day.</p>
                        <Link href="/register">
                            <Button size="lg" className="rounded-full h-14 px-10 text-lg shadow-xl shadow-black/10 mt-4 text-white">
                                Join Now — It's Free
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

