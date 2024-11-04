"use client";

import { Disc3 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Disc3 className="h-8 w-8 animate-spin-slow" />
          <span className="text-2xl font-bold">Stomp Sphere</span>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}