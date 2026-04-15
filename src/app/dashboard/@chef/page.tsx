import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChefDashboard() {
     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-3xl font-bold tracking-tight">Chef Dashboard</h1>
                    <p className="text-muted-foreground">Manage your menu and orders.</p>
               </div>

               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">My Menu Items</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">24</div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">12</div>
                         </CardContent>
                    </Card>
               </div>
          </div>
     )
}
