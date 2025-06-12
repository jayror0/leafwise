"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu, Sprout, AlertTriangle } from "lucide-react";
import { useState } from "react";

const navItems = [{ href: "/", label: "Mystical Identify", icon: Sprout }];

export function Footer() {
  const pathname = usePathname();

  const renderNavLinks = (isMobile = false) =>
    navItems.map((item) => (
      <Button
        key={item.label}
        variant="ghost"
        asChild
        className={cn(
          "justify-start text-base font-botanical font-medium rounded-2xl",
          pathname === item.href
            ? "bg-gradient-to-r from-sage-400/20 to-moss-500/20 text-forest-700 font-semibold shadow-botanical border border-sage-300/30"
            : "text-forest-600",
          isMobile
            ? "w-full text-left py-4 rounded-2xl"
            : "rounded-2xl px-6 py-3"
        )}
      >
        <Link href={item.href} className="flex items-center">
          <item.icon
            className={cn(
              "mr-3 h-5 w-5",
              pathname === item.href ? "text-sage-500" : "text-forest-500"
            )}
            aria-hidden="true"
          />
          <span className="flex items-center gap-2">{item.label}</span>
        </Link>
      </Button>
    ));

  return (
    <footer className="relative w-full botanical-gradient border-t-4 border-sage-300/50 shadow-mystical mt-auto overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-10 w-16 h-16 bg-sage-200/20 rounded-full blur-xl"></div>
        <div className="absolute top-2 right-20 w-12 h-12 bg-moss-300/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-2 left-1/4 w-20 h-20 bg-forest-200/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 right-1/3 w-10 h-10 bg-terracotta-200/20 rounded-full blur-md"></div>

        <div className="absolute inset-0 texture-paper opacity-20"></div>
      </div>

      <div className="container flex h-24 max-w-screen-2xl items-center justify-between px-6 relative z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex items-center gap-2 text-forest-600 rounded-2xl px-4 py-2 text-sm font-botanical"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>AI Disclaimer</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="botanical-gradient border-2 border-sage-300/50 shadow-mystical max-w-2xl w-[90vw] md:w-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold text-forest-800 font-rustic mb-4 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-terracotta-500" />
                AI Plant Identification Disclaimer
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 font-botanical text-forest-700">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-forest-800">
                  English
                </h3>
                <p>
                  Plant identification and care tips are AI-generated and may not always be 100% accurate. Always consult multiple sources for critical plant care decisions.
                </p>
              </div>
              <div className="border-t border-sage-300/30 pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-forest-800">
                  Tagalog
                </h3>
                <p>
                  Ang pagkilala ng halaman at mga payo sa pag-aalaga nito ay gawa ng AI at maaaring hindi palaging 100% wasto. Laging kumonsulta sa iba't ibang mapagkukunan para sa mga kritikal na desisyon sa pag-aalaga ng halaman.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative p-2">
            <div className="absolute -inset-2 bg-gradient-to-r from-sage-300/30 via-moss-400/20 to-forest-300/30 rounded-full blur-lg"></div>
            <Logo className="h-16 w-16 text-forest-600 drop-shadow-lg relative z-10" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-forest-800 font-boho-script tracking-wide drop-shadow-sm">
              LeafWise
            </span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-0.5 bg-sage-400 rounded-full"></div>
              <span className="text-sm text-forest-700 font-botanical font-light italic">
                Ancient Plant Wisdom
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          {renderNavLinks()}
          <div className="flex items-center gap-3 ml-6"></div>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-2xl border border-sage-200/30"
              >
                <Menu className="h-6 w-6 text-forest-600" />
                <span className="sr-only">Toggle mystical navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] p-6 botanical-gradient border-l-4 border-sage-300/50"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-20 h-20 bg-sage-200/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-10 w-16 h-16 bg-moss-300/15 rounded-full blur-lg"></div>
                <div className="absolute inset-0 texture-paper opacity-20"></div>
              </div>

              <Link
                href="/"
                className="mb-8 flex items-center space-x-4 group relative z-10"
              >
                <div className="relative p-2">
                  <div className="absolute -inset-2 bg-gradient-to-r from-sage-300/30 via-moss-400/20 to-forest-300/30 rounded-full blur-lg"></div>
                  <Logo className="h-12 w-12 text-forest-600 drop-shadow-lg relative z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-forest-800 font-boho-script tracking-wide">
                    LeafWise
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-0.5 bg-sage-400 rounded-full"></div>
                    <span className="text-xs text-forest-700 font-botanical font-light italic">
                      Ancient Wisdom
                    </span>
                  </div>
                </div>
              </Link>

              <nav className="flex flex-col space-y-4 relative z-10">
                {renderNavLinks(true)}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full text-left py-4 rounded-2xl flex items-center gap-2 text-forest-600 font-botanical"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>AI Disclaimer</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="botanical-gradient border-2 border-sage-300/50 shadow-mystical max-w-2xl w-[90vw] md:w-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl md:text-2xl font-bold text-forest-800 font-rustic mb-4 flex items-center gap-2">
                        <AlertTriangle className="h-6 w-6 text-terracotta-500" />
                        AI Plant Identification Disclaimer
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 font-botanical text-forest-700">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-forest-800">
                          English
                        </h3>
                        <p>
                          Plant identification and care tips are AI-generated and may not always be 100% accurate. Always consult multiple sources for critical plant care decisions.
                        </p>
                      </div>
                      <div className="border-t border-sage-300/30 pt-6 space-y-4">
                        <h3 className="text-lg font-semibold text-forest-800">
                          Tagalog
                        </h3>
                        <p>
                          Ang pagkilala ng halaman at mga payo sa pag-aalaga nito ay gawa ng AI at maaaring hindi palaging 100% wasto. Laging kumonsulta sa iba't ibang mapagkukunan para sa mga kritikal na desisyon sa pag-aalaga ng halaman.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-sage-300/30"></div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-300 via-moss-400 to-forest-500"></div>
    </footer>
  );
}
