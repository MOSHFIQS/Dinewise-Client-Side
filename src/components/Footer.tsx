import Link from "next/link";
import { Facebook, Twitter, Instagram, MapPin, Mail, Phone, UtensilsCrossed } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 mt-auto">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-5">
                        <Link href="/" className="flex items-center gap-2 text-white">
                            <div className="bg-white p-2 text-black rounded-xl shadow-lg">
                                <UtensilsCrossed className="h-5 w-5 fill-current" />
                            </div>
                            <span className="font-bold text-2xl tracking-tight">Dine<span className="text-white/70">Wise</span></span>
                        </Link>
                        <p className="text-slate-400 max-w-xs leading-relaxed">
                            Experience the finest culinary creations delivered right to your doorstep. Premium food, exceptional service.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 hover:-translate-y-1">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 hover:-translate-y-1">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300 hover:-translate-y-1">
                                <Instagram className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Quick Links</h4>
                        <ul className="space-y-4">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Our Menu", href: "/menu" },
                                { label: "Contact", href: "/contact" },
                                { label: "Testimonials", href: "/#testimonials" },
                            ].map(item => (
                                <li key={item.label}>
                                    <Link href={item.href} className="hover:text-white text-slate-300 transition-colors flex items-center gap-3 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-white transition-colors group-hover:scale-150"></span>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Our Services</h4>
                        <ul className="space-y-4">
                            {["Daily Delivery", "Event Catering", "Private Chef", "Corporate Meals", "Gift Cards"].map(item => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-white text-slate-300 transition-colors flex items-center gap-3 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-white transition-colors group-hover:scale-150"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 tracking-tight">Contact Us</h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 shrink-0">
                                    <MapPin className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm leading-relaxed">123 Culinary Avenue, Food District<br />New York, NY 10001</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 shrink-0">
                                    <Phone className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800 shrink-0">
                                    <Mail className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm">hello@dinewise.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} DineWise Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
