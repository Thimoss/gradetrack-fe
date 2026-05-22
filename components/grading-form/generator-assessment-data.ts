export type AssessmentOption = {
  value: 100 | 70 | 30 | 0;
  description: string;
};

export type AssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: AssessmentOption[];
};

export const generatorAssessmentParameters: AssessmentParameter[] = [
  {
    code: "visualCondition",
    displayNo: 1,
    parameter: "Kondisi Visual",
    weight: 8,
    options: [
      {
        value: 100,
        description:
          "Korosi: 0% area terpengaruh\nCat: 0-5% area dengan perubahan warna atau mengelupas\nPondasi: 0% kerusakan, sepenuhnya stabil",
      },
      {
        value: 70,
        description:
          "Korosi: 1-5% area terpengaruh\nCat: 5-15% area dengan perubahan warna atau mengelupas ringan\nPondasi: 1-5% area dengan kerusakan ringan, sebagian besar stabil",
      },
      {
        value: 30,
        description:
          "Korosi: 6-20% area terpengaruh\nCat: 16-50% area dengan perubahan warna atau mengelupas signifikan\nPondasi: 6-20% area dengan kerusakan moderat atau tanda-tanda ketidakstabilan",
      },
      {
        value: 0,
        description:
          "Korosi: >20% area terpengaruh\nCat: >50% area dengan perubahan warna atau mengelupas sangat signifikan\nPondasi: >20% area dengan kerusakan signifikan atau tanda-tanda ketidakstabilan",
      },
    ],
  },
  {
    code: "vibration",
    displayNo: 2,
    parameter: "Getaran (Vibrasi)",
    weight: 15,
    options: [
      {
        value: 100,
        description: "Getaran: ≤ 7,1 mm/s (Zone A: Mesin seperti baru)",
      },
      {
        value: 70,
        description:
          "Getaran: > 7,1 s.d. 15 mm/s (Zone B: Operasi jangka panjang tanpa batasan dalam rentang operasi yang diperbolehkan)",
      },
      {
        value: 30,
        description: "Getaran: > 15 s.d. 25 mm/s (Zone C: Operasi terbatas)",
      },
      {
        value: 0,
        description:
          "Getaran: > 25 mm/s (Zone D: Risiko kerusakan) atau teridentifikasi kondisi major",
      },
    ],
  },
  {
    code: "alternatorTemperature",
    displayNo: 3,
    parameter: "Suhu Alternator",
    weight: 10,
    options: [
      { value: 100, description: "Suhu permukaan luar ≤ 140°C" },
      { value: 70, description: "Suhu permukaan luar > 140°C s.d. 150°C" },
      { value: 30, description: "Suhu permukaan luar > 150°C s.d. 160°C" },
      {
        value: 0,
        description:
          "Suhu permukaan luar > 160°C atau teridentifikasi kondisi major",
      },
    ],
  },
  {
    code: "dieselEnginePerformance",
    displayNo: 4,
    parameter: "Performa Mesin Diesel",
    weight: 10,
    options: [
      {
        value: 100,
        description:
          "Mesin menghasilkan daya output yang dibutuhkan, beroperasi dalam rentang suhu normal (80-100°C), emisi dalam batas yang diterima, efisien bahan bakar, dan tingkat kebisingan dalam batas yang diterima (≤ 90 dB).",
      },
      {
        value: 70,
        description:
          "Masalah minor seperti suhu sedikit meningkat (100-110°C), konsumsi bahan bakar sedikit tinggi (5-10% di atas normal), emisi sedikit meningkat, atau tingkat kebisingan sedikit lebih tinggi (90-100 dB).",
      },
      {
        value: 30,
        description:
          "Masalah yang cukup jelas seperti suhu cukup tinggi (110-120°C), konsumsi bahan bakar kurang efisien (10-20% di atas normal), emisi cukup tinggi, atau tingkat kebisingan cukup tinggi (100-110 dB).",
      },
      {
        value: 0,
        description:
          "Masalah yang signifikan seperti suhu yang sangat tinggi (> 120°C), efisiensi bahan bakar yang buruk, emisi yang tinggi, atau teridentifikasi kondisi major.",
      },
    ],
  },
  {
    code: "equipmentAge",
    displayNo: 5,
    parameter: "Usia Peralatan",
    weight: 8,
    options: [
      {
        value: 100,
        description:
          "Peralatan berusia kurang dari 20% dari umur desainnya (≤ 4 tahun jika umur desain adalah 20 tahun).",
      },
      {
        value: 70,
        description:
          "Peralatan berusia antara 20% hingga 50% dari umur desainnya (> 4 s.d. 10 tahun jika umur desain adalah 20 tahun).",
      },
      {
        value: 30,
        description:
          "Peralatan berusia antara 50% hingga 100% dari umur desainnya (> 10 s.d. 20 tahun jika umur desain adalah 20 tahun).",
      },
      {
        value: 0,
        description:
          "Peralatan berusia lebih dari 100% dari umur desainnya (> 20 tahun jika umur desain adalah 20 tahun).",
      },
    ],
  },
  {
    code: "maintenanceHistory",
    displayNo: 6,
    parameter: "Riwayat dan Pemeliharaan",
    weight: 8,
    options: [
      {
        value: 100,
        description:
          "95%-100% jadwal pemeliharaan terpenuhi tepat waktu; semua catatan tersedia dan terorganisir; tidak ada masalah berulang.",
      },
      {
        value: 70,
        description:
          "80%-94% jadwal pemeliharaan terpenuhi tepat waktu; lebih dari 90% catatan tersedia; kurang dari 10% masalah berulang.",
      },
      {
        value: 30,
        description:
          "60%-79% jadwal pemeliharaan terpenuhi tepat waktu; 70%-90% catatan tersedia; 10%-20% masalah berulang.",
      },
      {
        value: 0,
        description:
          "Kurang dari 60% jadwal pemeliharaan terpenuhi tepat waktu; kurang dari 70% catatan tersedia; lebih dari 20% masalah berulang.",
      },
    ],
  },
  {
    code: "equipmentPerformance",
    displayNo: 7,
    parameter: "Performa / Kinerja Peralatan",
    weight: 15,
    options: [
      {
        value: 100,
        description:
          "Deviasi voltase hingga 2% dari voltase nominal\nDeviasi frekuensi hingga 0,5% dari frekuensi nominal",
      },
      {
        value: 70,
        description:
          "Deviasi voltase hingga 5% dari voltase nominal\nDeviasi frekuensi hingga 1% dari frekuensi nominal",
      },
      {
        value: 30,
        description:
          "Deviasi voltase hingga 10% dari voltase nominal\nDeviasi frekuensi hingga 2% dari frekuensi nominal",
      },
      {
        value: 0,
        description:
          "Deviasi voltase diatas 10% dari voltase nominal\nDeviasi frekuensi diatas 2% dari frekuensi nominal\nTeridentifikasi kondisi major",
      },
    ],
  },
  {
    code: "operatorFeedback",
    displayNo: 8,
    parameter: "Umpan Balik Operator",
    weight: 4,
    options: [
      {
        value: 100,
        description:
          "Operator memberikan umpan balik positif yang mendetail tentang peralatan; menyoroti keandalan, efisiensi, dan kinerja yang konsisten; tidak melaporkan masalah atau kerusakan signifikan di masa lalu.",
      },
      {
        value: 70,
        description:
          "Operator memberikan umpan balik yang umumnya positif, mungkin menyebutkan beberapa masalah minor atau perbaikan di masa lalu; menilai peralatan sebagai dapat diandalkan dan efisien.",
      },
      {
        value: 30,
        description:
          "Operator memberikan umpan balik yang cenderung negatif; menyoroti beberapa masalah atau kerusakan di masa lalu; mungkin menyatakan kekhawatiran tentang aspek tertentu dari kinerja atau keandalan peralatan.",
      },
      {
        value: 0,
        description:
          "Operator memberikan umpan balik negatif tentang peralatan; melaporkan masalah, kerusakan, atau kegagalan berulang; menyatakan ketidakpuasan.",
      },
    ],
  },
  {
    code: "unscheduledMaintenanceFrequency",
    displayNo: 9,
    parameter: "Frekuensi Pemeliharaan Tak Terjadwal",
    weight: 4,
    options: [
      {
        value: 100,
        description:
          "Jarang memerlukan pemeliharaan tak terjadwal (0 - 1 kali per tahun)",
      },
      {
        value: 70,
        description:
          "Kadang-kadang memerlukan pemeliharaan tak terjadwal (2 - 3 kali per tahun)",
      },
      {
        value: 30,
        description:
          "Sering memerlukan pemeliharaan tak terjadwal (4 - 6 kali per tahun)",
      },
      {
        value: 0,
        description:
          "Terus-menerus memerlukan pemeliharaan tak terjadwal (7 kali atau lebih per tahun)",
      },
    ],
  },
  {
    code: "safetyIncident",
    displayNo: 10,
    parameter: "Insiden Keselamatan",
    weight: 3,
    options: [
      { value: 100, description: "0 insiden dalam 1 tahun terakhir" },
      { value: 70, description: "1 - 2 insiden dalam 1 tahun terakhir" },
      {
        value: 30,
        description:
          "1 insiden signifikan atau 3 - 4 insiden minor dalam 1 tahun terakhir",
      },
      {
        value: 0,
        description:
          "2 atau lebih insiden signifikan, atau 5 atau lebih insiden minor, atau terlibat dalam insiden besar dalam 1 tahun terakhir",
      },
    ],
  },
  {
    code: "grounding",
    displayNo: 11,
    parameter: "Grounding",
    weight: 5,
    options: [
      { value: 100, description: "< 2 ohm" },
      { value: 70, description: "> 2 ohm - 5 ohm" },
      { value: 30, description: "> 5 ohm - 8 ohm" },
      { value: 0, description: "> 8 ohm atau tidak bisa diukur" },
    ],
  },
  {
    code: "generatorCertificationStatus",
    displayNo: 12,
    parameter: "Kepatuhan Regulasi - Status Sertifikasi Generator",
    weight: 10,
    options: [
      { value: 100, description: "Sertifikat COI Masih Berlaku" },
      {
        value: 0,
        description:
          "Sertifikat COI Kadaluarsa / Tidak Tersedia / teridentifikasi kondisi major",
      },
    ],
  },
];

export function calculateParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) {
    return undefined;
  }

  return (conditionWeight / 100) * weight;
}

export function formatScore(score?: number) {
  if (score === undefined) {
    return "";
  }

  return score.toFixed(1).replace(".", ",");
}
