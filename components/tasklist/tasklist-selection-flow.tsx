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
  if (step === "form") return null;

  const cycleOptions = buildCycleOptions(availableCycles);
  const cycleGridClass =
    cycleGridClassMap[cycleOptions.length] ?? fallbackCycleGridClass;

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
        Input Tasklist
      </p>
      <h1 className="mt-2 text-2xl font-bold text-neutral-950">
        {step === "depot"
          ? "Pilih depot"
          : step === "equipment"
            ? "Pilih equipment"
            : "Pilih siklus tasklist"}
      </h1>

      {selectionError ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
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
              className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-neutral-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
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
            className="h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!selectedDepotId || isLoadingDepots}
            onClick={onSubmitDepot}
            type="button"
          >
            Lanjut Pilih Equipment
          </button>
        </div>
      ) : step === "equipment" ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentOptions.map((option) => {
            const isSelected = selectedEquipmentType === option.value;

            return (
              <article
                className={`rounded-lg border p-4 transition ${
                  isSelected
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-zinc-200 bg-white text-neutral-950"
                }`}
                key={option.value}
              >
                <button
                  className="block w-full text-left"
                  onClick={() => onEquipmentTypeChange(option.value)}
                  type="button"
                >
                  <span className="block text-sm font-bold">{option.label}</span>
                  <span
                    className={`mt-1 block text-xs ${
                      isSelected ? "text-slate-200" : "text-neutral-500"
                    }`}
                  >
                    {option.description}
                  </span>
                </button>
                <TemplateDownloadLink
                  className={`mt-4 h-9 w-full ${
                    isSelected
                      ? "border-slate-700 bg-white text-slate-950 hover:bg-slate-100"
                      : ""
                  }`}
                  equipmentType={option.value}
                  kind="tasklist"
                >
                  Download PDF
                </TemplateDownloadLink>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={`mt-5 grid gap-3 sm:grid-cols-2 ${cycleGridClass}`}>
          {cycleOptions.map((option) => (
            <button
              className="rounded-lg border border-zinc-200 bg-white p-4 text-left transition hover:border-sky-300 hover:bg-sky-50"
              key={option.value}
              onClick={() => onSubmitCycle(option.value)}
              type="button"
            >
              <span className="block text-sm font-bold text-neutral-950">
                {option.label}
              </span>
              <span className="mt-1 block text-xs text-neutral-500">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      )}

      {step === "equipment" ? (
        <button
          className="mt-5 h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoadingEquipment || isLoadingTemplate}
          onClick={onSubmitEquipment}
          type="button"
        >
          Lanjut Pilih Siklus
        </button>
      ) : null}
    </section>
  );
}
