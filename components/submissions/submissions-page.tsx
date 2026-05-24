"use client";

import Link from "next/link";
import {
  IoDocumentTextOutline,
  IoEyeOutline,
  IoListOutline,
} from "react-icons/io5";
import { useSubmissionsPage } from "@/hooks/use-submissions-page";

export function SubmissionsPage() {
  const page = useSubmissionsPage();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
              <IoDocumentTextOutline aria-hidden="true" className="text-xl" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
                Submission
              </p>
              <h1 className="text-2xl font-bold text-neutral-950">
                Grading dan Tasklist
              </h1>
            </div>
          </div>
          <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1">
            <button
              className={`h-9 rounded-md px-3 text-sm font-semibold ${
                page.scope === "mine"
                  ? "bg-slate-950 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => page.setScope("mine")}
              type="button"
            >
              Submission saya
            </button>
            <button
              className={`h-9 rounded-md px-3 text-sm font-semibold ${
                page.scope === "all"
                  ? "bg-slate-950 text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => page.setScope("all")}
              type="button"
            >
              Semua submission
            </button>
          </div>
        </div>

        {page.error ? (
          <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700">
            {page.error}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="border-b border-zinc-200 px-5 py-3 font-bold">
                  Submission
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Tipe
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Status
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Dibuat oleh
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Tanggal
                </th>
                <th className="border-b border-zinc-200 px-5 py-3 text-right font-bold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {page.isLoading ? (
                <tr>
                  <td className="px-5 py-8 text-center text-neutral-500" colSpan={6}>
                    Memuat submission...
                  </td>
                </tr>
              ) : null}
              {!page.isLoading && page.rows.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-neutral-500" colSpan={6}>
                    Submission belum ada.
                  </td>
                </tr>
              ) : null}
              {!page.isLoading
                ? page.rows.map((row) => (
                    <tr className="hover:bg-slate-50" key={`${row.type}-${row.id}`}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-neutral-950">{row.title}</p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {row.subtitle}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold uppercase text-slate-700">
                          <IoListOutline aria-hidden="true" />
                          {row.type}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">{row.createdBy}</td>
                      <td className="px-4 py-4 text-neutral-700">
                        {new Date(row.createdAt).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <Link
                            className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            href={row.detailHref}
                          >
                            <IoEyeOutline aria-hidden="true" className="text-lg" />
                            Detail
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
