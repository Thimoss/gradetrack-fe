export type MtrMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const mtrMajorConditionRows: MtrMajorConditionRow[] = [
  {
    id: 1,
    key: "processFluidLeak",
    parameter: "Kebocoran Fluida Proses",
    condition: "Teridentifikasi kebocoran fluida proses",
  },
  {
    id: 2,
    key: "calibrationCertificateMissing",
    parameter: "Tidak Ada Sertifikat Kalibrasi Metering",
    condition:
      "Sertifikat Kalibrasi Metering yang terbaru tidak ada atau sudah expired",
  },
  {
    id: 3,
    key: "cannotOperate",
    parameter: "Tidak Dapat Beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
];
