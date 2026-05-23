export type PmpAssessmentOption = {
  value: 100 | 70 | 30 | 0;
  description: string;
};

export type PmpAssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: PmpAssessmentOption[];
};

const ageOptions: PmpAssessmentOption[] = [
  { value: 100, description: "Peralatan berusia kurang dari 20% dari umur desainnya (≤ 4 tahun jika umur desain adalah 20 tahun)." },
  { value: 70, description: "Peralatan berusia antara 20% hingga 50% dari umur desainnya (> 4 s.d. 10 tahun jika umur desain adalah 20 tahun)." },
  { value: 30, description: "Peralatan berusia antara 50% hingga 100% dari umur desainnya (> 10 s.d. 20 tahun jika umur desain adalah 20 tahun)." },
  { value: 0, description: "Peralatan berusia lebih dari 100% dari umur desainnya (> 20 tahun jika umur desain adalah 20 tahun)." },
];

export const pmpAssessmentParameters: PmpAssessmentParameter[] = [
  {
    code: "visualCondition",
    displayNo: 1,
    parameter: "Kondisi Visual",
    weight: 10,
    options: [
      { value: 100, description: "Korosi: 0-5% area terpengaruh\nKebocoran: tidak teridentifikasi\nCat: 0-5% area dengan perubahan warna atau mengelupas\nPondasi: 0% kerusakan, sepenuhnya stabil" },
      { value: 70, description: "Korosi: 6-10% area terpengaruh\nKebocoran: tidak teridentifikasi\nCat: 5-15% area dengan perubahan warna atau mengelupas ringan\nPondasi: 1-5% area dengan kerusakan ringan, sebagian besar stabil" },
      { value: 30, description: "Korosi: 11-20% area terpengaruh\nKebocoran: teridentifikasi kebocoran minor\nCat: 16-50% area dengan perubahan warna atau mengelupas signifikan\nPondasi: 6-20% area dengan kerusakan moderat" },
      { value: 0, description: "Korosi: >20% area terpengaruh\nKebocoran: teridentifikasi kebocoran major / signifikan\nCat: >50% area dengan perubahan warna atau mengelupas sangat signifikan\nPondasi: >20% area dengan kerusakan signifikan" },
    ],
  },
  {
    code: "vibration",
    displayNo: 2,
    parameter: "Getaran (Vibrasi)",
    weight: 14,
    options: [
      { value: 100, description: "Getaran: ≤ 2,5 mm/s (Zone A: Mesin seperti baru)" },
      { value: 70, description: "Getaran: > 2,5 s.d. 4,0 mm/s (Zone B: Operasi jangka panjang tanpa batasan dalam rentang operasi yang diperbolehkan)" },
      { value: 30, description: "Getaran: > 4,0 s.d. 6,6 mm/s (Zone C: Operasi terbatas)" },
      { value: 0, description: "Getaran: > 6,6 mm/s (Zone D: Risiko kerusakan) atau teridentifikasi kondisi major." },
    ],
  },
  {
    code: "bearingTemperature",
    displayNo: 3,
    parameter: "Suhu Area Bearing",
    weight: 10,
    options: [
      { value: 100, description: "Suhu Bearing: ≤ 82°C (dalam rentang normal yang diterima sesuai dengan batas rumah bearing)." },
      { value: 70, description: "Suhu Bearing: > 82°C s.d. 88°C (sedikit di atas rentang, tetapi mungkin masih dalam batas toleransi)." },
      { value: 30, description: "Suhu Bearing: > 88°C s.d. 95°C (jauh di atas rentang, risiko kerusakan jangka panjang)." },
      { value: 0, description: "Suhu Bearing: > 95°C (sangat tinggi, risiko kerusakan serius) atau teridentifikasi kondisi major." },
    ],
  },
  {
    code: "electricMotorTemperature",
    displayNo: 4,
    parameter: "Suhu Motor Listrik",
    weight: 10,
    options: [
      { value: 100, description: "Suhu permukaan luar ≤ 115°C" },
      { value: 70, description: "Suhu permukaan luar > 115°C s.d. 125°C" },
      { value: 30, description: "Suhu permukaan luar > 125°C s.d. 135°C" },
      { value: 0, description: "Suhu permukaan luar > 135°C atau teridentifikasi kondisi major." },
      { value: 0, description: "Tidak berlaku, karena penggerak menggunakan mesin diesel, bukan motor listrik" },
    ],
  },
  {
    code: "dieselPerformance",
    displayNo: 5,
    parameter: "Performa Mesin Diesel",
    weight: 10,
    options: [
      { value: 100, description: "Mesin menghasilkan daya output yang dibutuhkan, beroperasi dalam rentang suhu normal (80-100°C), emisi dalam batas yang diterima, efisien bahan bakar, dan tingkat kebisingan dalam batas yang diterima (≤ 85 dB)." },
      { value: 70, description: "Masalah minor seperti suhu sedikit meningkat (100-110°C), konsumsi bahan bakar sedikit tinggi, emisi sedikit meningkat, atau tingkat kebisingan 85-90 dB." },
      { value: 30, description: "Masalah cukup jelas seperti suhu 110-120°C, konsumsi bahan bakar kurang efisien, emisi cukup tinggi, atau tingkat kebisingan 90-95 dB." },
      { value: 0, description: "Masalah signifikan seperti suhu > 120°C, efisiensi buruk, emisi tinggi, kebisingan > 95 dB atau tidak dapat beroperasi." },
      { value: 0, description: "Tidak berlaku, karena penggerak menggunakan motor listrik, bukan mesin diesel." },
    ],
  },
  { code: "equipmentAge", displayNo: 6, parameter: "Usia Peralatan", weight: 8, options: ageOptions },
  {
    code: "maintenanceHistory",
    displayNo: 7,
    parameter: "Riwayat dan Pemeliharaan",
    weight: 8,
    options: [
      { value: 100, description: "95%-100% jadwal pemeliharaan terpenuhi tepat waktu; semua catatan tersedia dan terorganisir; tidak ada masalah berulang." },
      { value: 70, description: "80%-94% jadwal pemeliharaan terpenuhi tepat waktu; lebih dari 90% catatan tersedia; kurang dari 10% masalah berulang." },
      { value: 30, description: "60%-79% jadwal pemeliharaan terpenuhi tepat waktu; 70%-90% catatan tersedia; 10%-20% masalah berulang." },
      { value: 0, description: "Kurang dari 60% jadwal pemeliharaan terpenuhi tepat waktu; kurang dari 70% catatan tersedia; lebih dari 20% masalah berulang." },
    ],
  },
  {
    code: "performance",
    displayNo: 8,
    parameter: "Performa / Kinerja Peralatan",
    weight: 10,
    options: [
      { value: 100, description: "Tekanan, aliran, dan suhu berada dalam 95%-100% dari nilai desain atau operasional optimal; respon cepat; tidak ada fluktuasi abnormal." },
      { value: 70, description: "Tekanan, aliran, dan suhu berada dalam 85%-94% dari nilai desain atau operasional optimal; fluktuasi minor; respon baik." },
      { value: 30, description: "Tekanan, aliran, dan suhu berada dalam 70%-84% dari nilai desain atau operasional optimal; fluktuasi signifikan; respon lambat." },
      { value: 0, description: "Tekanan, aliran, dan suhu berada di bawah 70%; fluktuasi ekstrem atau teridentifikasi kondisi major." },
    ],
  },
  {
    code: "operatorFeedback",
    displayNo: 9,
    parameter: "Umpan Balik Operator",
    weight: 4,
    options: [
      { value: 100, description: "Operator memberikan umpan balik positif yang mendetail; tidak melaporkan masalah signifikan." },
      { value: 70, description: "Operator memberikan umpan balik yang umumnya positif; mungkin ada masalah minor." },
      { value: 30, description: "Operator memberikan umpan balik bercampur; ada masalah atau kekhawatiran." },
      { value: 0, description: "Operator memberikan umpan balik negatif; melaporkan masalah, kerusakan, atau kegagalan berulang." },
    ],
  },
  {
    code: "noiseLevel",
    displayNo: 10,
    parameter: "Tingkat Kebisingan",
    weight: 6,
    options: [
      { value: 100, description: "Tingkat kebisingan normal (≤ 85 dB)" },
      { value: 70, description: "Tingkat kebisingan sedikit tinggi (> 85 dB s.d. 90 dB)" },
      { value: 30, description: "Tingkat kebisingan jauh lebih tinggi (> 90 dB s.d. 95 dB)" },
      { value: 0, description: "Tingkat kebisingan sangat tinggi (> 95 dB) atau teridentifikasi kondisi major." },
    ],
  },
  {
    code: "unscheduledMaintenanceFrequency",
    displayNo: 11,
    parameter: "Frekuensi Pemeliharaan Tak Terjadwal",
    weight: 4,
    options: [
      { value: 100, description: "Jarang memerlukan pemeliharaan tak terjadwal (0 - 1 kali per tahun)" },
      { value: 70, description: "Kadang-kadang memerlukan pemeliharaan tak terjadwal (2 - 3 kali per tahun)" },
      { value: 30, description: "Sering memerlukan pemeliharaan tak terjadwal (4 - 6 kali per tahun)" },
      { value: 0, description: "Terus-menerus memerlukan pemeliharaan tak terjadwal (7 kali atau lebih per tahun) atau tidak beroperasi" },
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
      { value: 0, description: "2 atau lebih insiden signifikan, atau 5 atau lebih insiden minor, atau terlibat dalam insiden besar dalam 1 tahun terakhir" },
    ],
  },
  {
    code: "grounding",
    displayNo: 13,
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
    code: "pumpCertificationStatus",
    displayNo: 14,
    parameter: "Kepatuhan Regulasi - Status Sertifikasi Pompa",
    weight: 10,
    options: [
      { value: 100, description: "Sertifikat COI Masih Berlaku" },
      { value: 0, description: "Sertifikat COI Kadaluarsa / Tidak Tersedia / teridentifikasi kondisi major." },
    ],
  },
];

export function calculatePmpParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) return undefined;
  return (conditionWeight / 100) * weight;
}

export function formatPmpScore(score?: number) {
  if (score === undefined) return "";
  return score.toFixed(1).replace(".", ",");
}
