"use client";

import Link from "next/link";
import {
  IoAddOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoKeyOutline,
  IoPeopleOutline,
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
import { useAdminDepotPage } from "@/hooks/use-admin-depot-page";

export function AdminDepotPage() {
  const page = useAdminDepotPage();

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          action={
            <Link
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894]"
              href="/admin-depot/new"
            >
              <IoAddOutline aria-hidden="true" className="text-lg" />
              Tambah petugas
            </Link>
          }
          description="Kelola akun petugas depot dan reset kata sandi saat diperlukan."
          eyebrow="Manajemen Pengguna"
          icon={<IoPeopleOutline aria-hidden="true" />}
          title="Petugas Depot"
        />

        <div className="border-b border-zinc-200 p-5">
          <label className="relative block max-w-xl">
            <span className="sr-only">Cari admin depot</span>
            <IoSearchOutline
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-neutral-400"
            />
            <input
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
              onChange={(event) => page.applySearch(event.target.value)}
              placeholder="Cari nomor pegawai atau nama"
              type="search"
              value={page.search}
            />
          </label>
        </div>

        {page.error ? (
          <ErrorBanner>{page.error}</ErrorBanner>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-[760px] w-full border-collapse text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-neutral-500">
              <tr>
                <th className="border-b border-zinc-200 px-5 py-3 font-bold">
                  No. Pegawai
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Nama
                </th>
                <th className="border-b border-zinc-200 px-4 py-3 font-bold">
                  Lokasi Tugas
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
              {page.isLoading ? (
                <EmptyTableRow colSpan={5}>Memuat data petugas...</EmptyTableRow>
              ) : null}
              {!page.isLoading && page.users.length === 0 ? (
                <EmptyTableRow colSpan={5}>
                  Data petugas depot belum tersedia.
                </EmptyTableRow>
              ) : null}
              {!page.isLoading
                ? page.users.map((user) => (
                    <tr className="hover:bg-slate-50" key={user.id}>
                      <td className="px-5 py-4 font-bold text-[#232122]">
                        {user.employee_number}
                      </td>
                      <td className="px-4 py-4 text-neutral-700">{user.name}</td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-[#232122]">
                          {user.depot?.depot_name ?? "-"}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {user.depot?.city ?? "-"}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                            user.status === "active"
                              ? "bg-[#F3F7DF] text-[#A8BC36]"
                              : "bg-zinc-200 text-neutral-700"
                          }`}
                        >
                          {user.status === "active" ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                            onClick={() => page.openResetModal(user)}
                            type="button"
                          >
                            <IoKeyOutline aria-hidden="true" className="text-lg" />
                            Reset kata sandi
                          </button>
                          <button
                            aria-label={`Hapus ${user.name}`}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-[#f6b9c0] text-[#E91D32] transition hover:bg-[#FDE8EB]"
                            onClick={() => page.openDeleteModal(user)}
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
            Total <span className="font-bold text-[#232122]">{page.totalItems}</span>{" "}
            petugas depot
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

      {page.resetUser ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#036CB6]/50 px-4">
          <form
            className="w-full max-w-md rounded-lg bg-white shadow-xl"
            onSubmit={page.submitResetPassword}
          >
            <div className="border-b border-zinc-200 p-5">
              <h2 className="text-lg font-bold text-[#232122]">
                Reset kata sandi
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Masukkan kata sandi baru untuk{" "}
                <span className="font-bold text-[#232122]">
                  {page.resetUser.name}
                </span>
                .
              </p>
            </div>
            <div className="p-5">
              <label>
                <span className="text-sm font-bold text-neutral-800">
                  Kata sandi baru
                </span>
                <input
                  className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
                  minLength={6}
                  onChange={(event) => page.setResetPassword(event.target.value)}
                  required
                  type="password"
                  value={page.resetPassword}
                />
              </label>
            </div>
            <div className="flex justify-end gap-3 border-t border-zinc-200 p-5">
              <button
                className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                disabled={page.isResetting}
                onClick={page.closeResetModal}
                type="button"
              >
                Batal
              </button>
              <button
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={page.isResetting}
                type="submit"
              >
                <IoKeyOutline aria-hidden="true" className="text-lg" />
                {page.isResetting ? "Menyimpan..." : "Reset kata sandi"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {page.deletingUser ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#036CB6]/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="border-b border-zinc-200 p-5">
              <h2 className="text-lg font-bold text-[#232122]">
                Hapus petugas depot
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Akun{" "}
                <span className="font-bold text-[#232122]">
                  {page.deletingUser.name}
                </span>{" "}
                akan dihapus dari daftar petugas depot.
              </p>
            </div>
            <div className="flex justify-end gap-3 p-5">
              <button
                className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                disabled={page.isDeleting}
                onClick={page.closeDeleteModal}
                type="button"
              >
                Batal
              </button>
              <button
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E91D32] px-4 text-sm font-semibold text-white transition hover:bg-[#C91629] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={page.isDeleting}
                onClick={page.confirmDeleteUser}
                type="button"
              >
                <IoTrashOutline aria-hidden="true" className="text-lg" />
                {page.isDeleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </PageShell>
  );
}
