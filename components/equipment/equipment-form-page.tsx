"use client";

import {
  IoArrowBackOutline,
  IoBuildOutline,
  IoSaveOutline,
} from "react-icons/io5";
import {
  equipmentTypeOptions,
} from "@/hooks/use-equipment-page";
import { useEquipmentFormPage } from "@/hooks/use-equipment-form-page";

type EquipmentFormPageProps = {
  equipmentId?: string;
};

export function EquipmentFormPage({ equipmentId }: EquipmentFormPageProps) {
  const page = useEquipmentFormPage(equipmentId);
  const title = page.isEditMode ? "Edit equipment" : "Tambah equipment";
  const needsMaker = page.form.equipmentType !== "MOTOR_OPERATED_VALVE_MOV";
  const needsTagNumber = page.form.equipmentType !== "PIPING_SYSTEM_PIP";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <form onSubmit={page.submitEquipment}>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
                <IoBuildOutline aria-hidden="true" className="text-xl" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
                  Master Data
                </p>
                <h1 className="text-2xl font-bold text-neutral-950">{title}</h1>
                <p className="mt-1 text-sm text-neutral-500">
                  Isi data equipment untuk grading dan tasklist.
                </p>
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
            <div className="border-b border-red-200 bg-red-50 px-5 py-3 text-sm font-medium text-red-700">
              {page.error}
            </div>
          ) : null}

          {page.isLoading ? (
            <div className="p-5 text-sm text-neutral-500">
              Memuat equipment...
            </div>
          ) : (
            <div className="grid gap-5 p-5">
              <div className="grid gap-4 lg:grid-cols-3">
                <SelectField
                  disabled={page.isEditMode}
                  label="Jenis equipment"
                  name="equipmentType"
                  onChange={page.handleFieldChange}
                  options={equipmentTypeOptions}
                  required
                  value={page.form.equipmentType}
                />
                <SelectField
                  disabled={page.isEditMode}
                  includeEmpty
                  label="Lokasi tugas (depot)"
                  name="depot_id"
                  onChange={page.handleFieldChange}
                  options={page.depots.map((depot) => ({
                    value: String(depot.id),
                    label: `${depot.depot_name} (${depot.depot_code})`,
                  }))}
                  required={!page.isEditMode}
                  value={page.form.depot_id}
                />
                {needsTagNumber ? (
                  <TextField
                    label="Nomor tag"
                    name="tagNumber"
                    onChange={page.handleFieldChange}
                    required
                    value={page.form.tagNumber}
                  />
                ) : null}
                <TextField
                  label="Serial number"
                  name="serialNumber"
                  onChange={page.handleFieldChange}
                  required={page.form.equipmentType !== "MOTOR_OPERATED_VALVE_MOV"}
                  value={page.form.serialNumber}
                />
                {needsMaker ? (
                  <>
                    <TextField
                      label="Manufacturer"
                      name="manufacturer"
                      onChange={page.handleFieldChange}
                      required={page.form.equipmentType !== "UNINTERRUPTIBLE_POWER_SYSTEM_UPS"}
                      value={page.form.manufacturer}
                    />
                    <TextField
                      label="Model"
                      name="model"
                      onChange={page.handleFieldChange}
                      required={
                        page.form.equipmentType !== "STORAGE_TANK_TNK1" &&
                        page.form.equipmentType !== "SPHERICAL_TANK_TNK2" &&
                        page.form.equipmentType !== "UNINTERRUPTIBLE_POWER_SYSTEM_UPS"
                      }
                      value={page.form.model}
                    />
                  </>
                ) : null}
                <TextField
                  label="Tahun pembuatan"
                  name="manufactureYear"
                  onChange={page.handleFieldChange}
                  required={page.form.equipmentType !== "MOTOR_OPERATED_VALVE_MOV"}
                  type="number"
                  value={page.form.manufactureYear}
                />
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-950">
                  Spesifikasi wajib
                </p>
                <div className="mt-3 grid gap-4 lg:grid-cols-3">
                  {page.requiredFields.map((field) => (
                    <TextField
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      onChange={page.handleExtraFieldChange}
                      required
                      step={field.step}
                      type={field.type ?? "text"}
                      value={page.form.extra[field.name] ?? ""}
                    />
                  ))}
                  {page.requiredFields.length === 0 ? (
                    <div className="rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-neutral-500 lg:col-span-3">
                      Tipe ini hanya membutuhkan data identitas utama.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-zinc-200 px-5 py-4">
            <button
              className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              onClick={page.cancelForm}
              type="button"
            >
              Batal
            </button>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={page.isLoading || page.isSubmitting}
              type="submit"
            >
              <IoSaveOutline aria-hidden="true" className="text-lg" />
              {page.isSubmitting ? "Menyimpan..." : "Simpan equipment"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

type EquipmentFormState = ReturnType<typeof useEquipmentFormPage>;

type BaseFieldProps = {
  disabled?: boolean;
  label: string;
  name: string;
  onChange: EquipmentFormState["handleFieldChange"];
  required?: boolean;
  value: string;
};

function TextField({
  disabled,
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
        className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-100 disabled:text-neutral-500"
        disabled={disabled}
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
  disabled,
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
        className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100 disabled:bg-slate-100 disabled:text-neutral-500"
        disabled={disabled}
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
