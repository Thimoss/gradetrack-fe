"use client";

import { useState } from "react";
import { IoCheckmarkCircle, IoChevronForwardOutline } from "react-icons/io5";
import type {
  TasklistCycle,
  TasklistDepotOption,
  TasklistStep,
  TasklistEquipmentType,
} from "@/hooks/use-tasklist-page";
import { TemplateDownloadLink } from "@/components/template-download-link";

type TasklistSelectionFlowProps = {
  step: TasklistStep;
  availableCycles: TasklistCycle[];
  depots: TasklistDepotOption[];
  isLoadingDepots: boolean;
  isLoadingEquipment: boolean;
  isLoadingTemplate: boolean;
  selectedDepotId: string;
  selectedEquipmentType: TasklistEquipmentType;
  selectionError: string | null;
  onDepotChange: (value: string) => void;
  onSubmitDepot: () => void;
  onEquipmentTypeChange: (value: TasklistEquipmentType) => void;
  onSubmitEquipment: () => void;
  onSubmitCycle: (cycle: TasklistCycle) => void;
};

const equipmentOptions: Array<{
  value: TasklistEquipmentType;
  label: string;
  description: string;
}> = [
  {
    value: "GST",
    label: "Genset",
    description: "Tasklist GST mingguan, bulanan, 6 bulanan, dan tahunan.",
  },
  {
    value: "MOV",
    label: "Motor Operated Valve",
    description: "Tasklist MOV harian, bulanan, dan tahunan.",
  },
  {
    value: "MTR",
    label: "Meter Arus",
    description: "Tasklist MTR harian, mingguan, dan tahunan.",
  },
  {
    value: "PIP",
    label: "Sistem Perpipaan",
    description: "Tasklist PIP bulanan dan tahunan.",
  },
  {
    value: "PMP",
    label: "Pompa Produk",
    description: "Tasklist PMP harian, bulanan, dan 6 bulanan.",
  },
  {
    value: "SGR",
    label: "Switch Gear",
    description: "Tasklist SGR bulanan dan tahunan.",
  },
  {
    value: "TNK",
    label: "Tangki",
    description: "Tasklist TNK bulanan dan tahunan.",
  },
  {
    value: "TRF",
    label: "Transformer",
    description: "Tasklist TRF mingguan dan 6 bulanan.",
  },
  {
    value: "UPS",
    label: "UPS",
    description: "Tasklist UPS bulanan dan tahunan.",
  },
];

const cycleOptionMap: Record<
  TasklistCycle,
  {
    label: string;
    description: string;
  }
> = {
  DAILY: {
    label: "Harian",
    description: "Task rutin harian.",
  },
  WEEKLY: {
    label: "Mingguan",
    description: "Task rutin mingguan.",
  },
  MONTHLY: {
    label: "Bulanan",
    description: "Task rutin bulanan.",
  },
  SIX_MONTHLY: {
    label: "6 Bulanan",
    description: "Task perawatan enam bulanan.",
  },
  YEARLY: {
    label: "Tahunan",
    description: "Task perawatan tahunan.",
  },
};

const cycleGridClassMap: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

const fallbackCycleGridClass = "lg:grid-cols-4";

function buildCycleOptions(availableCycles: TasklistCycle[]) {
  return availableCycles.map((value) => ({
    value,
    ...cycleOptionMap[value],
  }));
}

function getSelectedEquipmentLabel(value: TasklistEquipmentType) {
  return (
    equipmentOptions.find((option) => option.value === value)?.label ?? value
  );
}

export function TasklistSelectionFlow({
  step,
  availableCycles,
  depots,
  isLoadingDepots,
  isLoadingEquipment,
  isLoadingTemplate,
  selectedDepotId,
  selectedEquipmentType,
  selectionError,
  onDepotChange,
  onSubmitDepot,
  onEquipmentTypeChange,
  onSubmitEquipment,
  onSubmitCycle,
}: TasklistSelectionFlowProps) {
  const [downloadEquipmentType, setDownloadEquipmentType] =
    useState<TasklistEquipmentType>(selectedEquipmentType);

  if (step === "form") return null;

  const cycleOptions = buildCycleOptions(availableCycles);
  const cycleGridClass =
    cycleGridClassMap[cycleOptions.length] ?? fallbackCycleGridClass;

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-[#036CB6]">
        Input Tasklist
      </p>
      <h1 className="mt-2 text-2xl font-bold text-[#232122]">
        {step === "depot"
          ? "Pilih depot"
          : step === "equipment"
            ? "Pilih equipment"
            : "Pilih siklus tasklist"}
      </h1>

      {selectionError ? (
        <p className="mt-4 rounded-lg border border-[#f6b9c0] bg-[#FDE8EB] px-3 py-2 text-sm font-semibold text-[#E91D32]">
          {selectionError}
        </p>
      ) : null}

      {step === "depot" ? (
        <div className="mt-5 space-y-4">
          <label className="block" htmlFor="tasklist-depot-select">
            <span className="text-sm font-semibold text-neutral-700">
              Lokasi survey
            </span>
            <select
              className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-[#232122] outline-none focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
              disabled={isLoadingDepots}
              id="tasklist-depot-select"
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
          <button
            className="h-10 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!selectedDepotId || isLoadingDepots}
            onClick={onSubmitDepot}
            type="button"
          >
            Lanjut Pilih Equipment
          </button>
        </div>
      ) : step === "equipment" ? (
        <>
          <div className="mt-5 grid gap-3 rounded-lg border border-zinc-200 bg-slate-50 p-4 lg:grid-cols-[minmax(0,1fr)_280px_auto] lg:items-end">
            <div>
              <p className="text-sm font-bold text-[#232122]">
                Unduh PDF tasklist
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">
                Gunakan jika perlu lembar bantu. Untuk input digital, pilih
                equipment pada daftar di bawah.
              </p>
            </div>
            <label>
              <span className="text-xs font-bold uppercase text-neutral-500">
                Jenis equipment
              </span>
              <select
                className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-[#232122] outline-none focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
                onChange={(event) =>
                  setDownloadEquipmentType(
                    event.target.value as TasklistEquipmentType,
                  )
                }
                value={downloadEquipmentType}
              >
                {equipmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <TemplateDownloadLink
              className="h-10 border-[#036CB6] bg-white text-[#036CB6] hover:bg-[#E6F1FA]"
              equipmentType={downloadEquipmentType}
              kind="tasklist"
            >
              Unduh PDF
            </TemplateDownloadLink>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {equipmentOptions.map((option) => {
              const isSelected = selectedEquipmentType === option.value;

              return (
                <article
                  className={`flex min-h-40 flex-col rounded-lg border bg-white transition ${
                    isSelected
                      ? "border-[#036CB6] shadow-sm ring-2 ring-[#E6F1FA]"
                      : "border-zinc-200 hover:border-[#8ec5e8] hover:bg-[#E6F1FA]"
                  }`}
                  key={option.value}
                >
                  <button
                    aria-pressed={isSelected}
                    className="flex flex-1 flex-col p-4 text-left"
                    onClick={() => onEquipmentTypeChange(option.value)}
                    type="button"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="block text-sm font-bold text-[#232122]">
                        {option.label}
                      </span>
                      {isSelected ? (
                        <IoCheckmarkCircle
                          aria-hidden="true"
                          className="shrink-0 text-xl text-[#036CB6]"
                        />
                      ) : null}
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-neutral-500">
                      {option.description}
                    </span>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-xs font-bold uppercase text-neutral-500">
                Equipment dipilih
              </p>
              <p className="mt-1 text-sm font-bold text-[#232122]">
                {getSelectedEquipmentLabel(selectedEquipmentType)}
              </p>
            </div>
            <button
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#036CB6] px-4 text-sm font-semibold text-white transition hover:bg-[#025894] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoadingEquipment || isLoadingTemplate}
              onClick={onSubmitEquipment}
              type="button"
            >
              Lanjut pilih siklus
              <IoChevronForwardOutline aria-hidden="true" className="text-lg" />
            </button>
          </div>
        </>
      ) : (
        <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${cycleGridClass}`}>
          {cycleOptions.map((option) => (
            <button
              className="rounded-lg border border-zinc-200 bg-white p-4 text-left transition hover:border-[#8ec5e8] hover:bg-[#E6F1FA]"
              key={option.value}
              onClick={() => onSubmitCycle(option.value)}
              type="button"
            >
              <span className="block text-sm font-bold text-[#232122]">
                {option.label}
              </span>
              <span className="mt-1 block text-xs text-neutral-500">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      )}

    </section>
  );
}
