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
        <section className="py-24">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
                        <Zap className="w-3 h-3 fill-current" />
                        The Dinewise Edge
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 border-b-4 border-primary/10 inline-block">Why Choose Us?</h2>
                    <p className="text-muted-foreground text-lg italic">We combine culinary excellence with modern technology to bring the restaurant experience to your home.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-100 border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 bg-primary transition-colors duration-500 shadow-inner">
                                {f.icon}
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight uppercase text-slate-800">{f.title}</h3>
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
                const res = await getAllMenuItems({ limit: "4" });
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
        <section className="py-20">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Star className="w-3 h-3 fill-current" />
                            Guest Favorites
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-slate-900 leading-tight">Our Signature Dishes</h2>
                        <p className="text-muted-foreground text-lg">Most loved creations by our community. Try them once and you'll be hooked.</p>
                    </div>
                    <Link href="/menu">
                        <Button variant="outline" className="rounded-full h-12 px-8 font-bold border-2 hover:bg-primary hover:text-white transition-all transform hover:scale-105 active:scale-95">View Full Menu</Button>
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
        <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-primary text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
                            <Utensils className="w-3 h-3" />
                            Community Voice
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight tracking-tight">
                            What Our <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 italic">Customers Say</span>
                        </h2>

                        <div className="space-y-8">
                            {testimonials.map((t, i) => (
                                <div key={i} className="group bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 relative transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20">
                                    <Quote className="absolute top-8 right-10 h-10 w-10 text-primary/10 group-hover:text-primary/20 transition-colors" />
                                    <p className="text-xl mb-8 italic text-slate-300 font-medium leading-relaxed">"{t.text}"</p>
                                    <div className="flex items-center gap-5">
                                        <div className="relative">
                                            <img src={t.avatar} className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 shadow-xl" alt={t.name} />
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-900" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-black tracking-tight">{t.name}</p>
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/5 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                alt="Chef cooking"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />

                            <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                <div className="flex text-yellow-400 mb-4 gap-1">
                                    {[1, 2, 3, 4, 5].map(n => <Star key={n} className="w-5 h-5 fill-current" />)}
                                </div>
                                <p className="text-xl font-black text-white leading-tight mb-2">"Signature Culinary Excellence"</p>
                                <p className="text-slate-400 text-sm font-medium">Join 50,000+ happy food lovers who trust Dinewise.</p>
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
        <section className="relative">
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
        { icon: <ShoppingBag className="h-6 w-6 text-primary" />, title: "Daily Delivery", desc: "Hot, ready-to-eat meals delivered to your home or office on demand." },
        { icon: <Calendar className="h-6 w-6 text-primary" />, title: "Event Catering", desc: "Premium catering services for corporate events, weddings, and parties." },
        { icon: <ChefHat className="h-6 w-6 text-primary" />, title: "Private Chef", desc: "Hire our top chefs for an exclusive, curated dining experience at your home." },
    ];
    return (
        <section className="">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 border-b-4 border-primary/20 inline-block pb-2">Our Premium Services</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((svc, i) => (
                        <div key={i} className="bg-slate-100 p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start gap-4 hover:shadow-xl transition-shadow duration-300">
                            <div className="p-3 bg-primary/10 rounded-xl">{svc.icon}</div>
                            <h3 className="text-xl font-bold">{svc.title}</h3>
                            <p className="text-slate-500">{svc.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function StatisticsSection() {
    const stats = [
        { icon: <Trophy className="h-6 w-6 text-orange-200" />, value: "50+", label: "Award-winning Chefs" },
        { icon: <UsersIcon className="h-6 w-6 text-orange-200" />, value: "100k+", label: "Happy Customers" },
        { icon: <ShoppingBag className="h-6 w-6 text-orange-200" />, value: "500k+", label: "Meals Delivered" },
        { icon: <Heart className="h-6 w-6 text-orange-200" />, value: "4.9/5", label: "Average Rating" },
    ];
    return (
        <section className="py-20 bg-[#0f172b] text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
            <div className="container px-4 mx-auto relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center justify-center p-6 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-sm">
                            <div className="bg-white/10 p-3 rounded-full mb-4">{stat.icon}</div>
                            <div className="text-4xl md:text-5xl font-black tracking-tight mb-2">{stat.value}</div>
                            <div className="text-sm uppercase tracking-widest text-primary-foreground/80 font-semibold">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function NewsletterSection() {
    return (
        <section className="bg-white relative">
            <div className="container px-4 mx-auto">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded p-10 md:p-16 text-center text-white relative overflow-hidden shadow">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary rounded-full blur-[80px] opacity-20"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-20"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                            <Mail className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4">Stay Deliciously Updated</h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">Subscribe to our newsletter for exclusive discounts, new menu items, and culinary inspiration straight to your inbox.</p>
                        <form className="flex w-full max-w-md items-center space-x-2" aria-label="Subscribe">
                            <Input type="email" placeholder="Enter your email address" className="h-14 rounded-full bg-white/10 border-white/20 text-white placeholder:text-slate-400 px-6" />
                            <Button type="button" className="h-14 rounded-full px-8 text-base shadow-xl bg-primary hover:bg-primary/90 text-white border-0">Subscribe</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
