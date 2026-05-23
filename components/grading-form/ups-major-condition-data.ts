export type UpsMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const upsMajorConditionRows: UpsMajorConditionRow[] = [
  {
    id: 1,
    key: "cannotOperate",
    parameter: "Tidak dapat beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
  {
    id: 2,
    key: "coiExpiredOrMissing",
    parameter: "Tidak ada COI Generator atau Expired",
    condition: "Sertifikat COI Transformator yang terbaru tidak ada atau sudah expired",
  },
  {
    id: 3,
    key: "outputStabilityVoltage",
    parameter: "Output Stability Voltage",
    condition: "Kestabilan tegangan output dalam kondisi POOR",
  },
  {
    id: 4,
    key: "transferTimePoor",
    parameter: "Transfer Time Test (AC Fail to Battery)",
    condition: "Waktu transfer menuju baterai dalam kondisi POOR",
  },
  {
    id: 5,
    key: "internalResistancePoor",
    parameter: "Internal Resistance Test Battery",
    condition: "Tahanan internal dalam kondisi POOR",
  },
  {
    id: 6,
    key: "dischargeTimePoor",
    parameter: "Discharge Time Battery",
    condition: "Waktu discharge dalam kondisi POOR",
  },
  {
    id: 7,
    key: "alarmProtectionPoor",
    parameter: "Alarm & Protection Function",
    condition: "Fungsi alarm dan proteksi dalam kondisi POOR",
  },
  {
    id: 8,
    key: "internalTemperatureFanPoor",
    parameter: "Internal Temperature and Fan Operation",
    condition: "Suhu internal dan operasi kipas dalam kondisi POOR",
  },
];
