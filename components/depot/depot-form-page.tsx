"use client";

import {
  IoArrowBackOutline,
  IoBusinessOutline,
  IoSaveOutline,
} from "react-icons/io5";
import {
  depotOwnershipOptions,
  depotStatusOptions,
} from "@/hooks/use-depot-page";
import { useDepotFormPage } from "@/hooks/use-depot-form-page";

type DepotFormPageProps = {
  depotId?: string;
};

export function DepotFormPage({ depotId }: DepotFormPageProps) {
  const formPage = useDepotFormPage(depotId);
  const title = formPage.isEditMode ? "Edit depot" : "Tambah depot";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <form onSubmit={formPage.submitDepot}>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#036CB6] text-white">
                <IoBusinessOutline aria-hidden="true" className="text-xl" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#036CB6]">
                  Master Data
                </p>
                <h1 className="text-2xl font-bold text-[#232122]">{title}</h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Isi data depot sebagai master lokasi peralatan dan rekap.
                </p>
              </div>
            </div>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={formPage.cancelForm}
              type="button"
            >
              <IoArrowBackOutline aria-hidden="true" className="text-lg" />
              Kembali
            </button>
          </div>

          {formPage.error ? (
            <div className="border-b border-[#f6b9c0] bg-[#FDE8EB] px-5 py-3 text-sm font-medium text-[#E91D32]">
              {formPage.error}
            </div>
          ) : null}

          {formPage.isLoading ? (
            <div className="p-5 text-sm text-neutral-500">Memuat depot...</div>
          ) : (
            <div className="grid gap-4 p-5 lg:grid-cols-3">
              <TextField
                label="Kode depot"
                name="depot_code"
                onChange={formPage.handleFieldChange}
                required
                value={formPage.form.depot_code}
              />
              <TextField
                label="Nama depot"
                name="depot_name"
                onChange={formPage.handleFieldChange}
                required
                value={formPage.form.depot_name}
              />
              <SelectField
                label="Status"
                name="status"
                onChange={formPage.handleFieldChange}
                options={depotStatusOptions}
                required
                value={formPage.form.status}
              />
              <TextField
                label="Kota"
                name="city"
                onChange={formPage.handleFieldChange}
                required
                value={formPage.form.city}
              />
              <TextField
                label="Provinsi"
                name="province"
                onChange={formPage.handleFieldChange}
                required
                value={formPage.form.province}
              />
              <TextField
                label="Kode pos"
                name="postal_code"
                onChange={formPage.handleFieldChange}
                value={formPage.form.postal_code}
              />
              <TextField
                label="ID region"
                name="region_id"
                onChange={formPage.handleFieldChange}
                type="number"
                value={formPage.form.region_id}
              />
              <TextField
                label="ID area"
                name="area_id"
                onChange={formPage.handleFieldChange}
                type="number"
                value={formPage.form.area_id}
              />
              <SelectField
                includeEmpty
                label="Kepemilikan"
                name="ownership_type"
                onChange={formPage.handleFieldChange}
                options={depotOwnershipOptions}
                value={formPage.form.ownership_type}
              />
              <TextField
                label="Latitude"
                name="latitude"
                onChange={formPage.handleFieldChange}
                step="any"
                type="number"
                value={formPage.form.latitude}
              />
              <TextField
                label="Longitude"
                name="longitude"
                onChange={formPage.handleFieldChange}
                step="any"
                type="number"
                value={formPage.form.longitude}
              />
              <TextField
                label="PIC"
                name="pic_name"
                onChange={formPage.handleFieldChange}
                value={formPage.form.pic_name}
              />
              <TextField
                label="Telepon PIC"
                name="pic_phone"
                onChange={formPage.handleFieldChange}
                value={formPage.form.pic_phone}
              />
              <TextField
                label="Email PIC"
                name="pic_email"
                onChange={formPage.handleFieldChange}
                type="email"
                value={formPage.form.pic_email}
              />
              <TextField
                label="Alamat"
                name="address"
                onChange={formPage.handleFieldChange}
                value={formPage.form.address}
              />
              <label className="lg:col-span-3">
                <span className="text-sm font-bold text-neutral-800">
                  Deskripsi
                </span>
                <textarea
                  className="mt-2 min-h-24 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
                  name="description"
                  onChange={formPage.handleFieldChange}
                  value={formPage.form.description}
                />
              </label>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-zinc-200 px-5 py-4">
            <button
              className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={formPage.cancelForm}
              type="button"
            >
              Batal
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={formPage.isLoading || formPage.isSubmitting}
              type="submit"
            >
              <IoSaveOutline aria-hidden="true" className="text-lg" />
              {formPage.isSubmitting ? "Menyimpan..." : "Simpan depot"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

type DepotFormState = ReturnType<typeof useDepotFormPage>;

type BaseFieldProps = {
  label: string;
  name: string;
  onChange: DepotFormState["handleFieldChange"];
  required?: boolean;
  value: string;
};

function TextField({
  label,
  name,
  onChange,
  required,
  type = "text",
  value,
  step,
}: BaseFieldProps & { type?: string; step?: string }) {
  return (
    <label>
      <span className="text-sm font-bold text-neutral-800">{label}</span>
      <input
        className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-[#232122] outline-none transition focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
        name={name}
        onChange={onChange}
        required={required}
        step={step}
        type={type}
        value={value}
      />
    </label>
  );
}

function SelectField({
  includeEmpty,
  label,
  name,
  onChange,
  options,
  required,
  value,
}: BaseFieldProps & {
  includeEmpty?: boolean;
  options: Array<{ value: string; label: string }>;
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
        {includeEmpty ? <option value="">-</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
