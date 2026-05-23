export type PmpMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const pmpMajorConditionRows: PmpMajorConditionRow[] = [
  {
    id: 1,
    key: "processFluidLeak",
    parameter: "Kebocoran Fluida Proses",
    condition:
      "Teridentifikasi kebocoran fluida proses baik pada fitting maupun pada segmen bertekanan",
  },
  {
    id: 2,
    key: "badDieselEnginePerformance",
    parameter: "Performa Diesel Engine Buruk",
    condition:
      "Masalah signifikan seperti suhu yang sangat tinggi (> 120°C), efisiensi bahan bakar yang buruk, emisi yang tinggi, atau tingkat kebisingan yang tinggi (> 95 dB)",
  },
  {
    id: 3,
    key: "cannotOperate",
    parameter: "Tidak dapat beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
  {
    id: 4,
    key: "coiExpiredOrMissing",
    parameter: "Tidak ada COI Pompa Produk atau Expired",
    condition: "Sertifikat COI Pompa yang terbaru tidak ada atau sudah expired",
  },
  {
    id: 5,
    key: "highVibrationOrNoData",
    parameter: "Vibrasi Tinggi / Tidak ada data",
    condition:
      "Getaran: > 6,6 mm/s (Zone D: Risiko kerusakan) atau tidak ada data vibrasi",
  },
  {
    id: 6,
    key: "highBearingTemperature",
    parameter: "Suhu Bearing Tinggi",
    condition: "Suhu Bearing: > 95°C (sangat tinggi, risiko kerusakan serius)",
  },
  {
    id: 7,
    key: "highMotorTemperature",
    parameter: "Suhu Motor Listrik Tinggi",
    condition: "Suhu permukaan luar > 135°C",
  },
];
