export type TrfAssessmentOption = {
  value: 100 | 70 | 50 | 30 | 0;
  description: string;
};

export type TrfAssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: TrfAssessmentOption[];
};

const ageOptions: TrfAssessmentOption[] = [
  { value: 100, description: "Peralatan berusia kurang dari 20% dari umur desainnya (<= 4 tahun)" },
  { value: 70, description: "Peralatan berusia antara 20% hingga 50% dari umur desainnya (> 4 s.d. 10 tahun)" },
  { value: 30, description: "Peralatan berusia antara 50% hingga 100% dari umur desainnya (> 10 s.d. 20 tahun)" },
  { value: 0, description: "Peralatan berusia lebih dari 100% dari umur desainnya (> 20 tahun)" },
];

export const trfAssessmentParameters: TrfAssessmentParameter[] = [
  {
    code: "oilTankCondition",
    displayNo: 1,
    parameter: "Kondisi Tanki Oli",
    weight: 12,
    options: [
      { value: 100, description: "Tidak ada" },
      { value: 50, description: "Rembesan" },
      { value: 0, description: "Bocor aktif" },
    ],
  },
  {
    code: "tankCorrosion",
    displayNo: 2,
    parameter: "Korosi Tanki",
    weight: 4,
    options: [
      { value: 100, description: "Tidak ada" },
      { value: 50, description: "Lokal" },
      { value: 0, description: "Meluas" },
    ],
  },
  {
    code: "paintCondition",
    displayNo: 3,
    parameter: "Kondisi Cat",
    weight: 2,
    options: [
      { value: 100, description: "Utuh" },
      { value: 50, description: "Mengelupas ringan" },
      { value: 0, description: "Rusak parah" },
    ],
  },
  {
    code: "radiatorCondition",
    displayNo: 4,
    parameter: "Kondisi Radiator",
    weight: 5,
    options: [
      { value: 100, description: "Bersih" },
      { value: 50, description: "Kotor" },
      { value: 0, description: "Rusak" },
    ],
  },
  {
    code: "bushingCondition",
    displayNo: 5,
    parameter: "Kondisi Bushing",
    weight: 10,
    options: [
      { value: 100, description: "Tidak ada" },
      { value: 50, description: "Minor" },
      { value: 0, description: "Retak" },
    ],
  },
  {
    code: "bushingCleanliness",
    displayNo: 6,
    parameter: "Kebersihan Bushing",
    weight: 3,
    options: [
      { value: 100, description: "Bersih" },
      { value: 50, description: "Kotor" },
      { value: 0, description: "Sangat kotor" },
    ],
  },
  {
    code: "mechanicalTightness",
    displayNo: 7,
    parameter: "Kekencangan Mekanik",
    weight: 4,
    options: [
      { value: 100, description: "Baik" },
      { value: 0, description: "Longgar" },
    ],
  },
  {
    code: "foundationCondition",
    displayNo: 8,
    parameter: "Kondisi Pondasi",
    weight: 5,
    options: [
      { value: 100, description: "Stabil" },
      { value: 50, description: "Retak kecil" },
      { value: 0, description: "Retak besar" },
    ],
  },
  {
    code: "drainage",
    displayNo: 9,
    parameter: "Drainase",
    weight: 2,
    options: [
      { value: 100, description: "Baik" },
      { value: 50, description: "Kurang" },
      { value: 0, description: "Buruk" },
    ],
  },
  {
    code: "clearance",
    displayNo: 10,
    parameter: "Clearance",
    weight: 6,
    options: [
      { value: 100, description: "Aman" },
      { value: 50, description: "Terbatas" },
      { value: 0, description: "Tidak aman" },
    ],
  },
  {
    code: "grounding",
    displayNo: 11,
    parameter: "Grounding",
    weight: 8,
    options: [
      { value: 100, description: "<= 2 ohm" },
      { value: 70, description: "> 2 ohm - 5 ohm" },
      { value: 30, description: "> 5 ohm - 8 ohm" },
      { value: 0, description: "> 8 ohm atau tidak bisa diukur" },
    ],
  },
  {
    code: "equipmentAge",
    displayNo: 12,
    parameter: "Usia Peralatan",
    weight: 6,
    options: ageOptions,
  },
  {
    code: "operationHistoryRepeatedTrip",
    displayNo: 13,
    parameter: "Riwayat Operasi - Trip Berulang",
    weight: 8,
    options: [
      { value: 100, description: "Tidak pernah trip; satu kali trip dengan sebab jelas dan sudah ditangani" },
      { value: 0, description: "Lebih dari dua kali trip dalam 12 bulan terakhir; trip tanpa penyebab eksternal jelas" },
    ],
  },
  {
    code: "operationHistoryOverheating",
    displayNo: 14,
    parameter: "Riwayat Operasi - Panas berlebih",
    weight: 6,
    options: [
      { value: 100, description: "Tidak pernah alarm suhu; tidak ada pembatasan beban karena panas" },
      { value: 0, description: "Alarm suhu aktif >= 1 kali; suhu minyak / winding mendekati batas operasi; trafo pernah diturunkan bebannya karena panas" },
    ],
  },
  {
    code: "operationHistoryAbnormalSmellSound",
    displayNo: 15,
    parameter: "Riwayat Operasi - Bau / Suara Abnormal",
    weight: 5,
    options: [
      { value: 100, description: "Tidak pernah tercium bau atau suara abnormal" },
      { value: 0, description: "Bau minyak terbakar; suara mendesis / humming tidak normal; getaran yang dirasakan operator" },
    ],
  },
  {
    code: "operationHistoryUnscheduledDisturbance",
    displayNo: 16,
    parameter: "Riwayat Operasi - Gangguan Tak Terjadwal",
    weight: 6,
    options: [
      { value: 100, description: "Hanya pemeliharaan terjadwal; 0-1 gangguan minor" },
      { value: 0, description: "Lebih dari 2 kali pemeliharaan darurat / korektif atau shutdown mendadak" },
    ],
  },
  {
    code: "coiCertificate",
    displayNo: 17,
    parameter: "Status Sertifikasi COI Transformator",
    weight: 8,
    options: [
      { value: 100, description: "Masih berlaku" },
      { value: 0, description: "Kadaluarsa atau tidak tersedia" },
    ],
  },
];

export function calculateTrfParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) return undefined;
  return (conditionWeight / 100) * weight;
}

export function formatTrfScore(score?: number) {
  if (score === undefined) return "";
  return score.toFixed(1).replace(".", ",");
}
