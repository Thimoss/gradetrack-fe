export type UpsAssessmentOption = {
  value: 100 | 70 | 50 | 30 | 0;
  description: string;
};

export type UpsAssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: UpsAssessmentOption[];
};

const categoryOptions: UpsAssessmentOption[] = [
  { value: 100, description: "Kondisi GOOD" },
  { value: 50, description: "Kondisi MODERATE" },
  { value: 0, description: "Kondisi POOR, teridentifikasi kondisi major" },
];

export const upsAssessmentParameters: UpsAssessmentParameter[] = [
  {
    code: "visual",
    displayNo: 1,
    parameter: "Visual",
    weight: 8,
    options: [
      {
        value: 100,
        description:
          "Enclosure bersih, utuh, tidak berkarat, label lengkap; fan bersih dan normal; LED/display normal; kabel rapi; debu sangat ringan.",
      },
      {
        value: 70,
        description:
          "Gores minor, kotor ringan, label sedikit kabur; fan sedikit berdebu; 1-2 LED mati; kabel agak longgar.",
      },
      {
        value: 30,
        description:
          "Cat mengelupas, korosi ringan, label hilang sebagian; fan berdebu tebal; display error sebagian; kabel kurang aman.",
      },
      {
        value: 0,
        description:
          "Panel rusak/berkarat parah; fan tidak berfungsi; display mati total; kabel terlepas atau short terlihat.",
      },
    ],
  },
  {
    code: "outputStabilityVoltage",
    displayNo: 2,
    parameter: "Output Stability Voltage",
    weight: 10,
    options: categoryOptions,
  },
  {
    code: "transferTimeTest",
    displayNo: 3,
    parameter: "Transfer Time Test (AC Fail to Battery)",
    weight: 10,
    options: categoryOptions,
  },
  {
    code: "internalResistanceTest",
    displayNo: 4,
    parameter: "Internal Resistance Test Battery",
    weight: 10,
    options: categoryOptions,
  },
  {
    code: "dischargeTimeBattery",
    displayNo: 5,
    parameter: "Discharge Time Battery",
    weight: 10,
    options: categoryOptions,
  },
  {
    code: "alarmProtectionFunction",
    displayNo: 6,
    parameter: "Alarm & Protection Function",
    weight: 8,
    options: [
      { value: 100, description: "Semua alarm utama aktif dan proteksi otomatis berfungsi baik." },
      { value: 70, description: "Sebagian kecil alarm error, proteksi masih aktif dan berfungsi penuh." },
      { value: 30, description: "Beberapa alarm tidak aktif, proteksi bekerja sebagian." },
      { value: 0, description: "Alarm utama mati total atau proteksi utama tidak bekerja." },
    ],
  },
  {
    code: "internalTemperatureFanOperation",
    displayNo: 7,
    parameter: "Internal Temperature and Fan Operation",
    weight: 8,
    options: [
      { value: 100, description: "Suhu internal <= 40°C, semua fan aktif, tidak ada alarm atau suara abnormal." },
      { value: 70, description: "Suhu 41-45°C, ada 1 fan lambat/suara kecil, UPS masih stabil." },
      { value: 30, description: "Suhu 46-55°C, 1 fan mati/tersendat, ada alarm overheat sesekali." },
      { value: 0, description: "Suhu >55°C atau tidak terbaca, fan mati total, UPS overheat shutdown/error aktif." },
    ],
  },
  {
    code: "grounding",
    displayNo: 8,
    parameter: "Grounding",
    weight: 3,
    options: [
      { value: 100, description: "< 2 ohm" },
      { value: 70, description: "> 2 ohm - 5 ohm" },
      { value: 30, description: "> 5 ohm - 8 ohm" },
      { value: 0, description: "> 8 ohm atau tidak bisa diukur" },
    ],
  },
  {
    code: "equipmentAge",
    displayNo: 9,
    parameter: "Usia Peralatan",
    weight: 6,
    options: [
      { value: 100, description: "Peralatan berusia kurang dari 20% dari umur desainnya (<= 4 tahun)" },
      { value: 70, description: "Peralatan berusia antara 20% hingga 50% dari umur desainnya (> 4 s.d. 10 tahun)" },
      { value: 30, description: "Peralatan berusia antara 50% hingga 100% dari umur desainnya (> 10 s.d. 20 tahun)" },
      { value: 0, description: "Peralatan berusia lebih dari 100% dari umur desainnya (> 20 tahun)" },
    ],
  },
  {
    code: "maintenanceHistory",
    displayNo: 10,
    parameter: "Riwayat dan Pemeliharaan",
    weight: 8,
    options: [
      { value: 100, description: "95%-100% jadwal pemeliharaan terpenuhi tepat waktu; semua catatan tersedia." },
      { value: 70, description: "80%-94% jadwal terpenuhi; lebih dari 90% catatan tersedia." },
      { value: 30, description: "60%-79% jadwal terpenuhi; 70%-90% catatan tersedia." },
      { value: 0, description: "Kurang dari 60% jadwal terpenuhi; catatan kurang dari 70%." },
    ],
  },
  {
    code: "unscheduledMaintenanceFrequency",
    displayNo: 11,
    parameter: "Frekuensi Pemeliharaan Tak Terjadwal",
    weight: 3,
    options: [
      { value: 100, description: "Jarang memerlukan pemeliharaan tak terjadwal (0 - 1 kali per tahun)" },
      { value: 70, description: "Kadang-kadang memerlukan pemeliharaan tak terjadwal (2 - 3 kali per tahun)" },
      { value: 30, description: "Sering memerlukan pemeliharaan tak terjadwal (4 - 6 kali per tahun)" },
      { value: 0, description: "Terus-menerus memerlukan pemeliharaan tak terjadwal atau tidak beroperasi" },
    ],
  },
  {
    code: "safetyIncident",
    displayNo: 12,
    parameter: "Insiden Keselamatan",
    weight: 3,
    options: [
      { value: 100, description: "0 insiden dalam 1 tahun terakhir" },
      { value: 70, description: "1 - 2 insiden dalam 1 tahun terakhir" },
      { value: 30, description: "1 insiden signifikan atau 3 - 4 insiden minor dalam 1 tahun terakhir" },
      { value: 0, description: "2 atau lebih insiden signifikan atau 5 atau lebih insiden minor" },
    ],
  },
  {
    code: "operatorFeedback",
    displayNo: 13,
    parameter: "Umpan Balik Operator",
    weight: 3,
    options: [
      { value: 100, description: "Umpan balik positif, peralatan andal dan konsisten." },
      { value: 70, description: "Umpan balik umumnya positif, mungkin ada masalah minor." },
      { value: 30, description: "Umpan balik cenderung negatif, ada beberapa kekhawatiran." },
      { value: 0, description: "Umpan balik negatif, melaporkan masalah atau kegagalan berulang." },
    ],
  },
  {
    code: "certificationStatus",
    displayNo: 14,
    parameter: "Kepatuhan Regulasi - Status Sertifikasi Generator",
    weight: 10,
    options: [
      { value: 100, description: "Sertifikat COI masih berlaku" },
      { value: 0, description: "Sertifikat COI kadaluarsa / tidak tersedia / teridentifikasi kondisi major" },
    ],
  },
];

export function calculateUpsParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) return undefined;
  return (conditionWeight / 100) * weight;
}

export function formatUpsScore(score?: number) {
  if (score === undefined) return "";
  return score.toFixed(1).replace(".", ",");
}
