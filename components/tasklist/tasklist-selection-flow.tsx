import type {
  GeneratorTasklistCycle,
  GeneratorTasklistStep,
} from "@/hooks/use-generator-tasklist-page";

type TasklistSelectionFlowProps = {
  step: GeneratorTasklistStep;
  selectedEquipmentType: string;
  onEquipmentTypeChange: (value: string) => void;
  onSubmitEquipment: () => void;
  onSubmitCycle: (cycle: GeneratorTasklistCycle) => void;
};

const equipmentOptions = [
  {
    value: "GST",
    label: "Generator",
    description: "Tasklist generator set.",
  },
];

const cycleOptions: Array<{
  value: GeneratorTasklistCycle;
  label: string;
  description: string;
}> = [
  {
    value: "WEEKLY",
    label: "Mingguan",
    description: "Task rutin mingguan generator.",
  },
  {
    value: "MONTHLY",
    label: "Bulanan",
    description: "Task rutin bulanan generator.",
  },
  {
    value: "SIX_MONTHLY",
    label: "6 Bulanan",
    description: "Task perawatan enam bulanan generator.",
  },
  {
    value: "YEARLY",
    label: "Tahunan",
    description: "Task perawatan tahunan generator.",
  },
];

export function TasklistSelectionFlow({
  step,
  selectedEquipmentType,
  onEquipmentTypeChange,
  onSubmitEquipment,
  onSubmitCycle,
}: TasklistSelectionFlowProps) {
  if (step === "form") return null;

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
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
