"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authService } from "@/service/auth.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, Loader2, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthProvider";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
     name: z.string().min(2, "Name must be at least 2 characters"),
     email: z.string().email("Invalid email address"),
     password: z.string().min(6, "Password must be at least 6 characters"),
     role: z.enum(["CUSTOMER", "CHEF"]),
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterForm() {
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();
     const searchParams = useSearchParams();
     const redirect = searchParams.get("redirect") || "/dashboard";
     const { setCookie } = useAuth();
     
     const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
          resolver: zodResolver(formSchema),
          defaultValues: { role: "CUSTOMER" }
     });

     const onSubmit = async (data: FormData) => {
          setIsLoading(true);
          const toastId = toast.loading("Creating account...");
          try {
               const result = await authService.signUp({
                    ...data,
                    image: null
               });
               
               if (result.success) {
                    setCookie(result.data.user, result.data.token);
                    toast.success("Account created successfully!", { id: toastId });
                    router.push(redirect);
                    router.refresh();
               } else {
                    toast.error(result.message || "Registration failed", { id: toastId });
               }
          } catch (error: any) {
               toast.error(error.message || "Something went wrong", { id: toastId });
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
                              <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                              <CardDescription className="text-base text-center">
                                   Join DineWise today and explore premium dining
                              </CardDescription>
                         </div>
                    </CardHeader>
                    <CardContent className="px-8">
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                   <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Name</Label>
                                        <Input 
                                             id="name" 
                                             placeholder="John Doe" 
                                             className="h-11 bg-white/50 border-white/40 focus:bg-white transition-all duration-200"
                                             {...register("name")} 
                                        />
                                        {errors.name && <p className="text-xs text-destructive font-medium ml-1">{errors.name.message}</p>}
                                   </div>
                                   <div className="space-y-2">
                                        <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Sign up as</Label>
                                        <Select onValueChange={(val) => setValue("role", val as "CUSTOMER" | "CHEF")} defaultValue="CUSTOMER">
                                             <SelectTrigger className="h-11 bg-white/50 border-white/40 focus:bg-white">
                                                  <SelectValue placeholder="Select type" />
                                             </SelectTrigger>
                                             <SelectContent>
                                                  <SelectItem value="CUSTOMER">Diner</SelectItem>
                                                  <SelectItem value="CHEF">Chef</SelectItem>
                                             </SelectContent>
                                        </Select>
                                        {errors.role && <p className="text-xs text-destructive font-medium ml-1">{errors.role.message}</p>}
                                   </div>
                              </div>
                              <div className="space-y-2">
                                   <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Email Address</Label>
                                   <Input 
                                        id="email" 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        className="h-11 bg-white/50 border-white/40 focus:bg-white transition-all duration-200"
                                        {...register("email")} 
                                   />
                                   {errors.email && <p className="text-xs text-destructive font-medium ml-1">{errors.email.message}</p>}
                              </div>
                              <div className="space-y-2">
                                   <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Password</Label>
                                   <Input 
                                        id="password" 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="h-11 bg-white/50 border-white/40 focus:bg-white transition-all duration-200"
                                        {...register("password")} 
                                   />
                                   {errors.password && <p className="text-xs text-destructive font-medium ml-1">{errors.password.message}</p>}
                              </div>
                              <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 active:scale-[0.98] group mt-2" disabled={isLoading}>
                                   {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                   ) : (
                                        <div className="flex items-center justify-center gap-2">
                                             Create Account <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                   )}
                              </Button>
                         </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 border-t border-white/20 bg-muted/20 p-6">
                         <p className="text-sm text-center text-muted-foreground">
                              Already have an account?{" "}
                              <Link href="/login" className="text-primary hover:underline font-bold transition-colors">
                                   Sign in here
                              </Link>
                         </p>
                    </CardFooter>
               </Card>
          </div>
     );
}
