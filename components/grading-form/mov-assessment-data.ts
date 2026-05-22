export type MovAssessmentOption = {
  value: 100 | 70 | 50 | 30 | 0;
  description: string;
};

export type MovAssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: MovAssessmentOption[];
};

export const movAssessmentParameters: MovAssessmentParameter[] = [
  {
    code: "visualBody",
    displayNo: 1,
    parameter: "Visual - Body Valve, Flange, Seat, Shell, Label nameplate",
    weight: 30,
    options: [
      {
        value: 100,
        description: "Baik: bersih, tanpa kerusakan, label jelas terbaca",
      },
      {
        value: 50,
        description:
          "Sedang: ada korosi ringan / cat terkelupas, label tidak jelas / hilang",
      },
      {
        value: 0,
        description: "Buruk: bocor, housing retak",
      },
    ],
  },
  {
    code: "actuatorFunction",
    displayNo: 2,
    parameter: "Fungsi - Actuator",
    weight: 30,
    options: [
      {
        value: 100,
        description: "Normal: Stroke time sesuai desain ±10%",
      },
      {
        value: 50,
        description: "Anomali: Stroke time lambat >25%",
      },
      {
        value: 0,
        description: "Tidak berfungsi: Tidak bergerak / Stroke time <25%",
      },
    ],
  },
  {
    code: "grounding",
    displayNo: 3,
    parameter: "Grounding",
    weight: 20,
    options: [
      { value: 100, description: "< 2 ohm" },
      { value: 70, description: "> 2 ohm - 5 ohm" },
      { value: 30, description: "> 5 ohm - 8 ohm" },
      { value: 0, description: "> 8 ohm atau tidak bisa diukur" },
    ],
  },
  {
    code: "equipmentAge",
    displayNo: 4,
    parameter: "Usia Peralatan",
    weight: 20,
    options: [
      {
        value: 100,
        description:
          "Peralatan berusia kurang dari 20% dari umur desainnya (≤ 4 tahun)",
      },
      {
        value: 70,
        description:
          "Peralatan berusia antara 20% hingga 50% dari umur desainnya (> 4 s.d. 10 tahun)",
      },
      {
        value: 30,
        description:
          "Peralatan berusia antara 50% hingga 100% dari umur desainnya (> 10 s.d. 20 tahun)",
      },
      {
        value: 0,
        description:
          "Peralatan berusia lebih dari 100% dari umur desainnya (> 20 tahun)",
      },
    ],
  },
];

export function calculateMovParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) {
    return undefined;
  }

  return (conditionWeight / 100) * weight;
}

export function formatMovScore(score?: number) {
  if (score === undefined) {
    return "";
  }

  return score.toFixed(1).replace(".", ",");
}
