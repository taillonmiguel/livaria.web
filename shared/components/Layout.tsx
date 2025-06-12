"use client";

import type { ReactNode } from "react";
import { SideNav } from "./SideNav";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
