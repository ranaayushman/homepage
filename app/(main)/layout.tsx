import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1">
          <div className="w-full">
            <Navbar />
          </div>
          <div className="p-4 w-full">{children}</div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
