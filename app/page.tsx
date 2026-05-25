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
    <main className="min-h-screen bg-zinc-100 text-[#232122]">
      <div className="grid min-h-screen grid-cols-[minmax(0,1fr)_500px] max-lg:grid-cols-1">
        <section className="bg-[#036CB6] px-10 py-10 text-white max-lg:min-h-[360px] max-sm:px-6">
          <div className="flex min-h-full flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-white text-lg font-black text-[#232122]">
                  G
                </div>
                <div>
                  <p className="text-xl font-bold">GradeTrack</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-white/70">
                    Sistem grading aset
                  </p>
                </div>
              </div>

              <div className="mt-20 max-w-2xl max-lg:mt-12">
                <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-normal max-sm:text-3xl">
                  Input grading dan tasklist dalam satu sistem.
                </h1>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
                  Gunakan nomor pegawai dan kata sandi untuk masuk. Setelah
                  masuk, pilih menu sesuai pekerjaan: grading, tasklist,
                  pengajuan, atau dashboard.
                </p>
              </div>
            </div>

            <ol className="mt-12 grid max-w-2xl gap-3 text-sm text-white/85">
              {[
                "Pilih lokasi dan jenis peralatan.",
                "Isi form sesuai hasil pemeriksaan.",
                "Kirim data dan lihat hasilnya di menu Pengajuan.",
              ].map((item, index) => (
                <li className="flex items-center gap-3" key={item}>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-[#232122]">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-8 py-10 max-sm:px-5">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wide text-[#036CB6]">
                Masuk ke GradeTrack
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#232122]">
                Masuk
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Masukkan nomor pegawai dan kata sandi yang terdaftar.
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
                    Nomor pegawai
                  </label>
                  <input
                    autoComplete="username"
                    className="mt-2 h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
                    id="employee-number"
                    inputMode="numeric"
                    name="employeeNumber"
                    placeholder="Contoh: 123456"
                    required
                    type="text"
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-semibold text-neutral-800"
                    htmlFor="password"
                  >
                    Kata sandi
                  </label>
                  <input
                    autoComplete="current-password"
                    className="mt-2 h-12 w-full rounded-lg border border-zinc-300 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
                    id="password"
                    name="password"
                    placeholder="Masukkan kata sandi"
                    required
                    type="password"
                  />
                </div>
              </div>

              <button
                className="mt-6 h-12 w-full rounded-lg bg-[#036CB6] px-4 text-sm font-bold text-white transition hover:bg-[#025894] focus:outline-none focus:ring-2 focus:ring-[#036CB6] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
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
