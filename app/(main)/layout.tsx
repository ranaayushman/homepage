import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200">
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div>
          <div className="mb-4 ">
            <Navbar />
          </div>
          {children}
          <Toaster />
        </div>
      </div>
    </div>
  );
}
