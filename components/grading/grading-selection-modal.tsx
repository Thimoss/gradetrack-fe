"use client";

import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
} from "react-icons/io5";
import type {
  GradingDepotOption,
  GradingEquipmentOption,
  GradingEquipmentType,
  GradingStep,
} from "@/hooks/use-grading-page";

type GradingSelectionModalProps = {
  step: GradingStep;
  assessmentDate: string;
  depots: GradingDepotOption[];
  equipmentOptions: GradingEquipmentOption[];
  isLoadingDepots: boolean;
  isLoadingEquipment: boolean;
  selectedDepotId: string;
  selectedEquipmentType: GradingEquipmentType;
  selectionError: string | null;
  onAssessmentDateChange: (value: string) => void;
  onDepotChange: (value: string) => void;
  onEquipmentTypeChange: (type: GradingEquipmentType) => void;
  onClose: () => void;
  onSubmitDate: () => void;
  onSubmitLocation: () => void;
  onSubmitEquipment: () => void;
};

export function GradingSelectionModal({
  step,
  assessmentDate,
  depots,
  equipmentOptions,
  isLoadingDepots,
  isLoadingEquipment,
  selectedDepotId,
  selectedEquipmentType,
  selectionError,
  onAssessmentDateChange,
  onDepotChange,
  onEquipmentTypeChange,
  onClose,
  onSubmitDate,
  onSubmitLocation,
  onSubmitEquipment,
}: GradingSelectionModalProps) {
  if (step !== "date" && step !== "location" && step !== "equipment") return null;

  const isDateStep = step === "date";
  const isLocationStep = step === "location";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#036CB6]/55 px-4 py-6">
      <div
        aria-modal="true"
        className="flex max-h-[calc(100dvh-8rem)] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl sm:max-h-[calc(100dvh-4rem)]"
        role="dialog"
      >
        <div className="shrink-0 flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#036CB6]">
              Input Grading
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#232122]">
              {isDateStep
                ? "Pilih tanggal penilaian"
                : isLocationStep
                  ? "Pilih depot"
                  : "Pilih jenis equipment"}
            </h2>
          </div>
          <button
            aria-label="Tutup modal"
            className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200 text-slate-700 transition hover:bg-slate-50"
            onClick={onClose}
            type="button"
          >
            <IoCloseOutline aria-hidden="true" className="text-xl" />
          </button>
        </div>

        {isDateStep ? (
          <form
            className="space-y-5 p-5"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitDate();
            }}
          >
            <label className="block" htmlFor="assessment-date">
              <span className="text-sm font-semibold text-neutral-700">
                Tanggal penilaian
              </span>
              <span className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 focus-within:border-[#036CB6] focus-within:ring-2 focus-within:ring-[#E6F1FA]">
                <IoCalendarOutline
                  aria-hidden="true"
                  className="text-xl text-slate-500"
                />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-[#232122] outline-none"
                  id="assessment-date"
                  onChange={(event) => onAssessmentDateChange(event.target.value)}
                  required
                  type="date"
                  value={assessmentDate}
                />
              </span>
            </label>
            <div className="flex justify-end gap-3">
              <button
                className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={onClose}
                type="button"
              >
                Batal
              </button>
              <button
                className="h-10 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894]"
                type="submit"
              >
                Lanjut
              </button>
            </div>
          </form>
        ) : isLocationStep ? (
          <form
            className="space-y-5 p-5"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmitLocation();
            }}
          >
            <label className="block" htmlFor="grading-depot-select">
              <span className="text-sm font-semibold text-neutral-700">
                Lokasi survey
              </span>
              <select
                className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-[#232122] outline-none focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
                disabled={isLoadingDepots}
                id="grading-depot-select"
                onChange={(event) => onDepotChange(event.target.value)}
                required
                value={selectedDepotId}
              >
                <option value="">Pilih depot</option>
                {depots.map((depot) => (
                  <option key={depot.id} value={depot.id}>
                    {depot.depot_name} ({depot.depot_code})
                  </option>
                ))}
              </select>
            </label>
            {selectionError ? (
              <p className="rounded-lg border border-[#f6b9c0] bg-[#FDE8EB] px-3 py-2 text-sm font-semibold text-[#E91D32]">
                {selectionError}
              </p>
            ) : null}
            <div className="flex justify-end gap-3">
              <button
                className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={onClose}
                type="button"
              >
                Batal
              </button>
              <button
                className="h-10 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={!selectedDepotId || isLoadingDepots}
                type="submit"
              >
                Lanjut
              </button>
            </div>
          </form>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {selectionError ? (
                <p className="mb-4 rounded-lg border border-[#f6b9c0] bg-[#FDE8EB] px-3 py-2 text-sm font-semibold text-[#E91D32]">
                  {selectionError}
                </p>
              ) : null}
              {isLoadingEquipment ? (
                <p className="rounded-lg border border-zinc-200 bg-slate-50 px-3 py-4 text-sm font-semibold text-slate-600">
                  Memuat equipment...
                </p>
              ) : null}
              <div className="grid gap-3 sm:grid-cols-2">
              {equipmentOptions.map((option) => {
                const isSelected = option.type === selectedEquipmentType;
                const equipmentCount = option.tags.length;

                return (
                  <button
                    className={`rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? "border-[#036CB6] bg-[#036CB6] text-white"
                        : "border-zinc-200 bg-white text-[#232122] hover:border-[#8ec5e8] hover:bg-[#E6F1FA]"
                    }`}
                    key={option.type}
                    onClick={() => onEquipmentTypeChange(option.type)}
                    type="button"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span>
                        <span className="block text-sm font-bold">
                          {option.label}
                        </span>
                        <span
                          className={`mt-1 block text-xs ${
                            isSelected ? "text-slate-200" : "text-neutral-500"
                          }`}
                        >
                          {option.description} {equipmentCount} equipment.
                        </span>
                      </span>
                      {isSelected ? (
                        <IoCheckmarkCircleOutline
                          aria-hidden="true"
                          className="shrink-0 text-xl"
                        />
                      ) : null}
                    </span>
                  </button>
                );
              })}
              </div>
            </div>
            <div className="shrink-0 flex justify-end gap-3 border-t border-zinc-200 bg-white p-5">
              <button
                className="h-10 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={onClose}
                type="button"
              >
                Batal
              </button>
              <button
                className="h-10 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894]"
                disabled={
                  isLoadingEquipment ||
                  !equipmentOptions.find(
                    (option) => option.type === selectedEquipmentType,
                  )?.tags.length
                }
                onClick={onSubmitEquipment}
                type="button"
              >
                Buka Form
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
