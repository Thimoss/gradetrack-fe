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
import {
  EmptyTableRow,
  ErrorBanner,
  PageCard,
  PageHeader,
  PageShell,
} from "@/components/ui/page-section";
import { depotOwnershipOptions, depotStatusOptions, useDepotPage } from "@/hooks/use-depot-page";

export function DepotPage() {
  const depotPage = useDepotPage();

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          action={
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894]"
              href="/depot/new"
            >
              <IoAddOutline aria-hidden="true" className="text-lg" />
              Tambah depot
            </Link>
          }
          description="Kelola lokasi depot untuk peralatan, grading, tasklist, dan rekap dashboard."
          eyebrow="Master Data"
          icon={<IoBusinessOutline aria-hidden="true" />}
          title="Data Depot"
        />

        <div className="grid gap-3 border-b border-zinc-200 p-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative block">
            <span className="sr-only">Cari depot</span>
            <IoSearchOutline
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-neutral-400"
            />
            <input
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
              onChange={(event) => depotPage.applySearch(event.target.value)}
              placeholder="Cari kode, nama, kota, provinsi"
              type="search"
              value={depotPage.search}
            />
          </label>
          <label>
            <span className="sr-only">Filter status</span>
            <select
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
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
          <ErrorBanner>{depotPage.error}</ErrorBanner>
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
                  Kepemilikan
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
                <EmptyTableRow colSpan={6}>Memuat data depot...</EmptyTableRow>
              ) : null}

              {!depotPage.isLoading && depotPage.depots.length === 0 ? (
                <EmptyTableRow colSpan={6}>Data depot belum tersedia.</EmptyTableRow>
              ) : null}

              {!depotPage.isLoading
                ? depotPage.depots.map((depot) => (
                    <tr className="hover:bg-slate-50" key={depot.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-[#232122]">
                          {depot.depot_name}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                          {depot.depot_code}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-[#232122]">
                          {depot.city}, {depot.province}
                        </p>
                        <p className="mt-1 line-clamp-1 text-xs text-neutral-500">
                          {depot.address ?? "-"}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-[#232122]">
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
                              ? "bg-[#F3F7DF] text-[#A8BC36]"
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
                            className="grid h-9 w-9 place-items-center rounded-lg border border-[#f6b9c0] text-[#E91D32] transition hover:bg-[#FDE8EB]"
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
            Total <span className="font-bold text-[#232122]">{depotPage.totalItems}</span>{" "}
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
            <span className="min-w-16 text-center text-sm font-bold text-[#232122]">
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
      </PageCard>

      {depotPage.deletingDepot ? (
        <DeleteDepotModal depotPage={depotPage} />
      ) : null}
    </PageShell>
  );
}

type DepotPageState = ReturnType<typeof useDepotPage>;

function DeleteDepotModal({ depotPage }: { depotPage: DepotPageState }) {
  const depot = depotPage.deletingDepot;
  if (!depot) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#036CB6]/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b border-zinc-200 p-5">
          <h2 className="text-lg font-bold text-[#232122]">Hapus depot</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Depot <span className="font-bold text-[#232122]">{depot.depot_name}</span>{" "}
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
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E91D32] px-4 text-sm font-semibold text-white transition hover:bg-[#C91629] disabled:cursor-not-allowed disabled:opacity-60"
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
