import Image from "next/image";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white py-2">
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6">
        {/* Left side - AES Logo and Text */}
        <div className="flex items-center gap-3">
          <Image
            src="/svg/AES.svg"
            height={40}
            width={40}
            alt="AES logo"
            className="w-10 h-10"
          />
          <p className="text-sm font-medium">Angel Education Society</p>
        </div>

        {/* Right side - KIWI Logo and Text */}
        <div className="flex items-center gap-3">
          <p className="text-sm text-right">In association with KIWI Schools</p>
          <Image
            src="/svg/kiwi.svg"
            height={40}
            width={40}
            alt="KIWI logo"
            className="w-10 h-10"
          />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center px-4">
        {/* AES Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/svg/AES.svg"
            height={32}
            width={32}
            alt="AES logo"
            className="w-8 h-8"
          />
          <span className="text-xs font-medium">Angel Education Society</span>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 pt-10">
            <SheetTitle className="text-center">
              Partnership Information
            </SheetTitle>
            <div className="flex flex-col items-center gap-4 mt-8">
              <Image
                src="/svg/kiwi.svg"
                height={60}
                width={60}
                alt="KIWI logo"
                className="w-16 h-16"
              />
              <p className="text-center text-sm">
                In association with KIWI Schools
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
