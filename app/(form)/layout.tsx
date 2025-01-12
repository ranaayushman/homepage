import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import { ReduxProvider } from "../lib/store/provider";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <div className="">
        <div>
          <div className="mb-4 ">
            <Navbar />
          </div>
          {children}
          <Toaster />
        </div>
      </div>
    </ReduxProvider>
  );
}
