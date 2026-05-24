import type {
  TasklistCycle,
  TasklistStep,
  TasklistEquipmentType,
} from "@/hooks/use-tasklist-page";

type TasklistSelectionFlowProps = {
  step: TasklistStep;
  availableCycles: TasklistCycle[];
  selectedEquipmentType: TasklistEquipmentType;
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
  selectedEquipmentType,
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
        {step === "equipment" ? "Pilih equipment" : "Pilih siklus tasklist"}
      </h1>

      {step === "equipment" ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentOptions.map((option) => {
            const isSelected = selectedEquipmentType === option.value;

            return (
              <button
                className={`rounded-lg border p-4 text-left transition ${
                  isSelected
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-zinc-200 bg-white text-neutral-950 hover:bg-slate-50"
                }`}
                key={option.value}
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
          className="mt-5 h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          onClick={onSubmitEquipment}
          type="button"
        >
          Lanjut Pilih Siklus
        </button>
      ) : null}
    </section>
  );
}
