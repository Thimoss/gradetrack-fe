"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

export type NavigationItem = {
  href: string;
  label: string;
  icon:
    | "dashboard"
    | "depot"
    | "equipment"
    | "user"
    | "grading"
    | "tasklist"
    | "submission"
    | "recap";
};

export const navigationItems: NavigationItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/depot", label: "Depot", icon: "depot" },
  { href: "/equipment", label: "Peralatan", icon: "equipment" },
  { href: "/admin-depot", label: "Petugas Depot", icon: "user" },
  { href: "/grading", label: "Grading", icon: "grading" },
  { href: "/tasklist", label: "Tasklist", icon: "tasklist" },
  { href: "/submissions", label: "Pengajuan", icon: "submission" },
  { href: "/recap", label: "Rekap", icon: "recap" },
];

export function useMasterLayout() {
  const pathname = usePathname();
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  function toggleDesktopSidebar() {
    setIsDesktopSidebarOpen((current) => !current);
  }

  function openMobileSidebar() {
    setIsMobileSidebarOpen(true);
  }

  function closeMobileSidebar() {
    setIsMobileSidebarOpen(false);
  }

  function isActiveNavigation(href: string) {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  }

  return {
    pathname,
    navigationItems,
    isDesktopSidebarOpen,
    isMobileSidebarOpen,
    toggleDesktopSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    isActiveNavigation,
  };
}
