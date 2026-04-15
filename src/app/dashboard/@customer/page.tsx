import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomerDashboard() {
     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back!</p>
               </div>

               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">My Orders</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">5</div>
                         </CardContent>
                    </Card>
               </div>
          </div>
     )
}
