"use client";

import { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  size?: "md" | "lg";
};

type PageCardProps = {
  children: ReactNode;
  className?: string;
};

type PageHeaderProps = {
  action?: ReactNode;
  description?: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
};

type StateMessageProps = {
  children: ReactNode;
  tone?: "default" | "danger";
};

type PaginationBarProps = {
  label: string;
  nextButton: ReactNode;
  previousButton: ReactNode;
};

export function PageShell({ children, size = "lg" }: PageShellProps) {
  return (
    <div
      className={`mx-auto flex w-full flex-col gap-5 ${
        size === "md" ? "max-w-5xl" : "max-w-7xl"
      }`}
    >
      {children}
    </div>
  );
}

export function PageCard({ children, className = "" }: PageCardProps) {
  return (
    <section
      className={`overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

export function PageHeader({
  action,
  description,
  icon,
  eyebrow,
  title,
}: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-[#036CB6] text-xl text-white">
            {icon}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wide text-[#036CB6]">
              {eyebrow}
            </p>
            <h1 className="mt-0.5 text-2xl font-bold text-[#232122]">
              {title}
            </h1>
          </div>
        </div>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function ErrorBanner({ children }: { children: ReactNode }) {
  return <StateMessage tone="danger">{children}</StateMessage>;
}

export function StateMessage({
  children,
  tone = "default",
}: StateMessageProps) {
  const className =
    tone === "danger"
      ? "border-[#f6b9c0] bg-[#FDE8EB] text-[#E91D32]"
      : "border-zinc-200 bg-slate-50 text-neutral-600";

  return (
    <div className={`border-b px-5 py-3 text-sm font-medium ${className}`}>
      {children}
    </div>
  );
}

export function EmptyTableRow({
  children,
  colSpan,
}: {
  children: ReactNode;
  colSpan: number;
}) {
  return (
    <tr>
      <td className="px-5 py-10 text-center text-sm text-neutral-500" colSpan={colSpan}>
        {children}
      </td>
    </tr>
  );
}

export function PaginationBar({
  label,
  nextButton,
  previousButton,
}: PaginationBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-5 py-4 text-sm text-neutral-600">
      <p>{label}</p>
      <div className="flex items-center gap-2">
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}
