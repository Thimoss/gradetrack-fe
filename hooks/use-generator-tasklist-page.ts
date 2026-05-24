"use client";

import { useMemo, useState } from "react";

export type TasklistPerformance = "H" | "M" | "L" | "";
export type GeneratorTasklistCycle =
  | "WEEKLY"
  | "MONTHLY"
  | "SIX_MONTHLY"
  | "YEARLY";
export type GeneratorTasklistStep = "equipment" | "cycle" | "form";

export type GeneratorTasklistTask = {
  id: string;
  code: string;
  description: string;
  durationMinutes: number;
  procedure: string;
  acceptanceCriteria: string;
  inputType: "PERFORMANCE_ONLY" | "MEASUREMENT";
  measurementLabel?: string;
  measurementUnit?: string;
};

export type GeneratorTasklistEquipment = {
  id: string;
  tagNumber: string;
};

export type GeneratorTasklistResult = {
  taskId: string;
  equipmentId: string;
  performance: TasklistPerformance;
  measuredValue: string;
};

const generatorEquipment: GeneratorTasklistEquipment[] = Array.from(
  { length: 7 },
  (_, index) => ({
    id: `EQ-GST-${index + 1}`,
    tagNumber: `GST-${String(index + 1).padStart(2, "0")}`,
  }),
);

const generatorWeeklyTasks: GeneratorTasklistTask[] = [
  {
    id: "GST-WEEKLY-C1A",
    code: "c.1.a",
    description: "Jalankan generator tanpa beban",
    durationMinutes: 30,
    procedure:
      "Operasi dalam mode local/manual. Circuit breaker menuju beban dalam kondisi opened, lakukan running genset selama 30 menit tanpa beban.",
    acceptanceCriteria:
      "Genset dapat berjalan tanpa kendala. Tegangan, frekuensi, dan kecepatan sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1B",
    code: "c.1.b",
    description: "Periksa indikator pada panel kontrol",
    durationMinutes: 5,
    procedure:
      "Memeriksa indikasi pada display panel kontrol, lamp indicator pada panel kontrol.",
    acceptanceCriteria:
      "Tidak ada indikasi warning dan fault. Lamp indicator menyala atau mati sesuai fungsi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1C",
    code: "c.1.c",
    description: "Periksa level cairan pendingin",
    durationMinutes: 5,
    procedure: "Memeriksa level cairan pendingin.",
    acceptanceCriteria: "Sesuai dengan batas garis rekomendasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1D",
    code: "c.1.d",
    description: "Periksa level oli mesin",
    durationMinutes: 5,
    procedure: "Memeriksa level oli mesin.",
    acceptanceCriteria: "Sesuai dengan batas garis rekomendasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1E",
    code: "c.1.e",
    description: "Periksa level bahan bakar",
    durationMinutes: 5,
    procedure: "Memeriksa level bahan bakar.",
    acceptanceCriteria: "Dalam level penuh, siap untuk dioperasikan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1F",
    code: "c.1.f",
    description: "Periksa mode operasi auto/standby",
    durationMinutes: 5,
    procedure: "Memastikan operasi genset dalam mode auto/standby.",
    acceptanceCriteria: "Dalam mode auto/standby.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1G",
    code: "c.1.g",
    description: "Periksa kebocoran",
    durationMinutes: 5,
    procedure:
      "Memeriksa apabila ada kebocoran cairan pendingin, oli mesin, dan bahan bakar.",
    acceptanceCriteria: "Tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1H",
    code: "c.1.h",
    description: "Periksa sambungan baterai",
    durationMinutes: 5,
    procedure: "Memeriksa kabel yang terhubung dengan terminal baterai.",
    acceptanceCriteria: "Tidak ada yang longgar dan lepas.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const generatorMonthlyTasks: GeneratorTasklistTask[] = [
  {
    id: "GST-MONTHLY-C2A",
    code: "c.2.a",
    description: "Periksa pondasi",
    durationMinutes: 20,
    procedure: "Memeriksa pondasi dari generator.",
    acceptanceCriteria: "Tidak ada baut yang loose atau hilang.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-MONTHLY-C2B",
    code: "c.2.b",
    description: "Bersihkan filter udara",
    durationMinutes: 20,
    procedure: "Membersihkan filter udara.",
    acceptanceCriteria: "Filter udara bersih.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-MONTHLY-C2C",
    code: "c.2.c",
    description: "Bersihkan fuel water separator",
    durationMinutes: 15,
    procedure:
      "Mengeluarkan air lewat fuel drain valve ke wadah, sampai hanya tersisa bahan bakar saja.",
    acceptanceCriteria:
      "Tidak ada air. Hanya bahan bakar yang keluar pada drain valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-MONTHLY-C2D",
    code: "c.2.d",
    description: "Ukur tegangan baterai",
    durationMinutes: 10,
    procedure: "Mengukur tegangan baterai.",
    acceptanceCriteria: "Sesuai dengan spesifikasi (>= 11,5V).",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "V",
  },
];

const generatorSixMonthlyTasks: GeneratorTasklistTask[] = [
  {
    id: "GST-SIX-MONTHLY-C3A",
    code: "c.3.a",
    description: "Ganti oli mesin",
    durationMinutes: 45,
    procedure: "Ganti oli mesin.",
    acceptanceCriteria: "Beroperasi dengan oli mesin baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-SIX-MONTHLY-C3B",
    code: "c.3.b",
    description: "Ganti filter oli mesin",
    durationMinutes: 15,
    procedure: "Ganti filter oli mesin.",
    acceptanceCriteria: "Beroperasi dengan filter oli mesin baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-SIX-MONTHLY-C3C",
    code: "c.3.c",
    description: "Ganti filter bahan bakar",
    durationMinutes: 45,
    procedure: "Ganti filter bahan bakar.",
    acceptanceCriteria: "Beroperasi dengan filter bahan bakar baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-SIX-MONTHLY-C3D",
    code: "c.3.d",
    description: "Jalankan generator dengan beban",
    durationMinutes: 60,
    procedure:
      "Matikan suplai daya utama (PLN/ATS akan bekerja), running genset selama 60 menit dengan beban yang tersedia.",
    acceptanceCriteria:
      "Genset dapat berjalan tanpa kendala. Tegangan, frekuensi, dan kecepatan sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const generatorYearlyTasks: GeneratorTasklistTask[] = [
  {
    id: "GST-YEARLY-C4A",
    code: "c.4.a",
    description: "Ganti filter udara",
    durationMinutes: 45,
    procedure: "Ganti filter udara.",
    acceptanceCriteria: "Beroperasi dengan filter udara baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4B",
    code: "c.4.b",
    description: "Greasing bearing",
    durationMinutes: 10,
    procedure: "Greasing bearing.",
    acceptanceCriteria: "Tidak ada suara abnormal dan peningkatan getaran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4C",
    code: "c.4.c",
    description: "Lubricate governor ball joints",
    durationMinutes: 10,
    procedure: "Pelumasan pada governor ball joints.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4D",
    code: "c.4.d",
    description: "Bersihkan crankcase breather filter",
    durationMinutes: 20,
    procedure: "Bersihkan crankcase breather filter.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4E",
    code: "c.4.e",
    description: "Flushing sistem pendingin",
    durationMinutes: 90,
    procedure: "Flushing dan penggantian cairan pendingin.",
    acceptanceCriteria: "Beroperasi dengan cairan pendingin baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4F",
    code: "c.4.f",
    description: "Periksa kondisi water pump",
    durationMinutes: 15,
    procedure: "Pengujian sirkulasi sistem pendingin.",
    acceptanceCriteria: "Water pump bekerja untuk sirkulasi dengan baik.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4G",
    code: "c.4.g",
    description: "Periksa engine mounting",
    durationMinutes: 20,
    procedure: "Periksa kekencangan baut.",
    acceptanceCriteria: "Sesuai dengan torsi spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4H",
    code: "c.4.h",
    description: "Periksa governor actuator",
    durationMinutes: 30,
    procedure: "Periksa dan setting ulang governor actuator.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4I",
    code: "c.4.i",
    description: "Periksa kekencangan belt",
    durationMinutes: 15,
    procedure: "Memeriksa kekencangan belt.",
    acceptanceCriteria: "Belt dalam kondisi kekencangan yang sesuai.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4J",
    code: "c.4.j",
    description: "Periksa crankshaft speed sensor",
    durationMinutes: 20,
    procedure: "Periksa dan bersihkan crankshaft speed sensor.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4K",
    code: "c.4.k",
    description: "Periksa grounding generator",
    durationMinutes: 10,
    procedure: "Inspeksi visual instalasi grounding dan pengukuran tahanan grounding.",
    acceptanceCriteria: "Instalasi sesuai dengan tahanan di bawah 5 Ohm.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "Ohm",
  },
];

function getTasksByCycle(cycle: GeneratorTasklistCycle) {
  if (cycle === "YEARLY") return generatorYearlyTasks;
  if (cycle === "SIX_MONTHLY") return generatorSixMonthlyTasks;
  if (cycle === "MONTHLY") return generatorMonthlyTasks;

  return generatorWeeklyTasks;
}

function buildInitialResults(
  tasks: GeneratorTasklistTask[],
): GeneratorTasklistResult[] {
  return tasks.flatMap((task) =>
    generatorEquipment.map((equipment) => ({
      taskId: task.id,
      equipmentId: equipment.id,
      performance: "",
      measuredValue: "",
    })),
  );
}

function isResultComplete(
  result: GeneratorTasklistResult,
  task: GeneratorTasklistTask,
) {
  if (!result.performance) return false;
  if (task.inputType === "MEASUREMENT") return Boolean(result.measuredValue.trim());

  return true;
}

export function useGeneratorTasklistPage() {
  const equipment = generatorEquipment;
  const [step, setStep] = useState<GeneratorTasklistStep>("equipment");
  const [selectedEquipmentType, setSelectedEquipmentType] = useState("GST");
  const [cycle, setCycle] = useState<GeneratorTasklistCycle>("WEEKLY");
  const tasks = useMemo(() => getTasksByCycle(cycle), [cycle]);
  const [resultsByCycle, setResultsByCycle] = useState(() => ({
    WEEKLY: buildInitialResults(generatorWeeklyTasks),
    MONTHLY: buildInitialResults(generatorMonthlyTasks),
    SIX_MONTHLY: buildInitialResults(generatorSixMonthlyTasks),
    YEARLY: buildInitialResults(generatorYearlyTasks),
  }));
  const results = resultsByCycle[cycle];
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(
    generatorEquipment[0].id,
  );
  const [firstEmptyTaskId, setFirstEmptyTaskId] = useState<string | null>(null);
  const [executionDate, setExecutionDate] = useState("2026-05-24");
  const [remarks, setRemarks] = useState("");

  const totalTasklistPlan = useMemo(
    () => tasks.length * equipment.length,
    [equipment.length, tasks.length],
  );
  const totalTasklistSelesai = results.filter((result) => {
    const task = tasks.find((item) => item.id === result.taskId);

    return task ? isResultComplete(result, task) : false;
  }).length;

  const sessionSnapshot = {
    equipmentCount: equipment.length,
    taskCount: tasks.length,
    totalTasklistPlan,
    totalTasklistSelesai,
  };

  const selectedEquipment =
    equipment.find((item) => item.id === selectedEquipmentId) ?? equipment[0];

  const selectedEquipmentFinishedCount = results.filter(
    (result) => {
      const task = tasks.find((item) => item.id === result.taskId);
      if (!task) return false;

      return (
        result.equipmentId === selectedEquipment.id &&
        isResultComplete(result, task)
      );
    },
  ).length;

  function changeCycle(nextCycle: GeneratorTasklistCycle) {
    setCycle(nextCycle);
    setFirstEmptyTaskId(null);
  }

  function submitEquipmentSelection() {
    setStep("cycle");
  }

  function submitCycleSelection(nextCycle: GeneratorTasklistCycle) {
    changeCycle(nextCycle);
    setStep("form");
  }

  function restartSelection() {
    setStep("equipment");
    setFirstEmptyTaskId(null);
  }

  function updatePerformance(
    taskId: string,
    equipmentId: string,
    performance: TasklistPerformance,
  ) {
    setResultsByCycle((current) => ({
      ...current,
      [cycle]: current[cycle].map((result) => {
        if (result.taskId !== taskId || result.equipmentId !== equipmentId) return result;

        return { ...result, performance };
      }),
    }));
  }

  function updateMeasuredValue(
    taskId: string,
    equipmentId: string,
    measuredValue: string,
  ) {
    setResultsByCycle((current) => ({
      ...current,
      [cycle]: current[cycle].map((result) => {
        if (result.taskId !== taskId || result.equipmentId !== equipmentId) return result;

        return { ...result, measuredValue };
      }),
    }));
  }

  function getResult(taskId: string, equipmentId: string) {
    return results.find(
      (result) =>
        result.taskId === taskId && result.equipmentId === equipmentId,
    );
  }

  function findFirstEmptyResult() {
    for (const equipmentItem of equipment) {
      for (const task of tasks) {
        const result = getResult(task.id, equipmentItem.id);

        if (!result || !isResultComplete(result, task)) {
          return {
            equipment: equipmentItem,
            task,
          };
        }
      }
    }

    return null;
  }

  function validateBeforeSubmit() {
    const firstEmptyResult = findFirstEmptyResult();

    if (!firstEmptyResult) {
      setFirstEmptyTaskId(null);
      return {
        isValid: true,
        message: "Semua task sudah terisi.",
        taskId: null,
      };
    }

    setSelectedEquipmentId(firstEmptyResult.equipment.id);
    setFirstEmptyTaskId(firstEmptyResult.task.id);

    return {
      isValid: false,
      message: `${firstEmptyResult.equipment.tagNumber} - ${firstEmptyResult.task.code} belum diisi.`,
      taskId: firstEmptyResult.task.id,
    };
  }

  return {
    cycle,
    step,
    selectedEquipmentType,
    reportDate: "2026-05-24",
    location: "IT Cikampek",
    year: "2026",
    monthNumber: "5",
    weekNumber: "4",
    equipment,
    tasks,
    results,
    executionDate,
    remarks,
    selectedEquipment,
    selectedEquipmentFinishedCount,
    firstEmptyTaskId,
    sessionSnapshot,
    getResult,
    restartSelection,
    setCycle: changeCycle,
    setExecutionDate,
    setRemarks,
    setSelectedEquipmentType,
    setSelectedEquipmentId,
    submitCycleSelection,
    submitEquipmentSelection,
    updateMeasuredValue,
    updatePerformance,
    validateBeforeSubmit,
  };
}
