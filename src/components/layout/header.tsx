"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sprout } from "lucide-react";

const navItems = [
  { href: "/", label: "Identify", icon: Sprout },
];

export function Header() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => (
      <Button
        key={item.label}
        variant="ghost"
        asChild
        className={cn(
          "justify-start text-base font-medium transition-all duration-300 hover:scale-105",
          pathname === item.href
            ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 font-semibold shadow-sm"
            : "text-gray-600 hover:text-green-600 hover:bg-green-50",
          isMobile ? "w-full text-left py-4 rounded-xl" : "rounded-xl px-4 py-2"
        )}
      >
        <Link href={item.href} className="flex items-center">
          <item.icon 
            className={cn(
              "mr-2 h-5 w-5 transition-transform duration-300",
              pathname === item.href ? "text-green-500" : "text-gray-500"
            )}
            aria-hidden="true"
          />
          {item.label}
        </Link>
      </Button>
    ));

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-green-100 shadow-sm">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative p-2 group-hover:scale-110 transition-transform duration-300">
            <Logo className="h-20 w-20 text-green-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-800 font-serif">
              Leafwise
            </span>
            <span className="text-xs text-gray-500 font-medium">AI Plant Identifier</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {renderNavLinks()}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative rounded-xl hover:bg-green-50 transition-colors duration-300"
              >
                <Menu className="h-6 w-6 text-gray-600" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-6 bg-white">
              <Link href="/" className="mb-8 flex items-center space-x-3 group">
                <div className="relative p-2">
                  <Logo className="h-16 w-16 text-green-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-green-800 font-serif">
                    Leafwise
                  </span>
                  <span className="text-xs text-gray-500 font-medium">AI Plant Identifier</span>
                </div>
              </Link>
              <nav className="flex flex-col space-y-3">
                {renderNavLinks(true)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
