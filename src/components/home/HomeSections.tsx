"use client";

import { Utensils, Clock, Zap, ShieldCheck, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllMenuItems } from "@/actions/menuItem.action";
import MenuGrid from "@/components/shared/MenuGrid";

export function FeaturesSection() {
    const features = [
        {
            icon: <Utensils className="h-6 w-6 text-primary" />,
            title: "Chef Crafted",
            description: "Every dish is prepared by world-class professional chefs."
        },
        {
            icon: <Clock className="h-6 w-6 text-primary" />,
            title: "Fast Delivery",
            description: "Fresh, hot meals delivered to your doorstep in 30 minutes."
        },
        {
            icon: <Zap className="h-6 w-6 text-primary" />,
            title: "Easy Ordering",
            description: "Seamless checkout process with just a few clicks."
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-primary" />,
            title: "Quality Assured",
            description: "We use only the finest, freshest, and organic ingredients."
        }
    ];

    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold mb-4">Why Choose DineWise?</h2>
                    <p className="text-muted-foreground">We combine culinary excellence with modern technology to bring the restaurant experience to your home.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-background border hover:shadow-lg transition-shadow">
                            <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function PopularDishesSection() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const res = await getAllMenuItems({ limit: "3" });
            if (res.success) setItems(res.data.data);
            setLoading(false);
        };
        fetchItems();
    }, []);

    return (
        <section className="py-20">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Signature Dishes</h2>
                        <p className="text-muted-foreground">Most loved creations by our community. Try them once and you'll be hooked.</p>
                    </div>
                    <Link href="/menu">
                        <Button variant="outline" className="rounded-full">View Full Menu</Button>
                    </Link>
                </div>
                
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                        {[1, 2, 3].map(n => <div key={n} className="h-96 bg-muted rounded-2xl" />)}
                    </div>
                ) : (
                    <MenuGrid initialItems={items} isHome={true} />
                )}
            </div>
        </section>
    );
}

export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Food Critic",
            text: "DineWise is a game changer. The quality of ingredients and the chef's touch is evident in every bite.",
            avatar: "https://i.pravatar.cc/150?u=sarah"
        },
        {
            name: "Michael Chen",
            role: "Tech Entrepreneur",
            text: "The delivery is incredibly fast, and the food arrives as if it just left the kitchen. Simply perfect.",
            avatar: "https://i.pravatar.cc/150?u=michael"
        }
    ];

    return (
        <section className="py-20 bg-primary/5">
            <div className="container px-4 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">What Our Customers <br /> <span className="text-primary italic">Are Saying</span></h2>
                        <div className="space-y-8">
                            {testimonials.map((t, i) => (
                                <div key={i} className="bg-background p-8 rounded-2xl shadow-sm border border-primary/10 relative">
                                    <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                                    <p className="text-lg mb-6 italic text-muted-foreground">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <img src={t.avatar} className="w-12 h-12 rounded-full border-2 border-primary/20" alt={t.name} />
                                        <div>
                                            <p className="font-bold">{t.name}</p>
                                            <p className="text-xs text-muted-foreground">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
                            <img 
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
                                className="w-full h-full object-cover" 
                                alt="Chef cooking" 
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-8 bg-background p-6 rounded-2xl shadow-xl border max-w-[200px] -rotate-6 hidden md:block">
                            <div className="flex text-yellow-400 mb-2">
                                {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-4 h-4 fill-current" />)}
                            </div>
                            <p className="text-sm font-bold">"Best food delivery service I've ever used!"</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
