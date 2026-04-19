"use client";

import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createMenuItemAction } from "@/actions/menuItem.action";
import { usePremiumImageUpload } from "@/hooks/usePremiumImageUpload";
import ImageUploader from "../../shared/image/ImageUploader";
import { useRouter } from "next/navigation";
import { Utensils, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";

export default function CreateMenuItem({ categories }: { categories: any[] }) {
     const [loading, setLoading] = useState(false);
     const itemImages = usePremiumImageUpload({ max: 3 });
     const router = useRouter();

     const form = useForm({
          defaultValues: {
               name: "",
               description: "",
               price: "" as any,
               discountPrice: "" as any,
               stock: 10 as number,
               categoryId: "",
               ingredients: "",
          },
          onSubmit: async ({ value }) => {
               if (itemImages.images.length === 0) {
                    toast.error("Please upload at least one image");
                    return;
               }

               try {
                    setLoading(true);

                    const payload = {
                         name: value.name,
                         description: value.description,
                         price: Number(value.price),
                         discountPrice: value.discountPrice ? Number(value.discountPrice) : null,
                         stock: Number(value.stock),
                         categoryId: value.categoryId,
                         ingredients: value.ingredients,
                         images: itemImages.images.map(img => img.img),
                    };

                    const res = await createMenuItemAction(payload);
                    if (!res?.success) {
                         toast.error(res?.error || "Failed to create item");
                         return;
                    }

                    toast.success("Dish added to your menu!");
                    router.push("/dashboard/menu");
               } catch (err: any) {
                    toast.error(err.message || "Failed to create item");
               } finally {
                    setLoading(false);
               }
          },
     });

     return (
          <div className="min-h-screen bg-gray-50/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
               <div className="mb-6">
                    <Link
                         href="/dashboard/menu"
                         className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors"
                    >
                         <ArrowLeft className="h-3.5 w-3.5" />
                         Back to Kitchen
                    </Link>
               </div>

               <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                         <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                              <Utensils className="h-5 w-5 text-orange-600" />
                         </div>
                         <div>
                              <h1 className="text-xl font-semibold text-gray-900">Add New Dish</h1>
                              <p className="text-sm text-gray-400">Publish a new culinary creation to the marketplace</p>
                         </div>
                    </div>

                    <form
                         onSubmit={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              form.handleSubmit();
                         }}
                         className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                         {/* Left Column: Basic Info */}
                         <div className="lg:col-span-2 space-y-6">
                              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-5">
                                   <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Basic Information</h2>

                                   <form.Field name="name" validators={{ onChange: ({ value }) => !value ? "Name is required" : undefined }}>
                                        {(field) => (
                                             <div className="space-y-1.5">
                                                  <Label className="text-sm font-medium text-gray-700">Dish Name</Label>
                                                  <Input
                                                       placeholder="e.g. Handmade Fettuccine Carbonara"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                       className="rounded-xl border-gray-200 focus:ring-orange-500/20 focus:border-orange-500 h-11 bg-gray-50/50"
                                                  />
                                                  {field.state.meta.errors?.length > 0 && (
                                                       <p className="text-red-500 text-xs">{field.state.meta.errors[0]}</p>
                                                  )}
                                             </div>
                                        )}
                                   </form.Field>

                                   <form.Field name="description" validators={{ onChange: ({ value }) => !value ? "Description is required" : undefined }}>
                                        {(field) => (
                                             <div className="space-y-1.5">
                                                  <Label className="text-sm font-medium text-gray-700">Description</Label>
                                                  <Textarea
                                                       placeholder="Describe the flavors, texture, and preparation…"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                       className="rounded-xl border-gray-200 focus:ring-orange-500/20 focus:border-orange-500 min-h-[120px] bg-gray-50/50 resize-none"
                                                  />
                                                  {field.state.meta.errors?.length > 0 && (
                                                       <p className="text-red-500 text-xs">{field.state.meta.errors[0]}</p>
                                                  )}
                                             </div>
                                        )}
                                   </form.Field>

                                   <form.Field name="ingredients">
                                        {(field) => (
                                             <div className="space-y-1.5">
                                                  <Label className="text-sm font-medium text-gray-700">Ingredients (comma separated)</Label>
                                                  <Input
                                                       placeholder="e.g. Flour, Eggs, Guanciale, Pecorino Romano"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                       className="rounded-xl border-gray-200 focus:ring-orange-500/20 focus:border-orange-500 h-11 bg-gray-50/50"
                                                  />
                                             </div>
                                        )}
                                   </form.Field>
                              </div>

                              {/* Images Section */}
                              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
                                   <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Gallery</h2>
                                   <div className="rounded-2xl border border-dashed border-gray-200 p-4 bg-gray-50/30">
                                        <ImageUploader
                                             images={itemImages.images}
                                             onUpload={itemImages.upload}
                                             onDelete={itemImages.remove}
                                             multiple={true}
                                        />
                                        <p className="text-[10px] text-gray-400 mt-4 text-center">
                                             Upload up to 3 high-quality photos. Recommended size: 1200x800px.
                                        </p>
                                   </div>
                              </div>
                         </div>

                         {/* Right Column: Pricing & Category */}
                         <div className="space-y-6">
                              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-5">
                                   <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Inventory & Category</h2>

                                   <form.Field name="categoryId" validators={{ onChange: ({ value }) => !value ? "Category is required" : undefined }}>
                                        {(field) => (
                                             <div className="space-y-1.5">
                                                  <Label className="text-sm font-medium text-gray-700">Category</Label>
                                                  <Select value={field.state.value} onValueChange={field.handleChange}>
                                                       <SelectTrigger className="rounded-xl border-gray-200 h-11 bg-gray-50/50">
                                                            <SelectValue placeholder="Select category" />
                                                       </SelectTrigger>
                                                       <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                                            {categories.map((c) => (
                                                                 <SelectItem key={c.id} value={c.id} className="rounded-lg">
                                                                      {c.name}
                                                                 </SelectItem>
                                                            ))}
                                                       </SelectContent>
                                                  </Select>
                                                  {field.state.meta.errors?.length > 0 && (
                                                       <p className="text-red-500 text-xs">{field.state.meta.errors[0]}</p>
                                                  )}
                                             </div>
                                        )}
                                   </form.Field>

                                   <form.Field name="stock">
                                        {(field) => (
                                             <div className="space-y-1.5">
                                                  <Label className="text-sm font-medium text-gray-700">Initial Stock</Label>
                                                  <Input
                                                       type="number"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(Number(e.target.value))}
                                                       className="rounded-xl border-gray-200 h-11 bg-gray-50/50"
                                                  />
                                             </div>
                                        )}
                                   </form.Field>
                              </div>

                              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-5">
                                   <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Pricing</h2>

                                   <form.Field name="price" validators={{ onChange: ({ value }) => !value ? "Price is required" : undefined }}>
                                        {(field) => (
                                             <div className="space-y-1.5">
                                                  <Label className="text-sm font-medium text-gray-700">Regular Price ($)</Label>
                                                  <Input
                                                       type="number"
                                                       step="0.01"
                                                       placeholder="0.00"
                                                       value={field.state.value}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                       className="rounded-xl border-gray-200 h-11 bg-gray-50/50 font-mono"
                                                  />
                                                  {field.state.meta.errors?.length > 0 && (
                                                       <p className="text-red-500 text-xs">{field.state.meta.errors[0]}</p>
                                                  )}
                                             </div>
                                        )}
                                   </form.Field>

                                   <form.Field name="discountPrice">
                                        {(field) => (
                                             <div className="space-y-1.5">
                                                  <Label className="text-sm font-medium text-gray-700">Discount Price (Optional)</Label>
                                                  <Input
                                                       type="number"
                                                       step="0.01"
                                                       placeholder="0.00"
                                                       value={field.state.value || ""}
                                                       onChange={(e) => field.handleChange(e.target.value)}
                                                       className="rounded-xl border-gray-200 h-11 bg-gray-50/50 font-mono"
                                                  />
                                             </div>
                                        )}
                                   </form.Field>
                              </div>

                              <Button
                                   type="submit"
                                   disabled={loading}
                                   className="w-full h-12 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg shadow-orange-200 transition-all font-bold tracking-wide"
                              >
                                   {loading ? (
                                        <span className="flex items-center gap-2">
                                             <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                             Publishing...
                                        </span>
                                   ) : (
                                        "Publish Dish"
                                   )}
                              </Button>
                         </div>
                    </form>
               </div>
          </div>
     );
}
