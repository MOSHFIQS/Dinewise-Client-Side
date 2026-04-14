"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

const formSchema = z.object({
     email: z.string().email("Invalid email address"),
     password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginForm() {
     const [isLoading, setIsLoading] = useState(false);
     const router = useRouter();
     const { setUser } = useAuth();
     
     const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
          resolver: zodResolver(formSchema),
     });

     const onSubmit = async (data: FormData) => {
          setIsLoading(true);
          const formData = new FormData();
          formData.append("email", data.email);
          formData.append("password", data.password);

          const result = await loginAction(formData);
          
          if (result.success) {
               toast.success("Login successful!");
               // Will refresh Context via routing or full reload.
               window.location.href = "/dashboard";
          } else {
               toast.error(result.error || "Failed to login");
          }
          setIsLoading(false);
     };

     return (
          <div className="flex items-center justify-center min-h-[calc(100vh-100px)] py-12 px-4 sm:px-6 lg:px-8">
               <Card className="w-full max-w-md shadow-xl border-primary/10">
                    <CardHeader className="space-y-1 items-center text-center">
                         <div className="bg-primary/10 p-3 rounded-xl mb-2">
                              <UtensilsCrossed className="h-8 w-8 text-primary" />
                         </div>
                         <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
                         <CardDescription>
                              Enter your credentials to access your account
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div className="space-y-2">
                                   <Label htmlFor="email">Email</Label>
                                   <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                                   {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                              </div>
                              <div className="space-y-2">
                                   <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <Link href="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                                   </div>
                                   <Input id="password" type="password" {...register("password")} />
                                   {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                              </div>
                              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                                   {isLoading ? "Signing in..." : "Sign in"}
                              </Button>
                         </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-4">
                         <p className="text-sm text-muted-foreground">
                              Don't have an account?{" "}
                              <Link href="/register" className="text-primary hover:underline font-medium">
                                   Sign up
                              </Link>
                         </p>
                    </CardFooter>
               </Card>
          </div>
     );
}
