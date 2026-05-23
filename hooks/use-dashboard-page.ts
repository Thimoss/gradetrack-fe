export type DashboardMetric = {
  label: string;
  value: string;
  helper: string;
  tone: "blue" | "green" | "slate";
};

export type DashboardTask = {
  id: string;
  title: string;
  equipment: string;
  location: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
};

export type DashboardGradingItem = {
  id: string;
  equipment: string;
  type: string;
  location: string;
  category: "LOW" | "MEDIUM" | "HIGH";
  score: number;
};

export type DashboardRecapItem = {
  label: string;
  value: string;
  description: string;
};

export function useDashboardPage() {
  const metrics: DashboardMetric[] = [
    {
      label: "Grading bulan ini",
      value: "128",
      helper: "32 menunggu review",
      tone: "blue",
    },
    {
      label: "Task terbuka",
      value: "24",
      helper: "8 prioritas tinggi",
      tone: "slate",
    },
    {
      label: "Rekap selesai",
      value: "91%",
      helper: "Update terakhir hari ini",
      tone: "green",
    },
  ];

  const taskList: DashboardTask[] = [
    {
      id: "TSK-1042",
      title: "Verifikasi COI UPS",
      equipment: "327-UPS-001/00",
      location: "IT Cikampek",
      priority: "High",
      dueDate: "24 Mei 2026",
    },
    {
      id: "TSK-1041",
      title: "Upload dokumentasi pompa produk",
      equipment: "327-P-201/00",
      location: "F204-PP",
      priority: "Medium",
      dueDate: "25 Mei 2026",
    },
    {
      id: "TSK-1039",
      title: "Lengkapi data grounding transformator",
      equipment: "TR-01",
      location: "IT Jakarta",
      priority: "High",
      dueDate: "25 Mei 2026",
    },
  ];

  const gradingQueue: DashboardGradingItem[] = [
    {
      id: "GRD-2201",
      equipment: "TR-01",
      type: "Transformator Daya",
      location: "IT Jakarta",
      category: "LOW",
      score: 22,
    },
    {
      id: "GRD-2200",
      equipment: "327-UPS-001/00",
      type: "UPS",
      location: "IT Cikampek",
      category: "MEDIUM",
      score: 43,
    },
    {
      id: "GRD-2198",
      equipment: "MVSWGR-01",
      type: "Medium Voltage Switchgear",
      location: "IT Jakarta",
      category: "HIGH",
      score: 86,
    },
  ];

  const recapItems: DashboardRecapItem[] = [
    {
      label: "LOW integrity",
      value: "14",
      description: "Perlu tindak lanjut segera",
    },
    {
      label: "MEDIUM integrity",
      value: "39",
      description: "Pantau dalam interval berikutnya",
    },
    {
      label: "HIGH integrity",
      value: "75",
      description: "Kondisi operasional baik",
    },
  ];

  return {
    metrics,
    taskList,
    gradingQueue,
    recapItems,
  };
}
