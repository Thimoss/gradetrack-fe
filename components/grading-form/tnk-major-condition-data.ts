export type TnkMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const tnkMajorConditionRows: TnkMajorConditionRow[] = [
  {
    id: 1,
    key: "processFluidLeak",
    parameter: "Kebocoran Fluida Proses",
    condition:
      "Teridentifikasi kebocoran fluida proses baik pada fitting maupun pada segmen bertekanan",
  },
  {
    id: 2,
    key: "significantDeformation",
    parameter: "Deformasi Signifikan",
    condition:
      "Teridentifikasi deformasi signifikan yang mempengaruhi integritas peralatan baik pada support maupun segmen bertekanan",
  },
  {
    id: 3,
    key: "cannotOperate",
    parameter: "Tidak dapat beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
  {
    id: 4,
    key: "coiTankMissing",
    parameter: "Tidak ada COI Tangki Penimbun atau Expired",
    condition:
      "Sertifikat COI Tangki penimbun yang terbaru tidak ada atau sudah expired",
  },
  {
    id: 5,
    key: "coiBreatherValveMissing",
    parameter: "Tidak ada COI Breather Valve atau Expired atau Kondisi Visual Buruk",
    condition:
      "Sertifikat COI Breather Valve yang terbaru tidak ada atau sudah expired atau kondisi visual buruk",
  },
  {
    id: 6,
    key: "internalInspectionMissing",
    parameter: "Tidak ada data Inspeksi Internal/Cleaning Internal",
    condition: "Data Inspeksi Internal/Cleaning Internal 5 tahun terakhir tidak ada",
  },
  {
    id: 7,
    key: "thinSegmentSignificantCorrosion",
    parameter: "Tebal segmen tipis / korosi signifikan",
    condition:
      "Margin ketebalan segmen utama di bawah 1 mm atau teridentifikasi korosi yang signifikan (tidak terukur) atau tidak ada data ketebalan dinding",
  },
];
