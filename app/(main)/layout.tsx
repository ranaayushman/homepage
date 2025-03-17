"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      router.push("/");
    } else {
      setIsLoading(false); 
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="bg-gray-200 min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

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
