"use client";

import Link from "next/link";
import {
  IoAddOutline,
  IoBusinessOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCreateOutline,
  IoSearchOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { depotOwnershipOptions, depotStatusOptions, useDepotPage } from "@/hooks/use-depot-page";

export function DepotPage() {
  const depotPage = useDepotPage();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
                <IoBusinessOutline aria-hidden="true" className="text-xl" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
                  Master Data
                </p>
                <h1 className="text-2xl font-bold text-neutral-950">
                  CRUD Depot
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
              Kelola lokasi depot yang dipakai untuk equipment, grading,
              tasklist, dan rekap dashboard.
            </p>
          </div>
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            href="/depot/new"
          >
            <IoAddOutline aria-hidden="true" className="text-lg" />
            Tambah depot
          </Link>
        </div>

        <div className="grid gap-3 border-b border-zinc-200 p-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative block">
            <span className="sr-only">Cari depot</span>
            <IoSearchOutline
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-neutral-400"
            />
            <input
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm text-neutral-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              onChange={(event) => depotPage.applySearch(event.target.value)}
              placeholder="Cari kode, nama, kota, provinsi"
              type="search"
              value={depotPage.search}
            />
          </label>
          <label>
            <span className="sr-only">Filter status</span>
            <select
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-neutral-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              onChange={(event) =>
                depotPage.applyStatus(event.target.value as "" | "active" | "inactive")
              }
              value={depotPage.status}
            >
              <option value="">Semua status</option>
              {depotStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {depotPage.error ? (
          <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700">
            {depotPage.error}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-[980px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="border-b border-zinc-200 px-5 py-3 font-bold">
                  Depot
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Lokasi
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  PIC
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Ownership
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Status
                </th>
                <th className="border-b border-zinc-200 px-5 py-3 text-right font-bold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {depotPage.isLoading ? (
                <tr>
                  <td className="px-5 py-8 text-center text-neutral-500" colSpan={6}>
                    Memuat data depot...
                  </td>
                </tr>
              ) : null}

              {!depotPage.isLoading && depotPage.depots.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-neutral-500" colSpan={6}>
                    Data depot belum ada.
                  </td>
                </tr>
              ) : null}

              {!depotPage.isLoading
                ? depotPage.depots.map((depot) => (
                    <tr className="hover:bg-slate-50" key={depot.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-neutral-950">
                          {depot.depot_name}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                          {depot.depot_code}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-neutral-950">
                          {depot.city}, {depot.province}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
                          {depot.address ?? "-"}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-neutral-950">
                          {depot.pic_name ?? "-"}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {depot.pic_phone ?? depot.pic_email ?? "-"}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        {formatOwnership(depot.ownership_type)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                            depot.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-zinc-200 text-neutral-700"
                          }`}
                        >
                          {depot.status === "active" ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            aria-label={`Edit ${depot.depot_name}`}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 transition hover:bg-slate-100"
                            href={`/depot/${depot.id}/edit`}
                          >
                            <IoCreateOutline aria-hidden="true" className="text-lg" />
                          </Link>
                          <button
                            aria-label={`Hapus ${depot.depot_name}`}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-700 transition hover:bg-red-50"
                            onClick={() => depotPage.askDeleteDepot(depot)}
                            type="button"
                          >
                            <IoTrashOutline aria-hidden="true" className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-5 py-4 text-sm text-neutral-600">
          <p>
            Total <span className="font-bold text-neutral-950">{depotPage.totalItems}</span>{" "}
            depot
          </p>
          <div className="flex items-center gap-2">
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={depotPage.page <= 1}
              onClick={depotPage.goToPreviousPage}
              type="button"
            >
              <IoChevronBackOutline aria-hidden="true" className="text-lg" />
            </button>
            <span className="min-w-16 text-center text-sm font-bold text-neutral-950">
              {depotPage.pageLabel}
            </span>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={depotPage.page >= depotPage.totalPages}
              onClick={depotPage.goToNextPage}
              type="button"
            >
              <IoChevronForwardOutline aria-hidden="true" className="text-lg" />
            </button>
          </div>
        </div>
      </section>

      {depotPage.deletingDepot ? (
        <DeleteDepotModal depotPage={depotPage} />
      ) : null}
    </div>
  );
}

type DepotPageState = ReturnType<typeof useDepotPage>;

function DeleteDepotModal({ depotPage }: { depotPage: DepotPageState }) {
  const depot = depotPage.deletingDepot;
  if (!depot) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b border-zinc-200 p-5">
          <h2 className="text-lg font-bold text-neutral-950">Hapus depot</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Depot <span className="font-bold text-neutral-950">{depot.depot_name}</span>{" "}
            akan dihapus dari master data.
          </p>
        </div>
        <div className="flex justify-end gap-3 p-5">
          <button
            className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            disabled={depotPage.isDeleting}
            onClick={depotPage.cancelDeleteDepot}
            type="button"
          >
            Batal
          </button>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-700 px-4 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={depotPage.isDeleting}
            onClick={depotPage.confirmDeleteDepot}
            type="button"
          >
            <IoTrashOutline aria-hidden="true" className="text-lg" />
            {depotPage.isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatOwnership(value: string | null) {
  if (!value) return "-";
  return (
    depotOwnershipOptions.find((option) => option.value === value)?.label ?? value
  );
}
