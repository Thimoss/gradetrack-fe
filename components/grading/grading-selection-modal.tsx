"use client";

import {
  IoCalendarOutline,
  IoCheckmarkCircleOutline,
  IoCloseOutline,
} from "react-icons/io5";
import type {
  GradingEquipmentOption,
  GradingEquipmentType,
  GradingStep,
} from "@/hooks/use-grading-page";

type GradingSelectionModalProps = {
  step: GradingStep;
  assessmentDate: string;
  equipmentOptions: GradingEquipmentOption[];
  selectedEquipmentType: GradingEquipmentType;
  onAssessmentDateChange: (value: string) => void;
  onEquipmentTypeChange: (type: GradingEquipmentType) => void;
  onClose: () => void;
  onSubmitDate: () => void;
  onSubmitEquipment: () => void;
};

export function GradingSelectionModal({
  step,
  assessmentDate,
  equipmentOptions,
  selectedEquipmentType,
  onAssessmentDateChange,
  onEquipmentTypeChange,
  onClose,
  onSubmitDate,
  onSubmitEquipment,
}: GradingSelectionModalProps) {
  if (step !== "date" && step !== "equipment") return null;

  const isDateStep = step === "date";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4 py-6">
      <div
        aria-modal="true"
        className="flex max-h-[calc(100dvh-8rem)] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-2xl sm:max-h-[calc(100dvh-4rem)]"
        role="dialog"
      >
        <div className="shrink-0 flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
              Input Grading
            </p>
            <h2 className="mt-1 text-xl font-bold text-neutral-950">
              {isDateStep ? "Pilih tanggal penilaian" : "Pilih jenis equipment"}
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
              <span className="mt-2 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-100">
                <IoCalendarOutline
                  aria-hidden="true"
                  className="text-xl text-slate-500"
                />
                <input
                  className="w-full bg-transparent text-sm font-semibold text-neutral-950 outline-none"
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
                className="h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                type="submit"
              >
                Lanjut
              </button>
            </div>
          </form>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              <div className="grid gap-3 sm:grid-cols-2">
              {equipmentOptions.map((option) => {
                const isSelected = option.type === selectedEquipmentType;

                return (
                  <button
                    className={`rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-zinc-200 bg-white text-neutral-950 hover:border-sky-300 hover:bg-sky-50"
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
                          {option.description}
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
                className="h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
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
