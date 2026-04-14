"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerAction } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
     
     const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
          resolver: zodResolver(formSchema),
          defaultValues: { role: "CUSTOMER" }
     });

     const onSubmit = async (data: FormData) => {
          setIsLoading(true);
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("email", data.email);
          formData.append("password", data.password);
          formData.append("role", data.role);

          const result = await registerAction(formData);
          
          if (result.success) {
               toast.success("Registration successful!");
               window.location.href = "/dashboard";
          } else {
               toast.error(result.error || "Failed to register");
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
                         <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                         <CardDescription>
                              Join DineWise today and explore premium dining
                         </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              <div className="space-y-2">
                                   <Label htmlFor="name">Full Name</Label>
                                   <Input id="name" placeholder="John Doe" {...register("name")} />
                                   {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                              </div>
                              <div className="space-y-2">
                                   <Label htmlFor="email">Email</Label>
                                   <Input id="email" type="email" placeholder="john@example.com" {...register("email")} />
                                   {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                              </div>
                              <div className="space-y-2">
                                   <Label htmlFor="password">Password</Label>
                                   <Input id="password" type="password" {...register("password")} />
                                   {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                              </div>
                              <div className="space-y-2">
                                   <Label htmlFor="role">Sign up as</Label>
                                   <Select onValueChange={(val) => setValue("role", val as "CUSTOMER" | "CHEF")} defaultValue="CUSTOMER">
                                        <SelectTrigger>
                                             <SelectValue placeholder="Select an account type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                             <SelectItem value="CUSTOMER">Diner (Customer)</SelectItem>
                                             <SelectItem value="CHEF">Chef (Seller)</SelectItem>
                                        </SelectContent>
                                   </Select>
                                   {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
                              </div>
                              <Button type="submit" className="w-full h-11 mt-2" disabled={isLoading}>
                                   {isLoading ? "Creating account..." : "Create Account"}
                              </Button>
                         </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t p-4">
                         <p className="text-sm text-muted-foreground">
                              Already have an account?{" "}
                              <Link href="/login" className="text-primary hover:underline font-medium">
                                   Sign in
                              </Link>
                         </p>
                    </CardFooter>
               </Card>
          </div>
     );
}
