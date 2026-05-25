"use client";

import {
  IoArrowBackOutline,
  IoPeopleOutline,
  IoSaveOutline,
} from "react-icons/io5";
import { useAdminDepotFormPage } from "@/hooks/use-admin-depot-form-page";

export function AdminDepotFormPage() {
  const page = useAdminDepotFormPage();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <form onSubmit={page.submitAdminDepot}>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#036CB6] text-white">
                <IoPeopleOutline aria-hidden="true" className="text-xl" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#036CB6]">
                  Manajemen Pengguna
                </p>
                <h1 className="text-2xl font-bold text-[#232122]">
                  Tambah petugas depot
                </h1>
              </div>
            </div>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={page.cancelForm}
              type="button"
            >
              <IoArrowBackOutline aria-hidden="true" className="text-lg" />
              Kembali
            </button>
          </div>

          {page.error ? (
            <div className="border-b border-[#f6b9c0] bg-[#FDE8EB] px-5 py-3 text-sm font-medium text-[#E91D32]">
              {page.error}
            </div>
          ) : null}

          <div className="grid gap-4 p-5">
            <SelectField
              label="Lokasi tugas (depot)"
              name="depot_id"
              onChange={page.handleFieldChange}
              options={page.depots.map((depot) => ({
                value: String(depot.id),
                label: `${depot.depot_name} (${depot.depot_code})`,
              }))}
              required
              value={page.form.depot_id}
            />
            <TextField
              autoComplete="username"
              label="Nomor pegawai"
              name="employee_number"
              onChange={page.handleFieldChange}
              required
              value={page.form.employee_number}
            />
            <TextField
              autoComplete="name"
              label="Nama"
              name="name"
              onChange={page.handleFieldChange}
              required
              value={page.form.name}
            />
            <TextField
              autoComplete="new-password"
              label="Kata sandi"
              minLength={6}
              name="password"
              onChange={page.handleFieldChange}
              required
              type="password"
              value={page.form.password}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-zinc-200 px-5 py-4">
            <button
              className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={page.cancelForm}
              type="button"
            >
              Batal
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={page.isSubmitting}
              type="submit"
            >
              <IoSaveOutline aria-hidden="true" className="text-lg" />
              {page.isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

type TextFieldProps = {
  autoComplete?: string;
  label: string;
  minLength?: number;
  name: string;
  onChange: ReturnType<typeof useAdminDepotFormPage>["handleFieldChange"];
  required?: boolean;
  type?: string;
  value: string;
};

function TextField({
  autoComplete,
  label,
  minLength,
  name,
  onChange,
  required,
  type = "text",
  value,
}: TextFieldProps) {
  return (
    <label>
      <span className="text-sm font-bold text-neutral-800">{label}</span>
      <input
        autoComplete={autoComplete}
        className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
        minLength={minLength}
        name={name}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  onChange,
  options,
  required,
  value,
}: {
  label: string;
  name: string;
  onChange: ReturnType<typeof useAdminDepotFormPage>["handleFieldChange"];
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  value: string;
}) {
  return (
    <label>
      <span className="text-sm font-bold text-neutral-800">{label}</span>
      <select
        className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
        name={name}
        onChange={onChange}
        required={required}
        value={value}
      >
        <option value="">Pilih depot</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
