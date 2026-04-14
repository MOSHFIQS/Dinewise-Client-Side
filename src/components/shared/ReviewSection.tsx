"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/context/AuthProvider";
import { getReviewsAction, createReviewAction, deleteReviewAction } from "@/actions/review.action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Star, Trash2, Send, MessageSquare, ShieldCheck, Heart } from "lucide-react";

const reviewSchema = z.object({
     rating: z.number().min(1).max(5),
     comment: z.string().min(5, "Comment must be at least 5 characters"),
});

type FormData = z.infer<typeof reviewSchema>;

export default function ReviewSection({ menuItemId }: { menuItemId: string }) {
     const { user } = useAuth();
     const [reviews, setReviews] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [isSubmitting, setIsSubmitting] = useState(false);
     
     const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
          resolver: zodResolver(reviewSchema),
          defaultValues: { rating: 5, comment: "" }
     });

     const currentRating = watch("rating");

     const fetchReviews = async () => {
          setLoading(true);
          const result = await getReviewsAction(menuItemId);
          if (result.success) {
               setReviews(result.data.data);
          }
          setLoading(false);
     };

     useEffect(() => {
          fetchReviews();
     }, [menuItemId]);

     const onSubmit = async (data: FormData) => {
          setIsSubmitting(true);
          const result = await createReviewAction(menuItemId, data);
          if (result.success) {
               toast.success("Experience shared successfully! 🌟");
               reset({ rating: 5, comment: "" });
               fetchReviews();
          } else {
               toast.error(result.error || "Failed to submit review");
          }
          setIsSubmitting(false);
     };

     const handleDelete = async (id: string) => {
          if (!confirm("Remove this review permanently?")) return;
          const result = await deleteReviewAction(id);
          if (result.success) {
               toast.success("Review removed.");
               fetchReviews();
          } else {
               toast.error(result.error);
          }
     };

     return (
          <div className="grid lg:grid-cols-12 gap-12">
               {/* Left: Input Form */}
               <div className="lg:col-span-5">
                    {user && (user.role === "CUSTOMER" || user.role === "ADMIN") ? (
                         <div className="sticky top-24">
                              <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-xl shadow-slate-100/50">
                                   <div className="flex items-center gap-3 mb-6">
                                        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                             <MessageSquare className="w-5 h-5 text-primary" />
                                        </div>
                                        <h4 className="text-xl font-black tracking-tight">Share Your Experience</h4>
                                   </div>

                                   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        <div className="space-y-2">
                                             <p className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Your Rating</p>
                                             <div className="flex gap-2">
                                                  {[1, 2, 3, 4, 5].map((star) => (
                                                       <button
                                                            key={star}
                                                            type="button"
                                                            className="transition-all hover:scale-125 focus:outline-none"
                                                            onClick={() => setValue("rating", star)}
                                                       >
                                                            <Star 
                                                                 className={`w-8 h-8 ${currentRating >= star ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`} 
                                                            />
                                                       </button>
                                                  ))}
                                             </div>
                                        </div>

                                        <div className="space-y-2">
                                             <p className="text-xs font-black uppercase text-slate-400 tracking-widest pl-1">Detailed Feedback</p>
                                             <Textarea 
                                                  placeholder="Tell us about the flavors, presentation, and service..." 
                                                  {...register("comment")}
                                                  className="resize-none min-h-[160px] rounded-2xl border-2 border-slate-50 focus:border-primary/20 focus:ring-primary/5 p-4 text-base"
                                             />
                                             {errors.comment && <p className="text-destructive text-sm font-medium px-1 pt-1">{errors.comment.message}</p>}
                                        </div>
                                        
                                        <Button 
                                             type="submit" 
                                             disabled={isSubmitting}
                                             className="w-full h-14 rounded-2xl font-black text-lg gap-3 shadow-lg shadow-primary/20 group"
                                        >
                                             {isSubmitting ? "PUBLISHING..." : (
                                                  <>
                                                       SUBMIT REVIEW
                                                       <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                  </>
                                             )}
                                        </Button>
                                   </form>
                              </div>
                         </div>
                    ) : (
                         <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-[2rem] text-center">
                              <Star className="w-12 h-12 text-slate-300 mx-auto mb-4 opacity-30" />
                              <h4 className="font-black text-lg mb-2 uppercase tracking-tight">Authentic Reviews Only</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                   To maintain the integrity of our platform, only verified customers can share their experiences.
                              </p>
                              <Button variant="outline" className="rounded-xl px-10 h-12 border-2" onClick={() => window.location.href = "/login"}>
                                   LOG IN TO REVIEW
                              </Button>
                         </div>
                    )}
               </div>

               {/* Right: Review List */}
               <div className="lg:col-span-7 space-y-6">
                    {loading ? (
                         <div className="space-y-4">
                              {[1, 2, 3].map(i => (
                                   <div key={i} className="h-40 bg-slate-50 animate-pulse rounded-[2rem]" />
                              ))}
                         </div>
                    ) : reviews.length === 0 ? (
                         <div className="h-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed">
                              <Heart className="w-16 h-16 text-slate-200 mb-4" />
                              <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Be the First to Review</p>
                         </div>
                    ) : (
                         <div className="space-y-6">
                              {reviews.map((review) => (
                                   <div key={review.id} className="relative group bg-white p-6 rounded-[2rem] border-2 border-slate-50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all">
                                        <div className="flex gap-5">
                                             <Avatar className="h-14 w-14 rounded-2xl border-2 border-white shadow-md">
                                                  <AvatarImage src={`https://ui-avatars.com/api/?name=${review.user.name}&background=random`} />
                                                  <AvatarFallback className="font-black">{review.user.name.charAt(0)}</AvatarFallback>
                                             </Avatar>
                                             
                                             <div className="flex-1 space-y-1">
                                                  <div className="flex items-center justify-between">
                                                       <div>
                                                            <div className="flex items-center gap-2">
                                                                 <h4 className="font-black text-slate-800 uppercase tracking-tight">{review.user.name}</h4>
                                                                 <ShieldCheck className="w-4 h-4 text-green-500" />
                                                            </div>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                                 Verified Experience • {new Date(review.createdAt).toLocaleDateString()}
                                                            </p>
                                                       </div>
                                                       
                                                       {user && (user.id === review.userId || user.role === "ADMIN") && (
                                                            <Button 
                                                                 variant="ghost" 
                                                                 size="icon" 
                                                                 className="h-10 w-10 text-slate-300 hover:text-destructive hover:bg-destructive/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" 
                                                                 onClick={() => handleDelete(review.id)}
                                                            >
                                                                 <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                       )}
                                                  </div>

                                                  <div className="flex gap-0.5 pt-2 pb-3">
                                                       {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star 
                                                                 key={star} 
                                                                 className={`w-3.5 h-3.5 ${review.rating >= star ? "fill-yellow-400 text-yellow-400" : "text-slate-100"}`} 
                                                            />
                                                       ))}
                                                  </div>

                                                  <p className="text-slate-600 text-base leading-relaxed pl-1 border-l-2 border-slate-100">
                                                       {review.comment}
                                                  </p>
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
                    
                    {!loading && reviews.length > 0 && (
                         <div className="pt-4 text-center">
                              <Button variant="ghost" className="text-slate-400 font-bold uppercase tracking-tight text-xs hover:text-primary">
                                   Load More Experiences
                              </Button>
                         </div>
                    )}
               </div>
          </div>
     );
}

