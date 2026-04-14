"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateMyProfileAction } from "@/actions/user.action";
import { toast } from "sonner";
import { Loader2, Camera } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

export default function SettingsPage() {
    const { user, isLoading: authLoading } = useAuth();
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { images, handleImageUpload, removeImage, isUploading } = useImageUpload();

    useEffect(() => {
         if (user) {
              setName(user.name || "");
         }
    }, [user]);

    const handleUpdate = async () => {
         setSubmitting(true);
         const payload: any = { name };
         if (images.length > 0) {
              payload.image = images[0];
         }

         const res = await updateMyProfileAction(payload);
         if (res.success) {
              toast.success("Profile updated successfully! Refreshing...");
              setTimeout(() => {
                   window.location.reload();
              }, 1000);
         } else {
              toast.error(res.error || "Failed to update profile");
         }
         setSubmitting(false);
    };

    if (authLoading) return <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" /></div>;

    const displayImage = images.length > 0 ? images[0] : (user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=random`);

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground">Manage your personal information and preferences.</p>
            </div>

            <Card>
                 <CardHeader>
                      <CardTitle>Profile Details</CardTitle>
                      <CardDescription>Your identifiable platform profile information.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6 flex flex-col items-center sm:flex-row gap-8">
                       <div className="flex flex-col items-center space-y-4 relative group">
                            <Avatar className="h-32 w-32 shrink-0 border-4 border-muted">
                                 <AvatarImage src={displayImage} className="object-cover" />
                                 <AvatarFallback className="text-4xl">{user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Label className="cursor-pointer">
                                 <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      {isUploading ? <Loader2 className="w-6 h-6 animate-spin text-white" /> : <Camera className="w-8 h-8 text-white" />}
                                 </div>
                                 <Input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])} disabled={isUploading} />
                            </Label>
                       </div>
                       
                       <div className="flex-1 space-y-4 w-full">
                            <div className="space-y-2">
                                 <Label>Full Name</Label>
                                 <Input required value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                 <Label>Email Address</Label>
                                 <Input defaultValue={user?.email} disabled className="bg-muted/50" />
                                 <p className="text-xs text-muted-foreground">Email addresses cannot be changed.</p>
                            </div>
                            <Button className="mt-4" onClick={handleUpdate} disabled={submitting || isUploading}>
                                 {submitting ? "Saving..." : "Update Profile"}
                            </Button>
                       </div>
                 </CardContent>
            </Card>
        </div>
    );
}
