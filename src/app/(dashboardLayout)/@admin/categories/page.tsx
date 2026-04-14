"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllCategories, createCategoryAction, deleteCategoryAction } from "@/actions/category.action";
import { Label } from "@/components/ui/label";

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", description: "" });

    const fetchCats = async () => {
        setLoading(true);
        const res = await getAllCategories();
        if (res.success) setCategories(res.data.data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
         e.preventDefault();
         setIsCreating(true);
         const res = await createCategoryAction(formData);
         if (res.success) {
              toast.success("Category created");
              setOpen(false);
              setFormData({ name: "", description: "" });
              fetchCats();
         } else {
              toast.error(res.error || "Failed to create category");
         }
         setIsCreating(false);
    };

    const handleDelete = async (id: string) => {
         if (!confirm("Delete this category? Items under this category might lose their association.")) return;
         const res = await deleteCategoryAction(id);
         if (res.success) {
              toast.success("Category deleted");
              fetchCats();
         } else {
              toast.error(res.error || "Failed to delete");
         }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Menu Categories</h1>
                    <p className="text-muted-foreground">Manage classification groupings for items.</p>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                     <DialogTrigger asChild>
                          <Button><Plus className="w-4 h-4 mr-2" /> Add Category</Button>
                     </DialogTrigger>
                     <DialogContent>
                          <DialogHeader>
                               <DialogTitle>Create New Category</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreate} className="space-y-4 pt-4">
                               <div className="space-y-2">
                                    <Label>Category Name</Label>
                                    <Input 
                                        required 
                                        value={formData.name} 
                                        onChange={e => setFormData({...formData, name: e.target.value})} 
                                        placeholder="e.g. Desserts" 
                                    />
                               </div>
                               <div className="space-y-2">
                                    <Label>Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
                                    <Input 
                                        value={formData.description} 
                                        onChange={e => setFormData({...formData, description: e.target.value})} 
                                    />
                               </div>
                               <Button type="submit" className="w-full" disabled={isCreating}>
                                    {isCreating ? "Creating..." : "Save Category"}
                               </Button>
                          </form>
                     </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-xl bg-card overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-10">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading && categories.length === 0 && (
                             <TableRow>
                                <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                                    No categories mapped.
                                </TableCell>
                            </TableRow>
                        )}
                        {categories.map((c) => (
                            <TableRow key={c.id}>
                                <TableCell className="font-mono text-xs text-muted-foreground">
                                    {c.id.slice(-6)}
                                </TableCell>
                                <TableCell className="font-bold">
                                    {c.name}
                                </TableCell>
                                <TableCell>
                                    {c.description || "-"}
                                </TableCell>
                                <TableCell className="text-right">
                                     <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(c.id)}>
                                          <Trash2 className="w-4 h-4" />
                                     </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
