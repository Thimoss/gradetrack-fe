import { IoDownloadOutline } from "react-icons/io5";

type TemplateDownloadLinkProps = {
  kind: "grading" | "tasklist";
  equipmentType: string;
  children: string;
  className?: string;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export function TemplateDownloadLink({
  kind,
  equipmentType,
  children,
  className = "",
}: TemplateDownloadLinkProps) {
  return (
    <a
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 ${className}`}
      download
      href={`${apiBaseUrl}/templates/${kind}/${equipmentType}/download`}
    >
      <IoDownloadOutline aria-hidden="true" className="text-lg" />
      {children}
    </a>
  );
}
