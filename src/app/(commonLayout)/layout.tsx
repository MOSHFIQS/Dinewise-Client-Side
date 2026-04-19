import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CommonLayout({ children }: { children: ReactNode }) {
     return (
          <div className="flex min-h-screen flex-col">
               <Navbar />
               <main className="flex-1 min-h-[calc(100vh-16rem)]">{children}</main>
               <Footer />
          </div>
     );
}
