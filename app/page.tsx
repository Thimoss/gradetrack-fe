"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const employeeNumber = String(form.get("employeeNumber") ?? "").trim();
    setIsSubmitting(true);
    window.localStorage.setItem("grading_employee_number", employeeNumber);
    window.localStorage.setItem("grading_user_role", "ADMIN_DEPOT");
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-zinc-100 text-neutral-950">
      <div className="grid min-h-screen grid-cols-[minmax(0,1fr)_520px] max-lg:grid-cols-1">
        <section className="relative overflow-hidden bg-slate-950 px-10 py-10 text-white max-lg:min-h-[360px] max-sm:px-6">
          <div className="absolute inset-0 opacity-70">
            <div className="absolute left-[-12%] top-[-18%] h-[520px] w-[520px] rounded-full bg-sky-600/30 blur-3xl" />
            <div className="absolute bottom-[-18%] right-[-10%] h-[460px] w-[460px] rounded-full bg-emerald-500/20 blur-3xl" />
          </div>

          <div className="relative z-10 flex min-h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-white text-lg font-black text-slate-950">
                  G
                </div>
                <div>
                  <p className="text-xl font-bold">GradeTrack</p>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                    Asset grading workspace
                  </p>
                </div>
              </div>

              <div className="mt-20 max-w-2xl max-lg:mt-12">
                <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-normal max-sm:text-4xl">
                  Grading, tasklist, dan rekap aset operasional.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-slate-300">
                  Satu ruang kerja untuk inspeksi kondisi peralatan, tindak
                  lanjut pekerjaan, dan ringkasan performa aset.
                </p>
              </div>
            </div>

            <div className="relative mt-12 grid max-w-3xl grid-cols-3 gap-3 max-sm:grid-cols-1">
              <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                <p className="text-2xl font-bold">08</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  Form aktif
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                <p className="text-2xl font-bold">24</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  Task terbuka
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/8 p-4">
                <p className="text-2xl font-bold">91%</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  Rekap selesai
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-8 py-10 max-sm:px-5">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wide text-sky-700">
                Masuk ke GradeTrack
              </p>
              <h2 className="mt-2 text-3xl font-bold text-neutral-950">
                Login pekerja
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Gunakan nomor pekerja dan password untuk mengakses workspace
                grading.
              </p>
            </div>

            <form
              className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
              onSubmit={handleSubmit}
            >
              <div className="space-y-5">
                <div>
                  <label
                    className="text-sm font-semibold text-neutral-800"
                    htmlFor="employee-number"
                  >
                    No pekerja
                  </label>
                  <input
                    autoComplete="username"
                    className="mt-2 h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    id="employee-number"
                    inputMode="numeric"
                    name="employeeNumber"
                    placeholder="Masukkan no pekerja"
                    required
                    type="text"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-neutral-800"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    autoComplete="current-password"
                    className="mt-2 h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    id="password"
                    name="password"
                    placeholder="Masukkan password"
                    required
                    type="password"
                  />
                </div>
              </div>

              <button
                className="mt-6 h-12 w-full rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Memproses..." : "Masuk"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs leading-5 text-neutral-500">
              Akses internal untuk pekerjaan grading, tasklist, dan rekap aset.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
