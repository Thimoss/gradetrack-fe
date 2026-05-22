import type { ReactNode } from "react";

type GradingFormSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  headerSlot?: ReactNode;
};

export function GradingFormSection({
  title,
  children,
  className = "",
  bodyClassName = "p-5",
  headerSlot,
}: GradingFormSectionProps) {
  return (
    <section
      className={`overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-slate-50 px-5 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          {title}
        </h2>
        {headerSlot}
      </div>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}
