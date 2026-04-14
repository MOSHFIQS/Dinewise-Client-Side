"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, UtensilsCrossed, LogIn, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { useAuth } from "@/context/AuthProvider";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Our Menu", href: "/menu" },
  { name: "Our Shop", href: "/ourShop" },
];

export default function Navbar() {
  const { user, logOut } = useAuth();
  const pathname = usePathname();

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
                 <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground border-2 border-background">
                   0
                 </span>
               </Button>
            </Link>
            {user ? (
               <DropdownMenu>
                 <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                     <Avatar className="h-10 w-10 border-2 border-primary/20">
                       <AvatarImage src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                       <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                     </Avatar>
                   </Button>
                 </DropdownMenuTrigger>
                 <DropdownMenuContent className="w-56" align="end" forceMount>
                   <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                       <p className="text-sm font-medium leading-none">{user.name}</p>
                       <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                     </div>
                   </DropdownMenuLabel>
                   <DropdownMenuSeparator />
                   <DropdownMenuItem asChild>
                     <Link href="/dashboard" className="cursor-pointer">Dashboard</Link>
                   </DropdownMenuItem>
                   <DropdownMenuItem onClick={logOut} className="text-destructive cursor-pointer">
                     Log out
                   </DropdownMenuItem>
                 </DropdownMenuContent>
               </DropdownMenu>
            ) : (
                <Link href="/login">
                  <Button className="rounded-full px-6">
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Button>
                </Link>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center gap-4">
           {user && (
            <Link href="/cart">
               <Button variant="ghost" size="icon" className="relative hover:text-primary">
                 <ShoppingCart className="h-5 w-5" />
               </Button>
            </Link>
           )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav className="flex flex-col gap-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="mt-4 pt-6 border-t flex flex-col gap-4">
                  {user ? (
                    <>
                       <div className="flex items-center gap-3">
                         <Avatar className="h-10 w-10">
                           <AvatarImage src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`} />
                           <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                         </Avatar>
                         <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                         </div>
                       </div>
                       <Link href="/dashboard" className="w-full">
                         <Button variant="outline" className="w-full justify-start">Dashboard</Button>
                       </Link>
                       <Button variant="destructive" onClick={logOut} className="w-full justify-start">Log out</Button>
                    </>
                  ) : (
                    <Link href="/login" className="w-full">
                       <Button className="w-full"><LogIn className="mr-2 h-4 w-4" /> Sign In</Button>
                    </Link>
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
