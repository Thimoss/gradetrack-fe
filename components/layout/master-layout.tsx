"use client";

import Link from "next/link";
import { ReactNode } from "react";
import {
  IoAnalyticsOutline,
  IoBarChartOutline,
  IoBriefcaseOutline,
  IoBusinessOutline,
  IoChevronBack,
  IoChevronForward,
  IoClose,
  IoClipboardOutline,
  IoDocumentTextOutline,
  IoGridOutline,
  IoHelpCircleOutline,
  IoMenu,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5";
import type { NavigationItem } from "@/hooks/use-master-layout";
import { useMasterLayout } from "@/hooks/use-master-layout";

type MasterLayoutProps = {
  children: ReactNode;
};

const navigationIcon: Record<NavigationItem["icon"], ReactNode> = {
  dashboard: <IoGridOutline aria-hidden="true" />,
  depot: <IoBusinessOutline aria-hidden="true" />,
  user: <IoPeopleOutline aria-hidden="true" />,
  grading: <IoClipboardOutline aria-hidden="true" />,
  tasklist: <IoAnalyticsOutline aria-hidden="true" />,
  submission: <IoDocumentTextOutline aria-hidden="true" />,
  recap: <IoBarChartOutline aria-hidden="true" />,
};

export function MasterLayout({ children }: MasterLayoutProps) {
  const {
    navigationItems,
    isDesktopSidebarOpen,
    isMobileSidebarOpen,
    toggleDesktopSidebar,
    openMobileSidebar,
    closeMobileSidebar,
    isActiveNavigation,
  } = useMasterLayout();

  const desktopSidebarWidth = isDesktopSidebarOpen ? "lg:w-72" : "lg:w-20";
  const labelVisibility = isDesktopSidebarOpen
    ? "lg:max-w-44 lg:opacity-100 lg:delay-150"
    : "lg:max-w-0 lg:opacity-0";

  return (
    <div className="min-h-screen bg-zinc-100 text-neutral-950">
      {isMobileSidebarOpen ? (
        <button
          aria-label="Tutup sidebar"
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          onClick={closeMobileSidebar}
          type="button"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-200 bg-white shadow-xl transition-[width,transform] duration-300 ease-in-out lg:translate-x-0 lg:shadow-none ${desktopSidebarWidth} ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`flex h-16 items-center justify-between border-b border-zinc-200 px-4 transition-[padding] duration-300 ease-in-out ${
            isDesktopSidebarOpen ? "" : "lg:px-3"
          }`}
        >
          <Link
            className={`flex min-w-0 items-center gap-3 ${
              isDesktopSidebarOpen ? "" : "lg:justify-center"
            }`}
            href="/dashboard"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
              <IoAnalyticsOutline aria-hidden="true" className="text-xl" />
            </span>
            <span
              className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ease-out ${labelVisibility}`}
            >
              <span className="block truncate text-base font-bold text-neutral-950">
                GradeTrack
              </span>
              <span className="block truncate text-xs font-medium uppercase tracking-wide text-neutral-500">
                Workspace
              </span>
            </span>
          </Link>
          <button
            aria-label="Tutup sidebar mobile"
            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 lg:hidden"
            onClick={closeMobileSidebar}
            type="button"
          >
            <IoClose aria-hidden="true" className="text-lg" />
          </button>
        </div>

        <nav
          className={`flex-1 space-y-1 overflow-y-auto px-3 py-4 transition-[padding] duration-300 ease-in-out ${
            isDesktopSidebarOpen ? "" : "lg:px-2"
          }`}
        >
          {navigationItems.map((item) => {
            const isActive = isActiveNavigation(item.href);
            return (
              <Link
                className={`flex h-11 items-center gap-3 overflow-hidden rounded-lg px-3 text-sm font-semibold transition-[background-color,color,padding] duration-200 ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                } ${isDesktopSidebarOpen ? "" : "lg:justify-center lg:px-2"}`}
                href={item.href}
                key={`${item.href}-${item.label}`}
                onClick={closeMobileSidebar}
                title={item.label}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-md text-base ${
                    isActive ? "bg-white/15" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {navigationIcon[item.icon]}
                </span>
                <span
                  className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ease-out ${labelVisibility}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div
          className={`border-t border-zinc-200 p-3 transition-[padding] duration-300 ease-in-out ${
            isDesktopSidebarOpen ? "" : "lg:p-2"
          }`}
        >
          <div
            className={`rounded-lg bg-slate-50 p-3 transition-[padding] duration-300 ease-in-out ${
              isDesktopSidebarOpen ? "" : "lg:p-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-sky-100 text-xs font-black text-sky-700">
                <IoBriefcaseOutline aria-hidden="true" className="text-lg" />
              </div>
              <div
                className={`min-w-0 overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-200 ease-out ${labelVisibility}`}
              >
                <p className="truncate text-sm font-bold text-neutral-950">
                  IT Cikampek
                </p>
                <p className="truncate text-xs text-neutral-500">
                  Work area aktif
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`flex min-h-screen flex-col transition-[padding] duration-300 ease-in-out ${
          isDesktopSidebarOpen ? "lg:pl-72" : "lg:pl-20"
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                aria-label="Buka sidebar mobile"
                className="grid h-10 w-10 place-items-center rounded-lg border border-zinc-200 text-slate-700 lg:hidden"
                onClick={openMobileSidebar}
                type="button"
              >
                <IoMenu aria-hidden="true" className="text-xl" />
              </button>
              <button
                aria-label="Toggle sidebar desktop"
                className="hidden h-10 w-10 place-items-center rounded-lg border border-zinc-200 text-slate-700 transition hover:bg-slate-50 lg:grid"
                onClick={toggleDesktopSidebar}
                type="button"
              >
                {isDesktopSidebarOpen ? (
                  <IoChevronBack aria-hidden="true" className="text-lg" />
                ) : (
                  <IoChevronForward aria-hidden="true" className="text-lg" />
                )}
              </button>
              <div>
                <p className="text-sm font-bold text-neutral-950">
                  Asset grading workspace
                </p>
                <p className="text-xs text-neutral-500 max-sm:hidden">
                  Grading, tasklist, dan rekap operasional
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="hidden h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:flex"
                type="button"
              >
                <IoHelpCircleOutline aria-hidden="true" className="text-lg" />
                Bantuan
              </button>
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
                <IoPersonOutline aria-hidden="true" className="text-lg" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-6 max-sm:px-4">{children}</main>

        <footer className="border-t border-zinc-200 bg-white px-6 py-4 text-xs text-neutral-500 max-sm:px-4">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
            <p>GradeTrack internal workspace.</p>
            <p>Grading, tasklist, dan rekap aset.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
