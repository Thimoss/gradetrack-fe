"use client";

import Link from "next/link";
import {
  IoAddOutline,
  IoBuildOutline,
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
import {
  equipmentTypeOptions,
  equipmentStatusOptions,
  type Equipment,
  type EquipmentStatus,
  type EquipmentType,
  useEquipmentPage,
} from "@/hooks/use-equipment-page";

export function EquipmentPage() {
  const page = useEquipmentPage();

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          action={
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894]"
              href="/equipment/new"
            >
              <IoAddOutline aria-hidden="true" className="text-lg" />
              Tambah peralatan
            </Link>
          }
          description="Kelola daftar peralatan yang dipakai untuk grading, tasklist, dan rekap."
          eyebrow="Master Data"
          icon={<IoBuildOutline aria-hidden="true" />}
          title="Data Peralatan"
        />

        <div className="grid gap-3 border-b border-zinc-200 p-5 lg:grid-cols-[minmax(0,1fr)_240px_200px]">
          <label className="relative block">
            <span className="sr-only">Cari peralatan</span>
            <IoSearchOutline
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-neutral-400"
            />
            <input
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
              onChange={(event) => page.applySearch(event.target.value)}
              placeholder="Cari tag, nomor seri, pabrikan, model, lokasi"
              type="search"
              value={page.search}
            />
          </label>
          <label>
            <span className="sr-only">Filter jenis peralatan</span>
            <select
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
              onChange={(event) =>
                page.applyEquipmentType(event.target.value as "" | EquipmentType)
              }
              value={page.equipmentType}
            >
              <option value="">Semua peralatan</option>
              {equipmentTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter status peralatan</span>
            <select
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
              onChange={(event) =>
                page.applyStatus(event.target.value as "" | EquipmentStatus)
              }
              value={page.status}
            >
              <option value="">Semua status</option>
              {equipmentStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {page.error ? (
          <ErrorBanner>{page.error}</ErrorBanner>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="border-b border-zinc-200 px-5 py-3 font-bold">
                  Peralatan
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Tipe
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Depot
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Status
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Maker
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Lokasi
                </th>
                <th className="border-b border-zinc-200 px-5 py-3 text-right font-bold">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {page.isLoading ? (
                <EmptyTableRow colSpan={7}>Memuat data peralatan...</EmptyTableRow>
              ) : null}

              {!page.isLoading && page.equipment.length === 0 ? (
                <EmptyTableRow colSpan={7}>Data peralatan belum tersedia.</EmptyTableRow>
              ) : null}

              {!page.isLoading
                ? page.equipment.map((item) => (
                    <tr className="hover:bg-slate-50" key={item.id}>
                      <td className="px-5 py-4">
                        <p className="font-bold text-[#232122]">
                          {getIdentityValue(item, "tagNumber") ||
                            getIdentityValue(item, "lineNumber") ||
                            "-"}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Nomor seri {getIdentityValue(item, "serialNumber") || "-"}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        {getEquipmentTypeLabel(item.equipmentType)}
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-[#232122]">
                          {item.depot?.depot_name ?? "-"}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {item.depot?.city ?? "-"}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${getStatusClass(item.status)}`}
                        >
                          {getStatusLabel(item.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-[#232122]">
                          {formatValue(item.maker?.manufacturer)}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {formatValue(item.maker?.model)}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-neutral-700">
                        {getIdentityValue(item, "location") || "-"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            className="h-9 rounded-lg border border-zinc-200 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                            onClick={() => page.openStatusModal(item)}
                            type="button"
                          >
                            Status
                          </button>
                          <Link
                            aria-label={`Edit ${getIdentityValue(item, "tagNumber")}`}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 transition hover:bg-slate-100"
                            href={`/equipment/${item.id}/edit`}
                          >
                            <IoCreateOutline aria-hidden="true" className="text-lg" />
                          </Link>
                          <button
                            aria-label={`Hapus ${getIdentityValue(item, "tagNumber")}`}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-[#f6b9c0] text-[#E91D32] transition hover:bg-[#FDE8EB]"
                            onClick={() => page.askDeleteEquipment(item)}
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
            Total{" "}
            <span className="font-bold text-[#232122]">{page.totalItems}</span>{" "}
            peralatan
          </p>
          <div className="flex items-center gap-2">
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={page.page <= 1}
              onClick={page.goToPreviousPage}
              type="button"
            >
              <IoChevronBackOutline aria-hidden="true" className="text-lg" />
            </button>
            <span className="min-w-16 text-center text-sm font-bold text-[#232122]">
              {page.pageLabel}
            </span>
            <button
              className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={page.page >= page.totalPages}
              onClick={page.goToNextPage}
              type="button"
            >
              <IoChevronForwardOutline aria-hidden="true" className="text-lg" />
            </button>
          </div>
        </div>
      </PageCard>

      {page.deletingEquipment ? <DeleteEquipmentModal page={page} /> : null}
      {page.editingStatusEquipment ? <EditStatusModal page={page} /> : null}
    </PageShell>
  );
}

type EquipmentPageState = ReturnType<typeof useEquipmentPage>;

function DeleteEquipmentModal({ page }: { page: EquipmentPageState }) {
  const item = page.deletingEquipment;
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#036CB6]/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b border-zinc-200 p-5">
          <h2 className="text-lg font-bold text-[#232122]">Hapus peralatan</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Peralatan{" "}
            <span className="font-bold text-[#232122]">
              {getIdentityValue(item, "tagNumber") || "-"}
            </span>{" "}
            akan dihapus dari master data.
          </p>
        </div>
        <div className="flex justify-end gap-3 p-5">
          <button
            className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            disabled={page.isDeleting}
            onClick={page.cancelDeleteEquipment}
            type="button"
          >
            Batal
          </button>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E91D32] px-4 text-sm font-semibold text-white transition hover:bg-[#C91629] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={page.isDeleting}
            onClick={page.confirmDeleteEquipment}
            type="button"
          >
            <IoTrashOutline aria-hidden="true" className="text-lg" />
            {page.isDeleting ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditStatusModal({ page }: { page: EquipmentPageState }) {
  const item = page.editingStatusEquipment;
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#036CB6]/50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="border-b border-zinc-200 p-5">
          <h2 className="text-lg font-bold text-[#232122]">
            Ubah status peralatan
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Ubah status peralatan{" "}
            <span className="font-bold text-[#232122]">
              {getIdentityValue(item, "tagNumber") || "-"}
            </span>
            .
          </p>
        </div>
        <div className="p-5">
          <label>
            <span className="text-sm font-bold text-neutral-800">Status</span>
            <select
              className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
              onChange={(event) =>
                page.setStatusForm(event.target.value as EquipmentStatus)
              }
              value={page.statusForm}
            >
              {equipmentStatusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex justify-end gap-3 border-t border-zinc-200 p-5">
          <button
            className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            disabled={page.isUpdatingStatus}
            onClick={page.closeStatusModal}
            type="button"
          >
            Batal
          </button>
          <button
            className="h-10 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={page.isUpdatingStatus}
            onClick={page.submitStatusUpdate}
            type="button"
          >
            {page.isUpdatingStatus ? "Menyimpan..." : "Simpan status"}
          </button>
        </div>
      </div>
    </div>
  );
}

function getEquipmentTypeLabel(type: EquipmentType) {
  return equipmentTypeOptions.find((option) => option.value === type)?.label ?? type;
}

function getStatusLabel(status: EquipmentStatus) {
  return (
    equipmentStatusOptions.find((option) => option.value === status)?.label ??
    status
  );
}

function getStatusClass(status: EquipmentStatus) {
  if (status === "running") return "bg-[#F3F7DF] text-[#A8BC36]";
  if (status === "idle") return "bg-amber-100 text-amber-700";
  return "bg-zinc-200 text-neutral-700";
}

function getIdentityValue(item: Equipment, key: string) {
  return formatValue(item.identity[key]);
}

function formatValue(value: unknown) {
  if (value === undefined || value === null || value === "") return "";
  return String(value);
}
