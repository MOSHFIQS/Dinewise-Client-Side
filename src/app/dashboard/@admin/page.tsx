import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard() {
     return (
          <div className="space-y-6">
               <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Overview of the entire platform.</p>
               </div>

               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">1,245</div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">455</div>
                         </CardContent>
                    </Card>
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between pb-2">
                              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="text-2xl font-bold">$12,450.00</div>
                         </CardContent>
                    </Card>
               </div>
          </div>
     )
}
