"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, ChefHat, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

const LeafletMap = dynamic(() => import("@/components/shared/LeafletMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full min-h-[380px] bg-black/5 animate-pulse rounded-none flex items-center justify-center">
            <p className="text-black/30 font-bold text-sm uppercase tracking-widest">Loading Map...</p>
        </div>
    ),
});

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        // Simulate sending
        await new Promise((r) => setTimeout(r, 1200));
        toast.success("Message sent! We'll get back to you shortly. 🍴");
        setForm({ name: "", email: "", subject: "", message: "" });
        setLoading(false);
    };

    const contactInfo = [
        {
            icon: <MapPin className="w-5 h-5" />,
            label: "Visit Us",
            value: "123 Culinary Avenue, Food District",
            sub: "New York, NY 10001",
        },
        {
            icon: <Phone className="w-5 h-5" />,
            label: "Call Us",
            value: "+1 (555) 123-4567",
            sub: "Mon–Fri, 9am–9pm EST",
        },
        {
            icon: <Mail className="w-5 h-5" />,
            label: "Email Us",
            value: "hello@dinewise.com",
            sub: "We reply within 24 hours",
        },
        {
            icon: <Clock className="w-5 h-5" />,
            label: "Working Hours",
            value: "Mon – Sun: 10am – 11pm",
            sub: "Kitchen never sleeps",
        },
    ];

    const faqs = [
        { q: "How do I track my order?", a: "Log into your dashboard and visit the Orders section to see real-time status updates." },
        { q: "Can I cancel or modify my order?", a: "Orders can be modified within 5 minutes of placement. Contact us immediately for assistance." },
        { q: "Do you cater for events?", a: "Absolutely! We offer premium catering for corporate events, weddings, and private parties." },
        { q: "How do I become a chef partner?", a: "Apply through our Chef Partner portal. We review all applications within 3 business days." },
    ];

    return (
        <div className="w-full bg-gradient-to-br from-[#eff3e3] via-[#faede0] to-[#fadcc6] min-h-screen text-black">

            {/* Hero Banner */}
            <div className="relative overflow-hidden border-b border-black/5">
                <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black border border-black/10 text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                        <MessageSquare className="w-3 h-3" />
                        Get In Touch
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-none">
                        We'd Love to<br /><span className="italic font-light">Hear From You</span>
                    </h1>
                    <p className="text-black/60 text-lg font-medium max-w-xl mx-auto">
                        Whether it's a question about your order, a catering inquiry, or just to say hi — our team is here for you.
                    </p>
                </div>
            </div>

            {/* Contact Info Cards */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {contactInfo.map((item, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-sm border border-white rounded-[2rem] p-8 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shadow-sm">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">{item.label}</p>
                                <p className="font-black text-black tracking-tight">{item.value}</p>
                                <p className="text-sm text-black/50 font-medium">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Grid: Form + Map */}
                <div className="grid lg:grid-cols-2 gap-12 mb-24">

                    {/* Contact Form */}
                    <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white p-10 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center">
                                <Send className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-black">Send Us a Message</h2>
                                <p className="text-xs text-black/50 font-bold uppercase tracking-widest">We respond within 24 hours</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-black/50">Full Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="h-12 rounded-xl bg-white/60 border border-white/80 focus:border-black/20 focus-visible:ring-0 text-black placeholder:text-black/30"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest text-black/50">Email Address <span className="text-red-500">*</span></Label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="h-12 rounded-xl bg-white/60 border border-white/80 focus:border-black/20 focus-visible:ring-0 text-black placeholder:text-black/30"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-black/50">Subject</Label>
                                <Input
                                    placeholder="Order inquiry, Partnership, Other..."
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    className="h-12 rounded-xl bg-white/60 border border-white/80 focus:border-black/20 focus-visible:ring-0 text-black placeholder:text-black/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest text-black/50">Message <span className="text-red-500">*</span></Label>
                                <Textarea
                                    placeholder="Tell us how we can help you..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={6}
                                    className="rounded-xl bg-white/60 border border-white/80 focus:border-black/20 focus-visible:ring-0 text-black placeholder:text-black/30 resize-none"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 rounded-2xl bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-black/80 transition-all shadow-xl shadow-black/20 border-0 gap-3"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                                ) : (
                                    <span className="flex items-center gap-2">Send Message <ArrowRight className="w-4 h-4" /></span>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Map + Info */}
                    <div className="flex flex-col gap-8">
                        {/* Leaflet Map */}
                        <div className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl flex-1 min-h-[380px] relative">
                            <LeafletMap lat={21.427476} lng={92.003366} label="DineWise Restaurant" />
                            {/* Custom overlay badge */}
                            <div className="absolute top-4 left-4 z-[1000] bg-black text-white px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
                                <MapPin className="w-4 h-4 text-white" />
                                <span className="text-xs font-black uppercase tracking-widest">Cox's Bazar, BD</span>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-black text-white rounded-[2rem] p-8 flex items-center gap-6 shadow-2xl shadow-black/20">
                            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <ChefHat className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1">
                                <p className="font-black text-lg tracking-tight mb-1">Become a Chef</p>
                                <p className="text-white/60 text-sm font-medium">Join our network of culinary artists and start earning.</p>
                            </div>
                            <Link href="/register">
                                <Button className="bg-white text-black hover:bg-white/90 font-black rounded-xl px-5 h-10 border-0 shrink-0">
                                    Join Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-black border border-black/10 text-[10px] font-black uppercase tracking-widest mb-4 shadow-sm">
                            <Star className="w-3 h-3" />
                            Common Questions
                        </div>
                        <h2 className="text-4xl font-black tracking-tight text-black">Frequently Asked</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {faqs.map((faq, i) => (
                            <div key={i} className="bg-white/60 backdrop-blur-sm rounded-[2rem] border border-white p-8 hover:shadow-lg hover:shadow-black/5 transition-all duration-300">
                                <p className="font-black text-black mb-3 tracking-tight">{faq.q}</p>
                                <p className="text-black/60 font-medium text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
