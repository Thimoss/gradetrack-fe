export type MovMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const movMajorConditionRows: MovMajorConditionRow[] = [
  {
    id: 1,
    key: "processFluidLeak",
    parameter: "Kebocoran Fluida Proses",
    condition: "Teridentifikasi kebocoran fluida proses",
  },
  {
    id: 2,
    key: "cannotOperate",
    parameter: "Tidak Dapat Beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
];
