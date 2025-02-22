"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex sticky inset-0 drop-shadow-custom z-10 h-screen">
      <div
        className={`${
          isSidebarOpen ? "w-56" : "w-20"
        } duration-300 h-full p-0 pt-8 relative bg-white border-r border-gray-200 shadow-lg`}
      >
        <div className="flex justify-center items-center mb-6">
          <HamburgerMenuIcon
            className={`w-10 h-10 ml-6 text-[#789336] cursor-pointer ${
              isSidebarOpen ? "hidden" : "block"
            }`}
            onClick={toggleSidebar}
          />
          <div className="flex flex-col px-4 space-x-2 items-center">
            <Image
              src="/img/kpsbarasat.png"
              height={100}
              width={100}
              alt="logo"
              className={`${isSidebarOpen ? "" : "hidden"}`}
            />
          </div>
        </div>
        <hr className="bg-black border border-gray-200 w-full" />
        <ul className="pt-5 px-5">
          {[
            { title: "Dashboard", href: "/dashboard" },
            { title: "Payments", href: "/payment" },
            { title: "Profile", href: "/profile" },
          ].map((menu, index) => {
            const isActive =
              (pathname === "/" && menu.href === "/") ||
              pathname.startsWith(menu.href);

            return (
              <li
                key={index}
                className={`text-md flex items-center gap-x-4 cursor-pointer p-2 ${
                  !isSidebarOpen && "justify-center"
                } group ${isActive ? " text-[#212121]" : "text-[#B1B1B1]"}`}
              >
                <Link href={menu.href} className="flex items-center w-full">
                  <span
                    className={`${
                      !isSidebarOpen && "hidden"
                    } origin-left duration-200 ${
                      isActive ? "font-semibold" : "font-medium"
                    } group-hover:text-[#212121]`}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
