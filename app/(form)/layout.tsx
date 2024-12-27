import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-200">
      <div>
        <div className="mb-4 ">
          <Navbar />
        </div>
        {children}
        <Toaster />
      </div>
    </div>
  );
}
