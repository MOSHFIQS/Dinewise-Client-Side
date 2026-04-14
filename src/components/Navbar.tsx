"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, UtensilsCrossed, LogIn, ShoppingCart, LayoutDashboard, Settings, LogOut, Package } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useAuth } from "@/context/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationBell from "./shared/NotificationBell";
import { useCartStore } from "@/lib/cart";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Our Menu", href: "/menu" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch for cart count
  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Dine<span className="text-primary">Wise</span>
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <nav className="flex items-center gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4 border-l pl-6 ml-2">
            <Link href="/cart">
               <Button variant="ghost" size="icon" className="relative hover:text-primary bg-primary/5 hover:bg-primary/10 rounded-full h-10 w-10">
                 <ShoppingCart className="h-5 w-5" />
                 {totalItems > 0 && (
                   <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-background">
                     {totalItems}
                   </span>
                 )}
               </Button>
            </Link>
            
            {user ? (
               <>
                 <NotificationBell />
                 <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <Button variant="ghost" className="relative h-10 w-10 rounded-full focus-visible:ring-0">
                       <Avatar className="h-10 w-10 border-2 border-primary/20">
                         <AvatarImage src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                         <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                       </Avatar>
                     </Button>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent className="w-64 p-2" align="end" sideOffset={8}>
                     <DropdownMenuLabel className="font-normal p-2">
                       <div className="flex flex-col space-y-1">
                         <p className="text-sm font-semibold leading-none">{user.name}</p>
                         <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                         <div className="mt-1">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary uppercase">
                              {user.role}
                            </span>
                         </div>
                       </div>
                     </DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     
                     <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
                       <Link href="/dashboard" className="flex items-center gap-3">
                         <LayoutDashboard className="h-4 w-4 text-primary" />
                         <span>Dashboard</span>
                       </Link>
                     </DropdownMenuItem>

                     {user.role === "CUSTOMER" && (
                       <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
                         <Link href="/dashboard/myOrders" className="flex items-center gap-3">
                           <Package className="h-4 w-4 text-primary" />
                           <span>My Orders</span>
                         </Link>
                       </DropdownMenuItem>
                     )}

                     <DropdownMenuItem asChild className="rounded-lg cursor-pointer py-2.5">
                       <Link href="/dashboard/settings" className="flex items-center gap-3">
                         <Settings className="h-4 w-4 text-primary" />
                         <span>Settings</span>
                       </Link>
                     </DropdownMenuItem>

                     <DropdownMenuSeparator />
                     <DropdownMenuItem onClick={handleLogout} className="rounded-lg text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer py-2.5">
                       <LogOut className="h-4 w-4 mr-3" />
                       <span>Log out</span>
                     </DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
               </>
            ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button variant="ghost" className="rounded-full">Log In</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="rounded-full px-6">Sign Up</Button>
                  </Link>
                </div>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
            <Link href="/cart">
               <Button variant="ghost" size="icon" className="relative">
                 <ShoppingCart className="h-5 w-5" />
                 {totalItems > 0 && (
                   <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-primary-foreground">
                     {totalItems}
                   </span>
                 )}
               </Button>
            </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-xl font-bold mb-8">DineWise</SheetTitle>
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg transition-colors ${
                      pathname === item.href ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="mt-8 pt-8 border-t flex flex-col gap-4">
                  {user ? (
                    <>
                       <div className="flex items-center gap-3 mb-4">
                         <Avatar className="h-12 w-12 border-2 border-primary/20">
                           <AvatarImage src={user.image ?? undefined} />
                           <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                         </Avatar>
                         <div>
                          <p className="font-bold">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                         </div>
                       </div>
                       <Link href="/dashboard" className="w-full">
                         <Button variant="outline" className="w-full justify-start gap-3 h-12 rounded-xl">
                           <LayoutDashboard className="h-5 w-5 text-primary" /> Dashboard
                         </Button>
                       </Link>
                       <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 h-12 text-destructive hover:bg-destructive/10 rounded-xl">
                         <LogOut className="h-5 w-5" /> Log out
                       </Button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link href="/login" className="w-full">
                         <Button variant="outline" className="w-full h-12 rounded-xl">Log In</Button>
                      </Link>
                      <Link href="/register" className="w-full">
                         <Button className="w-full h-12 rounded-xl">Sign Up</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

