import { getMyReviewsAction } from "@/actions/review.action";
import { ReviewCard } from "@/components/dashboard/reviews/ReviewCard";
import { Star } from "lucide-react";

export default async function CustomerReviewsPage() {
     const res = await getMyReviewsAction();

     if (!res.success) {
          return (
               <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                    <p className="text-rose-500 font-bold uppercase tracking-widest text-xs">Failed to load reviews</p>
                    <p className="text-slate-400 text-sm">{res.message}</p>
               </div>
          );
     }

     const reviews = res.data;

     return (
          <div className="space-y-8 animate-in fade-in duration-500 pb-12">
               <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900">My Reviews</h1>
                    <p className="text-muted-foreground text-lg">Manage the feedback you've shared on DineWise.</p>
               </div>

               {reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-dashed border-slate-200">
                         <Star className="h-12 w-12 text-slate-200 mb-4" />
                         <p className="text-slate-500 font-medium text-lg">You haven't posted any reviews yet.</p>
                         <p className="text-slate-400 text-sm">Order some delicious dishes to start sharing your feedback!</p>
                    </div>
               ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                         {reviews.map((review: any) => (
                              <ReviewCard 
                                   key={review.id} 
                                   review={review} 
                                   showItemInfo 
                                   canEdit 
                                   canDelete 
                              />
                         ))}
                    </div>
               )}
          </div>
     );
}
