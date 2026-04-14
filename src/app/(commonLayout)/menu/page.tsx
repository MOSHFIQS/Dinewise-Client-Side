import { getAllMenuItems } from "@/actions/menuItem.action";
import { getAllCategories } from "@/actions/category.action";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default async function MenuPage() {
    const [menuRes, categoryRes] = await Promise.all([
        getAllMenuItems(),
        getAllCategories()
    ]);

    const menuItems = menuRes?.success ? menuRes.data.data : [];
    const categories = categoryRes?.success ? categoryRes.data.data : [];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Our Menu</h1>
                <p className="text-muted-foreground w-full max-w-2xl mx-auto">
                    Explore our exquisite selection of dishes crafted to perfection by our culinary masters. 
                    Filter by categories to find your next favorite meal.
                </p>
            </div>

            {/* Categories filter (basic visual for now) */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
                 <Button variant="default" className="rounded-full">All</Button>
                 {categories.map((c: any) => (
                      <Button key={c.id} variant="outline" className="rounded-full">{c.name}</Button>
                 ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {menuItems.map((item: any) => (
                    <Card key={item.id} className="overflow-hidden group flex flex-col">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                            <Image 
                                src={item.images[0] || "/placeholder-food.jpg"} 
                                alt={item.name} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {item.discountPrice && (
                                 <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 text-xs font-bold rounded">
                                     SALE
                                 </div>
                            )}
                        </div>
                        <CardContent className="p-4 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{item.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                {item.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                     {item.discountPrice ? (
                                         <>
                                            <span className="font-bold text-lg">${item.discountPrice.toFixed(2)}</span>
                                            <span className="text-sm text-muted-foreground line-through">${item.price.toFixed(2)}</span>
                                         </>
                                     ) : (
                                         <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                                     )}
                                </div>
                                <Link href={`/menu/${item.id}`}>
                                     <Button size="sm">Details</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            
            {menuItems.length === 0 && (
                 <div className="text-center py-20 text-muted-foreground">
                      No menu items available at the moment.
                 </div>
            )}
        </div>
    );
}
