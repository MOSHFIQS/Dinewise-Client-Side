"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useImageUpload } from "@/hooks/useImageUpload";
import { getAllCategories } from "@/actions/category.action";
import { FileUp, Trash2, Loader2, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiFetchClient } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const itemSchema = z.object({
     name: z.string().min(2, "Name must be at least 2 characters"),
     description: z.string().min(10, "Description must be at least 10 characters"),
     price: z.number().min(0.1, "Price must be greater than 0"),
     discountPrice: z.number().optional().nullable(),
     stock: z.number().min(0, "Stock cannot be negative"),
     categoryId: z.string().min(1, "Please select a category"),
     ingredients: z.string().optional(),
});

type FormData = z.infer<typeof itemSchema>;

export default function AddMenuItemPage() {
     const [categories, setCategories] = useState<any[]>([]);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const { images, handleImageUpload, removeImage, isUploading } = useImageUpload();
     const router = useRouter();

     const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
          resolver: zodResolver(itemSchema),
          defaultValues: { stock: 10 }
     });

     useEffect(() => {
          const fetchCats = async () => {
               const res = await getAllCategories();
               if (res.success) setCategories(res.data.data);
          };
          fetchCats();
     }, []);

     const onSubmit = async (data: FormData) => {
          if (images.length === 0) {
               toast.error("Please upload at least one image");
               return;
          }

          setIsSubmitting(true);
          const ingredientsArray = data.ingredients 
               ? data.ingredients.split(",").map(i => i.trim()).filter(Boolean) 
               : [];

          const payload = {
               ...data,
               discountPrice: data.discountPrice || null,
               ingredients: ingredientsArray,
               images,
          };

          try {
               const token = Cookies.get("token");
               const res = await apiFetchClient("/menu-item", {
                    method: "POST",
                    headers: { "Authorization": `Bearer ${token}` },
                    body: JSON.stringify(payload),
               });

               if (res.success) {
                    toast.success("Menu item created successfully!");
                    router.push("/dashboard/myMenu");
               }
          } catch (error: any) {
               toast.error(error.message || "Failed to create menu item");
          } finally {
               setIsSubmitting(false);
          }
     };

     return (
          <div className="max-w-4xl mx-auto space-y-6">
               <div>
                    <h1 className="text-3xl font-bold tracking-tight">Add Menu Item</h1>
                    <p className="text-muted-foreground">Create a new dish to showcase on your menu.</p>
               </div>

               <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                         <CardHeader>
                              <CardTitle>Basic Information</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                              <div className="space-y-2">
                                   <Label>Item Name</Label>
                                   <Input placeholder="e.g. Truffle Mshroom Risotto" {...register("name")} />
                                   {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
                              </div>
                              <div className="space-y-2">
                                   <Label>Description</Label>
                                   <Textarea placeholder="Describe the dish..." className="h-32" {...register("description")} />
                                   {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                        <Label>Category</Label>
                                        <Select onValueChange={(val) => setValue("categoryId", val)}>
                                             <SelectTrigger>
                                                  <SelectValue placeholder="Select category" />
                                             </SelectTrigger>
                                             <SelectContent>
                                                  {categories.map((c) => (
                                                       <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                  ))}
                                             </SelectContent>
                                        </Select>
                                        {errors.categoryId && <p className="text-destructive text-sm">{errors.categoryId.message}</p>}
                                   </div>
                                   <div className="space-y-2">
                                        <Label>Stock Quantity</Label>
                                        <Input type="number" {...register("stock", { valueAsNumber: true })} />
                                        {errors.stock && <p className="text-destructive text-sm">{errors.stock.message}</p>}
                                   </div>
                              </div>
                         </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                              <CardTitle>Pricing & Details</CardTitle>
                         </CardHeader>
                         <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="space-y-2">
                                        <Label>Price ($)</Label>
                                        <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                                        {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
                                   </div>
                                   <div className="space-y-2">
                                        <Label>Discount Price ($) - Optional</Label>
                                        <Input type="number" step="0.01" {...register("discountPrice", { valueAsNumber: true })} />
                                   </div>
                              </div>
                              <div className="space-y-2">
                                   <Label>Ingredients (comma separated)</Label>
                                   <Input placeholder="e.g. Rice, Mushroom, Truffle oil, Parmesan" {...register("ingredients")} />
                              </div>
                         </CardContent>
                    </Card>

                    <Card>
                         <CardHeader>
                              <CardTitle>Images</CardTitle>
                              <CardDescription>Upload up to 3 appetizing images of your dish.</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-6">
                              <div className="flex flex-wrap gap-4">
                                   {images.map((url, i) => (
                                        <div key={i} className="relative h-32 w-32 rounded-xl overflow-hidden group border bg-muted">
                                             <img src={url} alt="upload" className="w-full h-full object-cover" />
                                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                  <Button type="button" variant="destructive" size="icon" onClick={() => removeImage(url)}>
                                                       <Trash2 className="w-4 h-4" />
                                                  </Button>
                                             </div>
                                        </div>
                                   ))}
                                   
                                   {images.length < 3 && (
                                        <Label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                                             {isUploading ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <FileUp className="w-6 h-6 text-muted-foreground mb-2" />}
                                             <span className="text-xs font-medium text-muted-foreground">{isUploading ? 'Uploading...' : 'Add Image'}</span>
                                             <Input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={isUploading} />
                                        </Label>
                                   )}
                              </div>
                         </CardContent>
                    </Card>

                    <Button type="submit" size="lg" className="w-full h-12 text-lg" disabled={isSubmitting || isUploading}>
                         {isSubmitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Publishing Item...</> : <><UtensilsCrossed className="w-5 h-5 mr-2" /> Publish Menu Item</>}
                    </Button>
               </form>
          </div>
     );
}
