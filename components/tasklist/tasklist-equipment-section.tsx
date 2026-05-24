import type {
  TasklistEquipment,
  TasklistTask,
  TasklistPerformance,
} from "@/hooks/use-tasklist-page";

type TasklistEquipmentSectionProps = {
  equipment: TasklistEquipment[];
  tasks: TasklistTask[];
  selectedEquipment: TasklistEquipment;
  selectedEquipmentFinishedCount: number;
  equipmentType: string;
  cycleLabel: string;
  firstEmptyTaskId: string | null;
  executionDate: string;
  remarks: string;
  getPerformance: (taskId: string, equipmentId: string) => TasklistPerformance;
  getMeasuredValue: (taskId: string, equipmentId: string) => string;
  onEquipmentChange: (equipmentId: string) => void;
  onExecutionDateChange: (value: string) => void;
  onPerformanceChange: (
    taskId: string,
    equipmentId: string,
    performance: TasklistPerformance,
  ) => void;
  onMeasuredValueChange: (
    taskId: string,
    equipmentId: string,
    measuredValue: string,
  ) => void;
  onRemarksChange: (value: string) => void;
};

const performanceOptions: Array<{
  value: Exclude<TasklistPerformance, "">;
  label: string;
  helper: string;
  className: string;
}> = [
  {
    value: "H",
    label: "H",
    helper: "High",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    value: "M",
    label: "M",
    helper: "Med",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  {
    value: "L",
    label: "L",
    helper: "Low",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
];

function getTaskStatusClass(performance: TasklistPerformance) {
  if (performance === "H") return "border-emerald-200 bg-emerald-50";
  if (performance === "M") return "border-amber-200 bg-amber-50";
  if (performance === "L") return "border-rose-200 bg-rose-50";

  return "border-zinc-200 bg-white";
}

export function TasklistEquipmentSection({
  equipment,
  tasks,
  selectedEquipment,
  selectedEquipmentFinishedCount,
  equipmentType,
  cycleLabel,
  firstEmptyTaskId,
  executionDate,
  remarks,
  getPerformance,
  getMeasuredValue,
  onEquipmentChange,
  onExecutionDateChange,
  onMeasuredValueChange,
  onPerformanceChange,
  onRemarksChange,
}: TasklistEquipmentSectionProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-slate-50 px-5 py-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">
            Rutin : {equipmentType} ({cycleLabel})
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Pilih satu equipment, lalu isi semua task untuk equipment tersebut.
          </p>
        </div>
        <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white">
          {selectedEquipmentFinishedCount}/{tasks.length} task selesai
        </div>
      </div>

      <div className="border-b border-zinc-200 p-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {equipment.map((item) => {
            const isActive = item.id === selectedEquipment.id;

            return (
              <button
                className={`h-11 shrink-0 rounded-lg border px-4 text-sm font-bold transition ${
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-zinc-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                key={item.id}
                onClick={() => onEquipmentChange(item.id)}
                type="button"
              >
                {item.tagNumber}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 p-5">
        {tasks.map((task) => {
          const resultPerformance = getPerformance(task.id, selectedEquipment.id);
          const performance = resultPerformance;
          const isFirstEmptyTask = firstEmptyTaskId === task.id;

          return (
            <article
              className={`rounded-lg border p-4 transition ${
                isFirstEmptyTask
                  ? "border-sky-500 bg-sky-50 ring-2 ring-sky-100"
                  : getTaskStatusClass(performance)
              }`}
              id={`tasklist-task-${task.id}`}
              key={task.id}
            >
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-700 shadow-sm">
                      {task.code}
                    </span>
                    <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-neutral-500 shadow-sm">
                      {task.durationMinutes} menit
                    </span>
                  </div>
                  <h3 className="mt-3 text-base font-bold uppercase text-neutral-950">
                    {task.description}
                  </h3>
                  <div className="mt-4 grid gap-3 text-sm leading-6 text-neutral-700 md:grid-cols-2">
                    <div className="rounded-lg bg-white/80 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                        Procedure
                      </p>
                      <p className="mt-1">{task.procedure}</p>
                    </div>
                    <div className="rounded-lg bg-white/80 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                        Acceptance Criteria
                      </p>
                      <p className="mt-1">{task.acceptanceCriteria}</p>
                    </div>
                  </div>
                </div>

                <div>
                  {task.inputType === "MEASUREMENT" ? (
                    <label className="mb-4 block" htmlFor={`${task.id}-value`}>
                      <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                        {task.measurementLabel ?? "Nilai"}{" "}
                        {task.measurementUnit ? `(${task.measurementUnit})` : ""}
                      </span>
                      <input
                        className="mt-2 h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-neutral-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                        id={`${task.id}-value`}
                        onChange={(event) =>
                          onMeasuredValueChange(
                            task.id,
                            selectedEquipment.id,
                            event.target.value,
                          )
                        }
                        placeholder="Masukkan nilai"
                        type="text"
                        value={getMeasuredValue(task.id, selectedEquipment.id)}
                      />
                    </label>
                  ) : null}
                  <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                    Performance
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {performanceOptions.map((option) => {
                      const isSelected = performance === option.value;

                      return (
                        <button
                          className={`rounded-lg border px-3 py-3 text-center transition ${
                            isSelected
                              ? `${option.className} ring-2 ring-white`
                              : "border-zinc-200 bg-white text-neutral-600 hover:bg-slate-50"
                          }`}
                          key={option.value}
                          onClick={() =>
                            onPerformanceChange(
                              task.id,
                              selectedEquipment.id,
                              option.value,
                            )
                          }
                          type="button"
                        >
                          <span className="block text-xl font-black">
                            {option.label}
                          </span>
                          <span className="text-xs font-semibold">
                            {option.helper}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    className="mt-2 h-9 w-full rounded-lg border border-zinc-200 bg-white text-xs font-semibold text-neutral-500 transition hover:bg-slate-50"
                    onClick={() =>
                      onPerformanceChange(task.id, selectedEquipment.id, "")
                    }
                    type="button"
                  >
                    Kosongkan
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 border-t border-zinc-200 p-5">
        <label className="block max-w-sm" htmlFor="tasklist-execution-date">
          <span className="text-sm font-bold text-neutral-700">
            Tanggal Pelaksanaan
          </span>
          <input
            className="mt-2 h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-neutral-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            id="tasklist-execution-date"
            onChange={(event) => onExecutionDateChange(event.target.value)}
            type="date"
            value={executionDate}
          />
        </label>
        <label className="block" htmlFor="tasklist-remarks">
          <span className="text-sm font-bold text-neutral-700">Keterangan</span>
          <textarea
            className="mt-2 h-24 w-full resize-none rounded-lg border border-zinc-200 bg-white p-3 text-sm text-neutral-950 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            id="tasklist-remarks"
            onChange={(event) => onRemarksChange(event.target.value)}
            value={remarks}
          />
        </label>
      </div>
    </section>
  );
}
