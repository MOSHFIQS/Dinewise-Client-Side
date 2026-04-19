"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { createReviewAction, updateReviewAction } from "@/actions/review.action"

interface ReviewDialogProps {
     isOpen: boolean
     onClose: () => void
     menuItemId: string
     initialData?: {
          id: string
          rating: number
          title?: string
          comment: string
     }
}

export function ReviewDialog({ isOpen, onClose, menuItemId, initialData }: ReviewDialogProps) {
     const [rating, setRating] = useState(initialData?.rating || 0)
     const [hoveredRating, setHoveredRating] = useState(0)
     const [title, setTitle] = useState(initialData?.title || "")
     const [comment, setComment] = useState(initialData?.comment || "")
     const [isSubmitting, setIsSubmitting] = useState(false)

     const handleSubmit = async () => {
          if (rating === 0) {
               toast.error("Please select a rating")
               return
          }
          if (!comment.trim()) {
               toast.error("Please leave a comment")
               return
          }

          setIsSubmitting(true)
          try {
               const payload = { rating, title, comment }
               let res;
               if (initialData?.id) {
                    res = await updateReviewAction(initialData.id, payload, menuItemId)
               } else {
                    res = await createReviewAction(menuItemId, payload)
               }

               if (res.success) {
                    toast.success(res.message)
                    onClose()
               } else {
                    toast.error(res.message)
               }
          } catch (error) {
               toast.error("Something went wrong")
          } finally {
               setIsSubmitting(false)
          }
     }

     return (
          <Dialog open={isOpen} onOpenChange={onClose}>
               <DialogContent className="sm:max-w-[425px] rounded-[2rem]">
                    <DialogHeader>
                         <DialogTitle className="text-2xl font-black">{initialData ? "Edit Review" : "Write a Review"}</DialogTitle>
                         <DialogDescription className="text-slate-500">
                              Share your experience with this dish. Your feedback helps others!
                         </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                         {/* Star Rating */}
                         <div className="flex flex-col items-center gap-2">
                              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Rating</Label>
                              <div className="flex gap-1">
                                   {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                             key={star}
                                             type="button"
                                             onClick={() => setRating(star)}
                                             onMouseEnter={() => setHoveredRating(star)}
                                             onMouseLeave={() => setHoveredRating(0)}
                                             className="p-1 transition-transform hover:scale-125 focus:outline-none"
                                        >
                                             <Star
                                                  className={`h-8 w-8 transition-colors ${
                                                       (hoveredRating || rating) >= star
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-slate-200"
                                                  }`}
                                             />
                                        </button>
                                   ))}
                              </div>
                         </div>

                         <div className="space-y-2">
                              <Label htmlFor="title" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Title (Optional)</Label>
                              <Input
                                   id="title"
                                   placeholder="Summarize your experience..."
                                   value={title}
                                   onChange={(e) => setTitle(e.target.value)}
                                   className="rounded-xl border-slate-100 focus-visible:ring-primary"
                              />
                         </div>

                         <div className="space-y-2">
                              <Label htmlFor="comment" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your Review</Label>
                              <Textarea
                                   id="comment"
                                   placeholder="What did you like or dislike? How was the taste?"
                                   value={comment}
                                   onChange={(e) => setComment(e.target.value)}
                                   className="min-h-[120px] rounded-2xl border-slate-100 focus-visible:ring-primary resize-none"
                              />
                         </div>
                    </div>

                    <DialogFooter>
                         <Button
                              type="button"
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                              className="w-full rounded-2xl h-12 text-sm font-black uppercase tracking-widest"
                         >
                              {isSubmitting ? "Submitting..." : initialData ? "Update Review" : "Post Review"}
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}
