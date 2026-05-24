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

## Generator Tasklist Contract

Kontrak ini untuk tasklist generator / `GST`.

### Available Cycle

Generator punya cycle:

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

### Generator Task Template

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

### Generator Submit Payload

Contoh submit untuk generator:

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
