export type SgrMajorConditionRow = {
  id: number;
  key: string;
  parameter: string;
  condition: string;
};

export const sgrMajorConditionRows: SgrMajorConditionRow[] = [
  {
    id: 1,
    key: "enclosureCondition",
    parameter: "Kondisi Enclosure",
    condition: "Teridentifikasi rusak, retak, atau berlubang",
  },
  {
    id: 2,
    key: "waterIngress",
    parameter: "Indikasi Masuk Air / Lembab",
    condition: "Teridentifikasi basah atau berembun",
  },
  {
    id: 3,
    key: "overheatingIndication",
    parameter: "Ventilasi & Indikasi Overheating",
    condition:
      "Teridentifikasi indikasi panas berlebih (bekas panas signifikan / bau terbakar / hotspot)",
  },
  {
    id: 4,
    key: "indicatorDisplayCondition",
    parameter: "Kondisi Indikator / Display (Proteksi / Metering Relay)",
    condition:
      "Indikator atau display tidak berfungsi atau proteksi / metering relay tidak dapat dioperasikan",
  },
  {
    id: 5,
    key: "circuitBreakerMechanicalOperation",
    parameter: "Operasi Mekanikal Circuit Breaker",
    condition: "Circuit breaker gagal beroperasi (close/trip)",
  },
  {
    id: 6,
    key: "springChargingMechanism",
    parameter: "Mekanisme Charging / Spring Circuit Breaker",
    condition: "Mekanisme pengisian energi (spring/motor) gagal",
  },
  {
    id: 7,
    key: "mechanicalElectricalInterlock",
    parameter: "Interlock Mekanis & Elektrik",
    condition: "Interlock mekanis atau elektrik tidak berfungsi",
  },
  {
    id: 8,
    key: "earthingSwitchPosition",
    parameter: "Earthing Switch & Indikator Posisi",
    condition: "Posisi tidak dapat dipastikan",
  },
  {
    id: 9,
    key: "breakerInterruptingMedium",
    parameter: "Kondisi Media Pemutus Circuit Breaker",
    condition:
      "Teridentifikasi indikasi gangguan atau alarm aktif pada media pemutus",
  },
  {
    id: 10,
    key: "accessClearance",
    parameter: "Akses & Clearance",
    condition:
      "Teridentifikasi akses atau clearance tidak memenuhi persyaratan keselamatan",
  },
  {
    id: 11,
    key: "coiCertificate",
    parameter: "Sertifikasi COI Medium Voltage Switchgear",
    condition:
      "Sertifikat COI Medium voltage switchgear kadaluarsa atau tidak tersedia",
  },
  {
    id: 12,
    key: "cannotOperate",
    parameter: "Tidak Dapat Beroperasi",
    condition: "Peralatan tidak dapat dioperasikan pada waktu penilaian",
  },
];
