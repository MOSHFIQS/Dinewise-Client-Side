"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateMenuItemAction } from "@/actions/menuItem.action";
import { usePremiumImageUpload } from "@/hooks/usePremiumImageUpload";
import ImageUploader from "@/components/shared/image/ImageUploader";
import { Utensils, ArrowLeft, AlertTriangle } from "lucide-react";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogDescription,
     DialogFooter,
} from "@/components/ui/dialog";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function UpdateMenuItem({ item, categories }: { item: any; categories: any[] }) {
     const [loading, setLoading] = useState(false);
     const [showLeaveDialog, setShowLeaveDialog] = useState(false);
     const router = useRouter();

     const itemImages = usePremiumImageUpload({
          max: 3,
          defaultImages: item.images || [],
     });

     const isDirty = itemImages.hasPendingDeletes || 
                    JSON.stringify(itemImages.images.map(i => i.img)) !== JSON.stringify(item.images);

     // Block refresh / tab close
     useEffect(() => {
          if (!isDirty) return;
          const handler = (e: BeforeUnloadEvent) => {
               e.preventDefault();
               e.returnValue = "";
          };
          window.addEventListener("beforeunload", handler);
          return () => window.removeEventListener("beforeunload", handler);
     }, [isDirty]);

     const handleLeave = () => {
          if (isDirty) {
               setShowLeaveDialog(true);
          } else {
               router.push("/dashboard/menu");
          }
     };

     const handleConfirmLeave = () => {
          itemImages.discardDeletes();
          setShowLeaveDialog(false);
          router.push("/dashboard/menu");
     };

     const form = useForm({
          defaultValues: {
               name: item.name as string,
               description: item.description as string,
               price: item.price as any,
               discountPrice: item.discountPrice as any,
               stock: item.stock as number,
               categoryId: item.categoryId as string,
               ingredients: Array.isArray(item.ingredients) ? item.ingredients.join(", ") : (item.ingredients || "") as string,
          },
          onSubmit: async ({ value }) => {
               setLoading(true);
               try {
                    const payload = {
                         ...value,
                         price: Number(value.price),
                         discountPrice: value.discountPrice ? Number(value.discountPrice) : null,
                         stock: Number(value.stock),
                         ingredients: value.ingredients,
                         images: itemImages.images.map(img => img.img),
                    };

                    const res = await updateMenuItemAction(item.id, payload);
                    if (!res?.success) {
                         toast.error(res?.error || "Failed to update item");
                         return;
                    }
                    await itemImages.commitDeletes();
                    toast.success("Dish updated successfully");
                    router.push("/dashboard/menu");
               } catch (err: any) {
                    toast.error(err.message || "Failed to update item");
               } finally {
                    setLoading(false);
               }
          },
     });

     return (
          <>
               {/* Leave confirmation dialog */}
               <Dialog open={showLeaveDialog} onOpenChange={setShowLeaveDialog}>
                    <DialogContent className="max-w-sm rounded-2xl p-6">
                         <DialogHeader>
                              <div className="flex items-center gap-3 mb-2">
                                   <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                                   </div>
                                   <DialogTitle className="text-lg font-bold">Discard changes?</DialogTitle>
                              </div>
                              <DialogDescription className="text-sm text-gray-500 leading-relaxed">
                                   You have unsaved changes. If you leave now, any uploaded or removed images will not be saved.
                              </DialogDescription>
                         </DialogHeader>
                         <DialogFooter className="flex gap-2 mt-4">
                              <Button
                                   variant="outline"
                                   className="flex-1 rounded-xl"
                                   onClick={() => setShowLeaveDialog(false)}
                              >
                                   Stay
                              </Button>
                              <Button
                                   className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 text-white border-0 shadow-sm"
                                   onClick={handleConfirmLeave}
                              >
                                   Discard & Leave
                              </Button>
                         </DialogFooter>
                    </DialogContent>
               </Dialog>

               <div className="min-h-screen bg-gray-50/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="mb-6">
                         <button 
                              onClick={handleLeave}
                              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors bg-transparent border-0 cursor-pointer"
                         >
                              <ArrowLeft className="h-3.5 w-3.5" />
                              Back to Kitchen
                         </button>
                    </div>

                    <div className="max-w-4xl mx-auto">
                         <div className="flex items-center gap-3 mb-6">
                              <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                   <Utensils className="h-5 w-5 text-orange-600" />
                              </div>
                              <div>
                                   <h1 className="text-xl font-semibold text-gray-900">Update Dish</h1>
                                   <p className="text-sm text-gray-400">Editing <span className="font-medium text-gray-600">{item.name}</span></p>
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
                              {/* Left Column */}
                              <div className="lg:col-span-2 space-y-6">
                                   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-5">
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Basic Information</h2>
                                        
                                        <form.Field name="name" validators={{ onChange: ({ value }) => !value ? "Name is required" : undefined }}>
                                             {(field) => (
                                                  <div className="space-y-1.5">
                                                       <Label className="text-sm font-medium text-gray-700">Dish Name</Label>
                                                       <Input
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
                                                       <Label className="text-sm font-medium text-gray-700">Ingredients</Label>
                                                       <Input
                                                            value={field.state.value}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className="rounded-xl border-gray-200 focus:ring-orange-500/20 focus:border-orange-500 h-11 bg-gray-50/50"
                                                       />
                                                  </div>
                                             )}
                                        </form.Field>
                                   </div>

                                   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Gallery</h2>
                                        <div className="rounded-2xl border border-dashed border-gray-200 p-4 bg-gray-50/30">
                                             <ImageUploader
                                                  images={itemImages.images}
                                                  onUpload={itemImages.upload}
                                                  onDelete={itemImages.remove}
                                                  multiple={true}
                                             />
                                        </div>
                                   </div>
                              </div>

                              {/* Right Column */}
                              <div className="space-y-6">
                                   <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-5">
                                        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">Inventory & Category</h2>
                                        
                                        <form.Field name="categoryId">
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
                                                  </div>
                                             )}
                                        </form.Field>

                                        <form.Field name="stock">
                                             {(field) => (
                                                  <div className="space-y-1.5">
                                                       <Label className="text-sm font-medium text-gray-700">Stock Units</Label>
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
                                        
                                        <form.Field name="price">
                                             {(field) => (
                                                  <div className="space-y-1.5">
                                                       <Label className="text-sm font-medium text-gray-700">Regular Price ($)</Label>
                                                       <Input
                                                            type="number"
                                                            step="0.01"
                                                            value={field.state.value}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className="rounded-xl border-gray-200 h-11 bg-gray-50/50 font-mono"
                                                       />
                                                  </div>
                                             )}
                                        </form.Field>

                                        <form.Field name="discountPrice">
                                             {(field) => (
                                                  <div className="space-y-1.5">
                                                       <Label className="text-sm font-medium text-gray-700">Discount Price ($)</Label>
                                                       <Input
                                                            type="number"
                                                            step="0.01"
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
                                                  Saving...
                                             </span>
                                        ) : (
                                             "Save Changes"
                                        )}
                                   </Button>
                              </div>
                         </form>
                    </div>
               </div>
          </>
     );
}
