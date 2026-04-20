"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { authService } from "@/service/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
     email: z.string().email("Invalid email address"),
     password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();
     const searchParams = useSearchParams();
     const redirect = searchParams.get("redirect") || "/dashboard";
     const { setCookie } = useAuth();
     
     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
          resolver: zodResolver(formSchema),
     });

     const onSubmit = async (data: FormData) => {
          setIsLoading(true);
          const toastId = toast.loading("Signing in...");
          try {
               const result = await authService.signIn(data);
               
               if (result.success) {
                    setCookie(result.data.user, result.data.token);
                    toast.success("Welcome back!", { id: toastId });
                    router.push(redirect);
                    router.refresh();
               } else {
                    toast.error(result.message || "Invalid credentials", { id: toastId });
               }
          } catch (error: any) {
               toast.error(error.message || "Failed to login", { id: toastId });
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <div className="flex items-center justify-center py-6">
               <Card className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-white/20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                    
                    <CardHeader className="space-y-4 items-center text-center pb-8 pt-10">
                         <Link href="/" className="flex flex-col items-center gap-3 group transition-transform duration-300 hover:scale-105">
                              <Image 
                                   src="/logo.png" 
                                   alt="DineWise Logo" 
                                   width={60} 
                                   height={60} 
                                   className="h-14 w-auto drop-shadow-sm"
                                   priority
                              />
                              <span className="text-3xl font-black tracking-tighter">
                                   Dine<span className="text-primary">Wise</span>
                              </span>
                         </Link>
                         <div className="space-y-1">
                              <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                              <CardDescription className="text-base">
                                   Enter your credentials to continue your culinary journey
                              </CardDescription>
                         </div>
                    </CardHeader>
                    <CardContent className="px-8">
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                              <div className="space-y-2">
                                   <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</Label>
                                   <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        className="h-12 bg-white/50 border-white/40 focus:bg-white transition-all duration-200"
                                        {...register("email")} 
                                   />
                                   {errors.email && <p className="text-xs text-destructive font-medium ml-1">{errors.email.message}</p>}
                              </div>
                              <div className="space-y-2">
                                   <div className="flex items-center justify-between ml-1">
                                        <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                                        {/* <Link href="#" className="text-xs text-primary hover:underline font-bold">Forgot?</Link> */}
                                   </div>
                                   <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="h-12 bg-white/50 border-white/40 focus:bg-white transition-all duration-200"
                                        {...register("password")} 
                                   />
                                   {errors.password && <p className="text-xs text-destructive font-medium ml-1">{errors.password.message}</p>}
                              </div>
                              <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 active:scale-[0.98] group" disabled={isLoading}>
                                   {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                   ) : (
                                        <div className="flex items-center justify-center gap-2">
                                             Sign In <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                   )}
                              </Button>
                         </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 border-t border-white/20 bg-muted/20 p-6">
                         <p className="text-sm text-center text-muted-foreground">
                              Don't have an account?{" "}
                              <Link href="/register" className="text-primary hover:underline font-bold transition-colors">
                                   Create an account
                              </Link>
                         </p>
                    </CardFooter>
               </Card>
          </div>
     );
}
