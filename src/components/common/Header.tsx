"use client";

import Link from "next/link";
import { Fuel, BarChart3, Map } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/radar-petrolero"
          className="flex items-center gap-2 font-bold text-primary"
        >
          <Fuel className="h-5 w-5" />
          <span className="hidden sm:inline">RADAR PETROLERO</span>
          <span className="sm:hidden">RADAR</span>
          <span className="text-xs font-normal text-muted-foreground ml-1 hidden md:inline">
            MX
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/radar-petrolero"
            className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Precios</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
