"use client"

import { useState } from "react"
import { Star, Edit2, Trash2, User, Clock, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { deleteReviewAction } from "@/actions/review.action"
import { toast } from "sonner"
import { ReviewDialog } from "./ReviewDialog"

interface ReviewCardProps {
     review: any
     showItemInfo?: boolean
     showUser?: boolean
     canEdit?: boolean
     canDelete?: boolean
}

export function ReviewCard({ review, showItemInfo, showUser, canEdit, canDelete }: ReviewCardProps) {
     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
     const [isDeleting, setIsDeleting] = useState(false)

     const handleDelete = async () => {
          if (!confirm("Are you sure you want to delete this review?")) return

          setIsDeleting(true)
          try {
               const res = await deleteReviewAction(review.id)
               if (res.success) {
                    toast.success(res.message)
               } else {
                    toast.error(res.message)
               }
          } catch (error) {
               toast.error("Failed to delete review")
          } finally {
               setIsDeleting(false)
          }
     }

     return (
          <>
               <Card className="overflow-hidden border-slate-50 bg-white/50 backdrop-blur-sm rounded-3xl hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                         <div className="flex flex-col gap-4">
                              {/* Header: User Info or Item Info */}
                              <div className="flex items-start justify-between gap-4">
                                   <div className="flex items-center gap-3">
                                        {showUser && (
                                             <Avatar className="h-10 w-10 border-2 border-slate-100">
                                                  <AvatarImage src={review.user?.image} />
                                                  <AvatarFallback className="bg-primary/10 text-primary font-black">
                                                       {review.user?.name?.[0].toUpperCase() || "U"}
                                                  </AvatarFallback>
                                             </Avatar>
                                        )}
                                        {showItemInfo && review.menuItem && (
                                             <div className="h-10 w-10 rounded-xl overflow-hidden border border-slate-100">
                                                  <img 
                                                       src={review.menuItem.images?.[0] || "/placeholder.png"} 
                                                       alt={review.menuItem.name}
                                                       className="h-full w-full object-cover"
                                                  />
                                             </div>
                                        )}
                                        <div>
                                             <div className="flex items-center gap-2">
                                                  <span className="font-black text-slate-900 line-clamp-1">
                                                       {showUser ? review.user?.name : review.menuItem?.name}
                                                  </span>
                                                  {review.isVerifiedPurchase && (
                                                       <Badge variant="secondary" className="h-5 px-1.5 bg-emerald-50 text-emerald-600 border-none flex items-center gap-1">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            <span className="text-[8px] font-black uppercase tracking-tight">Verified</span>
                                                       </Badge>
                                                  )}
                                             </div>
                                             <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                  <Clock className="h-3 w-3" />
                                                  {format(new Date(review.createdAt), "MMM d, yyyy")}
                                             </div>
                                        </div>
                                   </div>

                                   <div className="flex gap-2">
                                        {canEdit && (
                                             <Button 
                                                  variant="ghost" 
                                                  size="icon" 
                                                  onClick={() => setIsEditDialogOpen(true)}
                                                  className="h-8 w-8 rounded-full text-slate-400 hover:text-primary hover:bg-primary/5"
                                             >
                                                  <Edit2 className="h-4 w-4" />
                                             </Button>
                                        )}
                                        {canDelete && (
                                             <Button 
                                                  variant="ghost" 
                                                  size="icon" 
                                                  onClick={handleDelete}
                                                  disabled={isDeleting}
                                                  className="h-8 w-8 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                                             >
                                                  <Trash2 className="h-4 w-4" />
                                             </Button>
                                        )}
                                   </div>
                              </div>

                              {/* Rating & Content */}
                              <div className="space-y-3">
                                   <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                             <Star 
                                                  key={star} 
                                                  className={`h-4 w-4 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} 
                                             />
                                        ))}
                                   </div>

                                   <div>
                                        {review.title && (
                                             <h4 className="text-sm font-black text-slate-900 mb-1">{review.title}</h4>
                                        )}
                                        <p className="text-sm text-slate-600 leading-relaxed italic truncate-3-lines">
                                             "{review.comment}"
                                        </p>
                                   </div>
                              </div>
                         </div>
                    </CardContent>
               </Card>

               {canEdit && (
                    <ReviewDialog 
                         isOpen={isEditDialogOpen}
                         onClose={() => setIsEditDialogOpen(false)}
                         menuItemId={review.menuItemId}
                         initialData={{
                              id: review.id,
                              rating: review.rating,
                              title: review.title,
                              comment: review.comment
                         }}
                    />
               )}
          </>
     )
}
