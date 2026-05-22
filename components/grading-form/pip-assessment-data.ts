export type PipAssessmentOption = {
  value: 100 | 70 | 50 | 30 | 0;
  description: string;
};

export type PipAssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: PipAssessmentOption[];
};

const corrosionOptions: PipAssessmentOption[] = [
  { value: 100, description: "0-5% area terpengaruh" },
  { value: 70, description: "6-10% area terpengaruh" },
  {
    value: 30,
    description: "11-20% area terpengaruh / korosi lokal yang signifikan",
  },
  {
    value: 0,
    description:
      ">20% area terpengaruh / teridentifikasi bocor / tambalan non-permanent",
  },
];

const paintingOptions: PipAssessmentOption[] = [
  {
    value: 100,
    description: "0-5% area dengan perubahan warna atau mengelupas",
  },
  {
    value: 70,
    description: "5-15% area dengan perubahan warna atau mengelupas ringan",
  },
  {
    value: 30,
    description: "16-50% area dengan perubahan warna atau mengelupas signifikan",
  },
  {
    value: 0,
    description: ">50% area dengan perubahan warna atau mengelupas signifikan",
  },
];

const indicatorOptions: PipAssessmentOption[] = [
  {
    value: 100,
    description: "Tersedia dan berfungsi dengan baik atau tidak applicable",
  },
  { value: 50, description: "Tersedia tetapi memerlukan pemeliharaan" },
  { value: 0, description: "Rusak" },
];

export const pipAssessmentParameters: PipAssessmentParameter[] = [
  {
    code: "pipeCorrosionLeak",
    displayNo: 1,
    parameter: "Kondisi Visual - Korosi dan Kebocoran pada pipa",
    weight: 8,
    options: corrosionOptions,
  },
  {
    code: "pipePainting",
    displayNo: 2,
    parameter: "Kondisi Visual - Cat / Painting pada pipa",
    weight: 8,
    options: paintingOptions,
  },
  {
    code: "pipeDeformation",
    displayNo: 3,
    parameter: "Kondisi Visual - Deformasi pada pipa",
    weight: 4,
    options: [
      {
        value: 100,
        description:
          "Tidak ada deformasi atau deformasi minor yang tidak mempengaruhi operasi",
      },
      {
        value: 70,
        description:
          "Deformasi ringan yang memerlukan pemantauan, tetapi tidak kritis",
      },
      {
        value: 30,
        description:
          "Deformasi moderat yang dapat mempengaruhi integritas struktural, tindakan diperlukan",
      },
      {
        value: 0,
        description:
          "Deformasi signifikan yang mengancam integritas struktural, perlu perbaikan segera",
      },
    ],
  },
  {
    code: "pipeThicknessIntegrity",
    displayNo: 4,
    parameter: "Integritas Struktural - Ketebalan pipa",
    weight: 60,
    options: [
      {
        value: 100,
        description:
          "Margin ketebalan > 1,5 mm dari ketebalan minimum yang dibutuhkan",
      },
      {
        value: 70,
        description:
          "Margin ketebalan 1 - 1,5 mm dari ketebalan minimum yang dibutuhkan",
      },
      {
        value: 30,
        description:
          "Margin ketebalan 0,5 - 1 mm dari ketebalan minimum yang dibutuhkan",
      },
      {
        value: 0,
        description:
          "Margin ketebalan < 0,5 mm dari ketebalan minimum yang dibutuhkan / teridentifikasi kondisi major",
      },
    ],
  },
  {
    code: "valveFittingCorrosion",
    displayNo: 5,
    parameter: "Kondisi Visual - Korosi di Valve dan Fitting",
    weight: 4,
    options: corrosionOptions,
  },
  {
    code: "valveFittingPainting",
    displayNo: 6,
    parameter: "Kondisi Visual - Cat / Painting di Valve dan Fitting",
    weight: 4,
    options: paintingOptions,
  },
  {
    code: "pressureIndicator",
    displayNo: 7,
    parameter: "Kondisi Visual dan Fungsi - Pressure Indikator",
    weight: 4,
    options: indicatorOptions,
  },
  {
    code: "temperatureIndicator",
    displayNo: 8,
    parameter: "Kondisi Visual dan Fungsi - Temperatur Indikator",
    weight: 4,
    options: indicatorOptions,
  },
  {
    code: "pipeSupportCorrosion",
    displayNo: 9,
    parameter: "Kondisi Visual - Korosi / Kerusakan di Support Perpipaan",
    weight: 4,
    options: [
      { value: 100, description: "0-5% area terpengaruh" },
      { value: 70, description: "6-10% area terpengaruh" },
      {
        value: 30,
        description: "11-20% area terpengaruh / korosi lokal cukup signifikan",
      },
      {
        value: 0,
        description: ">20% area terpengaruh / korosi lokal yang sangat signifikan",
      },
    ],
  },
];

export function calculatePipParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) {
    return undefined;
  }

  return (conditionWeight / 100) * weight;
}

export function formatPipScore(score?: number) {
  if (score === undefined) {
    return "";
  }

  return score.toFixed(1).replace(".", ",");
}
