"use client";

import { useForm } from "@tanstack/react-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateCategoryAction } from "@/actions/category.action";
import { usePremiumImageUpload } from "@/hooks/usePremiumImageUpload";
import ImageUploader from "@/components/shared/image/ImageUploader";
import { Tag, ArrowLeft, AlertTriangle } from "lucide-react";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogDescription,
     DialogFooter,
} from "@/components/ui/dialog";

export default function UpdateCategory({ category }: { category: any }) {
     const [loading, setLoading] = useState(false);
     const [showLeaveDialog, setShowLeaveDialog] = useState(false);
     const router = useRouter();

     const categoryImages = usePremiumImageUpload({
          max: 1,
          defaultImages: [category?.image].filter(Boolean) as string[],
     });

     const isDirty = categoryImages.hasPendingDeletes ||
          categoryImages.images[0]?.img !== category?.image;

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
               router.push("/dashboard/categories");
          }
     };

     const handleConfirmLeave = () => {
          categoryImages.discardDeletes();
          setShowLeaveDialog(false);
          router.push("/dashboard/categories");
     };

     const form = useForm({
          defaultValues: {
               name: category.name as string,
               description: category.description as string,
          },
          onSubmit: async ({ value }) => {
               setLoading(true);
               try {
                    const payload = {
                         ...value,
                         image: categoryImages.images[0]?.img ?? null,
                    };
                    const res = await updateCategoryAction(category.id, payload);
                    if (!res?.success) {
                         toast.error(res?.error || "Failed to update category");
                         return;
                    }
                    await categoryImages.commitDeletes();
                    toast.success("Category updated successfully");
                    router.push("/dashboard/categories");
               } catch (err: any) {
                    toast.error(err.message || "Failed to update category");
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
                                   <DialogTitle className="text-lg font-bold">
                                        Discard changes?
                                   </DialogTitle>
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
                    {/* Back nav — uses handleLeave instead of Link */}
                    <div className="mb-6">
                         <button
                              onClick={handleLeave}
                              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors bg-transparent border-0 cursor-pointer"
                         >
                              <ArrowLeft className="h-3.5 w-3.5" />
                              Back to Categories
                         </button>
                    </div>

                    <div className="max-w-2xl mx-auto">
                         {/* Header */}
                         <div className="flex items-center gap-3 mb-6">
                              <div className="h-10 w-10 rounded-xl bg-orange-100 flex items-center justify-center">
                                   <Tag className="h-5 w-5 text-orange-600" />
                              </div>
                              <div>
                                   <h1 className="text-xl font-semibold text-gray-900">Update Category</h1>
                                   <p className="text-sm text-gray-400">
                                        Editing <span className="font-medium text-gray-600">{category.name}</span>
                                   </p>
                              </div>
                         </div>

                         {/* Form Card */}
                         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                              <form
                                   onSubmit={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        form.handleSubmit();
                                   }}
                              >
                                   <div className="p-6 space-y-5">
                                        {/* Name */}
                                        <form.Field
                                             name="name"
                                             validators={{
                                                  onChange: ({ value }) =>
                                                       !value ? "Name is required" : undefined,
                                             }}
                                        >
                                             {(field) => (
                                                  <div className="space-y-1.5">
                                                       <Label className="text-sm font-medium text-gray-700">
                                                            Category Name <span className="text-red-400">*</span>
                                                       </Label>
                                                       <Input
                                                            placeholder="e.g. Desserts, Main Course…"
                                                            value={field.state.value}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className="rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 h-11 bg-gray-50/50"
                                                       />
                                                       {field.state.meta.errors?.length > 0 && (
                                                            <p className="text-red-500 text-xs">{field.state.meta.errors[0]}</p>
                                                       )}
                                                  </div>
                                             )}
                                        </form.Field>

                                        {/* Description */}
                                        <form.Field
                                             name="description"
                                             validators={{
                                                  onChange: ({ value }) =>
                                                       !value ? "Description is required" : undefined,
                                             }}
                                        >
                                             {(field) => (
                                                  <div className="space-y-1.5">
                                                       <Label className="text-sm font-medium text-gray-700">
                                                            Description <span className="text-red-400">*</span>
                                                       </Label>
                                                       <Input
                                                            placeholder="Brief description of this category…"
                                                            value={field.state.value}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            className="rounded-xl border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 h-11 bg-gray-50/50"
                                                       />
                                                       {field.state.meta.errors?.length > 0 && (
                                                            <p className="text-red-500 text-xs">{field.state.meta.errors[0]}</p>
                                                       )}
                                                  </div>
                                             )}
                                        </form.Field>

                                        {/* Image */}
                                        <div className="space-y-1.5">
                                             <Label className="text-sm font-medium text-gray-700">Category Image</Label>
                                             <div className="rounded-xl border border-dashed border-gray-200 overflow-hidden bg-gray-50/50">
                                                  <ImageUploader
                                                       label=""
                                                       images={categoryImages.images}
                                                       onUpload={categoryImages.upload}
                                                       onDelete={categoryImages.remove}
                                                       multiple={false}
                                                  />
                                             </div>
                                        </div>
                                   </div>

                                   {/* Footer */}
                                   <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-3">
                                        <p className="text-xs text-gray-400">
                                             Fields marked with <span className="text-red-400">*</span> are required
                                        </p>
                                        <div className="flex gap-2">
                                             <Button
                                                  type="button"
                                                  variant="outline"
                                                  className="rounded-lg border-gray-200 text-gray-600"
                                                  onClick={handleLeave}
                                             >
                                                  Cancel
                                             </Button>
                                             <Button
                                                  type="submit"
                                                  disabled={loading}
                                                  className="rounded-lg bg-orange-500 hover:bg-orange-600 text-white border-0 px-6 shadow-sm"
                                             >
                                                  {loading ? (
                                                       <span className="flex items-center gap-2">
                                                            <span className="h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                                            Saving…
                                                       </span>
                                                  ) : (
                                                       "Save Changes"
                                                  )}
                                             </Button>
                                        </div>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </>
     );
}
