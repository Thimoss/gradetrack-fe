export type PipMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const pipMajorConditionRows: PipMajorConditionRow[] = [
  {
    id: 1,
    key: "processFluidLeak",
    parameter: "Kebocoran Fluida Proses",
    condition:
      "Teridentifikasi kebocoran fluida proses baik pada fitting maupun pada segmen pipa",
  },
  {
    id: 2,
    key: "significantDeformation",
    parameter: "Deformasi Signifikan",
    condition:
      "Teridentifikasi deformasi signifikan yang mempengaruhi integritas peralatan",
  },
  {
    id: 3,
    key: "cannotOperate",
    parameter: "Tidak dapat beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
  {
    id: 4,
    key: "thinPipeOrSignificantCorrosionOrNoData",
    parameter: "Tebal pipa tipis / korosi signifikan / tidak ada data",
    condition:
      "Margin ketebalan pipa di bawah 0,5 mm atau teridentifikasi korosi yang signifikan (tidak terukur) atau tidak ada data",
  },
];
