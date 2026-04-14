import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function CommonLayout({ children }: { children: ReactNode }) {
     return (
          <div className="flex min-h-screen flex-col">
               <Navbar />
               <main className="flex-1">{children}</main>
          </div>
     );
}
