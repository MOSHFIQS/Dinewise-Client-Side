"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { checkReviewEligibilityAction, getMenuItemReviewsAction } from "@/actions/review.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, MessageSquare, Heart, Lock } from "lucide-react";
import { ReviewCard } from "../dashboard/reviews/ReviewCard";
import { ReviewDialog } from "../dashboard/reviews/ReviewDialog";

export default function ReviewSection({ menuItemId }: { menuItemId: string }) {
     const { user } = useAuth();
     const [reviews, setReviews] = useState<any[]>([]);
     const [loading, setLoading] = useState(true);
     const [eligibility, setEligibility] = useState<{ canReview: boolean; reason: string | null }>({ 
          canReview: false, 
          reason: "Loading eligibility..." 
     });
     const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

     const fetchReviews = async () => {
          setLoading(true);
          try {
               const res = await getMenuItemReviewsAction(menuItemId);
               if (res.success) {
                    setReviews(res.data);
               }
          } catch (error) {
               console.error("Failed to fetch reviews");
          } finally {
               setLoading(false);
          }
     };

     const checkEligibility = async () => {
          if (!user || user.role !== "CUSTOMER") return;
          const res = await checkReviewEligibilityAction(menuItemId);
          if (res.success) {
               setEligibility(res.data);
          }
     };

     useEffect(() => {
          fetchReviews();
          checkEligibility();
     }, [menuItemId, user]);

     return (
          <div className="grid lg:grid-cols-12 gap-12">
               {/* Left: Info & Action */}
               <div className="lg:col-span-4">
                    <div className="sticky top-24 space-y-6">
                         <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-50 shadow-xl shadow-slate-100/50">
                              <div className="flex items-center gap-3 mb-6">
                                   <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                   </div>
                                   <h4 className="text-xl font-black tracking-tight">Guest Reviews</h4>
                              </div>

                              {user ? (
                                   <div className="space-y-4">
                                        {user.role === "CUSTOMER" ? (
                                             <>
                                                  {eligibility.canReview ? (
                                                       <div className="space-y-4">
                                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                                 Your order was delivered! How was the taste? Share your culinary experience with the community.
                                                            </p>
                                                            <Button 
                                                                 onClick={() => setIsReviewDialogOpen(true)}
                                                                 className="w-full h-14 rounded-2xl font-black text-lg gap-3 shadow-lg shadow-primary/20 group"
                                                            >
                                                                 WRITE A REVIEW
                                                            </Button>
                                                       </div>
                                                  ) : (
                                                       <div className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-2xl border border-dashed text-center">
                                                            <Lock className="h-6 w-6 text-slate-300" />
                                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                                                 {eligibility.reason || "Review locked"}
                                                            </p>
                                                       </div>
                                                  )}
                                             </>
                                        ) : (
                                             <div className="p-6 bg-slate-50 rounded-2xl border border-dashed text-center">
                                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                       Logged in as {user.role}
                                                  </p>
                                             </div>
                                        )}
                                   </div>
                              ) : (
                                   <div className="space-y-6">
                                        <p className="text-sm text-slate-500 leading-relaxed italic">
                                             "To maintain our standards of authenticity, only verified guests can share their experiences."
                                        </p>
                                        <Button 
                                             variant="outline" 
                                             className="w-full h-12 rounded-xl border-2 font-black uppercase tracking-tighter"
                                             onClick={() => window.location.href = "/login"}
                                        >
                                             Login to Review
                                        </Button>
                                   </div>
                              )}
                         </div>
                    </div>
               </div>

               {/* Right: Review List */}
               <div className="lg:col-span-8 space-y-6">
                    {loading ? (
                         <div className="space-y-4">
                              {[1, 2, 3].map(i => (
                                   <div key={i} className="h-32 bg-slate-50 animate-pulse rounded-[2rem]" />
                              ))}
                         </div>
                    ) : reviews.length === 0 ? (
                         <div className="h-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed">
                              <Heart className="w-16 h-16 text-slate-200 mb-4" />
                              <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Be the First to Review</p>
                         </div>
                    ) : (
                         <div className="grid gap-6">
                              {reviews.map((review) => (
                                   <ReviewCard 
                                        key={review.id} 
                                        review={review} 
                                        showUser 
                                        canDelete={user?.role === "ADMIN" || user?.id === review.userId}
                                   />
                              ))}
                         </div>
                    )}
               </div>

               <ReviewDialog 
                    isOpen={isReviewDialogOpen}
                    onClose={() => {
                         setIsReviewDialogOpen(false);
                         fetchReviews();
                         checkEligibility();
                    }}
                    menuItemId={menuItemId}
               />
          </div>
     );
}
