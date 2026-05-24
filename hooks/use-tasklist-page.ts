"use client";

import { useMemo, useState } from "react";

export type TasklistPerformance = "H" | "M" | "L" | "";
export type TasklistEquipmentType =
  | "GST"
  | "MOV"
  | "MTR"
  | "PIP"
  | "PMP"
  | "SGR"
  | "TNK"
  | "TRF"
  | "UPS";
export type TasklistCycle =
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "SIX_MONTHLY"
  | "YEARLY";
export type TasklistStep = "equipment" | "cycle" | "form";
type TasklistResultKey =
  | "GST-WEEKLY"
  | "GST-MONTHLY"
  | "GST-SIX_MONTHLY"
  | "GST-YEARLY"
  | "MOV-DAILY"
  | "MOV-MONTHLY"
  | "MOV-YEARLY"
  | "MTR-DAILY"
  | "MTR-WEEKLY"
  | "MTR-YEARLY"
  | "PIP-MONTHLY"
  | "PIP-YEARLY"
  | "PMP-DAILY"
  | "PMP-MONTHLY"
  | "PMP-SIX_MONTHLY"
  | "SGR-MONTHLY"
  | "SGR-YEARLY"
  | "TNK-MONTHLY"
  | "TNK-YEARLY"
  | "TRF-WEEKLY"
  | "TRF-SIX_MONTHLY"
  | "UPS-MONTHLY"
  | "UPS-YEARLY";

export type TasklistTask = {
  id: string;
  code: string;
  description: string;
  durationMinutes: number;
  procedure: string;
  acceptanceCriteria: string;
  inputType: "PERFORMANCE_ONLY" | "MEASUREMENT";
  measurementLabel?: string;
  measurementUnit?: string;
};

export type TasklistEquipment = {
  id: string;
  tagNumber: string;
};

export type TasklistResult = {
  taskId: string;
  equipmentId: string;
  performance: TasklistPerformance;
  measuredValue: string;
};

const gstEquipment: TasklistEquipment[] = Array.from(
  { length: 7 },
  (_, index) => ({
    id: `EQ-GST-${index + 1}`,
    tagNumber: `GST-${String(index + 1).padStart(2, "0")}`,
  }),
);

const movEquipment: TasklistEquipment[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `EQ-MOV-${index + 1}`,
    tagNumber: `MOV-${String(index + 1).padStart(2, "0")}`,
  }),
);

const mtrEquipment: TasklistEquipment[] = Array.from(
  { length: 7 },
  (_, index) => ({
    id: `EQ-MTR-${index + 1}`,
    tagNumber: `MTR-${String(index + 1).padStart(2, "0")}`,
  }),
);

const pipEquipment: TasklistEquipment[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `EQ-PIP-${index + 1}`,
    tagNumber: `PIP-${String(index + 1).padStart(2, "0")}`,
  }),
);

const pmpEquipment: TasklistEquipment[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `EQ-PMP-${index + 1}`,
    tagNumber: `PMP-${String(index + 1).padStart(2, "0")}`,
  }),
);

const sgrEquipment: TasklistEquipment[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `EQ-SGR-${index + 1}`,
    tagNumber: `SGR-${String(index + 1).padStart(2, "0")}`,
  }),
);

const tnkEquipment: TasklistEquipment[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `EQ-TNK-${index + 1}`,
    tagNumber: `TNK-${String(index + 1).padStart(2, "0")}`,
  }),
);

const trfEquipment: TasklistEquipment[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `EQ-TRF-${index + 1}`,
    tagNumber: `TRF-${String(index + 1).padStart(2, "0")}`,
  }),
);

const upsEquipment: TasklistEquipment[] = Array.from(
  { length: 8 },
  (_, index) => ({
    id: `EQ-UPS-${index + 1}`,
    tagNumber: `UPS-${String(index + 1).padStart(2, "0")}`,
  }),
);

const gstWeeklyTasks: TasklistTask[] = [
  {
    id: "GST-WEEKLY-C1A",
    code: "c.1.a",
    description: "Jalankan generator tanpa beban",
    durationMinutes: 30,
    procedure:
      "Operasi dalam mode local/manual. Circuit breaker menuju beban dalam kondisi opened, lakukan running genset selama 30 menit tanpa beban.",
    acceptanceCriteria:
      "Genset dapat berjalan tanpa kendala. Tegangan, frekuensi, dan kecepatan sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1B",
    code: "c.1.b",
    description: "Periksa indikator pada panel kontrol",
    durationMinutes: 5,
    procedure:
      "Memeriksa indikasi pada display panel kontrol, lamp indicator pada panel kontrol.",
    acceptanceCriteria:
      "Tidak ada indikasi warning dan fault. Lamp indicator menyala atau mati sesuai fungsi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1C",
    code: "c.1.c",
    description: "Periksa level cairan pendingin",
    durationMinutes: 5,
    procedure: "Memeriksa level cairan pendingin.",
    acceptanceCriteria: "Sesuai dengan batas garis rekomendasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1D",
    code: "c.1.d",
    description: "Periksa level oli mesin",
    durationMinutes: 5,
    procedure: "Memeriksa level oli mesin.",
    acceptanceCriteria: "Sesuai dengan batas garis rekomendasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1E",
    code: "c.1.e",
    description: "Periksa level bahan bakar",
    durationMinutes: 5,
    procedure: "Memeriksa level bahan bakar.",
    acceptanceCriteria: "Dalam level penuh, siap untuk dioperasikan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1F",
    code: "c.1.f",
    description: "Periksa mode operasi auto/standby",
    durationMinutes: 5,
    procedure: "Memastikan operasi genset dalam mode auto/standby.",
    acceptanceCriteria: "Dalam mode auto/standby.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1G",
    code: "c.1.g",
    description: "Periksa kebocoran",
    durationMinutes: 5,
    procedure:
      "Memeriksa apabila ada kebocoran cairan pendingin, oli mesin, dan bahan bakar.",
    acceptanceCriteria: "Tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-WEEKLY-C1H",
    code: "c.1.h",
    description: "Periksa sambungan baterai",
    durationMinutes: 5,
    procedure: "Memeriksa kabel yang terhubung dengan terminal baterai.",
    acceptanceCriteria: "Tidak ada yang longgar dan lepas.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const gstMonthlyTasks: TasklistTask[] = [
  {
    id: "GST-MONTHLY-C2A",
    code: "c.2.a",
    description: "Periksa pondasi",
    durationMinutes: 20,
    procedure: "Memeriksa pondasi dari generator.",
    acceptanceCriteria: "Tidak ada baut yang loose atau hilang.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-MONTHLY-C2B",
    code: "c.2.b",
    description: "Bersihkan filter udara",
    durationMinutes: 20,
    procedure: "Membersihkan filter udara.",
    acceptanceCriteria: "Filter udara bersih.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-MONTHLY-C2C",
    code: "c.2.c",
    description: "Bersihkan fuel water separator",
    durationMinutes: 15,
    procedure:
      "Mengeluarkan air lewat fuel drain valve ke wadah, sampai hanya tersisa bahan bakar saja.",
    acceptanceCriteria:
      "Tidak ada air. Hanya bahan bakar yang keluar pada drain valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-MONTHLY-C2D",
    code: "c.2.d",
    description: "Ukur tegangan baterai",
    durationMinutes: 10,
    procedure: "Mengukur tegangan baterai.",
    acceptanceCriteria: "Sesuai dengan spesifikasi (>= 11,5V).",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "V",
  },
];

const gstSixMonthlyTasks: TasklistTask[] = [
  {
    id: "GST-SIX-MONTHLY-C3A",
    code: "c.3.a",
    description: "Ganti oli mesin",
    durationMinutes: 45,
    procedure: "Ganti oli mesin.",
    acceptanceCriteria: "Beroperasi dengan oli mesin baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-SIX-MONTHLY-C3B",
    code: "c.3.b",
    description: "Ganti filter oli mesin",
    durationMinutes: 15,
    procedure: "Ganti filter oli mesin.",
    acceptanceCriteria: "Beroperasi dengan filter oli mesin baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-SIX-MONTHLY-C3C",
    code: "c.3.c",
    description: "Ganti filter bahan bakar",
    durationMinutes: 45,
    procedure: "Ganti filter bahan bakar.",
    acceptanceCriteria: "Beroperasi dengan filter bahan bakar baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-SIX-MONTHLY-C3D",
    code: "c.3.d",
    description: "Jalankan generator dengan beban",
    durationMinutes: 60,
    procedure:
      "Matikan suplai daya utama (PLN/ATS akan bekerja), running genset selama 60 menit dengan beban yang tersedia.",
    acceptanceCriteria:
      "Genset dapat berjalan tanpa kendala. Tegangan, frekuensi, dan kecepatan sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const gstYearlyTasks: TasklistTask[] = [
  {
    id: "GST-YEARLY-C4A",
    code: "c.4.a",
    description: "Ganti filter udara",
    durationMinutes: 45,
    procedure: "Ganti filter udara.",
    acceptanceCriteria: "Beroperasi dengan filter udara baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4B",
    code: "c.4.b",
    description: "Greasing bearing",
    durationMinutes: 10,
    procedure: "Greasing bearing.",
    acceptanceCriteria: "Tidak ada suara abnormal dan peningkatan getaran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4C",
    code: "c.4.c",
    description: "Lubricate governor ball joints",
    durationMinutes: 10,
    procedure: "Pelumasan pada governor ball joints.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4D",
    code: "c.4.d",
    description: "Bersihkan crankcase breather filter",
    durationMinutes: 20,
    procedure: "Bersihkan crankcase breather filter.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4E",
    code: "c.4.e",
    description: "Flushing sistem pendingin",
    durationMinutes: 90,
    procedure: "Flushing dan penggantian cairan pendingin.",
    acceptanceCriteria: "Beroperasi dengan cairan pendingin baru.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4F",
    code: "c.4.f",
    description: "Periksa kondisi water pump",
    durationMinutes: 15,
    procedure: "Pengujian sirkulasi sistem pendingin.",
    acceptanceCriteria: "Water pump bekerja untuk sirkulasi dengan baik.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4G",
    code: "c.4.g",
    description: "Periksa engine mounting",
    durationMinutes: 20,
    procedure: "Periksa kekencangan baut.",
    acceptanceCriteria: "Sesuai dengan torsi spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4H",
    code: "c.4.h",
    description: "Periksa governor actuator",
    durationMinutes: 30,
    procedure: "Periksa dan setting ulang governor actuator.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4I",
    code: "c.4.i",
    description: "Periksa kekencangan belt",
    durationMinutes: 15,
    procedure: "Memeriksa kekencangan belt.",
    acceptanceCriteria: "Belt dalam kondisi kekencangan yang sesuai.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4J",
    code: "c.4.j",
    description: "Periksa crankshaft speed sensor",
    durationMinutes: 20,
    procedure: "Periksa dan bersihkan crankshaft speed sensor.",
    acceptanceCriteria: "Kecepatan yang stabil.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "GST-YEARLY-C4K",
    code: "c.4.k",
    description: "Periksa grounding generator",
    durationMinutes: 10,
    procedure: "Inspeksi visual instalasi grounding dan pengukuran tahanan grounding.",
    acceptanceCriteria: "Instalasi sesuai dengan tahanan di bawah 5 Ohm.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "Ohm",
  },
];

const movDailyTasks: TasklistTask[] = [
  {
    id: "MOV-DAILY-C1A",
    code: "c.1.a",
    description: "Periksa kondisi valve",
    durationMinutes: 3,
    procedure:
      "Lakukan pemeriksaan fisik valve, pastikan tidak ada kebocoran pada valve.",
    acceptanceCriteria:
      "Valve mudah dioperasikan. Tidak ada kebocoran produk pada valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-DAILY-C1B",
    code: "c.1.b",
    description: "Periksa kebocoran",
    durationMinutes: 3,
    procedure:
      "Lakukan inspeksi visual dengan memperhatikan tanda-tanda fisik seperti noda atau bekas cairan, keretakan pada body valve, karat atau korosi, dan area basah pada body valve.",
    acceptanceCriteria: "Tidak ada kebocoran produk.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-DAILY-C1C",
    code: "c.1.c",
    description: "Periksa position indicator",
    durationMinutes: 3,
    procedure: "Pastikan position indicator sesuai dengan aktual bukaan valve.",
    acceptanceCriteria: "Toleransi akurasi 1%.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-DAILY-C1D",
    code: "c.1.d",
    description: "Periksa sambungan kabel power & instrumen",
    durationMinutes: 3,
    procedure:
      "Periksa kondisi fisik kabel listrik dan kabel data. Cari tanda-tanda kerusakan seperti isolasi kabel terkelupas, kabel tertekuk atau terjepit, kabel terpapar air, atau kabel terkoyak. Periksa koneksi kabel ke perangkat elektronik dan pastikan koneksi terpasang kencang.",
    acceptanceCriteria: "Terpasang dengan benar dan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const movMonthlyTasks: TasklistTask[] = [
  {
    id: "MOV-MONTHLY-C2A",
    code: "c.2.a",
    description: "Periksa kinerja MOV (open close)",
    durationMinutes: 3,
    procedure: "Lakukan pengujian open close pada MOV.",
    acceptanceCriteria: "Max. travel time 3 sec/inch.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2B",
    code: "c.2.b",
    description: "Periksa body MOV & koneksi kabel",
    durationMinutes: 3,
    procedure:
      "Periksa kerusakan fisik pada body valve seperti korosi, retak, atau komponen longgar. Periksa kabel motor valve terpasang rapat dan tidak longgar.",
    acceptanceCriteria:
      "Korosi tidak boleh lebih dari 10% mengacu ASTM D610. Terpasang dengan benar dan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2C",
    code: "c.2.c",
    description: "Periksa jalur drain dan venting",
    durationMinutes: 3,
    procedure:
      "Periksa katup drain dan venting apakah berfungsi dengan baik dan tidak terhalang.",
    acceptanceCriteria: "Berfungsi dengan baik dan tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2D",
    code: "c.2.d",
    description: "Periksa keausan/kerusakan bagian luar MOV",
    durationMinutes: 3,
    procedure:
      "Lakukan pemeriksaan fisik MOV, periksa kekuatan dan kekokohan struktur, sistem pelumasan, dan kondisi cat pelindung.",
    acceptanceCriteria: "Tidak ada kerusakan mekanikal.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2E",
    code: "c.2.e",
    description: "Bersihkan bagian luar valve",
    durationMinutes: 3,
    procedure: "Bersihkan seluruh bagian MOV dari kotoran dan debu.",
    acceptanceCriteria: "MOV bersih.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2F",
    code: "c.2.f",
    description: "Periksa kompartemen terminal dari rembesan air",
    durationMinutes: 3,
    procedure:
      "Periksa area sekitar kompartemen terminal untuk memastikan tidak ada kebocoran air yang mengarah ke terminal.",
    acceptanceCriteria: "Tidak ada rembesan air.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2G",
    code: "c.2.g",
    description: "Periksa kondisi baut/pondasi/base plate",
    durationMinutes: 3,
    procedure:
      "Pastikan baut, pondasi, dan base plate terpasang kokoh dan tidak ada korosi atau kerusakan fisik lainnya.",
    acceptanceCriteria:
      "Korosi tidak boleh lebih dari 10% mengacu ASTM D610. Terpasang dengan benar dan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2H",
    code: "c.2.h",
    description: "Periksa koneksi grounding",
    durationMinutes: 5,
    procedure:
      "Pastikan kabel pembumian dalam kondisi baik, tidak aus/korosi, dan sambungan ke struktur terpasang kuat.",
    acceptanceCriteria: "Terpasang dengan benar dan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2I",
    code: "c.2.i",
    description: "Periksa marking kabel",
    durationMinutes: 3,
    procedure: "Periksa kejelasan marking, pastikan dapat terbaca dengan jelas.",
    acceptanceCriteria: "Marking terbaca.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-MONTHLY-C2J",
    code: "c.2.j",
    description: "Periksa koneksi kabel instrumen di junction box",
    durationMinutes: 3,
    procedure:
      "Periksa kondisi fisik kabel data dan koneksi kabel ke perangkat elektronik, sensor, alat pengukur, atau sistem kontrol.",
    acceptanceCriteria: "Terpasang dengan benar dan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const movYearlyTasks: TasklistTask[] = [
  {
    id: "MOV-YEARLY-C3A",
    code: "c.3.a",
    description: "Greasing gearbox",
    durationMinutes: 5,
    procedure:
      "Isi gearbox dengan jumlah pelumas yang tepat sesuai kapasitas dalam manual.",
    acceptanceCriteria:
      "Pelumas yang digunakan tepat, jumlahnya sesuai, dan dilumasi merata di seluruh komponen yang bergerak.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MOV-YEARLY-C3B",
    code: "c.3.b",
    description: "Functional test",
    durationMinutes: 5,
    procedure:
      "Lakukan pengujian open close pada MOV secara local dan remote, pastikan travel time terpenuhi.",
    acceptanceCriteria: "Max. travel time 3 sec/inch.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const mtrDailyTasks: TasklistTask[] = [
  {
    id: "MTR-DAILY-C1A",
    code: "c.1.a",
    description: "Periksa kondisi valve",
    durationMinutes: 2,
    procedure:
      "Periksa kondisi valve untuk memastikan tidak ada kebocoran, keausan, atau korosi, dapat dioperasikan dengan baik, dan lakukan pemeriksaan pada aktuator.",
    acceptanceCriteria:
      "Valve dalam kondisi baik tanpa kebocoran, tidak ada karat atau kerusakan pada body valve, dan dapat dioperasikan dengan lancar.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-DAILY-C1B",
    code: "c.1.b",
    description: "Periksa jalur drain dan venting",
    durationMinutes: 2,
    procedure:
      "Pastikan jalur drain dan venting tidak tersumbat, periksa ada kebocoran atau kerusakan pada pipa dan fitting, dan semua valve dalam kondisi baik dan berfungsi dengan benar.",
    acceptanceCriteria:
      "Jalur drain dan venting bebas dari penyumbatan, tidak ada kebocoran atau korosi pada pipa dan fitting, dan semua valve dapat dioperasikan dengan normal.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-DAILY-C1C",
    code: "c.1.c",
    description: "Periksa indikator di batch control unit",
    durationMinutes: 2,
    procedure:
      "Periksa tampilan indikator apakah berfungsi dengan benar, pastikan tidak ada alarm atau error dan cek respon tombol dan layar.",
    acceptanceCriteria:
      "Indikator menyala dan menampilkan data yang benar, tidak ada error, dan semua tombol dan fungsi beroperasi dengan baik.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-DAILY-C1D",
    code: "c.1.d",
    description: "Periksa body & koneksi kabel",
    durationMinutes: 2,
    procedure:
      "Periksa kondisi body perangkat untuk memastikan tidak ada retak atau kerusakan fisik, koneksi kabel tidak longgar atau rusak, dan cek ada atau tidaknya tanda overheating atau korosi pada terminal.",
    acceptanceCriteria:
      "Body perangkat dalam kondisi baik, tanpa retak atau kerusakan, koneksi kabel terpasang dengan kuat dan tidak ada yang longgar, serta tidak ada tanda karat atau overheating pada terminal.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-DAILY-C1E",
    code: "c.1.e",
    description: "Periksa pulse transmiter & adaptor",
    durationMinutes: 1,
    procedure:
      "Periksa kondisi fisik pulse transmitter & adaptor dan tidak ada kabel putus atau konektor longgar.",
    acceptanceCriteria:
      "Pulse transmitter & adaptor berfungsi dengan normal dan tidak ada kerusakan fisik atau koneksi yang longgar.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-DAILY-C1F",
    code: "c.1.f",
    description: "Periksa koneksi kabel",
    durationMinutes: 1,
    procedure:
      "Periksa kabel dan konektor untuk memastikan tidak ada kerusakan atau kelonggaran, cek jalur kabel apakah ada potensi gangguan elektromagnetik (EMI), dan semua koneksi terpasang dengan benar.",
    acceptanceCriteria:
      "Semua koneksi kabel dalam kondisi baik tanpa kerusakan, tidak ada kabel yang longgar atau terputus, jalur kabel tertata rapi, dan tidak ada gangguan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-DAILY-C1G",
    code: "c.1.g",
    description: "Periksa pressure switch & relay",
    durationMinutes: 1,
    procedure:
      "Periksa kondisi fisik pressure switch dan relay, wiring terpasang dengan benar dan tidak ada kabel yang longgar, dan lakukan pengujian untuk memastikan switch dan relay bekerja sesuai tekanan yang ditentukan.",
    acceptanceCriteria:
      "Pressure switch dan relay berfungsi dengan baik, tidak ada koneksi yang longgar atau kabel putus, dan respon sesuai dengan spesifikasi sistem.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-DAILY-C1H",
    code: "c.1.h",
    description: "Ukur nilai tegangan AC/DC press. switch",
    durationMinutes: 2,
    procedure:
      "Ukur tegangan pada terminal pressure switch untuk memastikan nilai AC/DC sesuai dengan spesifikasi, pastikan tidak ada fluktuasi tegangan yang berlebihan, dan bandingkan hasil pengukuran dengan spesifikasi tekanan switch.",
    acceptanceCriteria:
      "Nilai tegangan AC/DC sesuai dengan spesifikasi pabrikan, tidak ada tegangan abnormal atau fluktuasi berlebihan.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const mtrWeeklyTasks: TasklistTask[] = [
  {
    id: "MTR-WEEKLY-C2A",
    code: "c.2.a",
    description: "Bersihkan strainer",
    durationMinutes: 15,
    procedure:
      "Periksa kondisi strainer untuk mendeteksi adanya kotoran, endapan, atau kerusakan dan bersihkan strainer dengan air bersih atau menggunakan cairan pembersih jika diperlukan.",
    acceptanceCriteria:
      "Strainer dalam kondisi bersih dan bebas dari endapan atau sumbatan dan tidak ada kerusakan fisik pada strainer yang dapat mengganggu fungsi aliran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-WEEKLY-C2B",
    code: "c.2.b",
    description: "Lakukan uji petik",
    durationMinutes: 15,
    procedure:
      "Lakukan pengukuran aliran fluida dengan alat referensi (flow meter portable atau bejana ukur) dan bandingkan hasil pengukuran flow meter digital skid dengan alat referensi.",
    acceptanceCriteria:
      "Hasil pengukuran sesuai dengan batas toleransi yang ditentukan dan tidak ada indikasi error atau gangguan pada tampilan flow meter digital skid.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
];

const mtrYearlyTasks: TasklistTask[] = [
  {
    id: "MTR-YEARLY-C3A",
    code: "c.3.a",
    description: "Periksa kebersihan air eliminator",
    durationMinutes: 10,
    procedure:
      "Periksa bagian dalam air eliminator untuk mendeteksi adanya kotoran, endapan, atau sumbatan.",
    acceptanceCriteria:
      "Air eliminator dalam kondisi bersih tanpa endapan atau sumbatan, tidak ada kebocoran atau kerusakan setelah pembersihan dan berfungsi dengan baik dan benar.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-YEARLY-C3B",
    code: "c.3.b",
    description: "Periksa pelampung air eliminator",
    durationMinutes: 10,
    procedure:
      "Periksa kondisi fisik pelampung, pastikan tidak ada retak, bocor, atau deformasi dan periksa kondisi sensor.",
    acceptanceCriteria:
      "Pelampung dalam kondisi baik tanpa kerusakan fisik, dan pergerakan pelampung berjalan lancar tanpa hambatan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "MTR-YEARLY-C3C",
    code: "c.3.c",
    description: "Laksanakan kalibrasi",
    durationMinutes: 10,
    procedure: "Lakukan proses kalibrasi.",
    acceptanceCriteria:
      "Hasil kalibrasi berada dalam batas toleransi yang ditetapkan dan tidak ada error atau penyimpangan signifikan dalam sistem pengukuran.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "MTR-YEARLY-C3D",
    code: "c.3.d",
    description: "Overhaul apabila ada indikasi kerusakan",
    durationMinutes: 15,
    procedure: "Lakukan overhaul secara menyeluruh.",
    acceptanceCriteria:
      "Flowmeter skid digital berfungsi dengan baik, dan sesuai dengan sistem pengoperasian.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const pipMonthlyTasks: TasklistTask[] = [
  {
    id: "PIP-MONTHLY-C1A",
    code: "c.1.a",
    description: "Periksa kondisi sambungan antar flange",
    durationMinutes: 5,
    procedure:
      "Pastikan flange terpasang dengan benar, tidak ada kerusakan pada flange dan tidak adanya kebocoran produk.",
    acceptanceCriteria:
      "Mur dan baut terpasang lengkap dan kencang. Tidak ada kebocoran pada sambungan flange.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1B",
    code: "c.1.b",
    description: "Periksa sambungan bonding antar flange",
    durationMinutes: 5,
    procedure:
      "Pastikan koneksi kabel pada flange terpasang dengan baik dan tidak longgar.",
    acceptanceCriteria: "Bonding terpasang dengan kencang.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1C",
    code: "c.1.c",
    description: "Periksa kondisi support pipa",
    durationMinutes: 5,
    procedure:
      "Periksa secara visual untuk melihat apakah ada kerusakan pada support pipa, seperti retakan, deformasi, korosi, atau keausan.",
    acceptanceCriteria:
      "Crack dan deformasi tidak diijinkan. Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1D",
    code: "c.1.d",
    description: "Periksa kondisi valve",
    durationMinutes: 5,
    procedure:
      "Periksa keadaan fisik valve, pastikan tidak ada kerusakan dan kebocoran pada valve.",
    acceptanceCriteria:
      "Valve mudah dioperasikan. Tidak ada kebocoran produk pada valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1E",
    code: "c.1.e",
    description: "Periksa kondisi pipa dari adanya korosi",
    durationMinutes: 10,
    procedure:
      "Lakukan pemeriksaan visual pada bagian luar pipa, terutama di area yang terpapar kelembapan, udara, atau bahan kimia.",
    acceptanceCriteria:
      "Crack dan deformasi tidak diijinkan. Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1F",
    code: "c.1.f",
    description: "Periksa kondisi cat pada pipa",
    durationMinutes: 5,
    procedure:
      "Lakukan assessment kondisi cat menggunakan panduan ISO 4628-5 terhadap blistering, rusting, cracking, flaking, chalking, delamination, dan cacat sejenis.",
    acceptanceCriteria:
      "Tidak ada cat yang terkelupas/rusak atau maksimal pada kondisi rating 1 pada ISO 4628-5.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1G",
    code: "c.1.g",
    description: "Bersihkan permukaan pipa",
    durationMinutes: 15,
    procedure: "Bersihkan permukaan pipa yang kotor.",
    acceptanceCriteria: "Tidak terdapat kotoran pada permukaan pipa.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1H",
    code: "c.1.h",
    description: "Periksa alignment pipa",
    durationMinutes: 10,
    procedure:
      "Lakukan pemeriksaan kelurusan sambungan pipa dengan menggunakan water level.",
    acceptanceCriteria:
      "Maksimum penyimpangan dimensi di ukuran 1 mm/m mengacu ASTM B31-3.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1I",
    code: "c.1.i",
    description: "Periksa kondisi relief valve",
    durationMinutes: 3,
    procedure:
      "Lakukan pemeriksaan secara visual untuk memeriksa adanya kerusakan atau korosi pada relief valve dan pastikan tidak ada kebocoran.",
    acceptanceCriteria:
      "Tidak ada kerusakan pada coating dan tidak ada kebocoran pada sambungan-sambungan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-MONTHLY-C1J",
    code: "c.1.j",
    description: "Catat nilai tekanan & suhu pada instrumen",
    durationMinutes: 2,
    procedure:
      "Lakukan pencatatan nilai tekanan dan suhu bila ada pada instrumentasi.",
    acceptanceCriteria:
      "Catatan pembacaan tekanan dan suhu dilakukan penyimpanan pada modul PM.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
];

const pipYearlyTasks: TasklistTask[] = [
  {
    id: "PIP-YEARLY-C2A",
    code: "c.2.a",
    description: "Pengukuran ketebalan pipa pada CML",
    durationMinutes: 5,
    procedure:
      "Melakukan pengukuran ketebalan pipa pada titik CML dan lakukan pencatatan.",
    acceptanceCriteria:
      "Record ketebalan didapatkan secara lengkap dan diketahui corrosion rate.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "PIP-YEARLY-C2B",
    code: "c.2.b",
    description: "Lakukan gas test tiap sambungan flange",
    durationMinutes: 5,
    procedure: "Melakukan pengujian gas test pada setiap sambungan pipa.",
    acceptanceCriteria: "Tidak ada kebocoran pada sambungan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-YEARLY-C2C",
    code: "c.2.c",
    description: "Lakukan pengencangan baut",
    durationMinutes: 0,
    procedure:
      "Melakukan pengencangan mur dan baut, dengan menggunakan kunci moment.",
    acceptanceCriteria: "Kekencangan tiap baut mengacu pada tabel tightening.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-YEARLY-C2D",
    code: "c.2.d",
    description: "Greasing valve",
    durationMinutes: 10,
    procedure: "Lakukan greasing pada valve.",
    acceptanceCriteria: "Valve mudah dioperasikan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-YEARLY-C2E",
    code: "c.2.e",
    description: "Periksa insulasi pipa bila ada",
    durationMinutes: 5,
    procedure:
      "Periksa apakah insulasi terpasang dengan rapat dan tidak ada celah. Cari kerusakan fisik seperti retakan, sobekan, atau bagian terkelupas yang dapat membuka pipa terhadap pengaruh eksternal.",
    acceptanceCriteria:
      "Tidak ada kerusakan insulasi, tidak ada kelembapan di dalam insulasi, dan tidak ada pertumbuhan jamur.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-YEARLY-C2F",
    code: "c.2.f",
    description: "Periksa terjadinya deformasi",
    durationMinutes: 5,
    procedure:
      "Lakukan inspeksi visual pada seluruh sistem perpipaan untuk memeriksa tanda-tanda deformasi seperti tekukan, cekungan, penonjolan, retakan, atau perubahan bentuk pada pipa.",
    acceptanceCriteria:
      "Pipa yang mengalami retakan harus segera diganti atau diperbaiki. Pengurangan ketebalan pipa akibat deformasi tidak boleh melebihi 12,5% dari ketebalan desain pipa.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-YEARLY-C2G",
    code: "c.2.g",
    description: "Lakukan pengukuran ketebalan cat",
    durationMinutes: 5,
    procedure:
      "Lakukan pengukuran ketebalan di beberapa titik untuk memastikan ketebalan cat rata.",
    acceptanceCriteria: "Min 150 mikron.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PIP-YEARLY-C2H",
    code: "c.2.h",
    description: "Periksa status sertifikasi relief valve",
    durationMinutes: 5,
    procedure:
      "Lakukan pemeriksaan dokumen sertifikat COI, pastikan masih berlaku.",
    acceptanceCriteria: "Sertifikat masih berlaku.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const pmpDailyTasks: TasklistTask[] = [
  {
    id: "PMP-DAILY-C1A",
    code: "c.1.a",
    description: "Bersihkan area pompa",
    durationMinutes: 5,
    procedure:
      "Bersihkan area sekitar pompa dan motor dari debu, kotoran, dan tumpahan oli yang dapat menyebabkan bahaya slip atau gangguan operasional.",
    acceptanceCriteria:
      "Bersih dari debu, kotoran, tumpahan oli, dan genangan air.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1B",
    code: "c.1.b",
    description: "Periksa kebocoran pada pompa",
    durationMinutes: 1,
    procedure:
      "Periksa flange, pipa, seal, dan gasket apakah ada tetesan atau genangan oli, air, atau fluida lainnya di sekitar pompa.",
    acceptanceCriteria: "Tidak ada kebocoran atau rembesan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1C",
    code: "c.1.c",
    description: "Periksa level oil / kondisi grease",
    durationMinutes: 1,
    procedure:
      "Periksa apakah level oli masih dalam batas normal dan pastikan grease tidak kering atau berlebihan di sekitar bearing.",
    acceptanceCriteria:
      "Level oli dalam batas indikator sight glass dan grease tidak bocor atau terlalu kering.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1D",
    code: "c.1.d",
    description: "Periksa baut dan mur",
    durationMinutes: 1,
    procedure:
      "Periksa secara visual apakah baut dan mur pada casing, flange, kopling, pondasi tidak longgar dan hilang.",
    acceptanceCriteria: "Tidak ada baut/mur yang longgar atau hilang.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1E",
    code: "c.1.e",
    description: "Periksa sambungan coupling",
    durationMinutes: 1,
    procedure:
      "Periksa sambungan kopling apakah ada keausan, retakan, atau kerusakan pada elemen coupling seperti bantalan, baut, dan karet peredam, serta dalam keadaan kencang. Pastikan tidak ada kebocoran pelumas jika coupling menggunakan sistem pelumasan.",
    acceptanceCriteria:
      "Sambungan coupling harus terpasang dengan benar dan kencang dan kondisi dalam keadaan baik.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1F",
    code: "c.1.f",
    description: "Periksa panel pompa",
    durationMinutes: 1,
    procedure:
      "Periksa apakah indikator pompa menunjukkan kondisi ON/OFF sesuai kebutuhan operasi.",
    acceptanceCriteria:
      "Status pompa sesuai kebutuhan operasi dan tidak ada alarm atau indikator error yang menyala.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1G",
    code: "c.1.g",
    description: "Periksa kondisi valve",
    durationMinutes: 1,
    procedure:
      "Periksa apakah valve suction dan discharge berada dalam posisi yang sesuai dengan pola operasi.",
    acceptanceCriteria:
      "Kondisi atau status valve OPEN/CLOSE sudah sesuai dengan pola pengoperasian.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1H",
    code: "c.1.h",
    description: "Periksa kondisi relief valve",
    durationMinutes: 1,
    procedure:
      "Periksa kondisi relief valve apakah berfungsi dengan baik dan dalam kondisi baik.",
    acceptanceCriteria:
      "Tidak ada kebocoran fluida, tekanan buka sesuai spesifikasi, serta valve dapat menutup kembali dengan rapat setelah operasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-DAILY-C1I",
    code: "c.1.i",
    description: "Catat nilai tekanan & suhu pada instrumen",
    durationMinutes: 1,
    procedure:
      "Lakukan pencatatan tekanan dan suhu pada pressure dan temperature indicator.",
    acceptanceCriteria:
      "Pencatatan sudah sesuai dengan apa yang ditampilkan pada instrumen tersebut.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "PMP-DAILY-C1J",
    code: "c.1.j",
    description: "Periksa suhu bearings saat running",
    durationMinutes: 1,
    procedure:
      "Ukur suhu permukaan bearing housing saat pompa beroperasi, pengukuran pada DE/NDE motor dan pompa.",
    acceptanceCriteria:
      "Suhu bearing house tidak boleh melebihi 85 C sesuai standar API 610 dan ISO 20816.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "C",
  },
  {
    id: "PMP-DAILY-C1K",
    code: "c.1.k",
    description: "Periksa adanya suara abnormal saat running",
    durationMinutes: 1,
    procedure:
      "Dengarkan apakah terdapat suara dengungan berlebihan, gesekan, dentuman, atau suara ketukan yang tidak biasa saat pompa dan motor bekerja.",
    acceptanceCriteria:
      "Suara operasi pompa dan motor harus halus dan stabil, tanpa adanya suara berisik berlebihan.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const pmpMonthlyTasks: TasklistTask[] = [
  {
    id: "PMP-MONTHLY-C2A",
    code: "c.2.a",
    description: "Periksa pelindung kopling saat running",
    durationMinutes: 1,
    procedure:
      "Periksa apakah pelindung coupling terpasang dengan baik dan tidak longgar.",
    acceptanceCriteria:
      "Pelindung coupling harus dalam kondisi utuh, tidak rusak, dan tidak longgar.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-MONTHLY-C2B",
    code: "c.2.b",
    description: "Periksa kondisi coupling",
    durationMinutes: 2,
    procedure:
      "Periksa apakah coupling dalam kondisi baik tanpa tanda keausan atau retakan dan tidak ada kelonggaran atau baut yang longgar pada coupling.",
    acceptanceCriteria:
      "Coupling dalam kondisi baik, tidak longgar, tidak retak, serta baut pengikat coupling terpasang dengan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-MONTHLY-C2C",
    code: "c.2.c",
    description: "Ukur vibrasi pompa",
    durationMinutes: 2,
    procedure: "Ukur vibrasi pompa dengan menggunakan vibrasi meter.",
    acceptanceCriteria:
      "Semua nilai vibrasi tercatat berdasarkan pengambilan pada DE/NDE motor dan pompa, serta nilai vibrasi tidak boleh melebihi 4.5 mm/s RMS.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "mm/s",
  },
  {
    id: "PMP-MONTHLY-C2D",
    code: "c.2.d",
    description: "Periksa koneksi kabel dan terminal",
    durationMinutes: 2,
    procedure:
      "Periksa koneksi kabel pada terminal box motor dan panel kontrol untuk mendeteksi tanda-tanda korosi atau kelonggaran.",
    acceptanceCriteria:
      "Tidak ada tanda-tanda korosi, overheating, atau bekas luka bakar pada terminal atau koneksi kabel.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-MONTHLY-C2E",
    code: "c.2.e",
    description: "Periksa nilai tegangan & arus",
    durationMinutes: 2,
    procedure:
      "Ukur tegangan suplai di terminal motor dan periksa keseimbangan tegangan antar fasa untuk memastikan tidak ada perbedaan yang mencolok.",
    acceptanceCriteria:
      "Tegangan operasi berada dalam rentang +/-10% dari tegangan nominal sesuai IEC 60034-1, ketidakseimbangan tegangan antar fasa tidak lebih dari 2%, dan arus listrik berada dalam rentang wajar.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "PMP-MONTHLY-C2F",
    code: "c.2.f",
    description: "Lakukan pengencangan ulang baut",
    durationMinutes: 5,
    procedure:
      "Lakukan pengencangan baut pada semua baut dan mur di pompa, motor dan pondasi.",
    acceptanceCriteria:
      "Pastikan semua baut dan mur tersedia dan dalam kondisi kencang dan baik.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const pmpSixMonthlyTasks: TasklistTask[] = [
  {
    id: "PMP-SIX-MONTHLY-C3A",
    code: "c.3.a",
    description: "Bersihkan suction strainer",
    durationMinutes: 30,
    procedure:
      "Bersihkan strainer dari penyumbatan, kotoran, lumpur, atau partikel padat lainnya.",
    acceptanceCriteria:
      "Suction strainer dalam kondisi bersih dan tidak tersumbat, serta sudah terpasang dengan baik dan benar pada system.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-SIX-MONTHLY-C3B",
    code: "c.3.b",
    description: "Periksa kondisi casing pompa",
    durationMinutes: 5,
    procedure:
      "Periksa casing pompa dengan dye penetrant test untuk mendeteksi retakan kecil dan gunakan ultrasonic thickness gauge untuk mengukur ketebalan dinding casing dan mendeteksi kemungkinan korosi dari dalam.",
    acceptanceCriteria:
      "Tidak ada retakan yang terlihat secara kasat mata atau melalui metode DPT dan ketebalan casing tidak boleh berkurang lebih dari 20% dari spesifikasi desain asli sesuai API 610.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "PMP-SIX-MONTHLY-C3C",
    code: "c.3.c",
    description: "Periksa kondisi pipa terkoneksi pompa",
    durationMinutes: 2,
    procedure:
      "Pemeriksaan kondisi pipa yang terkoneksi dengan pompa pada area discharge dan suction.",
    acceptanceCriteria:
      "Tidak ada kebocoran atau hambatan aliran dan kondisi fisik pipa serta penyangga tidak ada retakan, korosi, atau deformasi yang dapat mempengaruhi integritas struktural.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-SIX-MONTHLY-C3D",
    code: "c.3.d",
    description: "Periksa kondisi shaft",
    durationMinutes: 3,
    procedure:
      "Periksa kondisi shaft apakah mengalami keausan atau kerusakan serta periksa apakah ada kelonggaran atau ketidaksejajaran pada bantalan.",
    acceptanceCriteria:
      "Shaft berputar dengan lancar tanpa getaran atau suara abnormal, serta tidak ditemukan adanya tanda-tanda keausan, korosi, atau ketidaksejajaran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "PMP-SIX-MONTHLY-C3E",
    code: "c.3.e",
    description: "Catat nilai grounding",
    durationMinutes: 3,
    procedure: "Ukur nilai grounding dengan menggunakan Earth Resistance Tester.",
    acceptanceCriteria:
      "Resistansi grounding harus di bawah 5 Ohm, sesuai standar NFPA 70B.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "Ohm",
  },
  {
    id: "PMP-SIX-MONTHLY-C3F",
    code: "c.3.f",
    description: "Periksa MCB pada MCC",
    durationMinutes: 2,
    procedure:
      "Periksa proteksi listrik seperti MCB, MCC, dan relay proteksi.",
    acceptanceCriteria:
      "MCB, relay proteksi, dan fuse harus dalam kondisi berfungsi dan tidak mengalami keausan atau kerusakan.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const sgrMonthlyTasks: TasklistTask[] = [
  {
    id: "SGR-MONTHLY-C1A",
    code: "c.1.a",
    description: "Periksa indikator pada panel",
    durationMinutes: 5,
    procedure:
      "Memeriksa indikasi pada display relay dan lamp indicator pada panel.",
    acceptanceCriteria:
      "Tidak ada indikasi warning dan fault. Lamp indicator menyala atau mati sesuai fungsi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-MONTHLY-C1B",
    code: "c.1.b",
    description: "Catat tegangan pada voltmeter",
    durationMinutes: 5,
    procedure: "Catat nilai tegangan pada voltmeter.",
    acceptanceCriteria: "Tegangan sesuai dengan spesifikasi pabrikan +/-5%.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "SGR-MONTHLY-C1C",
    code: "c.1.c",
    description: "Catat nilai arus pada amperemeter",
    durationMinutes: 5,
    procedure: "Catat nilai arus pada amperemeter.",
    acceptanceCriteria:
      "Arus sesuai dengan beban operasi yang berlangsung tanpa penyimpangan signifikan.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "SGR-MONTHLY-C1D",
    code: "c.1.d",
    description: "Periksa lampu dalam cubicle",
    durationMinutes: 5,
    procedure: "Periksa semua lampu dalam cubicle.",
    acceptanceCriteria: "Semua lampu berfungsi saat pintu terbuka.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-MONTHLY-C1E",
    code: "c.1.e",
    description: "Bersihkan kubikel wiring control",
    durationMinutes: 5,
    procedure: "Bersihkan bagian dalam dari setiap kubikel wiring control.",
    acceptanceCriteria:
      "Tidak ada debu, kotoran, atau benda asing di dalam kubikel.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-MONTHLY-C1F",
    code: "c.1.f",
    description: "Periksa terminasi kabel",
    durationMinutes: 10,
    procedure: "Periksa semua terminasi kabel.",
    acceptanceCriteria:
      "Semua terminasi terhubung kuat, tidak ada kabel putus.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-MONTHLY-C1G",
    code: "c.1.g",
    description: "Periksa indikator posisi circuit breaker",
    durationMinutes: 10,
    procedure: "Periksa indikator posisi circuit breaker.",
    acceptanceCriteria:
      "Indikator posisi sesuai dengan posisi aktual dari circuit breaker.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-MONTHLY-C1H",
    code: "c.1.h",
    description: "Catat counter pada circuit breaker",
    durationMinutes: 10,
    procedure:
      "Catat jumlah operasi breaker yang ditampilkan pada counter untuk memantau frekuensi penggunaan.",
    acceptanceCriteria:
      "Counter menunjukkan angka sesuai dengan siklus operasi normal.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "SGR-MONTHLY-C1I",
    code: "c.1.i",
    description: "Ukur suhu kubikel",
    durationMinutes: 3,
    procedure: "Ukur suhu kubikel.",
    acceptanceCriteria: "Suhu kubikel dalam batas aman sesuai standar pabrikan.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "C",
  },
  {
    id: "SGR-MONTHLY-C1J",
    code: "c.1.j",
    description: "Ukur suhu terminasi kabel daya",
    durationMinutes: 5,
    procedure: "Ukur suhu terminasi kabel daya.",
    acceptanceCriteria:
      "Suhu terminasi kabel daya stabil dan tidak ada selisih panas antar wiring yang signifikan, suhu max 105 C.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "C",
  },
  {
    id: "SGR-MONTHLY-C1K",
    code: "c.1.k",
    description: "Ukur suhu terminal dan sambungan busbar",
    durationMinutes: 5,
    procedure: "Ukur suhu terminal dan sambungan busbar.",
    acceptanceCriteria:
      "Suhu terminal dan sambungan busbar merata, tidak ada hotspot, suhu max 140 C.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "C",
  },
  {
    id: "SGR-MONTHLY-C1L",
    code: "c.1.l",
    description: "Ukur suhu CT",
    durationMinutes: 5,
    procedure: "Ukur suhu CT.",
    acceptanceCriteria:
      "Suhu max yang diperbolehkan adalah suhu max ambient ditambah kenaikan suhu. Berdasarkan insulation class, kenaikan suhu adalah: Y=max45 C, A=max60 C, E=max75 C, B=max85 C, F=max110 C, H=max135 C.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "C",
  },
  {
    id: "SGR-MONTHLY-C1M",
    code: "c.1.m",
    description: "Ukur suhu PT/VT",
    durationMinutes: 5,
    procedure: "Ukur suhu PT/VT.",
    acceptanceCriteria:
      "Suhu max yang diperbolehkan adalah suhu max ambient ditambah kenaikan suhu. Berdasarkan insulation class, kenaikan suhu adalah: Y=max45 C, A=max60 C, E=max75 C, B=max85 C, F=max110 C, H=max135 C.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "C",
  },
  {
    id: "SGR-MONTHLY-C1N",
    code: "c.1.n",
    description: "Pengujian fungsi local dan remote",
    durationMinutes: 10,
    procedure: "Lakukan pengujian fungsi operasi local dan remote.",
    acceptanceCriteria:
      "Fungsi operasi local dan remote berjalan lancar tanpa hambatan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-MONTHLY-C1O",
    code: "c.1.o",
    description: "Inspeksi space heater",
    durationMinutes: 5,
    procedure: "Pengujian fungsi space heater.",
    acceptanceCriteria: "Bekerja sesuai dengan parameter pengaturan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-MONTHLY-C1P",
    code: "c.1.p",
    description: "Periksa grounding switchgear",
    durationMinutes: 10,
    procedure:
      "Inspeksi visual instalasi grounding dan pengukuran tahanan grounding.",
    acceptanceCriteria:
      "Instalasi yang sesuai dengan nilai tahanan dibawah 5 Ohm.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const sgrYearlyTasks: TasklistTask[] = [
  {
    id: "SGR-YEARLY-C2A",
    code: "c.2.a",
    description: "Pembersihan total kubikel",
    durationMinutes: 30,
    procedure:
      "Membersihkan seluruh bagian kubikel dari debu, kotoran, dan kontaminasi yang dapat mengganggu sistem.",
    acceptanceCriteria:
      "Seluruh sistem switchgear beroperasi sesuai standar operasional tanpa ditemukan anomali.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2B",
    code: "c.2.b",
    description: "Uji contact resistance circuit breaker",
    durationMinutes: 15,
    procedure:
      "Mengukur hambatan kontak pada circuit breaker menggunakan micro-ohmmeter untuk mendeteksi potensi overheating.",
    acceptanceCriteria:
      "Nilai resistansi kontak sesuai standar (<100 micro-ohm untuk LV, <500 micro-ohm untuk MV).",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "SGR-YEARLY-C2C",
    code: "c.2.c",
    description: "Uji insulation resistance circuit breaker",
    durationMinutes: 15,
    procedure:
      "Mengukur tahanan isolasi circuit breaker menggunakan megohmmeter untuk memastikan tidak ada kebocoran arus.",
    acceptanceCriteria:
      "Nilai tahanan isolasi sesuai standar (>1 MOhm untuk LV, >100 MOhm untuk MV).",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "SGR-YEARLY-C2D",
    code: "c.2.d",
    description: "Uji contact resistance busbar",
    durationMinutes: 15,
    procedure:
      "Mengukur hambatan kontak pada sambungan busbar untuk mendeteksi potensi overheating.",
    acceptanceCriteria:
      "Nilai resistansi kontak sesuai standar (<100 micro-ohm untuk LV, <500 micro-ohm untuk MV).",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "SGR-YEARLY-C2E",
    code: "c.2.e",
    description: "Uji insulation resistance busbar",
    durationMinutes: 15,
    procedure:
      "Mengukur tahanan isolasi busbar terhadap ground dan antar fase untuk mencegah flashover atau short circuit.",
    acceptanceCriteria:
      "Nilai tahanan isolasi sesuai standar (>1 MOhm untuk LV, >100 MOhm untuk MV).",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "SGR-YEARLY-C2F",
    code: "c.2.f",
    description: "Inspeksi busbar",
    durationMinutes: 3,
    procedure:
      "Periksa kondisi fisik dan kelayakan busbar, kekencangan baut, mur, support busbar dan terminasinya.",
    acceptanceCriteria:
      "Tidak ada tanda kerusakan fisik, degradasi, kelonggaran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2G",
    code: "c.2.g",
    description: "Inspeksi metering",
    durationMinutes: 3,
    procedure:
      "Memeriksa keakuratan pembacaan metering (tegangan, arus, daya), memastikan tidak ada anomali dan kalibrasi ulang bila dibutuhkan.",
    acceptanceCriteria: "Metering berfungsi sesuai akurasinya.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2H",
    code: "c.2.h",
    description: "Inspeksi protection relay",
    durationMinutes: 5,
    procedure:
      "Memeriksa kondisi dan fungsi protection relay, dan setting ulang parameter bila diperlukan.",
    acceptanceCriteria:
      "Protection relay berfungsi dan trip sesuai pengaturan tanpa keterlambatan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2I",
    code: "c.2.i",
    description: "Inspeksi MCB",
    durationMinutes: 3,
    procedure: "Periksa fungsi MCB.",
    acceptanceCriteria: "Bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2J",
    code: "c.2.j",
    description: "Inspeksi fuse disconnector",
    durationMinutes: 3,
    procedure: "Periksa fungsi fuse disconnector.",
    acceptanceCriteria: "Tidak putus, bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2K",
    code: "c.2.k",
    description: "Inspeksi fuse",
    durationMinutes: 3,
    procedure: "Periksa fungsi fuse.",
    acceptanceCriteria: "Tidak putus, bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2L",
    code: "c.2.l",
    description: "Inspeksi SPD",
    durationMinutes: 3,
    procedure: "Periksa fungsi SPD.",
    acceptanceCriteria: "Tidak putus, bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "SGR-YEARLY-C2M",
    code: "c.2.m",
    description: "Inspeksi parts aksesoris",
    durationMinutes: 5,
    procedure: "Melakukan penggantian komponen yang rusak atau aus.",
    acceptanceCriteria: "Komponen baru bekerja normal setelah penggantian.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const tnkMonthlyTasks: TasklistTask[] = [
  {
    id: "TNK-MONTHLY-C1A",
    code: "c.1.a",
    description: "Periksa kondisi free vent/PV valve",
    durationMinutes: 2,
    procedure:
      "Periksa kondisi free vent / PV valve dari adanya korosi dan kotoran yang mengganggu fungsi vent.",
    acceptanceCriteria:
      "Kondisi bersih, tidak ada sumbatan yang dapat mengganggu kinerja venting.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1B",
    code: "c.1.b",
    description: "Periksa kondisi dipatch/slot dipping",
    durationMinutes: 2,
    procedure:
      "Periksa kondisi dan kelayakan fungsi hatch cover. Periksa kondisi seal dan kondisi karat pada hatch cover.",
    acceptanceCriteria: "Seal cover tidak robek dan tidak terkelupas.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1C",
    code: "c.1.c",
    description: "Periksa kondisi water sprinkler/sprayer",
    durationMinutes: 2,
    procedure:
      "Pastikan seluruh pipa sprinkler dalam kondisi baik dan bebas dari kerusakan, kebocoran, atau penyumbatan. Cek nozzle atau sprinkler head bersih dan berfungsi dengan baik.",
    acceptanceCriteria: "Sprayer bersih dan lengkap.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1D",
    code: "c.1.d",
    description: "Periksa kondisi splash plate",
    durationMinutes: 2,
    procedure: "Periksa kondisi splash plate dari korosi dan pastikan terpasang dengan baik.",
    acceptanceCriteria: "Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1E",
    code: "c.1.e",
    description: "Periksa kondisi stair case",
    durationMinutes: 2,
    procedure: "Periksa kondisi stair case / tangga dari adanya korosi.",
    acceptanceCriteria: "Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1F",
    code: "c.1.f",
    description: "Periksa kondisi relief valve",
    durationMinutes: 2,
    procedure:
      "Periksa sambungan relief valve dari adanya kebocoran dan pastikan masa kalibrasinya masih aktif.",
    acceptanceCriteria: "Tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1G",
    code: "c.1.g",
    description: "Periksa kondisi hand railing",
    durationMinutes: 2,
    procedure: "Periksa kondisi hand railing dari adanya korosi.",
    acceptanceCriteria: "Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1H",
    code: "c.1.h",
    description: "Periksa kondisi inlet valve",
    durationMinutes: 2,
    procedure:
      "Periksa flange dan valve untuk kemungkinan adanya kebocoran atau rembesan produk.",
    acceptanceCriteria:
      "Valve mudah dioperasikan dan tidak ada kebocoran produk pada valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1I",
    code: "c.1.i",
    description: "Periksa kondisi outlet valve",
    durationMinutes: 2,
    procedure:
      "Periksa flange dan valve untuk kemungkinan adanya kebocoran atau rembesan produk.",
    acceptanceCriteria:
      "Valve mudah dioperasikan dan tidak ada kebocoran produk pada valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1J",
    code: "c.1.j",
    description: "Periksa kondisi flexible joint",
    durationMinutes: 2,
    procedure: "Pastikan tidak ada kebocoran dan rubber dalam keadaan baik.",
    acceptanceCriteria: "Tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1K",
    code: "c.1.k",
    description: "Periksa apakah ada kebocoran produk",
    durationMinutes: 2,
    procedure:
      "Lakukan inspeksi visual terhadap noda atau bekas cairan, keretakan, deformasi, karat, korosi, area basah, atau genangan cairan di sekitar tangki / pipa.",
    acceptanceCriteria: "Tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1L",
    code: "c.1.l",
    description: "Periksa kondisi drain valve",
    durationMinutes: 2,
    procedure:
      "Periksa flange dan valve untuk kemungkinan adanya kebocoran atau rembesan produk.",
    acceptanceCriteria:
      "Valve mudah dioperasikan dan tidak ada kebocoran produk pada valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1M",
    code: "c.1.m",
    description: "Periksa kondisi plat atap",
    durationMinutes: 2,
    procedure:
      "Inspeksi visual keseluruhan pelat dan las yang dapat diakses dengan aman, pembacaan ketebalan pelat atap, kondisi cat, indikasi kebocoran, deformasi atap, dan penyimpangan kondisi normal.",
    acceptanceCriteria:
      "Korosi tidak boleh lebih dari 10% mengacu ASTM D610 dan tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1N",
    code: "c.1.n",
    description: "Periksa kondisi plat dinding",
    durationMinutes: 2,
    procedure:
      "Inspeksi visual keseluruhan pelat, lasan, kondisi reparasi, coating, indikasi kebocoran, deformasi dinding, dan penyimpangan kondisi normal.",
    acceptanceCriteria:
      "Korosi tidak boleh lebih dari 10% mengacu ASTM D610 dan tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1O",
    code: "c.1.o",
    description: "Periksa kondisi asphalt sheet",
    durationMinutes: 2,
    procedure:
      "Periksa kondisi aspal dari kerusakan yang dapat menyebabkan air masuk atau menggenang di bawah tangki.",
    acceptanceCriteria: "Tidak ada kerusakan asphalt.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1P",
    code: "c.1.p",
    description: "Periksa kondisi pondasi tanki",
    durationMinutes: 2,
    procedure:
      "Lakukan inspeksi visual pondasi, tanda erosi, kerusakan pecah atau retak, terutama bagian yang menopang sambungan pelat annular dengan pelat shell, spalling, dan sejenisnya.",
    acceptanceCriteria: "Pondasi tidak retak dan amblas.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1Q",
    code: "c.1.q",
    description: "Periksa kondisi tanggul/bund wall",
    durationMinutes: 2,
    procedure:
      "Periksa dinding bundwall secara visual untuk tanda korosi, retakan, deformasi, penurunan, atau pergeseran.",
    acceptanceCriteria: "Tidak ada spalling.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1R",
    code: "c.1.r",
    description: "Periksa kondisi bak drain & saluran",
    durationMinutes: 2,
    procedure:
      "Periksa saluran drainase di sekitar tangki beserta jalur pipa dan valve, terutama jalur water drain.",
    acceptanceCriteria: "Tidak ada retakan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1S",
    code: "c.1.s",
    description: "Periksa limpasan air hujan pada walkway",
    durationMinutes: 2,
    procedure:
      "Lakukan pemeriksaan arah limpasan air hujan dan pastikan arah limpasan ke drainage.",
    acceptanceCriteria: "Bersih.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1T",
    code: "c.1.t",
    description: "Periksa kondisi product drain jika ada",
    durationMinutes: 2,
    procedure:
      "Periksa flange dan valve untuk kemungkinan adanya kebocoran atau rembesan produk.",
    acceptanceCriteria:
      "Valve mudah dioperasikan dan tidak ada kebocoran produk pada valve.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1U",
    code: "c.1.u",
    description: "Periksa kondisi earthing/arde tank",
    durationMinutes: 2,
    procedure:
      "Pastikan kabel pembumian ke tangki dalam kondisi baik, tidak rusak, tidak aus, tidak korosi, dan sambungan kabel pembumian terpasang kuat.",
    acceptanceCriteria: "Terpasang dengan benar dan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1V",
    code: "c.1.v",
    description: "Periksa kondisi code/tanda produk",
    durationMinutes: 2,
    procedure: "Pastikan warna code tidak pudar dan bersih.",
    acceptanceCriteria: "Terlihat dengan jelas.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1W",
    code: "c.1.w",
    description: "Periksa kondisi cat luar tanki",
    durationMinutes: 2,
    procedure:
      "Lakukan assessment kondisi cat terhadap blistering, rusting, cracking, flaking, chalking, delamination, dan cacat lain memakai panduan ISO 4628.",
    acceptanceCriteria:
      "Korosi tidak boleh lebih dari 10% mengacu ASTM D610. Tidak ada cat terkelupas/rusak atau maksimal rating 1 pada ISO 4628-5.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1X",
    code: "c.1.x",
    description: "Periksa kondisi rumput",
    durationMinutes: 2,
    procedure:
      "Periksa area sekitar tangki dan hindarkan keberadaan tanaman atau benda mudah terbakar.",
    acceptanceCriteria: "Tidak ada tumbuhan liar.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1Y",
    code: "c.1.y",
    description: "Periksa kondisi foam chamber",
    durationMinutes: 2,
    procedure:
      "Periksa kondisi fisik foam chamber, pastikan tidak ada retakan, korosi, deformasi, atau kerusakan yang mempengaruhi fungsi chamber.",
    acceptanceCriteria: "Foam chamber berfungsi baik.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1Z",
    code: "c.1.z",
    description: "Periksa kondisi manhole",
    durationMinutes: 2,
    procedure:
      "Periksa kemungkinan crack atau tanda kebocoran di sambungan las pada manhole dan reinforcing plate.",
    acceptanceCriteria:
      "Korosi tidak boleh lebih dari 10% mengacu ASTM D610 dan tidak ada kebocoran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1Z1",
    code: "c.1.z.1",
    description: "Periksa kondisi baut/pondasi/base plate",
    durationMinutes: 2,
    procedure:
      "Pastikan baut, pondasi, dan base plate terpasang kokoh serta tidak ada korosi atau kerusakan fisik lain.",
    acceptanceCriteria:
      "Baut terpasang kencang, tidak ada kerusakan pondasi, dan korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-MONTHLY-C1Z2",
    code: "c.1.z.2",
    description: "Periksa kondisi kabel listrik dan data",
    durationMinutes: 2,
    procedure:
      "Periksa kondisi fisik kabel listrik dan data, termasuk isolasi terkelupas, kabel tertekuk, terjepit, terpapar air, terkoyak, koneksi longgar, atau kabel terlepas.",
    acceptanceCriteria: "Terpasang dengan benar dan kuat.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const tnkYearlyTasks: TasklistTask[] = [
  {
    id: "TNK-YEARLY-C2A",
    code: "c.2.a",
    description: "Periksa tanda-tanda settlement pada pondasi",
    durationMinutes: 5,
    procedure:
      "Lakukan inspeksi pondasi, tanda erosi, kerusakan pecah atau retak, spalling, dan pengukuran settlement dengan leveling instrument.",
    acceptanceCriteria: "Max. 1/100D.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TNK-YEARLY-C2B",
    code: "c.2.b",
    description: "Periksa kondisi beton khususnya di bawah",
    durationMinutes: 5,
    procedure:
      "Lakukan inspeksi pondasi, tanda erosi, kerusakan pecah atau retak, spalling, dan sejenisnya.",
    acceptanceCriteria: "Spalling tidak diijinkan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2C",
    code: "c.2.c",
    description: "Periksa drainage dan permukaan cincin",
    durationMinutes: 5,
    procedure:
      "Periksa saluran drainase di sekitar tangki dan kondisi tanggul drainase agar tidak berakibat pencemaran lingkungan.",
    acceptanceCriteria: "Spalling tidak diijinkan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2D",
    code: "c.2.d",
    description: "Periksa rongga di bawah pondasi",
    durationMinutes: 5,
    procedure:
      "Lakukan inspeksi visual untuk mendeteksi penurunan atau pergeseran pada pondasi tangki akibat rongga di bawahnya.",
    acceptanceCriteria: "BB = 0,37R.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TNK-YEARLY-C2E",
    code: "c.2.e",
    description: "Periksa settlement di sisi tangki",
    durationMinutes: 5,
    procedure:
      "Lakukan pengukuran settlement pada tangki menggunakan leveling instrument.",
    acceptanceCriteria: "Max. 1/100D.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TNK-YEARLY-C2F",
    code: "c.2.f",
    description: "Periksa apakah tangki terbenam ke dalam",
    durationMinutes: 5,
    procedure:
      "Lakukan pemeriksaan visual kondisi tangki apakah tangki terbenam ke dalam.",
    acceptanceCriteria: "Pelat bottom dalam posisi normal.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2G",
    code: "c.2.g",
    description: "Periksa apakah ada settlement ke dalam pondasi",
    durationMinutes: 5,
    procedure:
      "Lakukan pengukuran settlement pada tangki menggunakan leveling instrument.",
    acceptanceCriteria: "Max. 1/100D.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TNK-YEARLY-C2H",
    code: "c.2.h",
    description: "Periksa korosi, penipisan plat dan lasan",
    durationMinutes: 5,
    procedure:
      "Lakukan pemeriksaan bagian luar dinding tangki untuk mendeteksi korosi, ukur ketebalan dinding dengan ultrasonic thickness, dan periksa deformasi dinding tangki.",
    acceptanceCriteria: "Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2I",
    code: "c.2.i",
    description: "Periksa seal lantai ke pondasi jika ada",
    durationMinutes: 5,
    procedure:
      "Pastikan tidak ada retakan, kerusakan, atau kerusakan terlihat pada seal, serta seal lantai cukup tebal dan kuat.",
    acceptanceCriteria: "Tidak terkelupas ataupun robek.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2J",
    code: "c.2.j",
    description: "Periksa deformasi pada shell",
    durationMinutes: 5,
    procedure:
      "Lakukan pemeriksaan pada bagian luar dinding tangki untuk mendeteksi deformasi.",
    acceptanceCriteria: "Tidak melebihi 13 mm.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2K",
    code: "c.2.k",
    description: "Ukur ketebalan pelat atap pada titik CML",
    durationMinutes: 5,
    procedure:
      "Ukur ketebalan pelat atap tangki menggunakan ultrasonic thickness pada titik CML.",
    acceptanceCriteria: "Min. 0,1 inch / 0,3 mm.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TNK-YEARLY-C2L",
    code: "c.2.l",
    description: "Ukur & catat celah/jarak projection plate & walkway",
    durationMinutes: 5,
    procedure:
      "Lakukan pengukuran celah antara projection plate dengan walkway.",
    acceptanceCriteria: "Ukuran celah masih dalam jarak yang normal.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2M",
    code: "c.2.m",
    description: "Periksa kondisi dip hatch",
    durationMinutes: 5,
    procedure:
      "Pastikan seal atau gasket di sekeliling dip hatch masih baik, tidak aus, tidak rusak, dan tidak ada retakan, penyok, atau kerusakan fisik lain.",
    acceptanceCriteria:
      "Penutup berfungsi baik dan kedap. Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2N",
    code: "c.2.n",
    description: "Periksa status sertifikasi tangki",
    durationMinutes: 10,
    procedure: "Lakukan pemeriksaan dokumen sertifikat COI, pastikan masih berlaku.",
    acceptanceCriteria: "Sertifikat masih berlaku.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2O",
    code: "c.2.o",
    description: "Performance test water sprinkler system",
    durationMinutes: 15,
    procedure:
      "Pastikan tidak ada penyumbatan pada nozzle sprinkler. Kepala sprinkler harus bebas dari kotoran, debu, atau benda asing yang menghalangi aliran air atau bahan pemadam.",
    acceptanceCriteria:
      "Distribusi air merata, aliran air dan tekanan cukup, pompa dan sistem cadangan berfungsi baik, serta sprinkler baik tanpa kerusakan mengacu NFPA 25.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TNK-YEARLY-C2P",
    code: "c.2.p",
    description: "Ukur ketebalan pelat shell pada titik CML",
    durationMinutes: 10,
    procedure:
      "Ukur ketebalan pelat shell tangki menggunakan ultrasonic thickness pada titik CML.",
    acceptanceCriteria: "Min. 0,1 inch / 0,3 mm.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
];

const trfWeeklyTasks: TasklistTask[] = [
  {
    id: "TRF-WEEKLY-C1A",
    code: "c.1.a",
    description: "Periksa visual trafo dan aksesoris",
    durationMinutes: 10,
    procedure: "Memeriksa kondisi fisik trafo dan aksesorisnya.",
    acceptanceCriteria: "Tidak ada kerusakan atau deformasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1B",
    code: "c.1.b",
    description: "Periksa kebocoran",
    durationMinutes: 5,
    procedure: "Memeriksa kondisi fisik trafo dan aksesorisnya.",
    acceptanceCriteria: "Tidak ada kebocoran yang terdeteksi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1C",
    code: "c.1.c",
    description: "Periksa indikator oil level",
    durationMinutes: 3,
    procedure: "Memastikan level minyak berada dalam batas normal.",
    acceptanceCriteria: "Level minyak dalam batas yang direkomendasikan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1D",
    code: "c.1.d",
    description: "Periksa indikator winding temperature",
    durationMinutes: 3,
    procedure: "Memantau suhu belitan transformator.",
    acceptanceCriteria: "Suhu dalam batas operasi normal.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TRF-WEEKLY-C1E",
    code: "c.1.e",
    description: "Periksa indikator oil temperature",
    durationMinutes: 3,
    procedure: "Memeriksa suhu minyak transformator.",
    acceptanceCriteria: "Suhu dalam batas operasi normal.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TRF-WEEKLY-C1F",
    code: "c.1.f",
    description: "Periksa indikator pressure",
    durationMinutes: 3,
    procedure: "Mengecek tekanan dalam sistem transformator berisi minyak/gas.",
    acceptanceCriteria: "Tekanan dalam batas yang diizinkan.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "TRF-WEEKLY-C1G",
    code: "c.1.g",
    description: "Periksa kondisi silica gel",
    durationMinutes: 3,
    procedure: "Memastikan silica gel dalam kondisi baik dan tidak jenuh.",
    acceptanceCriteria:
      "Warna silica gel masih sesuai (biru/oranye, bukan merah).",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1H",
    code: "c.1.h",
    description: "Periksa kondisi pondasi",
    durationMinutes: 5,
    procedure: "Memeriksa apakah ada keretakan atau pergeseran pada pondasi.",
    acceptanceCriteria: "Pondasi stabil, tidak ada retak atau deformasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1I",
    code: "c.1.i",
    description: "Ukur suhu bodi transformer",
    durationMinutes: 5,
    procedure:
      "Gunakan alat ukur suhu inframerah untuk memastikan tidak ada overheating.",
    acceptanceCriteria: "Suhu dalam batas wajar sesuai spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1J",
    code: "c.1.j",
    description: "Ukur suhu pada terminasi kabel power",
    durationMinutes: 5,
    procedure: "Gunakan thermal scanner untuk mendeteksi panas berlebih.",
    acceptanceCriteria:
      "Suhu terminasi kabel daya stabil dan tidak ada selisih panas antar wiring yang signifikan, suhu max 105 C.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1K",
    code: "c.1.k",
    description: "Periksa apabila terdapat abnormal noise",
    durationMinutes: 5,
    procedure:
      "Dengarkan suara operasional transformator untuk mendeteksi gangguan.",
    acceptanceCriteria:
      "Tidak ada suara abnormal (dengung berlebihan, bunyi klik, dll.).",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-WEEKLY-C1L",
    code: "c.1.l",
    description: "Periksa kondisi terminal control box",
    durationMinutes: 10,
    procedure:
      "Memastikan terminal control box bersih dan tidak ada loose connection.",
    acceptanceCriteria:
      "Semua koneksi dalam kondisi baik, tidak ada korosi atau kabel longgar.",
    inputType: "PERFORMANCE_ONLY",
  },
];

const trfSixMonthlyTasks: TasklistTask[] = [
  {
    id: "TRF-SIX-MONTHLY-C2A",
    code: "c.2.a",
    description: "Periksa breather oil pada oil cup",
    durationMinutes: 2,
    procedure: "Memeriksa level dan kejernihan minyak dalam breather oil cup.",
    acceptanceCriteria: "Level minyak cukup, tidak keruh atau kotor.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-SIX-MONTHLY-C2B",
    code: "c.2.b",
    description: "Periksa heater dan thermostat",
    durationMinutes: 10,
    procedure:
      "Memastikan heater berfungsi dan thermostat bekerja sesuai suhu yang diatur.",
    acceptanceCriteria: "Heater bekerja sesuai suhu setting.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-SIX-MONTHLY-C2C",
    code: "c.2.c",
    description: "Periksa MCB pada terminal control box",
    durationMinutes: 10,
    procedure: "Mengecek kondisi MCB pada control box.",
    acceptanceCriteria:
      "MCB tidak trip, tidak ada tanda kerusakan atau panas berlebih.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "TRF-SIX-MONTHLY-C2D",
    code: "c.2.d",
    description: "Uji oil test laboratorium",
    durationMinutes: 0,
    procedure:
      "Mengambil sampel minyak dan mengujinya di laboratorium untuk analisis DGA, BDV, kadar air, dan kontaminasi.",
    acceptanceCriteria:
      "Hasil uji memenuhi standar tegangan tembus dan kualitas minyak.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
];

const upsMonthlyTasks: TasklistTask[] = [
  {
    id: "UPS-MONTHLY-C1A",
    code: "c.1.a",
    description: "Periksa indikator pada panel",
    durationMinutes: 5,
    procedure:
      "Memeriksa indikasi pada display relay dan lamp indicator pada panel.",
    acceptanceCriteria:
      "Tidak ada indikasi warning dan fault. Lamp indicator menyala atau mati sesuai fungsi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-MONTHLY-C1B",
    code: "c.1.b",
    description: "Catat tegangan pada voltmeter",
    durationMinutes: 5,
    procedure: "Catat nilai tegangan pada voltmeter.",
    acceptanceCriteria: "Tegangan sesuai dengan spesifikasi pabrikan +/-5%.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "UPS-MONTHLY-C1C",
    code: "c.1.c",
    description: "Catat arus pada amperemeter",
    durationMinutes: 5,
    procedure: "Catat nilai arus pada amperemeter.",
    acceptanceCriteria:
      "Arus sesuai dengan beban operasi yang berlangsung tanpa penyimpangan signifikan.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "UPS-MONTHLY-C1D",
    code: "c.1.d",
    description: "Periksa lampu dalam cubicle",
    durationMinutes: 5,
    procedure: "Periksa semua lampu dalam cubicle.",
    acceptanceCriteria: "Semua lampu berfungsi saat pintu terbuka.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-MONTHLY-C1E",
    code: "c.1.e",
    description: "Bersihkan kubikel wiring control",
    durationMinutes: 5,
    procedure: "Bersihkan bagian dalam dari setiap kubikel wiring control.",
    acceptanceCriteria:
      "Tidak ada debu, kotoran, atau benda asing di dalam kubikel.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-MONTHLY-C1F",
    code: "c.1.f",
    description: "Periksa terminasi kabel",
    durationMinutes: 10,
    procedure: "Periksa semua terminasi kabel.",
    acceptanceCriteria:
      "Semua terminasi terhubung kuat, tidak ada kabel putus.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-MONTHLY-C1G",
    code: "c.1.g",
    description: "Ukur suhu kubikel",
    durationMinutes: 5,
    procedure: "Ukur suhu kubikel.",
    acceptanceCriteria: "Suhu kubikel dalam batas aman sesuai standar pabrikan.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "C",
  },
  {
    id: "UPS-MONTHLY-C1H",
    code: "c.1.h",
    description: "Pengujian fungsi local dan remote",
    durationMinutes: 5,
    procedure: "Lakukan pengujian fungsi operasi local dan remote.",
    acceptanceCriteria:
      "Fungsi operasi local dan remote berjalan lancar tanpa hambatan.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-MONTHLY-C1I",
    code: "c.1.i",
    description: "Periksa baterai (body dan sambungan)",
    durationMinutes: 5,
    procedure: "Periksa baterai (body dan sambungan).",
    acceptanceCriteria: "Tidak terdapat potensi kerusakan pada baterai.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-MONTHLY-C1J",
    code: "c.1.j",
    description: "Ukur tegangan baterai",
    durationMinutes: 5,
    procedure: "Ukur tegangan baterai.",
    acceptanceCriteria: "Tegangan sesuai dengan spesifikasi pabrikan +/-5%.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "UPS-MONTHLY-C1K",
    code: "c.1.k",
    description: "Periksa grounding UPS",
    durationMinutes: 10,
    procedure:
      "Inspeksi visual instalasi grounding dan pengukuran tahanan grounding.",
    acceptanceCriteria:
      "Instalasi yang sesuai dengan nilai tahanan dibawah 5 Ohm.",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
    measurementUnit: "Ohm",
  },
];

const upsYearlyTasks: TasklistTask[] = [
  {
    id: "UPS-YEARLY-C2A",
    code: "c.2.a",
    description: "Pembersihan total kubikel",
    durationMinutes: 15,
    procedure:
      "Membersihkan seluruh bagian kubikel dari debu, kotoran, dan kontaminasi yang dapat mengganggu sistem.",
    acceptanceCriteria:
      "Seluruh sistem switchgear beroperasi sesuai standar operasional tanpa ditemukan anomali.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2B",
    code: "c.2.b",
    description: "Uji insulation resistance",
    durationMinutes: 10,
    procedure:
      "Mengukur tahanan isolasi menggunakan megohmmeter untuk memastikan tidak ada kebocoran arus.",
    acceptanceCriteria:
      "Nilai tahanan isolasi sesuai standar (>1 MOhm untuk LV, >100 MOhm untuk MV).",
    inputType: "MEASUREMENT",
    measurementLabel: "Nilai",
  },
  {
    id: "UPS-YEARLY-C2C",
    code: "c.2.c",
    description: "Uji continuity",
    durationMinutes: 10,
    procedure:
      "Mengukur continuity untuk koneksi input dan output UPS, sistem bypass internal, dan sambungan ke baterai.",
    acceptanceCriteria: "Multimeter menunjukkan terhubung.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2D",
    code: "c.2.d",
    description: "Inspeksi busbar",
    durationMinutes: 15,
    procedure:
      "Periksa kondisi fisik dan kelayakan busbar, kekencangan baut, mur, support busbar dan terminasinya.",
    acceptanceCriteria:
      "Tidak ada tanda kerusakan fisik, degradasi, kelonggaran.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2E",
    code: "c.2.e",
    description: "Inspeksi metering",
    durationMinutes: 15,
    procedure:
      "Memeriksa keakuratan pembacaan metering (tegangan, arus, daya), memastikan tidak ada anomali dan kalibrasi ulang bila dibutuhkan.",
    acceptanceCriteria: "Metering berfungsi sesuai akurasinya.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2F",
    code: "c.2.f",
    description: "Inspeksi MCB",
    durationMinutes: 10,
    procedure: "Periksa fungsi MCB.",
    acceptanceCriteria: "Bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2G",
    code: "c.2.g",
    description: "Inspeksi fuse disconnector",
    durationMinutes: 10,
    procedure: "Periksa fungsi fuse disconnector.",
    acceptanceCriteria: "Tidak putus, bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2H",
    code: "c.2.h",
    description: "Inspeksi fuse",
    durationMinutes: 10,
    procedure: "Periksa fungsi fuse.",
    acceptanceCriteria: "Tidak putus, bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2I",
    code: "c.2.i",
    description: "Inspeksi SPD",
    durationMinutes: 10,
    procedure: "Periksa fungsi SPD.",
    acceptanceCriteria: "Tidak putus, bekerja sesuai dengan spesifikasi.",
    inputType: "PERFORMANCE_ONLY",
  },
  {
    id: "UPS-YEARLY-C2J",
    code: "c.2.j",
    description: "Inspeksi parts aksesoris",
    durationMinutes: 10,
    procedure: "Melakukan penggantian komponen yang rusak atau aus.",
    acceptanceCriteria: "Komponen baru bekerja normal setelah penggantian.",
    inputType: "PERFORMANCE_ONLY",
  },
];

function getAvailableCycles(equipmentType: TasklistEquipmentType) {
  if (equipmentType === "UPS") {
    return ["MONTHLY", "YEARLY"] satisfies TasklistCycle[];
  }

  if (equipmentType === "TRF") {
    return ["WEEKLY", "SIX_MONTHLY"] satisfies TasklistCycle[];
  }

  if (equipmentType === "TNK") {
    return ["MONTHLY", "YEARLY"] satisfies TasklistCycle[];
  }

  if (equipmentType === "SGR") {
    return ["MONTHLY", "YEARLY"] satisfies TasklistCycle[];
  }

  if (equipmentType === "PMP") {
    return ["DAILY", "MONTHLY", "SIX_MONTHLY"] satisfies TasklistCycle[];
  }

  if (equipmentType === "PIP") {
    return ["MONTHLY", "YEARLY"] satisfies TasklistCycle[];
  }

  if (equipmentType === "MTR") {
    return ["DAILY", "WEEKLY", "YEARLY"] satisfies TasklistCycle[];
  }

  if (equipmentType === "MOV") {
    return ["DAILY", "MONTHLY", "YEARLY"] satisfies TasklistCycle[];
  }

  return [
    "WEEKLY",
    "MONTHLY",
    "SIX_MONTHLY",
    "YEARLY",
  ] satisfies TasklistCycle[];
}

function getEquipmentByType(equipmentType: TasklistEquipmentType) {
  if (equipmentType === "UPS") return upsEquipment;
  if (equipmentType === "TRF") return trfEquipment;
  if (equipmentType === "TNK") return tnkEquipment;
  if (equipmentType === "SGR") return sgrEquipment;
  if (equipmentType === "PMP") return pmpEquipment;
  if (equipmentType === "PIP") return pipEquipment;
  if (equipmentType === "MTR") return mtrEquipment;
  if (equipmentType === "MOV") return movEquipment;

  return gstEquipment;
}

function getTasksBySelection(
  equipmentType: TasklistEquipmentType,
  cycle: TasklistCycle,
) {
  if (equipmentType === "UPS") {
    if (cycle === "YEARLY") return upsYearlyTasks;
    return upsMonthlyTasks;
  }

  if (equipmentType === "TRF") {
    if (cycle === "SIX_MONTHLY") return trfSixMonthlyTasks;
    return trfWeeklyTasks;
  }

  if (equipmentType === "TNK") {
    if (cycle === "YEARLY") return tnkYearlyTasks;
    return tnkMonthlyTasks;
  }

  if (equipmentType === "SGR") {
    if (cycle === "YEARLY") return sgrYearlyTasks;
    return sgrMonthlyTasks;
  }

  if (equipmentType === "PMP") {
    if (cycle === "SIX_MONTHLY") return pmpSixMonthlyTasks;
    if (cycle === "MONTHLY") return pmpMonthlyTasks;
    return pmpDailyTasks;
  }

  if (equipmentType === "PIP") {
    if (cycle === "YEARLY") return pipYearlyTasks;
    return pipMonthlyTasks;
  }

  if (equipmentType === "MTR") {
    if (cycle === "YEARLY") return mtrYearlyTasks;
    if (cycle === "WEEKLY") return mtrWeeklyTasks;
    return mtrDailyTasks;
  }

  if (equipmentType === "MOV") {
    if (cycle === "YEARLY") return movYearlyTasks;
    if (cycle === "MONTHLY") return movMonthlyTasks;
    return movDailyTasks;
  }

  if (cycle === "YEARLY") return gstYearlyTasks;
  if (cycle === "SIX_MONTHLY") return gstSixMonthlyTasks;
  if (cycle === "MONTHLY") return gstMonthlyTasks;

  return gstWeeklyTasks;
}

function buildResultKey(
  equipmentType: TasklistEquipmentType,
  cycle: TasklistCycle,
): TasklistResultKey {
  return `${equipmentType}-${cycle}` as TasklistResultKey;
}

function buildInitialResults(
  tasks: TasklistTask[],
  equipment: TasklistEquipment[],
): TasklistResult[] {
  return tasks.flatMap((task) =>
    equipment.map((equipmentItem) => ({
      taskId: task.id,
      equipmentId: equipmentItem.id,
      performance: "",
      measuredValue: "",
    })),
  );
}

function isResultComplete(
  result: TasklistResult,
  task: TasklistTask,
) {
  if (!result.performance) return false;
  if (task.inputType === "MEASUREMENT") {
    return Boolean(result.measuredValue.trim());
  }

  return true;
}

function getMonthlyOccurrenceCount(cycle: TasklistCycle, monthNumber: number) {
  if (cycle === "DAILY") return 20;
  if (cycle === "WEEKLY") return 4;
  if (cycle === "MONTHLY") return 1;
  if (cycle === "SIX_MONTHLY") {
    return monthNumber === 6 || monthNumber === 12 ? 1 : 0;
  }

  return monthNumber === 12 ? 1 : 0;
}

export function useTasklistPage() {
  const [step, setStep] = useState<TasklistStep>("equipment");
  const [selectedEquipmentType, setSelectedEquipmentType] =
    useState<TasklistEquipmentType>("GST");
  const [cycle, setCycle] = useState<TasklistCycle>("WEEKLY");
  const equipment = useMemo(
    () => getEquipmentByType(selectedEquipmentType),
    [selectedEquipmentType],
  );
  const tasks = useMemo(
    () => getTasksBySelection(selectedEquipmentType, cycle),
    [cycle, selectedEquipmentType],
  );
  const resultKey = buildResultKey(selectedEquipmentType, cycle);
  const [resultsByKey, setResultsByKey] = useState(() => ({
    "GST-WEEKLY": buildInitialResults(gstWeeklyTasks, gstEquipment),
    "GST-MONTHLY": buildInitialResults(gstMonthlyTasks, gstEquipment),
    "GST-SIX_MONTHLY": buildInitialResults(
      gstSixMonthlyTasks,
      gstEquipment,
    ),
    "GST-YEARLY": buildInitialResults(gstYearlyTasks, gstEquipment),
    "MOV-DAILY": buildInitialResults(movDailyTasks, movEquipment),
    "MOV-MONTHLY": buildInitialResults(movMonthlyTasks, movEquipment),
    "MOV-YEARLY": buildInitialResults(movYearlyTasks, movEquipment),
    "MTR-DAILY": buildInitialResults(mtrDailyTasks, mtrEquipment),
    "MTR-WEEKLY": buildInitialResults(mtrWeeklyTasks, mtrEquipment),
    "MTR-YEARLY": buildInitialResults(mtrYearlyTasks, mtrEquipment),
    "PIP-MONTHLY": buildInitialResults(pipMonthlyTasks, pipEquipment),
    "PIP-YEARLY": buildInitialResults(pipYearlyTasks, pipEquipment),
    "PMP-DAILY": buildInitialResults(pmpDailyTasks, pmpEquipment),
    "PMP-MONTHLY": buildInitialResults(pmpMonthlyTasks, pmpEquipment),
    "PMP-SIX_MONTHLY": buildInitialResults(
      pmpSixMonthlyTasks,
      pmpEquipment,
    ),
    "SGR-MONTHLY": buildInitialResults(sgrMonthlyTasks, sgrEquipment),
    "SGR-YEARLY": buildInitialResults(sgrYearlyTasks, sgrEquipment),
    "TNK-MONTHLY": buildInitialResults(tnkMonthlyTasks, tnkEquipment),
    "TNK-YEARLY": buildInitialResults(tnkYearlyTasks, tnkEquipment),
    "TRF-WEEKLY": buildInitialResults(trfWeeklyTasks, trfEquipment),
    "TRF-SIX_MONTHLY": buildInitialResults(
      trfSixMonthlyTasks,
      trfEquipment,
    ),
    "UPS-MONTHLY": buildInitialResults(upsMonthlyTasks, upsEquipment),
    "UPS-YEARLY": buildInitialResults(upsYearlyTasks, upsEquipment),
  }));
  const results = resultsByKey[resultKey];
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(
    gstEquipment[0].id,
  );
  const [firstEmptyTaskId, setFirstEmptyTaskId] = useState<string | null>(null);
  const [executionDate, setExecutionDate] = useState("2026-05-24");
  const [remarks, setRemarks] = useState("");

  const monthNumber = 5;
  const occurrenceCount = useMemo(
    () => getMonthlyOccurrenceCount(cycle, monthNumber),
    [cycle],
  );
  const planPerOccurrence = useMemo(
    () => tasks.length * equipment.length,
    [equipment.length, tasks.length],
  );
  const totalTasklistPlan = planPerOccurrence * occurrenceCount;
  const completedCellCount = results.filter((result) => {
    const task = tasks.find((item) => item.id === result.taskId);

    return task ? isResultComplete(result, task) : false;
  }).length;
  const totalTasklistSelesai = completedCellCount * occurrenceCount;

  const sessionSnapshot = {
    equipmentCount: equipment.length,
    occurrenceCount,
    planPerOccurrence,
    taskCount: tasks.length,
    totalTasklistPlan,
    totalTasklistSelesai,
  };

  const selectedEquipment =
    equipment.find((item) => item.id === selectedEquipmentId) ?? equipment[0];

  const selectedEquipmentFinishedCount = results.filter(
    (result) => {
      const task = tasks.find((item) => item.id === result.taskId);
      if (!task) return false;

      return (
        result.equipmentId === selectedEquipment.id &&
        isResultComplete(result, task)
      );
    },
  ).length;

  function changeCycle(nextCycle: TasklistCycle) {
    setCycle(nextCycle);
    setFirstEmptyTaskId(null);
  }

  function changeEquipmentType(nextEquipmentType: TasklistEquipmentType) {
    const nextEquipment = getEquipmentByType(nextEquipmentType);
    const [nextCycle] = getAvailableCycles(nextEquipmentType);

    setSelectedEquipmentType(nextEquipmentType);
    setSelectedEquipmentId(nextEquipment[0].id);
    setCycle(nextCycle);
    setFirstEmptyTaskId(null);
  }

  function submitEquipmentSelection() {
    setStep("cycle");
  }

  function submitCycleSelection(nextCycle: TasklistCycle) {
    changeCycle(nextCycle);
    setStep("form");
  }

  function restartSelection() {
    setStep("equipment");
    setFirstEmptyTaskId(null);
  }

  function updatePerformance(
    taskId: string,
    equipmentId: string,
    performance: TasklistPerformance,
  ) {
    setResultsByKey((current) => ({
      ...current,
      [resultKey]: results.map((result) => {
        if (result.taskId !== taskId || result.equipmentId !== equipmentId) {
          return result;
        }

        return { ...result, performance };
      }),
    }));
  }

  function updateMeasuredValue(
    taskId: string,
    equipmentId: string,
    measuredValue: string,
  ) {
    setResultsByKey((current) => ({
      ...current,
      [resultKey]: results.map((result) => {
        if (result.taskId !== taskId || result.equipmentId !== equipmentId) {
          return result;
        }

        return { ...result, measuredValue };
      }),
    }));
  }

  function getResult(taskId: string, equipmentId: string) {
    return results.find(
      (result) =>
        result.taskId === taskId && result.equipmentId === equipmentId,
    );
  }

  function findFirstEmptyResult() {
    for (const equipmentItem of equipment) {
      for (const task of tasks) {
        const result = getResult(task.id, equipmentItem.id);

        if (!result || !isResultComplete(result, task)) {
          return {
            equipment: equipmentItem,
            task,
          };
        }
      }
    }

    return null;
  }

  function validateBeforeSubmit() {
    const firstEmptyResult = findFirstEmptyResult();

    if (!firstEmptyResult) {
      setFirstEmptyTaskId(null);
      return {
        isValid: true,
        message: "Semua task sudah terisi.",
        taskId: null,
      };
    }

    setSelectedEquipmentId(firstEmptyResult.equipment.id);
    setFirstEmptyTaskId(firstEmptyResult.task.id);

    return {
      isValid: false,
      message: `${firstEmptyResult.equipment.tagNumber} - ${firstEmptyResult.task.code} belum diisi.`,
      taskId: firstEmptyResult.task.id,
    };
  }

  return {
    cycle,
    step,
    selectedEquipmentType,
    reportDate: "2026-05-24",
    location: "IT Cikampek",
    year: "2026",
    monthNumber: String(monthNumber),
    weekNumber: "4",
    equipment,
    tasks,
    results,
    executionDate,
    remarks,
    selectedEquipment,
    selectedEquipmentFinishedCount,
    availableCycles: getAvailableCycles(selectedEquipmentType),
    firstEmptyTaskId,
    sessionSnapshot,
    getResult,
    restartSelection,
    setCycle: changeCycle,
    setExecutionDate,
    setRemarks,
    setSelectedEquipmentType: changeEquipmentType,
    setSelectedEquipmentId,
    submitCycleSelection,
    submitEquipmentSelection,
    updateMeasuredValue,
    updatePerformance,
    validateBeforeSubmit,
  };
}
