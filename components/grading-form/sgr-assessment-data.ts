export type SgrAssessmentOption = {
  value: 100 | 70 | 50 | 30 | 0;
  description: string;
};

export type SgrAssessmentParameter = {
  code: string;
  displayNo: number;
  parameter: string;
  weight: number;
  options: SgrAssessmentOption[];
};

export const sgrAssessmentParameters: SgrAssessmentParameter[] = [
  {
    code: "enclosureCondition",
    displayNo: 1,
    parameter: "Kondisi Enclosure",
    weight: 3,
    options: [
      { value: 100, description: "Utuh" },
      { value: 50, description: "Penyok ringan" },
      { value: 0, description: "Rusak, retak, atau berlubang" },
    ],
  },
  {
    code: "enclosureCorrosion",
    displayNo: 2,
    parameter: "Korosi Enclosure",
    weight: 1,
    options: [
      { value: 100, description: "Tidak ada" },
      { value: 50, description: "Lokal" },
      { value: 0, description: "Meluas" },
    ],
  },
  {
    code: "enclosurePaintCondition",
    displayNo: 3,
    parameter: "Kondisi Cat Enclosure",
    weight: 1,
    options: [
      { value: 100, description: "Utuh" },
      { value: 50, description: "Mengelupas ringan" },
      { value: 0, description: "Rusak parah" },
    ],
  },
  {
    code: "insideEnclosureCleanliness",
    displayNo: 4,
    parameter: "Kebersihan Dalam Enclosure",
    weight: 1,
    options: [
      { value: 100, description: "Bersih" },
      { value: 50, description: "Kotor" },
      { value: 0, description: "Sangat kotor" },
    ],
  },
  {
    code: "waterIngress",
    displayNo: 5,
    parameter: "Indikasi Masuk Air / Lembab",
    weight: 8,
    options: [
      { value: 100, description: "Tidak ada" },
      { value: 50, description: "Ada jejak (bekas rembes/karat lembab)" },
      { value: 0, description: "Basah atau berembun" },
    ],
  },
  {
    code: "cableGlandSeal",
    displayNo: 6,
    parameter: "Kondisi Cable Gland / Seal / Penutup Lubang",
    weight: 2,
    options: [
      { value: 100, description: "Baik" },
      { value: 50, description: "Kurang rapi / ada celah" },
      { value: 0, description: "Terbuka / banyak lubang" },
    ],
  },
  {
    code: "labelling",
    displayNo: 7,
    parameter: "Labelling (Feeder / Warning / Nameplate)",
    weight: 2,
    options: [
      { value: 100, description: "Lengkap" },
      { value: 50, description: "Sebagian rusak/hilang" },
      { value: 0, description: "Banyak hilang" },
    ],
  },
  {
    code: "wiringTidiness",
    displayNo: 8,
    parameter: "Kerapihan Wiring (Kontrol / Aux)",
    weight: 2,
    options: [
      {
        value: 100,
        description: "Rapi; tidak ada kabel longgar/terkelupas",
      },
      { value: 50, description: "Kurang rapi namun aman" },
      { value: 0, description: "Tidak teratur, kabel putus, salah sambung, unsafe" },
    ],
  },
  {
    code: "overheatingIndication",
    displayNo: 9,
    parameter: "Ventilasi & Indikasi Overheating",
    weight: 7,
    options: [
      {
        value: 100,
        description:
          "Ventilasi baik; tidak ada discoloration/bekas panas; fan/filter OK (jika ada)",
      },
      {
        value: 50,
        description: "Ada tanda panas ringan/warna berubah; fan/filter kotor",
      },
      {
        value: 0,
        description:
          "Indikasi panas berlebih (bekas panas signifikan / bau terbakar / hotspot)",
      },
    ],
  },
  {
    code: "indicatorDisplayCondition",
    displayNo: 10,
    parameter: "Kondisi Indikator / Display (Proteksi / Metering Relay)",
    weight: 9,
    options: [
      {
        value: 100,
        description: "Display/LED normal; self-test OK; fungsi trip/alarm normal",
      },
      {
        value: 50,
        description: "Ada warning minor / 1-2 indikator mati; fungsi masih berjalan",
      },
      {
        value: 0,
        description: "Display mati/error fatal atau relay tidak dapat dioperasikan",
      },
    ],
  },
  {
    code: "circuitBreakerMechanicalOperation",
    displayNo: 11,
    parameter: "Operasi Mekanikal Circuit Breaker",
    weight: 9,
    options: [
      {
        value: 100,
        description:
          "Close/Trip lancar (manual/elektrik), tidak macet; mekanisme normal",
      },
      {
        value: 50,
        description: "Terasa berat/lambat atau bunyi kasar, namun masih berfungsi",
      },
      { value: 0, description: "Circuit breaker gagal beroperasi (close/trip)" },
    ],
  },
  {
    code: "springChargingMechanism",
    displayNo: 12,
    parameter: "Mekanisme Charging / Spring Circuit Breaker",
    weight: 7,
    options: [
      { value: 100, description: "Pengisian energi (spring/motor) normal" },
      { value: 50, description: "Pengisian energi lambat atau tidak konsisten" },
      { value: 0, description: "Mekanisme pengisian energi (spring/motor) gagal" },
    ],
  },
  {
    code: "mechanicalElectricalInterlock",
    displayNo: 13,
    parameter: "Interlock Mekanis & Elektrik",
    weight: 9,
    options: [
      { value: 100, description: "Berfungsi normal" },
      { value: 50, description: "Kadang bermasalah" },
      { value: 0, description: "Tidak berfungsi" },
    ],
  },
  {
    code: "earthingSwitchPosition",
    displayNo: 14,
    parameter: "Earthing Switch & Indikator Posisi",
    weight: 9,
    options: [
      { value: 100, description: "Posisi jelas & sesuai" },
      { value: 50, description: "Indikator kurang jelas" },
      { value: 0, description: "Posisi tidak dapat dipastikan" },
    ],
  },
  {
    code: "breakerInterruptingMedium",
    displayNo: 15,
    parameter: "Kondisi Media Pemutus Circuit Breaker",
    weight: 7,
    options: [
      { value: 100, description: "Normal (tidak ada alarm / indikator normal)" },
      { value: 50, description: "Ada indikasi minor" },
      {
        value: 0,
        description:
          "Teridentifikasi indikasi gangguan atau alarm aktif pada media pemutus",
      },
    ],
  },
  {
    code: "accessClearance",
    displayNo: 16,
    parameter: "Akses & Clearance",
    weight: 2,
    options: [
      {
        value: 100,
        description: "Akses baik; clearance cukup; tidak terhalang material",
      },
      {
        value: 0,
        description:
          "Akses atau clearance tidak memenuhi persyaratan keselamatan",
      },
    ],
  },
  {
    code: "installationFoundationCondition",
    displayNo: 17,
    parameter: "Kondisi Instalasi & Pondasi",
    weight: 2,
    options: [
      {
        value: 100,
        description:
          "Pondasi/anchor baik; panel stabil; tidak ada vibrasi abnormal",
      },
      {
        value: 50,
        description: "Ada retak ringan/ketidakrataan; perlu perbaikan minor",
      },
      { value: 0, description: "Pondasi rusak/instabil; panel miring/berbahaya" },
    ],
  },
  {
    code: "grounding",
    displayNo: 18,
    parameter: "Grounding",
    weight: 2,
    options: [
      { value: 100, description: "<= 2 ohm" },
      { value: 70, description: "> 2 ohm - 5 ohm" },
      { value: 30, description: "> 5 ohm - 8 ohm" },
      { value: 0, description: "> 8 ohm atau tidak bisa diukur" },
    ],
  },
  {
    code: "equipmentAge",
    displayNo: 19,
    parameter: "Usia Peralatan",
    weight: 1,
    options: [
      {
        value: 100,
        description:
          "Peralatan berusia kurang dari 20% dari umur desainnya (<= 4 tahun)",
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
  {
    code: "operationHistoryRepeatedTrip",
    displayNo: 20,
    parameter: "Riwayat Operasi - Trip Berulang",
    weight: 7,
    options: [
      {
        value: 100,
        description:
          "Tidak pernah trip; satu kali trip dengan sebab jelas dan sudah ditangani",
      },
      {
        value: 0,
        description:
          "Lebih dari dua kali trip dalam 12 bulan terakhir; trip tanpa penyebab eksternal jelas",
      },
    ],
  },
  {
    code: "operationHistoryOverheating",
    displayNo: 21,
    parameter: "Riwayat Operasi - Panas berlebih",
    weight: 3,
    options: [
      {
        value: 100,
        description:
          "Tidak pernah alarm suhu; tidak ada pembatasan beban karena panas",
      },
      {
        value: 0,
        description:
          "Alarm suhu aktif >= 1 kali; suhu minyak / winding mendekati batas operasi; trafo pernah diturunkan bebannya karena panas",
      },
    ],
  },
  {
    code: "operationHistoryAbnormalSmellSound",
    displayNo: 22,
    parameter: "Riwayat Operasi - Bau / Suara Abnormal",
    weight: 2,
    options: [
      { value: 100, description: "Tidak pernah tercium bau atau suara abnormal" },
      {
        value: 0,
        description:
          "Bau minyak terbakar; suara mendesis / humming tidak normal; getaran yang dirasakan operator",
      },
    ],
  },
  {
    code: "operationHistoryUnscheduledDisturbance",
    displayNo: 23,
    parameter: "Riwayat Operasi - Gangguan Tak Terjadwal",
    weight: 3,
    options: [
      {
        value: 100,
        description: "Hanya pemeliharaan terjadwal; 0-1 gangguan minor",
      },
      {
        value: 0,
        description:
          "Lebih dari 2 kali pemeliharaan darurat / korektif atau shutdown mendadak",
      },
    ],
  },
  {
    code: "coiCertificate",
    displayNo: 24,
    parameter: "Status Sertifikasi COI Medium Voltage Switchgear",
    weight: 1,
    options: [
      { value: 100, description: "Masih berlaku" },
      { value: 0, description: "Kadaluarsa atau tidak tersedia" },
    ],
  },
];

export function calculateSgrParameterScore(
  weight: number,
  conditionWeight?: number,
) {
  if (conditionWeight === undefined) {
    return undefined;
  }

  return (conditionWeight / 100) * weight;
}

export function formatSgrScore(score?: number) {
  if (score === undefined) {
    return "";
  }

  return score.toFixed(1).replace(".", ",");
}
