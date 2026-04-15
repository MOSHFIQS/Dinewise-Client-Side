"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useImageUpload } from "@/hooks/useImageUpload";
import { getAllCategories } from "@/actions/category.action";
import { FileUp, Trash2, Loader2, UtensilsCrossed, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { apiFetchClient } from "@/lib/api";
import Cookies from "js-cookie";

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

interface EditMenuItemModalProps {
     item: any;
     isOpen: boolean;
     onClose: () => void;
     onSuccess: () => void;
}

export function EditMenuItemModal({ item, isOpen, onClose, onSuccess }: EditMenuItemModalProps) {
     const [categories, setCategories] = useState<any[]>([]);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const { images, handleImageUpload, removeImage, isUploading, setImages } = useImageUpload();

     const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FormData>({
          resolver: zodResolver(itemSchema),
     });

     useEffect(() => {
          if (item) {
               reset({
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    discountPrice: item.discountPrice,
                    stock: item.stock,
                    categoryId: item.categoryId,
                    ingredients: item.ingredients?.join(", "),
               });
               setImages(item.images || []);
          }
     }, [item, reset, setImages]);

     useEffect(() => {
          const fetchCats = async () => {
               try {
                    const res = await getAllCategories();
                    if (res.success && res.data) {
                         const itemsList = res.data;
                         setCategories(itemsList);
                    }
               } catch (error) {
                    console.error("Failed to load categories:", error);
               }
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
               const res = await apiFetchClient(`/menu-item/${item.id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
               });

               if (res.success) {
                    toast.success("Menu item updated successfully!");
                    onSuccess();
                    onClose();
               } else {
                    toast.error(res.message || "Failed to update menu item");
               }
          } catch (error: any) {
               toast.error(error.message || "Failed to update menu item");
          } finally {
               setIsSubmitting(false);
          }
     };

     return (
          <Dialog open={isOpen} onOpenChange={onClose}>
               <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                         <DialogTitle className="text-2xl font-black uppercase tracking-tight">Edit Recipe Details</DialogTitle>
                         <DialogDescription>Modify your culinary creation's attributes and imagery.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                   <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Item Name</Label>
                                        <Input {...register("name")} className="h-12 rounded-xl" />
                                        {errors.name && <p className="text-destructive text-xs font-medium">{errors.name.message}</p>}
                                   </div>

                                   <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</Label>
                                        <Select 
                                             defaultValue={item?.categoryId} 
                                             onValueChange={(val) => setValue("categoryId", val)}
                                        >
                                             <SelectTrigger className="h-12 rounded-xl">
                                                  <SelectValue placeholder="Select category" />
                                             </SelectTrigger>
                                             <SelectContent>
                                                  {categories.map((c) => (
                                                       <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                                  ))}
                                             </SelectContent>
                                        </Select>
                                        {errors.categoryId && <p className="text-destructive text-xs font-medium">{errors.categoryId.message}</p>}
                                   </div>

                                   <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                             <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Base Price</Label>
                                             <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="h-12 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                             <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Stock</Label>
                                             <Input type="number" {...register("stock", { valueAsNumber: true })} className="h-12 rounded-xl" />
                                        </div>
                                   </div>
                              </div>

                              <div className="space-y-4">
                                   <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Description</Label>
                                        <Textarea {...register("description")} className="h-[124px] rounded-xl resize-none" />
                                        {errors.description && <p className="text-destructive text-xs font-medium">{errors.description.message}</p>}
                                   </div>

                                   <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Ingredients (CSV)</Label>
                                        <Input {...register("ingredients")} className="h-12 rounded-xl" placeholder="Flour, Salt, Water..." />
                                   </div>
                              </div>
                         </div>

                         <div className="space-y-3">
                              <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Imagery (Up to 3)</Label>
                              <div className="flex flex-wrap gap-4">
                                   {images.map((url, i) => (
                                        <div key={i} className="relative h-24 w-24 rounded-2xl overflow-hidden group border-2 border-slate-50 shadow-sm bg-muted">
                                             <img src={url} alt="upload" className="w-full h-full object-cover" />
                                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                  <Button type="button" variant="destructive" size="icon" className="h-8 w-8 rounded-lg" onClick={() => removeImage(url)}>
                                                       <Trash2 className="w-4 h-4" />
                                                  </Button>
                                             </div>
                                        </div>
                                   ))}
                                   
                                   {images.length < 3 && (
                                        <Label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                                             {isUploading ? <Loader2 className="w-5 h-5 animate-spin text-primary" /> : <FileUp className="w-5 h-5 text-slate-300 mb-1" />}
                                             <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{isUploading ? 'WAIT' : 'ADD'}</span>
                                             <Input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={isUploading} />
                                        </Label>
                                   )}
                              </div>
                         </div>

                         <DialogFooter className="gap-2 sm:gap-0">
                              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl font-bold uppercase tracking-tight">Cancel</Button>
                              <Button type="submit" disabled={isSubmitting || isUploading} className="rounded-xl px-10 font-black uppercase tracking-tight gap-2 shadow-lg shadow-primary/20">
                                   {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> SAVING...</> : <><Check className="w-4 h-4" /> UPDATE ITEM</>}
                              </Button>
                         </DialogFooter>
                    </form>
               </DialogContent>
          </Dialog>
     );
}

function Check(props: any) {
     return (
          <svg
               {...props}
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="3"
               strokeLinecap="round"
               strokeLinejoin="round"
          >
               <polyline points="20 6 9 17 4 12" />
          </svg>
     );
}
