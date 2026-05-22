export type MajorConditionRow = {
  id: number;
  parameter: string;
  condition: string;
  severity: "critical" | "major";
};

export const generatorMajorConditionRows: MajorConditionRow[] = [
  {
    id: 1,
    parameter: "Tidak dapat beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
    severity: "critical",
  },
  {
    id: 2,
    parameter: "Tidak ada COI Generator atau Expired",
    condition:
      "Sertifikat COI Generator yang Terbaru tidak ada atau sudah expired",
    severity: "critical",
  },
  {
    id: 3,
    parameter: "Suhu Alternator Tinggi",
    condition: "Teridentifikasi suhu permukaan alternator sangat tinggi > 160 C",
    severity: "major",
  },
  {
    id: 4,
    parameter: "Vibrasi Tinggi",
    condition: "Teridentifikasi vibrasi yang sangat tinggi > 25 mm/s",
    severity: "major",
  },
];
