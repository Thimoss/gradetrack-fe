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
import { useAdminDepotPage } from "@/hooks/use-admin-depot-page";

export function AdminDepotPage() {
  const page = useAdminDepotPage();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
                <IoPeopleOutline aria-hidden="true" className="text-xl" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
                  User Management
                </p>
                <h1 className="text-2xl font-bold text-neutral-950">
                  Admin Depot
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
              Admin region membuat akun admin depot dan mereset password saat
              user lupa password.
            </p>
          </div>
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            href="/admin-depot/new"
          >
            <IoAddOutline aria-hidden="true" className="text-lg" />
            Tambah admin depot
          </Link>
        </div>

        <div className="border-b border-zinc-200 p-5">
          <label className="relative block max-w-xl">
            <span className="sr-only">Cari admin depot</span>
            <IoSearchOutline
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-neutral-400"
            />
            <input
              className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm text-neutral-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
              onChange={(event) => page.applySearch(event.target.value)}
              placeholder="Cari nomor pegawai atau nama"
              type="search"
              value={page.search}
            />
          </label>
        </div>

        {page.error ? (
          <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700">
            {page.error}
          </div>
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
                <tr>
                  <td className="px-5 py-8 text-center text-neutral-500" colSpan={5}>
                    Memuat admin depot...
                  </td>
                </tr>
              ) : null}
              {!page.isLoading && page.users.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-neutral-500" colSpan={5}>
                    Admin depot belum ada.
                  </td>
                </tr>
              ) : null}
              {!page.isLoading
                ? page.users.map((user) => (
                    <tr className="hover:bg-slate-50" key={user.id}>
                      <td className="px-5 py-4 font-bold text-neutral-950">
                        {user.employee_number}
                      </td>
                      <td className="px-4 py-4 text-neutral-700">{user.name}</td>
                      <td className="px-4 py-4 text-neutral-700">
                        <p className="font-semibold text-neutral-950">
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
                              ? "bg-emerald-100 text-emerald-700"
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
                            Reset password
                          </button>
                          <button
                            aria-label={`Hapus ${user.name}`}
                            className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-700 transition hover:bg-red-50"
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
            Total <span className="font-bold text-neutral-950">{page.totalItems}</span>{" "}
            admin depot
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
            <span className="min-w-16 text-center text-sm font-bold text-neutral-950">
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
      </section>

      {page.resetUser ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-4">
          <form
            className="w-full max-w-md rounded-lg bg-white shadow-xl"
            onSubmit={page.submitResetPassword}
          >
            <div className="border-b border-zinc-200 p-5">
              <h2 className="text-lg font-bold text-neutral-950">
                Reset password
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Masukkan password baru untuk{" "}
                <span className="font-bold text-neutral-950">
                  {page.resetUser.name}
                </span>
                .
              </p>
            </div>
            <div className="p-5">
              <label>
                <span className="text-sm font-bold text-neutral-800">
                  Password baru
                </span>
                <input
                  className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
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
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={page.isResetting}
                type="submit"
              >
                <IoKeyOutline aria-hidden="true" className="text-lg" />
                {page.isResetting ? "Menyimpan..." : "Reset"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {page.deletingUser ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white shadow-xl">
            <div className="border-b border-zinc-200 p-5">
              <h2 className="text-lg font-bold text-neutral-950">
                Hapus admin depot
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Akun{" "}
                <span className="font-bold text-neutral-950">
                  {page.deletingUser.name}
                </span>{" "}
                akan dihapus dari daftar admin depot.
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
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-red-700 px-4 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
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
    </div>
  );
}
