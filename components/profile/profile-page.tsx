"use client";

import {
  IoKeyOutline,
  IoPersonCircleOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { PageCard, PageHeader, PageShell } from "@/components/ui/page-section";
import { useProfilePage } from "@/hooks/use-profile-page";

export function ProfilePage() {
  const page = useProfilePage();

  return (
    <PageShell>
      <PageCard>
        <PageHeader
          description="Pastikan akun yang aktif sudah sesuai sebelum mengisi atau melihat data."
          eyebrow="Profil"
          icon={<IoPersonCircleOutline aria-hidden="true" />}
          title="Sesi pengguna"
        />

        <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_420px]">
          <section className="rounded-lg border border-zinc-200 bg-slate-50 p-5">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#036CB6] text-white">
                <IoShieldCheckmarkOutline
                  aria-hidden="true"
                  className="text-2xl"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                  Akun aktif
                </p>
                <h2 className="mt-1 truncate text-xl font-bold text-[#232122]">
                  {page.user?.name ?? "-"}
                </h2>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <Info label="Nomor pegawai" value={page.user?.employee_number} />
                  <Info label="Role" value={formatRole(page.user?.role)} />
                  <Info
                    label="Depot"
                    value={page.user?.depot_id ? String(page.user.depot_id) : "-"}
                  />
                </dl>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-zinc-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#E6F1FA] text-[#036CB6]">
                <IoKeyOutline aria-hidden="true" className="text-xl" />
              </div>
              <div>
                <p className="text-base font-bold text-[#232122]">
                  Ganti kata sandi
                </p>
                <p className="text-sm text-neutral-500">
                  Masukkan kata sandi lama terlebih dahulu.
                </p>
              </div>
            </div>

            <form className="mt-5 grid gap-4" onSubmit={page.changePassword}>
              <PasswordInput
                autoComplete="current-password"
                label="Kata sandi lama"
                name="currentPassword"
              />
              <PasswordInput
                autoComplete="new-password"
                label="Kata sandi baru"
                name="newPassword"
              />
              <PasswordInput
                autoComplete="new-password"
                label="Ulangi kata sandi baru"
                name="confirmPassword"
              />

              <button
                className="h-11 rounded-lg bg-[#036CB6] px-4 text-sm font-bold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={page.isSubmitting || !page.user}
                type="submit"
              >
                {page.isSubmitting ? "Menyimpan..." : "Simpan kata sandi"}
              </button>

              {page.errorMessage ? (
                <p className="rounded-lg bg-[#FDE8EA] px-4 py-3 text-sm font-semibold text-[#E91D32]">
                  {page.errorMessage}
                </p>
              ) : null}
              {page.successMessage ? (
                <p className="rounded-lg bg-[#F3F7DF] px-4 py-3 text-sm font-semibold text-[#6F7D24]">
                  {page.successMessage}
                </p>
              ) : null}
            </form>
          </section>
        </div>
      </PageCard>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3">
      <dt className="text-xs font-bold uppercase text-neutral-500">{label}</dt>
      <dd className="mt-1 font-semibold text-[#232122]">{value || "-"}</dd>
    </div>
  );
}

function PasswordInput({
  autoComplete,
  label,
  name,
}: {
  autoComplete: string;
  label: string;
  name: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-neutral-800">{label}</span>
      <input
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
        minLength={6}
        name={name}
        required
        type="password"
      />
    </label>
  );
}

function formatRole(role?: string) {
  if (role === "ADMIN_REGION") return "Admin Region";
  if (role === "ADMIN_DEPOT") return "Admin Depot";
  return role ?? "-";
}
