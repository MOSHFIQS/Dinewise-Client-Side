"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateMyProfileAction } from "@/actions/user.action";
import { toast } from "sonner";
import { Loader2, Camera, User as UserIcon, Mail, Phone, Save } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ProfileFormProps {
    user: User | null;
}

export default function ProfileForm({ user }: ProfileFormProps) {
    console.log(user)
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { images, handleImageUpload, isUploading } = useImageUpload();

    console.log(images)

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    const handleUpdate = async () => {
        setSubmitting(true);
        const payload: any = { name, phone };
        if (images.length > 0) {
            payload.image = images?.[0];
        }

        const res = await updateMyProfileAction(payload);
        if (res.success) {
            toast.success("Profile updated successfully!");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            toast.error(res.error || "Failed to update profile");
        }
        setSubmitting(false);
    };

    const displayImage = images.length > 0 ? images[0] : (user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=random`);
    console.log(displayImage)

    return (
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden transition-all hover:shadow-2xl">
            <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent absolute top-0 left-0 right-0 z-0" />
            <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                <CardDescription>View your account details and update your identification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 relative z-10">
                <div className="flex flex-col items-center sm:flex-row gap-8 py-4">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <Avatar className="h-32 w-32 shrink-0 border-4 border-background shadow-2xl relative transition-transform group-hover:scale-[1.02]">
                            <AvatarImage src={displayImage} className="object-cover" />
                            <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">
                                {user?.name?.charAt(0) || <UserIcon className="w-12 h-12" />}
                            </AvatarFallback>
                        </Avatar>
                        <Label className="absolute bottom-1 right-1 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all font-normal z-10">
                            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-5 h-5" />}
                            <Input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                                disabled={isUploading}
                            />
                        </Label>
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-1">
                        <h3 className="text-2xl font-bold capitalize tracking-tight">{user?.name}</h3>
                        <p className="text-muted-foreground uppercase text-[10px] tracking-[0.2em] font-black px-3 py-1 bg-muted/80 rounded-full inline-block">
                            {user?.role}
                        </p>
                        <p className="text-sm text-muted-foreground pt-2">
                            Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                            <UserIcon className="w-4 h-4" /> Full Name
                        </Label>
                        <Input
                            required
                            className="h-11 bg-background/50 border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2 ">
                        <Label className="flex items-center gap-2 text-muted-foreground font-medium">
                            <Phone className="w-4 h-4" /> Phone Number
                        </Label>
                        <Input
                            className="h-11 bg-background/50 border-muted-foreground/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-muted">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Account Details</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            <Mail className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">Email Address</p>
                                <p className="text-sm font-semibold">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                            <UserIcon className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground font-medium text-nowrap">User ID</p>
                                <p className="text-xs font-mono break-all">{user?.id}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-muted">
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">System Information</h4>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium">Account Status</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${user?.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {user?.status}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium">Email Verification</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${user?.isEmailVerified ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {user?.isEmailVerified ? 'Verified' : 'Pending'}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium">Last Login</p>
                            <p className="text-xs font-medium">{user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium">Created On</p>
                            <p className="text-xs font-medium">{user?.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground font-medium">Last Updated</p>
                            <p className="text-xs font-medium">{user?.updatedAt ? new Date(user.updatedAt).toLocaleString() : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <Button
                        size="lg"
                        className="px-10 h-12 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold gap-2 active:scale-95"
                        onClick={handleUpdate}
                        disabled={submitting || isUploading}
                    >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {submitting ? "Saving Changes..." : "Save Changes"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
