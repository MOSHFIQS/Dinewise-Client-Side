"use client";

import { Utensils, Clock, Zap, ShieldCheck, Star, Quote, Truck, Calendar, ShoppingBag, ChefHat, Trophy, Users as UsersIcon, Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllMenuItems } from "@/actions/menuItem.action";
import MenuGrid from "@/components/menu/MenuGrid";

export function FeaturesSection() {
    const features = [
        {
            icon: <Utensils className="h-6 w-6 text-white" />,
            title: "Chef Crafted",
            description: "Every dish is prepared by world-class professional chefs."
        },
        {
            icon: <Clock className="h-6 w-6 text-white" />,
            title: "Fast Delivery",
            description: "Fresh, hot meals delivered to your doorstep in 30 minutes."
        },
        {
            icon: <Zap className="h-6 w-6 text-white" />,
            title: "Easy Ordering",
            description: "Seamless checkout process with just a few clicks."
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-white" />,
            title: "Quality Assured",
            description: "We use only the finest, freshest, and organic ingredients."
        }
    ];

    return (
        <section className="py-24" data-aos="fade-up">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black border border-black/10 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
                        <Zap className="w-3 h-3 fill-current" />
                        The Dinewise Edge
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-black inline-block">Why Choose Us?</h2>
                    <p className="text-black/70 text-lg italic">We combine culinary excellence with modern technology to bring the restaurant experience to your home.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="group p-10 rounded-[2.5rem] bg-white border border-black/5 hover:border-black/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 bg-black transition-colors duration-500 shadow-inner">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase text-black">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{f.description}</p>
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
            setLoading(true);
            try {
                const res = await getAllMenuItems({ limit: "8" });
                if (res.success && res.data) {
                    const itemsList = res.data;
                    setItems(itemsList);
                }
            } catch (error) {
                console.error("Home feed fetch error:", error);
            }
            setLoading(false);
        };
        fetchItems();
    }, []);

    return (
        <section className="py-20" data-aos="fade-up">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black border border-black/10 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
                            <Star className="w-3 h-3 fill-current" />
                            Guest Favorites
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-black leading-tight">Our Signature Dishes</h2>
                        <p className="text-black/70 text-lg">Most loved creations by our community. Try them once and you'll be hooked.</p>
                    </div>
                    <Link href="/menu">
                        <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-2 text-black border-black/20 hover:bg-black hover:text-white transition-all transform hover:scale-105 active:scale-95 bg-white/50 backdrop-blur-sm">View Full Menu</Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <div key={n} className="h-96 bg-muted rounded-[2rem]" />)}
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
        <section className="py-32 overflow-hidden relative" data-aos="fade-up">
            <div className="container px-4 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black border border-black/10 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                            <Utensils className="w-3 h-3" />
                            Community Voice
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tight text-black">
                            What Our <br />
                            <span className="italic font-light">Customers Say</span>
                        </h2>

                        <div className="space-y-8">
                            {testimonials.map((t, i) => (
                                <div key={i} className="group bg-white p-10 rounded-[2.5rem] border border-black/5 relative shadow-xl shadow-black/5 transition-all duration-500 hover:border-black/10">
                                    <Quote className="absolute top-8 right-10 h-10 w-10 text-black/5 group-hover:text-black/10 transition-colors" />
                                    <p className="text-xl mb-8 italic text-black/80 font-medium leading-relaxed">"{t.text}"</p>
                                    <div className="flex items-center gap-5">
                                        <div className="relative">
                                            <img src={t.avatar} className="w-16 h-16 rounded-2xl object-cover border border-black/10 shadow-sm" alt={t.name} />
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-black tracking-tight text-black">{t.name}</p>
                                            <p className="text-xs font-bold text-black/50 uppercase tracking-widest">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white relative group">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt="Chef cooking"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700 text-center">
                                <div className="flex justify-center text-white mb-4 gap-1">
                                    {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-xl font-black text-white leading-tight mb-2">"Signature Culinary Excellence"</p>
                                <p className="text-white/80 text-sm font-medium">Join 50,000+ happy food lovers who trust Dinewise.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function HowItWorksSection() {
    const steps = [
        { icon: <Utensils className="h-8 w-8 text-white" />, title: "Choose Your Meal", desc: "Select from our vast menu of chef-crafted dishes." },
        { icon: <ChefHat className="h-8 w-8 text-white" />, title: "Chef Prepares", desc: "Our expert chefs cook your meal with fresh ingredients." },
        { icon: <Truck className="h-8 w-8 text-white" />, title: "Fast Delivery", desc: "It arrives at your door hot and ready to eat." },
    ];
    return (
        <section className="relative py-20" data-aos="fade-up">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-slate-900">How It Works</h2>
                    <p className="text-lg text-muted-foreground">From our kitchen to your dining table in three simple steps.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center relative">
                    {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center relative z-10">
                            <div className="w-20 h-20 bg-primary shadow-xl shadow-primary/20 rounded-2xl flex items-center justify-center mb-6 transform transition-transform hover:-translate-y-2">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">{step.title}</h3>
                            <p className="text-slate-500 font-medium">{step.desc}</p>
                        </div>
                    ))}
                    <div className="hidden md:block absolute top-[2.5rem] left-[16.6%] right-[16.6%] h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 -z-0"></div>
                </div>
            </div>
        </section>
    );
}

export function ServicesSection() {
    const services = [
        { icon: <ShoppingBag className="h-6 w-6 text-black" />, title: "Daily Delivery", desc: "Hot, ready-to-eat meals delivered to your home or office on demand." },
        { icon: <Calendar className="h-6 w-6 text-black" />, title: "Event Catering", desc: "Premium catering services for corporate events, weddings, and parties." },
        { icon: <ChefHat className="h-6 w-6 text-black" />, title: "Private Chef", desc: "Hire our top chefs for an exclusive, curated dining experience at your home." },
    ];
    return (
        <section className="py-24 border-y border-black/5  backdrop-blur-sm" data-aos="fade-up">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-black inline-block pb-2">Our Premium Services</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((svc, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl shadow-lg shadow-black/5 flex flex-col items-start gap-4 hover:-translate-y-1 transition-all duration-300">
                            <div className="p-4 bg-black/5 rounded-2xl">{svc.icon}</div>
                            <h3 className="text-xl font-bold text-black">{svc.title}</h3>
                            <p className="text-black/60 font-medium leading-relaxed">{svc.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function StatisticsSection() {
    const stats = [
        { icon: <Trophy className="h-6 w-6 text-black" />, value: "50+", label: "Award-winning Chefs" },
        { icon: <UsersIcon className="h-6 w-6 text-black" />, value: "100k+", label: "Happy Customers" },
        { icon: <ShoppingBag className="h-6 w-6 text-black" />, value: "500k+", label: "Meals Delivered" },
        { icon: <Heart className="h-6 w-6 text-black" />, value: "4.9/5", label: "Average Rating" },
    ];
    return (
        <section className="py-20 relative overflow-hidden" data-aos="fade-up">
            <div className="container px-4 mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center border-y border-black/10 py-16">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 transparent">
                            <div className="bg-black/5 p-4 rounded-full mb-6">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-black">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-black/60 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function NewsletterSection() {
    return (
        <section className="py-12 relative" data-aos="zoom-in">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto bg-black rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-black/20">
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">Stay Deliciously Updated</h2>
                        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">Subscribe to our newsletter for exclusive discounts, new menu items, and culinary inspiration straight to your inbox.</p>
                        <form className="flex w-full max-w-md items-center space-x-2" aria-label="Subscribe">
                            <Input type="email" placeholder="Enter your email address" className="h-14 rounded-full bg-white/10 border-white/10 text-white placeholder:text-white/40 px-6 focus-visible:ring-1 focus-visible:ring-white/30" />
                            <Button type="button" className="h-14 rounded-full px-8 text-base shadow-xl bg-white hover:bg-white/90 text-black border-0">Subscribe</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
