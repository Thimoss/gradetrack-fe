# Tasklist Contract

Draft kontrak tasklist untuk FE dan BE.

## Konsep

Tasklist berbeda dari grading.

- Grading mengisi form per equipment.
- Tasklist mengisi beberapa task untuk seluruh equipment dengan jenis yang sama dalam satu session.

Contoh:

- Depot punya 7 genset.
- Template `GST Mingguan` punya 7 task.
- User wajib mengisi 7 task untuk semua 7 genset.
- Total cell wajib diisi: `7 task x 7 equipment = 49 result`.

`totalTasklistPlan` dan `totalTasklistSelesai` disimpan sebagai snapshot session.
Jika jumlah equipment berubah di masa depan, total session lama tidak ikut berubah.

## Cycle

Cycle tasklist terdiri dari:

- `DAILY` / Harian.
- `WEEKLY` / Mingguan.
- `MONTHLY` / Bulanan.
- `SIX_MONTHLY` / 6 Bulanan.
- `YEARLY` / Tahunan.

Tidak semua equipment punya semua cycle. Daftar cycle tersedia harus mengikuti template yang ada untuk equipment tersebut.

## Performance Value

Setiap cell tasklist wajib punya performance:

| Value | Label | Keterangan |
|---|---|---|
| `H` | HIGH | Sesuai acceptance criteria |
| `M` | MED | Masih dalam acceptance criteria tetapi dengan catatan |
| `L` | LOW | Tidak sesuai acceptance criteria |

`note` wajib jika performance `M` atau `L`.

## Task Input Type

Tidak semua task punya hasil pengukuran.

Gunakan `inputType` di template task:

```ts
type TaskInputType = "PERFORMANCE_ONLY" | "MEASUREMENT";
```

Rule:

- `PERFORMANCE_ONLY`: user hanya isi `performance` dan `note` jika perlu.
- `MEASUREMENT`: user isi `measuredValue`, `performance`, dan `note` jika perlu.
- `measuredValue` wajib hanya jika `inputType = "MEASUREMENT"`.
- `measurementUnit` berasal dari template task, bukan input bebas user.

## FE State

FE menggunakan bentuk matrix/nested karena cocok untuk render tabel.

```ts
type TasklistPageState = {
  session: TasklistSessionDraft;
  equipment: TasklistEquipment[];
  tasks: TasklistTask[];
  resultsByTask: TasklistResultRow[];
};

type TasklistResultRow = {
  taskId: string;
  results: TasklistCellResult[];
};

type TasklistCellResult = {
  equipmentId: string;
  performance: "H" | "M" | "L" | "";
  measuredValue?: string;
  note?: string;
};
```

Saat form dibuka, FE wajib generate semua cell kosong dari kombinasi `tasks x equipment`.

FE menghitung:

```ts
totalTasklistPlan = tasks.length * equipment.length;
totalTasklistSelesai = results.filter((result) => result.performance).length;
```

Nilai ini dikirim ke BE saat submit dan BE tetap menghitung ulang untuk validasi.

Submit hanya aktif jika:

- semua cell punya `performance`,
- task `MEASUREMENT` punya `measuredValue`,
- cell `M` atau `L` punya `note`.

## Flow FE

Flow input tasklist:

1. User login.
2. User masuk menu `Tasklist`.
3. User klik `Input Tasklist`.
4. Popup pilih tanggal/periode.
5. Popup pilih jenis equipment.
6. Popup pilih cycle yang tersedia untuk equipment tersebut.
7. FE fetch template tasklist dan equipment list dari depot.
8. FE render matrix tasklist.
9. User mengisi semua cell.
10. User submit.

## UI Tasklist

Data tasklist tetap berbentuk matrix `task x equipment`, tetapi UI web tidak wajib berbentuk tabel besar seperti Excel.

Preferred UI:

- User memilih equipment/tag terlebih dahulu.
- Setelah equipment dipilih, tampil semua task untuk equipment tersebut.
- Setiap task tampil sebagai card/list item.
- Performance `H/M/L` dipilih dari segmented button.
- Progress equipment tampil sebagai `task selesai / total task`.
- Total tasklist plan dan total tasklist selesai tetap dihitung global semua equipment.

Tampilan referensi Excel tetap menjadi sumber struktur data:

- Row kiri: task.
- Kolom kanan: equipment tag.
- Cell: hasil task per equipment.

Tasklist web dipakai untuk input ulang data yang sudah didapat dari lapangan.
Header dan matrix task seperti screenshot utama tetap dibuat.

Yang dibuat di form web:

- Row judul section seperti `RUTIN : GST (MINGGUAN)`.
- Header kolom task: `No`, `Operation Description`, `Jumlah Waktu`, `Long Text`, `Acceptance Criteria`.
- Header kolom equipment: nomor equipment dan `Tag No`.
- Row task dan cell input performance per equipment.
- `Tanggal Pelaksanaan`.
- `Keterangan`.

Skip hanya row bawah yang khusus pekerja lapangan atau kebutuhan print:

- `Paraf Teknisi Pelaksana`.
- `Paraf Petugas/Pengawas Lapangan`.
- Watermark page, page break, garis print area, dan elemen visual Excel lain.

Metadata seperti tanggal pelaporan, lokasi, tahun, bulan, minggu, total plan, dan total selesai tetap ditaruh di header/session, bukan sebagai row matrix.

Kolom task:

- No / kode task.
- Operation description.
- Jumlah waktu.
- Long text / procedure.
- Acceptance criteria.

Kolom equipment:

- Nomor/tag equipment.
- Cell pilih `H`, `M`, `L`.
- Jika task `MEASUREMENT`, cell juga punya input hasil pengukuran.

UX wajib:

- Tabel pakai horizontal scroll.
- Kolom task utama sebaiknya sticky di kiri.
- Header equipment sebaiknya sticky di atas.
- Summary progress tampil di atas, contoh `42/49 selesai`.
- Submit disabled jika belum lengkap.

## API Submit Payload

FE boleh mengirim payload nested karena cocok dengan UI matrix.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "GST",
    "cycle": "WEEKLY",
    "periodDate": "2026-05-24",
    "taskCount": 7,
    "equipmentCount": 7,
    "totalTasklistPlan": 49,
    "totalTasklistSelesai": 48
  },
  "equipmentIds": [
    "EQ-GST-01",
    "EQ-GST-02",
    "EQ-GST-03",
    "EQ-GST-04",
    "EQ-GST-05",
    "EQ-GST-06",
    "EQ-GST-07"
  ],
  "resultsByTask": [
    {
      "taskId": "GST-WEEKLY-C1A",
      "results": [
        {
          "equipmentId": "EQ-GST-01",
          "performance": "H",
          "note": ""
        },
        {
          "equipmentId": "EQ-GST-02",
          "performance": "M",
          "note": "Running normal, suara sedikit kasar."
        },
        {
          "equipmentId": "EQ-GST-03",
          "performance": "L",
          "note": "Tidak dapat running stabil."
        }
      ]
    },
    {
      "taskId": "GST-WEEKLY-C1X",
      "results": [
        {
          "equipmentId": "EQ-GST-01",
          "performance": "H",
          "measuredValue": "12.1",
          "note": ""
        },
        {
          "equipmentId": "EQ-GST-02",
          "performance": "L",
          "measuredValue": "11.0",
          "note": "Di bawah acceptance criteria."
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

## PMP Tasklist Contract

Kontrak ini untuk tasklist Pompa Produk / `PMP`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_PMP_yyyymmdd.xlsx`

### Available Cycle

PMP punya cycle:

- `DAILY` / Harian.
- `MONTHLY` / Bulanan.
- `SIX_MONTHLY` / 6 Bulanan.

PMP tidak punya cycle mingguan dan tahunan pada XLSX tersebut.

### PMP Task Template

Template task disiapkan BE berdasarkan `equipmentType = PMP` dan `cycle`.

#### PMP Daily

```json
[
  {
    "code": "c.1.a",
    "description": "Bersihkan area pompa",
    "durationMinutes": 5,
    "procedure": "Bersihkan area sekitar pompa dan motor dari debu, kotoran, dan tumpahan oli yang dapat menyebabkan bahaya slip atau gangguan operasional.",
    "acceptanceCriteria": "Bersih dari debu, kotoran, tumpahan oli, dan genangan air.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.b",
    "description": "Periksa kebocoran pada pompa",
    "durationMinutes": 1,
    "procedure": "Periksa flange, pipa, seal, dan gasket apakah ada tetesan atau genangan oli, air, atau fluida lainnya di sekitar pompa.",
    "acceptanceCriteria": "Tidak ada kebocoran atau rembesan.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.c",
    "description": "Periksa level oil / kondisi grease",
    "durationMinutes": 1,
    "procedure": "Periksa apakah level oli masih dalam batas normal dan pastikan grease tidak kering atau berlebihan di sekitar bearing.",
    "acceptanceCriteria": "Level oli dalam batas indikator sight glass dan grease tidak bocor atau terlalu kering.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.d",
    "description": "Periksa baut dan mur",
    "durationMinutes": 1,
    "procedure": "Periksa secara visual apakah baut dan mur pada casing, flange, kopling, pondasi tidak longgar dan hilang.",
    "acceptanceCriteria": "Tidak ada baut/mur yang longgar atau hilang.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.e",
    "description": "Periksa sambungan coupling",
    "durationMinutes": 1,
    "procedure": "Periksa sambungan kopling apakah ada keausan, retakan, atau kerusakan pada elemen coupling seperti bantalan, baut, dan karet peredam, serta dalam keadaan kencang. Pastikan tidak ada kebocoran pelumas jika coupling menggunakan sistem pelumasan.",
    "acceptanceCriteria": "Sambungan coupling harus terpasang dengan benar dan kencang dan kondisi dalam keadaan baik.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.f",
    "description": "Periksa panel pompa",
    "durationMinutes": 1,
    "procedure": "Periksa apakah indikator pompa menunjukkan kondisi ON/OFF sesuai kebutuhan operasi.",
    "acceptanceCriteria": "Status pompa sesuai kebutuhan operasi dan tidak ada alarm atau indikator error yang menyala.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.g",
    "description": "Periksa kondisi valve",
    "durationMinutes": 1,
    "procedure": "Periksa apakah valve suction dan discharge berada dalam posisi yang sesuai dengan pola operasi.",
    "acceptanceCriteria": "Kondisi atau status valve OPEN/CLOSE sudah sesuai dengan pola pengoperasian.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.h",
    "description": "Periksa kondisi relief valve",
    "durationMinutes": 1,
    "procedure": "Periksa kondisi relief valve apakah berfungsi dengan baik dan dalam kondisi baik.",
    "acceptanceCriteria": "Tidak ada kebocoran fluida, tekanan buka sesuai spesifikasi, serta valve dapat menutup kembali dengan rapat setelah operasi.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.i",
    "description": "Catat nilai tekanan & suhu pada instrumen",
    "durationMinutes": 1,
    "procedure": "Lakukan pencatatan tekanan dan suhu pada pressure dan temperature indicator.",
    "acceptanceCriteria": "Pencatatan sudah sesuai dengan apa yang ditampilkan pada instrumen tersebut.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai"
  },
  {
    "code": "c.1.j",
    "description": "Periksa suhu bearings saat running",
    "durationMinutes": 1,
    "procedure": "Ukur suhu permukaan bearing housing saat pompa beroperasi, pengukuran pada DE/NDE motor dan pompa.",
    "acceptanceCriteria": "Suhu bearing house tidak boleh melebihi 85 C sesuai standar API 610 dan ISO 20816.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai",
    "measurementUnit": "C"
  },
  {
    "code": "c.1.k",
    "description": "Periksa adanya suara abnormal saat running",
    "durationMinutes": 1,
    "procedure": "Dengarkan apakah terdapat suara dengungan berlebihan, gesekan, dentuman, atau suara ketukan yang tidak biasa saat pompa dan motor bekerja.",
    "acceptanceCriteria": "Suara operasi pompa dan motor harus halus dan stabil, tanpa adanya suara berisik berlebihan.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

#### PMP Monthly

```json
[
  {
    "code": "c.2.a",
    "description": "Periksa pelindung kopling saat running",
    "durationMinutes": 1,
    "procedure": "Periksa apakah pelindung coupling terpasang dengan baik dan tidak longgar.",
    "acceptanceCriteria": "Pelindung coupling harus dalam kondisi utuh, tidak rusak, dan tidak longgar.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.b",
    "description": "Periksa kondisi coupling",
    "durationMinutes": 2,
    "procedure": "Periksa apakah coupling dalam kondisi baik tanpa tanda keausan atau retakan dan tidak ada kelonggaran atau baut yang longgar pada coupling.",
    "acceptanceCriteria": "Coupling dalam kondisi baik, tidak longgar, tidak retak, serta baut pengikat coupling terpasang dengan kuat.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.c",
    "description": "Ukur vibrasi pompa",
    "durationMinutes": 2,
    "procedure": "Ukur vibrasi pompa dengan menggunakan vibrasi meter.",
    "acceptanceCriteria": "Semua nilai vibrasi tercatat berdasarkan pengambilan pada DE/NDE motor dan pompa, serta nilai vibrasi tidak boleh melebihi 4.5 mm/s RMS.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai",
    "measurementUnit": "mm/s"
  },
  {
    "code": "c.2.d",
    "description": "Periksa koneksi kabel dan terminal",
    "durationMinutes": 2,
    "procedure": "Periksa koneksi kabel pada terminal box motor dan panel kontrol untuk mendeteksi tanda-tanda korosi atau kelonggaran.",
    "acceptanceCriteria": "Tidak ada tanda-tanda korosi, overheating, atau bekas luka bakar pada terminal atau koneksi kabel.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.e",
    "description": "Periksa nilai tegangan & arus",
    "durationMinutes": 2,
    "procedure": "Ukur tegangan suplai di terminal motor dan periksa keseimbangan tegangan antar fasa untuk memastikan tidak ada perbedaan yang mencolok.",
    "acceptanceCriteria": "Tegangan operasi berada dalam rentang +/-10% dari tegangan nominal sesuai IEC 60034-1, ketidakseimbangan tegangan antar fasa tidak lebih dari 2%, dan arus listrik berada dalam rentang wajar.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai"
  },
  {
    "code": "c.2.f",
    "description": "Lakukan pengencangan ulang baut",
    "durationMinutes": 5,
    "procedure": "Lakukan pengencangan baut pada semua baut dan mur di pompa, motor dan pondasi.",
    "acceptanceCriteria": "Pastikan semua baut dan mur tersedia dan dalam kondisi kencang dan baik.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

#### PMP Six Monthly

```json
[
  {
    "code": "c.3.a",
    "description": "Bersihkan suction strainer",
    "durationMinutes": 30,
    "procedure": "Bersihkan strainer dari penyumbatan, kotoran, lumpur, atau partikel padat lainnya.",
    "acceptanceCriteria": "Suction strainer dalam kondisi bersih dan tidak tersumbat, serta sudah terpasang dengan baik dan benar pada system.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.b",
    "description": "Periksa kondisi casing pompa",
    "durationMinutes": 5,
    "procedure": "Periksa casing pompa dengan dye penetrant test untuk mendeteksi retakan kecil dan gunakan ultrasonic thickness gauge untuk mengukur ketebalan dinding casing dan mendeteksi kemungkinan korosi dari dalam.",
    "acceptanceCriteria": "Tidak ada retakan yang terlihat secara kasat mata atau melalui metode DPT dan ketebalan casing tidak boleh berkurang lebih dari 20% dari spesifikasi desain asli sesuai API 610.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai"
  },
  {
    "code": "c.3.c",
    "description": "Periksa kondisi pipa terkoneksi pompa",
    "durationMinutes": 2,
    "procedure": "Pemeriksaan kondisi pipa yang terkoneksi dengan pompa pada area discharge dan suction.",
    "acceptanceCriteria": "Tidak ada kebocoran atau hambatan aliran dan kondisi fisik pipa serta penyangga tidak ada retakan, korosi, atau deformasi yang dapat mempengaruhi integritas struktural.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.d",
    "description": "Periksa kondisi shaft",
    "durationMinutes": 3,
    "procedure": "Periksa kondisi shaft apakah mengalami keausan atau kerusakan serta periksa apakah ada kelonggaran atau ketidaksejajaran pada bantalan.",
    "acceptanceCriteria": "Shaft berputar dengan lancar tanpa getaran atau suara abnormal, serta tidak ditemukan adanya tanda-tanda keausan, korosi, atau ketidaksejajaran.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.e",
    "description": "Catat nilai grounding",
    "durationMinutes": 3,
    "procedure": "Ukur nilai grounding dengan menggunakan Earth Resistance Tester.",
    "acceptanceCriteria": "Resistansi grounding harus di bawah 5 Ohm, sesuai standar NFPA 70B.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai",
    "measurementUnit": "Ohm"
  },
  {
    "code": "c.3.f",
    "description": "Periksa MCB pada MCC",
    "durationMinutes": 2,
    "procedure": "Periksa proteksi listrik seperti MCB, MCC, dan relay proteksi.",
    "acceptanceCriteria": "MCB, relay proteksi, dan fuse harus dalam kondisi berfungsi dan tidak mengalami keausan atau kerusakan.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

### PMP Submit Payload

Payload PMP sama seperti equipment lain. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "PMP",
    "cycle": "DAILY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 11,
    "equipmentCount": 8,
    "totalTasklistPlan": 88,
    "totalTasklistSelesai": 88,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-PMP-1",
    "EQ-PMP-2",
    "EQ-PMP-3",
    "EQ-PMP-4",
    "EQ-PMP-5",
    "EQ-PMP-6",
    "EQ-PMP-7",
    "EQ-PMP-8"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.1.i",
      "results": [
        {
          "equipmentId": "EQ-PMP-1",
          "performance": "H",
          "measuredValue": "45 psi / 32 C"
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

## UPS Tasklist Contract

Kontrak ini untuk tasklist UPS / `UPS`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_UPS_yyyymmdd.xlsx`

### Available Cycle

UPS punya cycle:

- `MONTHLY` / Bulanan.
- `YEARLY` / Tahunan.

UPS tidak punya cycle harian, mingguan, dan 6 bulanan pada XLSX tersebut.

### UPS Task Template

Template task disiapkan BE berdasarkan `equipmentType = UPS` dan `cycle`.

#### UPS Monthly

- Total task: 11.
- Total durasi: 65 menit.
- Task measurement: `c.1.b`, `c.1.c`, `c.1.g`, `c.1.j`, `c.1.k`.
- Task performance only: `c.1.a`, `c.1.d`, `c.1.e`, `c.1.f`, `c.1.h`, `c.1.i`.

#### UPS Yearly

- Total task: 10.
- Total durasi: 115 menit.
- Task measurement: `c.2.b`.
- Task performance only: `c.2.a`, `c.2.c`, `c.2.d`, `c.2.e`, `c.2.f`, `c.2.g`, `c.2.h`, `c.2.i`, `c.2.j`.
- Catatan source: header yearly tidak menampilkan total durasi; total 115 menit dihitung dari durasi tiap task.

### UPS Submit Payload

Payload UPS sama seperti equipment lain. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "UPS",
    "cycle": "MONTHLY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 11,
    "equipmentCount": 8,
    "totalTasklistPlan": 88,
    "totalTasklistSelesai": 88,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-UPS-1",
    "EQ-UPS-2",
    "EQ-UPS-3",
    "EQ-UPS-4",
    "EQ-UPS-5",
    "EQ-UPS-6",
    "EQ-UPS-7",
    "EQ-UPS-8"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.1.b",
      "results": [
        {
          "equipmentId": "EQ-UPS-1",
          "performance": "H",
          "measuredValue": "220 V"
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

## TRF Tasklist Contract

Kontrak ini untuk tasklist Transformer / `TRF`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_TRF_yyyymmdd.xlsx`

### Available Cycle

TRF punya cycle:

- `WEEKLY` / Mingguan.
- `SIX_MONTHLY` / 6 Bulanan.

TRF tidak punya cycle harian, bulanan, dan tahunan pada XLSX tersebut.

### TRF Task Template

Template task disiapkan BE berdasarkan `equipmentType = TRF` dan `cycle`.

#### TRF Weekly

- Total task: 12.
- Total durasi: 50 menit.
- Task measurement: `c.1.d`, `c.1.e`, `c.1.f`.
- Task performance only: `c.1.a`, `c.1.b`, `c.1.c`, `c.1.g`, `c.1.h`, `c.1.i`, `c.1.j`, `c.1.k`, `c.1.l`.

#### TRF Six Monthly

- Total task: 4.
- Total durasi: 22 menit.
- Task measurement: `c.2.d`.
- Task performance only: `c.2.a`, `c.2.b`, `c.2.c`.
- Catatan source: durasi `c.2.d` kosong pada XLSX dan timesheet, sehingga FE memakai `0` menit.

### TRF Submit Payload

Payload TRF sama seperti equipment lain. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "TRF",
    "cycle": "WEEKLY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 12,
    "equipmentCount": 8,
    "totalTasklistPlan": 96,
    "totalTasklistSelesai": 96,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-TRF-1",
    "EQ-TRF-2",
    "EQ-TRF-3",
    "EQ-TRF-4",
    "EQ-TRF-5",
    "EQ-TRF-6",
    "EQ-TRF-7",
    "EQ-TRF-8"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.1.d",
      "results": [
        {
          "equipmentId": "EQ-TRF-1",
          "performance": "H",
          "measuredValue": "65 C"
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

## TNK Tasklist Contract

Kontrak ini untuk tasklist Tangki / `TNK`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_TNK_yyyymmdd.xlsx`

### Available Cycle

TNK punya cycle:

- `MONTHLY` / Bulanan.
- `YEARLY` / Tahunan.

TNK tidak punya cycle harian, mingguan, dan 6 bulanan pada XLSX tersebut.

### TNK Task Template

Template task disiapkan BE berdasarkan `equipmentType = TNK` dan `cycle`.

#### TNK Monthly

- Total task: 28.
- Total durasi: 56 menit.
- Task measurement: tidak ada.
- Task performance only: `c.1.a` sampai `c.1.z.2`.

#### TNK Yearly

- Total task: 16.
- Total durasi: 100 menit.
- Task measurement: `c.2.a`, `c.2.d`, `c.2.e`, `c.2.g`, `c.2.k`, `c.2.p`.
- Task performance only: `c.2.b`, `c.2.c`, `c.2.f`, `c.2.h`, `c.2.i`, `c.2.j`, `c.2.l`, `c.2.m`, `c.2.n`, `c.2.o`.

### TNK Submit Payload

Payload TNK sama seperti equipment lain. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "TNK",
    "cycle": "MONTHLY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 28,
    "equipmentCount": 8,
    "totalTasklistPlan": 224,
    "totalTasklistSelesai": 224,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-TNK-1",
    "EQ-TNK-2",
    "EQ-TNK-3",
    "EQ-TNK-4",
    "EQ-TNK-5",
    "EQ-TNK-6",
    "EQ-TNK-7",
    "EQ-TNK-8"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.1.a",
      "results": [
        {
          "equipmentId": "EQ-TNK-1",
          "performance": "H",
          "measuredValue": ""
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

## SGR Tasklist Contract

Kontrak ini untuk tasklist Switch Gear / `SGR`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_SGR_yyyymmdd.xlsx`

### Available Cycle

SGR punya cycle:

- `MONTHLY` / Bulanan.
- `YEARLY` / Tahunan.

SGR tidak punya cycle harian, mingguan, dan 6 bulanan pada XLSX tersebut.

### SGR Task Template

Template task disiapkan BE berdasarkan `equipmentType = SGR` dan `cycle`.

#### SGR Monthly

- Total task: 16.
- Total durasi: 103 menit.
- Task measurement: `c.1.b`, `c.1.c`, `c.1.h`, `c.1.i`, `c.1.j`, `c.1.k`, `c.1.l`, `c.1.m`.
- Task performance only: `c.1.a`, `c.1.d`, `c.1.e`, `c.1.f`, `c.1.g`, `c.1.n`, `c.1.o`, `c.1.p`.

#### SGR Yearly

- Total task: 13.
- Total durasi: 118 menit.
- Task measurement: `c.2.b`, `c.2.c`, `c.2.d`, `c.2.e`.
- Task performance only: `c.2.a`, `c.2.f`, `c.2.g`, `c.2.h`, `c.2.i`, `c.2.j`, `c.2.k`, `c.2.l`, `c.2.m`.

### SGR Submit Payload

Payload SGR sama seperti equipment lain. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "SGR",
    "cycle": "MONTHLY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 16,
    "equipmentCount": 8,
    "totalTasklistPlan": 128,
    "totalTasklistSelesai": 128,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-SGR-1",
    "EQ-SGR-2",
    "EQ-SGR-3",
    "EQ-SGR-4",
    "EQ-SGR-5",
    "EQ-SGR-6",
    "EQ-SGR-7",
    "EQ-SGR-8"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.1.b",
      "results": [
        {
          "equipmentId": "EQ-SGR-1",
          "performance": "H",
          "measuredValue": "380 V"
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

## PIP Tasklist Contract

Kontrak ini untuk tasklist Sistem Perpipaan / `PIP`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_PIP_yyyymmdd.xlsx`

### Available Cycle

PIP punya cycle:

- `MONTHLY` / Bulanan.
- `YEARLY` / Tahunan.

PIP tidak punya cycle harian, mingguan, dan 6 bulanan pada XLSX tersebut.

### PIP Task Template

Template task disiapkan BE berdasarkan `equipmentType = PIP` dan `cycle`.

#### PIP Monthly

```json
[
  {
    "code": "c.1.a",
    "description": "Periksa kondisi sambungan antar flange",
    "durationMinutes": 5,
    "procedure": "Pastikan flange terpasang dengan benar, tidak ada kerusakan pada flange dan tidak adanya kebocoran produk.",
    "acceptanceCriteria": "Mur dan baut terpasang lengkap dan kencang. Tidak ada kebocoran pada sambungan flange.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.b",
    "description": "Periksa sambungan bonding antar flange",
    "durationMinutes": 5,
    "procedure": "Pastikan koneksi kabel pada flange terpasang dengan baik dan tidak longgar.",
    "acceptanceCriteria": "Bonding terpasang dengan kencang.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.c",
    "description": "Periksa kondisi support pipa",
    "durationMinutes": 5,
    "procedure": "Periksa secara visual untuk melihat apakah ada kerusakan pada support pipa, seperti retakan, deformasi, korosi, atau keausan.",
    "acceptanceCriteria": "Crack dan deformasi tidak diijinkan. Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.d",
    "description": "Periksa kondisi valve",
    "durationMinutes": 5,
    "procedure": "Periksa keadaan fisik valve, pastikan tidak ada kerusakan dan kebocoran pada valve.",
    "acceptanceCriteria": "Valve mudah dioperasikan. Tidak ada kebocoran produk pada valve.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.e",
    "description": "Periksa kondisi pipa dari adanya korosi",
    "durationMinutes": 10,
    "procedure": "Lakukan pemeriksaan visual pada bagian luar pipa, terutama di area yang terpapar kelembapan, udara, atau bahan kimia.",
    "acceptanceCriteria": "Crack dan deformasi tidak diijinkan. Korosi tidak boleh lebih dari 10% mengacu ASTM D610.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.f",
    "description": "Periksa kondisi cat pada pipa",
    "durationMinutes": 5,
    "procedure": "Lakukan assessment kondisi cat menggunakan panduan ISO 4628-5 terhadap blistering, rusting, cracking, flaking, chalking, delamination, dan cacat sejenis.",
    "acceptanceCriteria": "Tidak ada cat yang terkelupas/rusak atau maksimal pada kondisi rating 1 pada ISO 4628-5.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.g",
    "description": "Bersihkan permukaan pipa",
    "durationMinutes": 15,
    "procedure": "Bersihkan permukaan pipa yang kotor.",
    "acceptanceCriteria": "Tidak terdapat kotoran pada permukaan pipa.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.h",
    "description": "Periksa alignment pipa",
    "durationMinutes": 10,
    "procedure": "Lakukan pemeriksaan kelurusan sambungan pipa dengan menggunakan water level.",
    "acceptanceCriteria": "Maksimum penyimpangan dimensi di ukuran 1 mm/m mengacu ASTM B31-3.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.i",
    "description": "Periksa kondisi relief valve",
    "durationMinutes": 3,
    "procedure": "Lakukan pemeriksaan secara visual untuk memeriksa adanya kerusakan atau korosi pada relief valve dan pastikan tidak ada kebocoran.",
    "acceptanceCriteria": "Tidak ada kerusakan pada coating dan tidak ada kebocoran pada sambungan-sambungan.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.j",
    "description": "Catat nilai tekanan & suhu pada instrumen",
    "durationMinutes": 2,
    "procedure": "Lakukan pencatatan nilai tekanan dan suhu bila ada pada instrumentasi.",
    "acceptanceCriteria": "Catatan pembacaan tekanan dan suhu dilakukan penyimpanan pada modul PM.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai"
  }
]
```

#### PIP Yearly

```json
[
  {
    "code": "c.2.a",
    "description": "Pengukuran ketebalan pipa pada CML",
    "durationMinutes": 5,
    "procedure": "Melakukan pengukuran ketebalan pipa pada titik CML dan lakukan pencatatan.",
    "acceptanceCriteria": "Record ketebalan didapatkan secara lengkap dan diketahui corrosion rate.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai"
  },
  {
    "code": "c.2.b",
    "description": "Lakukan gas test tiap sambungan flange",
    "durationMinutes": 5,
    "procedure": "Melakukan pengujian gas test pada setiap sambungan pipa.",
    "acceptanceCriteria": "Tidak ada kebocoran pada sambungan.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.c",
    "description": "Lakukan pengencangan baut",
    "durationMinutes": 0,
    "procedure": "Melakukan pengencangan mur dan baut, dengan menggunakan kunci moment.",
    "acceptanceCriteria": "Kekencangan tiap baut mengacu pada tabel tightening.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.d",
    "description": "Greasing valve",
    "durationMinutes": 10,
    "procedure": "Lakukan greasing pada valve.",
    "acceptanceCriteria": "Valve mudah dioperasikan.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.e",
    "description": "Periksa insulasi pipa bila ada",
    "durationMinutes": 5,
    "procedure": "Periksa apakah insulasi terpasang dengan rapat dan tidak ada celah. Cari kerusakan fisik seperti retakan, sobekan, atau bagian terkelupas yang dapat membuka pipa terhadap pengaruh eksternal.",
    "acceptanceCriteria": "Tidak ada kerusakan insulasi, tidak ada kelembapan di dalam insulasi, dan tidak ada pertumbuhan jamur.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.f",
    "description": "Periksa terjadinya deformasi",
    "durationMinutes": 5,
    "procedure": "Lakukan inspeksi visual pada seluruh sistem perpipaan untuk memeriksa tanda-tanda deformasi seperti tekukan, cekungan, penonjolan, retakan, atau perubahan bentuk pada pipa.",
    "acceptanceCriteria": "Pipa yang mengalami retakan harus segera diganti atau diperbaiki. Pengurangan ketebalan pipa akibat deformasi tidak boleh melebihi 12,5% dari ketebalan desain pipa.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.g",
    "description": "Lakukan pengukuran ketebalan cat",
    "durationMinutes": 5,
    "procedure": "Lakukan pengukuran ketebalan di beberapa titik untuk memastikan ketebalan cat rata.",
    "acceptanceCriteria": "Min 150 mikron.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.h",
    "description": "Periksa status sertifikasi relief valve",
    "durationMinutes": 5,
    "procedure": "Lakukan pemeriksaan dokumen sertifikat COI, pastikan masih berlaku.",
    "acceptanceCriteria": "Sertifikat masih berlaku.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

### PIP Submit Payload

Payload PIP sama seperti equipment lain. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "PIP",
    "cycle": "MONTHLY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 10,
    "equipmentCount": 8,
    "totalTasklistPlan": 80,
    "totalTasklistSelesai": 80,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-PIP-1",
    "EQ-PIP-2",
    "EQ-PIP-3",
    "EQ-PIP-4",
    "EQ-PIP-5",
    "EQ-PIP-6",
    "EQ-PIP-7",
    "EQ-PIP-8"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.1.j",
      "results": [
        {
          "equipmentId": "EQ-PIP-1",
          "performance": "H",
          "measuredValue": "45 psi / 32 C"
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

## MTR Tasklist Contract

Kontrak ini untuk tasklist Meter Arus / `MTR`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_MTR_yyyymmdd.xlsx`

### Available Cycle

MTR punya cycle:

- `DAILY` / Harian.
- `WEEKLY` / Mingguan.
- `YEARLY` / Tahunan.

MTR tidak punya cycle bulanan dan 6 bulanan pada XLSX tersebut.

### MTR Task Template

Template task disiapkan BE berdasarkan `equipmentType = MTR` dan `cycle`.

#### MTR Daily

```json
[
  {
    "code": "c.1.a",
    "description": "Periksa kondisi valve",
    "durationMinutes": 2,
    "procedure": "Periksa kondisi valve untuk memastikan tidak ada kebocoran, keausan, atau korosi, dapat dioperasikan dengan baik, dan lakukan pemeriksaan pada aktuator.",
    "acceptanceCriteria": "Valve dalam kondisi baik tanpa kebocoran, tidak ada karat atau kerusakan pada body valve, dan dapat dioperasikan dengan lancar.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.b",
    "description": "Periksa jalur drain dan venting",
    "durationMinutes": 2,
    "procedure": "Pastikan jalur drain dan venting tidak tersumbat, periksa ada kebocoran atau kerusakan pada pipa dan fitting, dan semua valve dalam kondisi baik dan berfungsi dengan benar.",
    "acceptanceCriteria": "Jalur drain dan venting bebas dari penyumbatan, tidak ada kebocoran atau korosi pada pipa dan fitting, dan semua valve dapat dioperasikan dengan normal.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.c",
    "description": "Periksa indikator di batch control unit",
    "durationMinutes": 2,
    "procedure": "Periksa tampilan indikator apakah berfungsi dengan benar, pastikan tidak ada alarm atau error dan cek respon tombol dan layar.",
    "acceptanceCriteria": "Indikator menyala dan menampilkan data yang benar, tidak ada error, dan semua tombol dan fungsi beroperasi dengan baik.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.d",
    "description": "Periksa body & koneksi kabel",
    "durationMinutes": 2,
    "procedure": "Periksa kondisi body perangkat untuk memastikan tidak ada retak atau kerusakan fisik, koneksi kabel tidak longgar atau rusak, dan cek ada atau tidaknya tanda overheating atau korosi pada terminal.",
    "acceptanceCriteria": "Body perangkat dalam kondisi baik, tanpa retak atau kerusakan, koneksi kabel terpasang dengan kuat dan tidak ada yang longgar, serta tidak ada tanda karat atau overheating pada terminal.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.e",
    "description": "Periksa pulse transmiter & adaptor",
    "durationMinutes": 1,
    "procedure": "Periksa kondisi fisik pulse transmitter & adaptor dan tidak ada kabel putus atau konektor longgar.",
    "acceptanceCriteria": "Pulse transmitter & adaptor berfungsi dengan normal dan tidak ada kerusakan fisik atau koneksi yang longgar.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.f",
    "description": "Periksa koneksi kabel",
    "durationMinutes": 1,
    "procedure": "Periksa kabel dan konektor untuk memastikan tidak ada kerusakan atau kelonggaran, cek jalur kabel apakah ada potensi gangguan elektromagnetik (EMI), dan semua koneksi terpasang dengan benar.",
    "acceptanceCriteria": "Semua koneksi kabel dalam kondisi baik tanpa kerusakan, tidak ada kabel yang longgar atau terputus, jalur kabel tertata rapi, dan tidak ada gangguan.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.g",
    "description": "Periksa pressure switch & relay",
    "durationMinutes": 1,
    "procedure": "Periksa kondisi fisik pressure switch dan relay, wiring terpasang dengan benar dan tidak ada kabel yang longgar, dan lakukan pengujian untuk memastikan switch dan relay bekerja sesuai tekanan yang ditentukan.",
    "acceptanceCriteria": "Pressure switch dan relay berfungsi dengan baik, tidak ada koneksi yang longgar atau kabel putus, dan respon sesuai dengan spesifikasi sistem.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.h",
    "description": "Ukur nilai tegangan AC/DC press. switch",
    "durationMinutes": 2,
    "procedure": "Ukur tegangan pada terminal pressure switch untuk memastikan nilai AC/DC sesuai dengan spesifikasi, pastikan tidak ada fluktuasi tegangan yang berlebihan, dan bandingkan hasil pengukuran dengan spesifikasi tekanan switch.",
    "acceptanceCriteria": "Nilai tegangan AC/DC sesuai dengan spesifikasi pabrikan, tidak ada tegangan abnormal atau fluktuasi berlebihan.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

#### MTR Weekly

```json
[
  {
    "code": "c.2.a",
    "description": "Bersihkan strainer",
    "durationMinutes": 15,
    "procedure": "Periksa kondisi strainer untuk mendeteksi adanya kotoran, endapan, atau kerusakan dan bersihkan strainer dengan air bersih atau menggunakan cairan pembersih jika diperlukan.",
    "acceptanceCriteria": "Strainer dalam kondisi bersih dan bebas dari endapan atau sumbatan dan tidak ada kerusakan fisik pada strainer yang dapat mengganggu fungsi aliran.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.b",
    "description": "Lakukan uji petik",
    "durationMinutes": 15,
    "procedure": "Lakukan pengukuran aliran fluida dengan alat referensi (flow meter portable atau bejana ukur) dan bandingkan hasil pengukuran flow meter digital skid dengan alat referensi.",
    "acceptanceCriteria": "Hasil pengukuran sesuai dengan batas toleransi yang ditentukan dan tidak ada indikasi error atau gangguan pada tampilan flow meter digital skid.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai"
  }
]
```

#### MTR Yearly

```json
[
  {
    "code": "c.3.a",
    "description": "Periksa kebersihan air eliminator",
    "durationMinutes": 10,
    "procedure": "Periksa bagian dalam air eliminator untuk mendeteksi adanya kotoran, endapan, atau sumbatan.",
    "acceptanceCriteria": "Air eliminator dalam kondisi bersih tanpa endapan atau sumbatan, tidak ada kebocoran atau kerusakan setelah pembersihan dan berfungsi dengan baik dan benar.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.b",
    "description": "Periksa pelampung air eliminator",
    "durationMinutes": 10,
    "procedure": "Periksa kondisi fisik pelampung, pastikan tidak ada retak, bocor, atau deformasi dan periksa kondisi sensor.",
    "acceptanceCriteria": "Pelampung dalam kondisi baik tanpa kerusakan fisik, dan pergerakan pelampung berjalan lancar tanpa hambatan.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.c",
    "description": "Laksanakan kalibrasi",
    "durationMinutes": 10,
    "procedure": "Lakukan proses kalibrasi.",
    "acceptanceCriteria": "Hasil kalibrasi berada dalam batas toleransi yang ditetapkan dan tidak ada error atau penyimpangan signifikan dalam sistem pengukuran.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai"
  },
  {
    "code": "c.3.d",
    "description": "Overhaul apabila ada indikasi kerusakan",
    "durationMinutes": 15,
    "procedure": "Lakukan overhaul secara menyeluruh.",
    "acceptanceCriteria": "Flowmeter skid digital berfungsi dengan baik, dan sesuai dengan sistem pengoperasian.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

### MTR Submit Payload

Payload MTR sama seperti GST dan MOV. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "MTR",
    "cycle": "WEEKLY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 2,
    "equipmentCount": 7,
    "totalTasklistPlan": 14,
    "totalTasklistSelesai": 14,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-MTR-1",
    "EQ-MTR-2",
    "EQ-MTR-3",
    "EQ-MTR-4",
    "EQ-MTR-5",
    "EQ-MTR-6",
    "EQ-MTR-7"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.2.b",
      "results": [
        {
          "equipmentId": "EQ-MTR-1",
          "performance": "H",
          "measuredValue": "100.2"
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

Jika ada 7 task dan 7 equipment:

```json
{
  "validation": {
    "taskCount": 7,
    "equipmentCount": 7,
    "requiredResults": 49,
    "completedResults": 49,
    "isComplete": true
  }
}
```

`validation` boleh dihitung di FE untuk UI, tetapi BE wajib menghitung ulang.

## BE Validation

BE wajib:

- Ambil template berdasarkan `equipmentType + cycle`.
- Ambil equipment yang valid untuk depot dan equipment type.
- Flatten `resultsByTask` menjadi result rows.
- Pastikan semua kombinasi `task x equipment` ada.
- Pastikan tidak ada task di luar template.
- Pastikan tidak ada equipment di luar depot/type.
- Pastikan `performance` hanya `H`, `M`, atau `L`.
- Pastikan `note` wajib untuk `M` atau `L`.
- Pastikan `measuredValue` wajib untuk task `MEASUREMENT`.
- Pastikan `measuredValue` tidak wajib untuk task `PERFORMANCE_ONLY`.

## DB Model

DB sebaiknya normalisasi flat, bukan menyimpan nested JSON sebagai sumber utama.

```text
tasklist_templates
- id
- equipment_type
- cycle
- name
- is_active

tasklist_template_tasks
- id
- template_id
- code
- description
- duration_minutes
- procedure
- acceptance_criteria
- input_type
- measurement_unit
- display_order

tasklist_sessions
- id
- depot_id
- template_id
- period_date
- task_count
- equipment_count
- total_tasklist_plan
- total_tasklist_selesai
- status
- created_by
- submitted_at

tasklist_session_equipment
- id
- session_id
- equipment_id
- display_order

tasklist_results
- id
- session_id
- task_id
- equipment_id
- performance
- measured_value
- note
```

Constraint penting:

```text
UNIQUE(session_id, task_id, equipment_id)
```

## API Response

Walaupun DB flat, response ke FE boleh nested agar mudah render matrix.

```json
{
  "session": {},
  "equipment": [],
  "tasks": [],
  "resultsByTask": []
}
```

Flow terbaik:

```text
DB flat -> API response nested -> FE matrix -> API submit nested -> BE flatten -> DB flat
```

## GST Tasklist Contract

Kontrak ini untuk tasklist Genset / `GST`.

### Available Cycle

GST punya cycle:

- `WEEKLY` / Mingguan.
- `MONTHLY` / Bulanan.
- `SIX_MONTHLY` / 6 Bulanan.
- `YEARLY` / Tahunan.

Flow FE:

1. User pilih equipment type `GST`.
2. User pilih cycle.
3. User masuk form tasklist.
4. User memilih tag equipment di dalam form.
5. User wajib mengisi semua task untuk semua equipment.

### GST Task Template

Template task disiapkan BE berdasarkan `equipmentType = GST` dan `cycle`.

#### GST Weekly

```json
[
  {
    "code": "c.1.a",
    "description": "Jalankan generator tanpa beban",
    "durationMinutes": 30,
    "procedure": "Operasi dalam mode local/manual. Circuit breaker menuju beban dalam kondisi opened, lakukan running genset selama 30 menit tanpa beban.",
    "acceptanceCriteria": "Genset dapat berjalan tanpa kendala. Tegangan, frekuensi, dan kecepatan sesuai dengan spesifikasi.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.b",
    "description": "Periksa indikator pada panel kontrol",
    "durationMinutes": 5,
    "procedure": "Memeriksa indikasi pada display panel kontrol, lamp indicator pada panel kontrol.",
    "acceptanceCriteria": "Tidak ada indikasi warning dan fault. Lamp indicator menyala atau mati sesuai fungsi.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.c",
    "description": "Periksa level cairan pendingin",
    "durationMinutes": 5,
    "procedure": "Memeriksa level cairan pendingin.",
    "acceptanceCriteria": "Sesuai dengan batas garis rekomendasi.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.d",
    "description": "Periksa level oli mesin",
    "durationMinutes": 5,
    "procedure": "Memeriksa level oli mesin.",
    "acceptanceCriteria": "Sesuai dengan batas garis rekomendasi.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.e",
    "description": "Periksa level bahan bakar",
    "durationMinutes": 5,
    "procedure": "Memeriksa level bahan bakar.",
    "acceptanceCriteria": "Dalam level penuh, siap untuk dioperasikan.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.f",
    "description": "Periksa mode operasi auto/standby",
    "durationMinutes": 5,
    "procedure": "Memastikan operasi genset dalam mode auto/standby.",
    "acceptanceCriteria": "Dalam mode auto/standby.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.g",
    "description": "Periksa kebocoran",
    "durationMinutes": 5,
    "procedure": "Memeriksa apabila ada kebocoran cairan pendingin, oli mesin, dan bahan bakar.",
    "acceptanceCriteria": "Tidak ada kebocoran.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.h",
    "description": "Periksa sambungan baterai",
    "durationMinutes": 5,
    "procedure": "Memeriksa kabel yang terhubung dengan terminal baterai.",
    "acceptanceCriteria": "Tidak ada yang longgar dan lepas.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

#### GST Monthly

```json
[
  {
    "code": "c.2.a",
    "description": "Periksa pondasi",
    "durationMinutes": 20,
    "procedure": "Memeriksa pondasi dari generator.",
    "acceptanceCriteria": "Tidak ada baut yang loose atau hilang.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.b",
    "description": "Bersihkan filter udara",
    "durationMinutes": 20,
    "procedure": "Membersihkan filter udara.",
    "acceptanceCriteria": "Filter udara bersih.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.c",
    "description": "Bersihkan fuel water separator",
    "durationMinutes": 15,
    "procedure": "Mengeluarkan air lewat fuel drain valve ke wadah, sampai hanya tersisa bahan bakar saja.",
    "acceptanceCriteria": "Tidak ada air. Hanya bahan bakar yang keluar pada drain valve.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.d",
    "description": "Ukur tegangan baterai",
    "durationMinutes": 10,
    "procedure": "Mengukur tegangan baterai.",
    "acceptanceCriteria": "Sesuai dengan spesifikasi (>= 11,5V).",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai",
    "measurementUnit": "V"
  }
]
```

#### GST Six Monthly

```json
[
  {
    "code": "c.3.a",
    "description": "Ganti oli mesin",
    "durationMinutes": 45,
    "procedure": "Ganti oli mesin.",
    "acceptanceCriteria": "Beroperasi dengan oli mesin baru.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.b",
    "description": "Ganti filter oli mesin",
    "durationMinutes": 15,
    "procedure": "Ganti filter oli mesin.",
    "acceptanceCriteria": "Beroperasi dengan filter oli mesin baru.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.c",
    "description": "Ganti filter bahan bakar",
    "durationMinutes": 45,
    "procedure": "Ganti filter bahan bakar.",
    "acceptanceCriteria": "Beroperasi dengan filter bahan bakar baru.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.d",
    "description": "Jalankan generator dengan beban",
    "durationMinutes": 60,
    "procedure": "Matikan suplai daya utama (PLN/ATS akan bekerja), running genset selama 60 menit dengan beban yang tersedia.",
    "acceptanceCriteria": "Genset dapat berjalan tanpa kendala. Tegangan, frekuensi, dan kecepatan sesuai dengan spesifikasi.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

#### GST Yearly

```json
[
  {
    "code": "c.4.a",
    "description": "Ganti filter udara",
    "durationMinutes": 45,
    "procedure": "Ganti filter udara.",
    "acceptanceCriteria": "Beroperasi dengan filter udara baru.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.b",
    "description": "Greasing bearing",
    "durationMinutes": 10,
    "procedure": "Greasing bearing.",
    "acceptanceCriteria": "Tidak ada suara abnormal dan peningkatan getaran.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.c",
    "description": "Lubricate governor ball joints",
    "durationMinutes": 10,
    "procedure": "Pelumasan pada governor ball joints.",
    "acceptanceCriteria": "Kecepatan yang stabil.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.d",
    "description": "Bersihkan crankcase breather filter",
    "durationMinutes": 20,
    "procedure": "Bersihkan crankcase breather filter.",
    "acceptanceCriteria": "Kecepatan yang stabil.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.e",
    "description": "Flushing sistem pendingin",
    "durationMinutes": 90,
    "procedure": "Flushing dan penggantian cairan pendingin.",
    "acceptanceCriteria": "Beroperasi dengan cairan pendingin baru.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.f",
    "description": "Periksa kondisi water pump",
    "durationMinutes": 15,
    "procedure": "Pengujian sirkulasi sistem pendingin.",
    "acceptanceCriteria": "Water pump bekerja untuk sirkulasi dengan baik.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.g",
    "description": "Periksa engine mounting",
    "durationMinutes": 20,
    "procedure": "Periksa kekencangan baut.",
    "acceptanceCriteria": "Sesuai dengan torsi spesifikasi.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.h",
    "description": "Periksa governor actuator",
    "durationMinutes": 30,
    "procedure": "Periksa dan setting ulang governor actuator.",
    "acceptanceCriteria": "Kecepatan yang stabil.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.i",
    "description": "Periksa kekencangan belt",
    "durationMinutes": 15,
    "procedure": "Memeriksa kekencangan belt.",
    "acceptanceCriteria": "Belt dalam kondisi kekencangan yang sesuai.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.j",
    "description": "Periksa crankshaft speed sensor",
    "durationMinutes": 20,
    "procedure": "Periksa dan bersihkan crankshaft speed sensor.",
    "acceptanceCriteria": "Kecepatan yang stabil.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.4.k",
    "description": "Periksa grounding generator",
    "durationMinutes": 10,
    "procedure": "Inspeksi visual instalasi grounding dan pengukuran tahanan grounding.",
    "acceptanceCriteria": "Instalasi sesuai dengan tahanan di bawah 5 Ohm.",
    "inputType": "MEASUREMENT",
    "measurementLabel": "Nilai",
    "measurementUnit": "Ohm"
  }
]
```

### GST Submit Payload

Contoh submit untuk GST:

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "GST",
    "cycle": "MONTHLY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 4,
    "equipmentCount": 7,
    "totalTasklistPlan": 28,
    "totalTasklistSelesai": 28,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-GST-1",
    "EQ-GST-2",
    "EQ-GST-3",
    "EQ-GST-4",
    "EQ-GST-5",
    "EQ-GST-6",
    "EQ-GST-7"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.2.a",
      "results": [
        {
          "equipmentId": "EQ-GST-1",
          "performance": "H",
          "measuredValue": null
        }
      ]
    },
    {
      "taskCode": "c.2.d",
      "results": [
        {
          "equipmentId": "EQ-GST-1",
          "performance": "H",
          "measuredValue": "12.1"
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.

BE wajib menyimpan:

- `taskCount`.
- `equipmentCount`.
- `totalTasklistPlan`.
- `totalTasklistSelesai`.
- `executionDate`.
- `remarks`.

Nilai ini adalah snapshot session. Jika jumlah equipment berubah setelah session dibuat, nilai historis session lama tidak boleh berubah.

## MOV Tasklist Contract

Kontrak ini untuk tasklist Motor Operated Valve / `MOV`.

Sumber template FE saat ini:

- `docs/xlsx/Tasklist_MORX_00_XXX_MOV_yyyymmdd.xlsx`

### Available Cycle

MOV punya cycle:

- `DAILY` / Harian.
- `MONTHLY` / Bulanan.
- `YEARLY` / Tahunan.

MOV tidak punya cycle mingguan dan 6 bulanan pada XLSX tersebut.

### MOV Task Template

Template task disiapkan BE berdasarkan `equipmentType = MOV` dan `cycle`.

#### MOV Daily

```json
[
  {
    "code": "c.1.a",
    "description": "Periksa kondisi valve",
    "durationMinutes": 3,
    "procedure": "Lakukan pemeriksaan fisik valve, pastikan tidak ada kebocoran pada valve.",
    "acceptanceCriteria": "Valve mudah dioperasikan. Tidak ada kebocoran produk pada valve.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.b",
    "description": "Periksa kebocoran",
    "durationMinutes": 3,
    "procedure": "Lakukan inspeksi visual dengan memperhatikan tanda-tanda fisik seperti noda atau bekas cairan, keretakan pada body valve, karat atau korosi, dan area basah pada body valve.",
    "acceptanceCriteria": "Tidak ada kebocoran produk.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.c",
    "description": "Periksa position indicator",
    "durationMinutes": 3,
    "procedure": "Pastikan position indicator sesuai dengan aktual bukaan valve.",
    "acceptanceCriteria": "Toleransi akurasi 1%.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.1.d",
    "description": "Periksa sambungan kabel power & instrumen",
    "durationMinutes": 3,
    "procedure": "Periksa kondisi fisik kabel listrik dan kabel data. Cari tanda-tanda kerusakan seperti isolasi kabel terkelupas, kabel tertekuk atau terjepit, kabel terpapar air, atau kabel terkoyak. Periksa koneksi kabel ke perangkat elektronik dan pastikan koneksi terpasang kencang.",
    "acceptanceCriteria": "Terpasang dengan benar dan kuat.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

#### MOV Monthly

```json
[
  {
    "code": "c.2.a",
    "description": "Periksa kinerja MOV (open close)",
    "durationMinutes": 3,
    "procedure": "Lakukan pengujian open close pada MOV.",
    "acceptanceCriteria": "Max. travel time 3 sec/inch.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.b",
    "description": "Periksa body MOV & koneksi kabel",
    "durationMinutes": 3,
    "procedure": "Periksa kerusakan fisik pada body valve seperti korosi, retak, atau komponen longgar. Periksa kabel motor valve terpasang rapat dan tidak longgar.",
    "acceptanceCriteria": "Korosi tidak boleh lebih dari 10% mengacu ASTM D610. Terpasang dengan benar dan kuat.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.c",
    "description": "Periksa jalur drain dan venting",
    "durationMinutes": 3,
    "procedure": "Periksa katup drain dan venting apakah berfungsi dengan baik dan tidak terhalang.",
    "acceptanceCriteria": "Berfungsi dengan baik dan tidak ada kebocoran.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.d",
    "description": "Periksa keausan/kerusakan bagian luar MOV",
    "durationMinutes": 3,
    "procedure": "Lakukan pemeriksaan fisik MOV, periksa kekuatan dan kekokohan struktur, sistem pelumasan, dan kondisi cat pelindung.",
    "acceptanceCriteria": "Tidak ada kerusakan mekanikal.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.e",
    "description": "Bersihkan bagian luar valve",
    "durationMinutes": 3,
    "procedure": "Bersihkan seluruh bagian MOV dari kotoran dan debu.",
    "acceptanceCriteria": "MOV bersih.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.f",
    "description": "Periksa kompartemen terminal dari rembesan air",
    "durationMinutes": 3,
    "procedure": "Periksa area sekitar kompartemen terminal untuk memastikan tidak ada kebocoran air yang mengarah ke terminal.",
    "acceptanceCriteria": "Tidak ada rembesan air.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.g",
    "description": "Periksa kondisi baut/pondasi/base plate",
    "durationMinutes": 3,
    "procedure": "Pastikan baut, pondasi, dan base plate terpasang kokoh dan tidak ada korosi atau kerusakan fisik lainnya.",
    "acceptanceCriteria": "Korosi tidak boleh lebih dari 10% mengacu ASTM D610. Terpasang dengan benar dan kuat.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.h",
    "description": "Periksa koneksi grounding",
    "durationMinutes": 5,
    "procedure": "Pastikan kabel pembumian dalam kondisi baik, tidak aus/korosi, dan sambungan ke struktur terpasang kuat.",
    "acceptanceCriteria": "Terpasang dengan benar dan kuat.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.i",
    "description": "Periksa marking kabel",
    "durationMinutes": 3,
    "procedure": "Periksa kejelasan marking, pastikan dapat terbaca dengan jelas.",
    "acceptanceCriteria": "Marking terbaca.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.2.j",
    "description": "Periksa koneksi kabel instrumen di junction box",
    "durationMinutes": 3,
    "procedure": "Periksa kondisi fisik kabel data dan koneksi kabel ke perangkat elektronik, sensor, alat pengukur, atau sistem kontrol.",
    "acceptanceCriteria": "Terpasang dengan benar dan kuat.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

#### MOV Yearly

```json
[
  {
    "code": "c.3.a",
    "description": "Greasing gearbox",
    "durationMinutes": 5,
    "procedure": "Isi gearbox dengan jumlah pelumas yang tepat sesuai kapasitas dalam manual.",
    "acceptanceCriteria": "Pelumas yang digunakan tepat, jumlahnya sesuai, dan dilumasi merata di seluruh komponen yang bergerak.",
    "inputType": "PERFORMANCE_ONLY"
  },
  {
    "code": "c.3.b",
    "description": "Functional test",
    "durationMinutes": 5,
    "procedure": "Lakukan pengujian open close pada MOV secara local dan remote, pastikan travel time terpenuhi.",
    "acceptanceCriteria": "Max. travel time 3 sec/inch.",
    "inputType": "PERFORMANCE_ONLY"
  }
]
```

### MOV Submit Payload

Payload MOV sama seperti GST. Perbedaan utama hanya `equipmentType`, `cycle`, daftar equipment, dan template task.

```json
{
  "session": {
    "depotId": "DEPOT-CIKAMPEK",
    "equipmentType": "MOV",
    "cycle": "DAILY",
    "reportDate": "2026-05-24",
    "executionDate": "2026-05-24",
    "location": "IT Cikampek",
    "year": 2026,
    "monthNumber": 5,
    "weekNumber": 4,
    "taskCount": 4,
    "equipmentCount": 8,
    "totalTasklistPlan": 32,
    "totalTasklistSelesai": 32,
    "remarks": ""
  },
  "equipmentIds": [
    "EQ-MOV-1",
    "EQ-MOV-2",
    "EQ-MOV-3",
    "EQ-MOV-4",
    "EQ-MOV-5",
    "EQ-MOV-6",
    "EQ-MOV-7",
    "EQ-MOV-8"
  ],
  "resultsByTask": [
    {
      "taskCode": "c.1.a",
      "results": [
        {
          "equipmentId": "EQ-MOV-1",
          "performance": "H",
          "measuredValue": null
        }
      ]
    }
  ]
}
```

Payload real wajib mengirim semua kombinasi `task x equipment`.
