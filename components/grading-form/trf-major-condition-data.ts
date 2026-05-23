export type TrfMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const trfMajorConditionRows: TrfMajorConditionRow[] = [
  {
    id: 1,
    key: "oilTankCondition",
    parameter: "Kondisi Tanki Oli",
    condition: "Teridentifikasi kebocoran oil",
  },
  {
    id: 2,
    key: "bushingCondition",
    parameter: "Kondisi Bushing",
    condition: "Teridentifikasi kondisi bushing retak",
  },
  {
    id: 3,
    key: "coiCertificate",
    parameter: "Sertifikasi COI Transformator",
    condition: "Sertifikat COI Transformator kadaluarsa atau tidak tersedia",
  },
  {
    id: 4,
    key: "cannotOperate",
    parameter: "Tidak Dapat Beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
];
