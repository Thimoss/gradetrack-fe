export type TnkAssessmentOption = {
  value: 100 | 70 | 50 | 30 | 0;
  description: string;
};

export type TnkAssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: TnkAssessmentOption[];
};

const corrosionOptions: TnkAssessmentOption[] = [
  { value: 100, description: "0-5% area terpengaruh" },
  { value: 70, description: "6-10% area terpengaruh" },
  { value: 30, description: "11-20% area terpengaruh / korosi lokal yang signifikan" },
  { value: 0, description: ">20% area terpengaruh / teridentifikasi bocor / tambalan non-permanent" },
];

const leakPatchOptions: TnkAssessmentOption[] = [
  { value: 100, description: "0 kejadian" },
  { value: 70, description: "1-2 kejadian" },
  { value: 30, description: "3-5 kejadian" },
  { value: 0, description: ">5 kejadian" },
];

const paintingOptions: TnkAssessmentOption[] = [
  { value: 100, description: "0-5% area dengan perubahan warna atau mengelupas" },
  { value: 70, description: "5-15% area dengan perubahan warna atau mengelupas ringan" },
  { value: 30, description: "16-50% area dengan perubahan warna atau mengelupas signifikan" },
  { value: 0, description: ">50% area dengan perubahan warna atau mengelupas signifikan" },
];

const deformationOptions: TnkAssessmentOption[] = [
  {
    value: 100,
    description: "Tidak ada deformasi atau deformasi minor yang tidak mempengaruhi operasi",
  },
  {
    value: 70,
    description: "Deformasi ringan yang memerlukan pemantauan, tetapi tidak kritis",
  },
  {
    value: 30,
    description: "Deformasi moderat yang dapat mempengaruhi integritas struktural, tindakan diperlukan",
  },
  {
    value: 0,
    description: "Deformasi signifikan yang mengancam integritas struktural, perlu perbaikan segera",
  },
];

const thicknessOptions: TnkAssessmentOption[] = [
  { value: 100, description: "Margin ketebalan > 2 mm dari ketebalan minimum yang dibutuhkan" },
  { value: 70, description: "Margin ketebalan 1,5 - 2 mm dari ketebalan minimum yang dibutuhkan" },
  { value: 30, description: "Margin ketebalan 1 - 1,5 mm dari ketebalan minimum yang dibutuhkan" },
  { value: 0, description: "Margin ketebalan < 1 mm dari ketebalan minimum yang dibutuhkan / teridentifikasi kondisi major" },
];

export const tnkAssessmentParameters: TnkAssessmentParameter[] = [
  {
    code: "shellCorrosion",
    displayNo: 1,
    parameter: "Kondisi Visual - Korosi di Shell",
    weight: 3,
    options: corrosionOptions,
  },
  {
    code: "shellLeakPatch",
    displayNo: 2,
    parameter: "Kondisi Visual - Bekas Kebocoran / Tambalan di Shell",
    weight: 2,
    options: leakPatchOptions,
  },
  {
    code: "shellPainting",
    displayNo: 3,
    parameter: "Kondisi Visual - Cat / Painting di Shell",
    weight: 2,
    options: paintingOptions,
  },
  {
    code: "shellDeformation",
    displayNo: 4,
    parameter: "Kondisi Visual - Deformasi di Shell",
    weight: 2,
    options: deformationOptions,
  },
  {
    code: "wallThickness",
    displayNo: 5,
    parameter: "Integritas Struktural - Ketebalan Dinding",
    weight: 15,
    options: thicknessOptions,
  },
  {
    code: "foundationVisual",
    displayNo: 6,
    parameter: "Kondisi Visual - Pondasi",
    weight: 4,
    options: [
      { value: 100, description: "0-5% kerusakan, sepenuhnya stabil" },
      { value: 70, description: "6-10% area dengan kerusakan ringan, sebagian besar stabil" },
      { value: 30, description: "11-20% area dengan kerusakan moderat atau tanda-tanda ketidakstabilan" },
      { value: 0, description: ">20% area dengan kerusakan signifikan atau tanda-tanda ketidakstabilan" },
    ],
  },
  {
    code: "roofCorrosion",
    displayNo: 7,
    parameter: "Kondisi Visual - Korosi di Roof",
    weight: 3,
    options: corrosionOptions,
  },
  {
    code: "roofLeakPatch",
    displayNo: 8,
    parameter: "Kondisi Visual - Bekas Kebocoran / Tambalan di Roof",
    weight: 1,
    options: leakPatchOptions,
  },
  {
    code: "roofPainting",
    displayNo: 9,
    parameter: "Kondisi Visual - Cat / Painting di Roof",
    weight: 1,
    options: paintingOptions,
  },
  {
    code: "roofDeformation",
    displayNo: 10,
    parameter: "Kondisi Visual - Deformasi di Roof",
    weight: 1,
    options: deformationOptions,
  },
  {
    code: "roofThickness",
    displayNo: 11,
    parameter: "Integritas Struktural - Ketebalan Atap",
    weight: 13,
    options: thicknessOptions,
  },
  {
    code: "bottomCorrosion",
    displayNo: 12,
    parameter: "Kondisi Visual - Korosi di Bottom",
    weight: 3,
    options: corrosionOptions,
  },
  {
    code: "bottomLeakPatch",
    displayNo: 13,
    parameter: "Kondisi Visual - Bekas Kebocoran / Tambalan di Bottom",
    weight: 1,
    options: leakPatchOptions,
  },
  {
    code: "bottomPainting",
    displayNo: 14,
    parameter: "Kondisi Visual - Cat / Painting di Bottom",
    weight: 1,
    options: paintingOptions,
  },
  {
    code: "bottomDeformation",
    displayNo: 15,
    parameter: "Kondisi Visual - Deformasi di Bottom",
    weight: 1,
    options: deformationOptions,
  },
  {
    code: "bottomThickness",
    displayNo: 16,
    parameter: "Integritas Struktural - Ketebalan Bottom",
    weight: 14,
    options: thicknessOptions,
  },
  {
    code: "accessSafety",
    displayNo: 17,
    parameter: "Kondisi Visual - Akses dan Keselamatan",
    weight: 1,
    options: [
      { value: 100, description: "Semua tangga, rel, dan platform dalam kondisi baik" },
      { value: 70, description: "Kondisi yang memerlukan perhatian tapi masih aman" },
      { value: 30, description: "Beberapa area yang mungkin tidak aman" },
      { value: 0, description: "Banyak area yang tidak aman atau tidak dapat diakses" },
    ],
  },
  {
    code: "groundingSystem",
    displayNo: 18,
    parameter: "Sistem Grounding",
    weight: 1,
    options: [
      { value: 100, description: "Tersedia dan berfungsi dengan baik" },
      { value: 50, description: "Tersedia tetapi memerlukan pemeliharaan" },
      { value: 0, description: "Tidak tersedia atau berfungsi dengan buruk atau tidak dapat diukur" },
    ],
  },
  {
    code: "lightningProtection",
    displayNo: 19,
    parameter: "Sistem Proteksi Petir",
    weight: 1,
    options: [
      { value: 100, description: "Sistem proteksi petir tersedia dan memiliki sertifikat Depnaker aktif" },
      { value: 50, description: "Tersedia tetapi sertifikat Depnaker tidak tersedia / expired" },
      { value: 0, description: "Sistem proteksi petir tidak tersedia" },
    ],
  },
  {
    code: "fireFightingSystem",
    displayNo: 20,
    parameter: "Sistem Pemadam Kebakaran",
    weight: 1,
    options: [
      { value: 100, description: "Kondisi baik dan berfungsi optimal" },
      { value: 70, description: "Masalah minor, perlu pemeliharaan sedikit, tapi umumnya fungsional" },
      { value: 30, description: "Masalah major, perlu pemeliharaan signifikan, sebagian fungsional" },
      { value: 0, description: "Tidak berfungsi atau tidak tersedia" },
    ],
  },
  {
    code: "normalVenting",
    displayNo: 21,
    parameter: "Sistem Normal Venting (Breather Valve & Free Vent)",
    weight: 8,
    options: [
      { value: 100, description: "Kondisi visual baik dan sertifikat COI aktif" },
      { value: 0, description: "Kondisi visual buruk atau sertifikat COI expired / tidak ada / teridentifikasi kondisi major" },
    ],
  },
  {
    code: "emergencyVenting",
    displayNo: 22,
    parameter: "Sistem Emergency Venting",
    weight: 2,
    options: [
      { value: 100, description: "Kondisi visual baik dan mempunyai data historis pengujian terbaru" },
      { value: 50, description: "Kondisi visual cukup namun tidak ada catatan historis pengujian" },
      { value: 0, description: "Kondisi visual buruk / performa diragukan / tidak ada emergency venting" },
    ],
  },
  {
    code: "settlement",
    displayNo: 23,
    parameter: "Settlement",
    weight: 1,
    options: [
      { value: 100, description: "Settlement aktual <= settlement yang diijinkan" },
      { value: 70, description: "Settlement aktual > 100% s.d. 110% dari settlement yang diijinkan" },
      { value: 30, description: "Settlement aktual > 110% s.d. 120% dari settlement yang diijinkan" },
      { value: 0, description: "Settlement aktual > 120% dari settlement yang diijinkan atau tidak ada data" },
    ],
  },
  {
    code: "plumbness",
    displayNo: 24,
    parameter: "Plumbness",
    weight: 1,
    options: [
      { value: 100, description: "Penyimpangan <= 1/200 dari tinggi tangki" },
      { value: 50, description: "Penyimpangan > 1/200 s.d. 1/100 dari tinggi tangki" },
      { value: 0, description: "Penyimpangan > 1/100 dari tinggi tangki" },
    ],
  },
  {
    code: "maintenanceSchedule",
    displayNo: 25,
    parameter: "Jadwal Pemeliharaan",
    weight: 3,
    options: [
      { value: 100, description: "95%-100% jadwal pemeliharaan terpenuhi tepat waktu" },
      { value: 70, description: "80%-94% jadwal pemeliharaan terpenuhi tepat waktu" },
      { value: 30, description: "60%-79% jadwal pemeliharaan terpenuhi tepat waktu" },
      { value: 0, description: "Kurang dari 60% jadwal pemeliharaan terpenuhi tepat waktu" },
    ],
  },
  {
    code: "documentationRecords",
    displayNo: 26,
    parameter: "Dokumentasi dan Catatan",
    weight: 3,
    options: [
      { value: 100, description: "95%-100% catatan tersedia dan terorganisir" },
      { value: 70, description: "80%-94% catatan tersedia" },
      { value: 30, description: "60%-79% catatan tersedia" },
      { value: 0, description: "Kurang dari 60% catatan tersedia" },
    ],
  },
  {
    code: "regulatoryCompliance",
    displayNo: 27,
    parameter: "Kepatuhan terhadap Regulasi",
    weight: 10,
    options: [
      { value: 100, description: "Sertifikat COI masih berlaku" },
      { value: 0, description: "Sertifikat COI kadaluarsa / tidak tersedia / teridentifikasi kondisi major" },
    ],
  },
  {
    code: "environmentalConsideration",
    displayNo: 28,
    parameter: "Pertimbangan Lingkungan",
    weight: 1,
    options: [
      {
        value: 100,
        description:
          "Memiliki semua pengaman lingkungan dan berfungsi dengan baik (release prevention barrier, oil catcher, groundwater detection)",
      },
      {
        value: 70,
        description:
          "Memiliki dua dari tiga pengaman lingkungan dan berfungsi dengan baik (release prevention barrier, oil catcher, groundwater detection)",
      },
      {
        value: 30,
        description:
          "Memiliki satu dari tiga pengaman lingkungan dan berfungsi dengan baik (release prevention barrier, oil catcher, groundwater detection)",
      },
      { value: 0, description: "Tidak memiliki pengaman lingkungan sama sekali / tidak berfungsi" },
    ],
  },
];

export function calculateTnkParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) return undefined;
  return (conditionWeight / 100) * weight;
}

export function formatTnkScore(score?: number) {
  if (score === undefined) return "";
  return score.toFixed(1).replace(".", ",");
}
