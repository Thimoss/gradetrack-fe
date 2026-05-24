# Frontend Context

Snapshot konteks `grading-fe` per 2026-05-24.

## Project

- Framework: Next.js App Router.
- Styling: Tailwind CSS.
- Font utama: Montserrat.
- Icon dependency: `react-icons`.
- Nama web sementara: GradeTrack.
- Fungsi web: grading peralatan, tasklist tindak lanjut, rekap, monitoring.

## Rules Utama

- Ikuti `FRONTEND_RULES.md`.
- Setiap halaman wajib responsif desktop dan mobile.
- Gunakan palet login sebagai dasar warna semua halaman.
- Gunakan `react-icons`, utamakan `react-icons/io5`.
- State kecil tetap local state.
- Shared state lintas fitur gunakan Zustand.
- Page harus tipis, komponen kecil, logic di hook per halaman.
- Jangan tambah dependency baru tanpa alasan kuat.

## Layout

- Master layout ada di `components/layout/master-layout.tsx`.
- Hook layout ada di `hooks/use-master-layout.ts`.
- Layout berisi sticky navbar, sidebar, main, footer.
- Sidebar desktop bisa collapse dan tetap menyisakan icon.
- Sidebar mobile memakai burger button dan overlay.
- Transisi sidebar desktop harus smooth.
- Icon layout memakai `react-icons/io5`, bukan huruf placeholder.

## Halaman Saat Ini

- `/` adalah halaman login.
- Login memakai form nomor pekerja dan password.
- Setelah login sementara diarahkan ke `/dashboard`.
- `/dashboard` memakai master layout.
- `/grading` memakai master layout.

## Dashboard

- Logic dashboard ada di `hooks/use-dashboard-page.ts`.
- Komponen dashboard ada di `components/dashboard/`.
- Dashboard masih berbasis UI awal untuk grading, tasklist, rekap.
- Jika user kirim file XLSX dashboard, gunakan file itu sebagai sumber kebutuhan widget, filter, tabel, status, dan rekap.

## Tasklist

- Kontrak awal tasklist ada di `docs/tasklist_contract.md`.
- Tasklist mengisi beberapa task untuk semua equipment dengan jenis yang sama dalam satu session.
- Result tasklist wajib lengkap untuk semua kombinasi `task x equipment`.
- Performance cell hanya `H`, `M`, atau `L`.
- `measuredValue` hanya dipakai untuk task dengan `inputType = "MEASUREMENT"`.
- UI tasklist web diutamakan per equipment/tag, bukan tabel Excel lebar, tetapi data tetap dihitung sebagai matrix `task x equipment`.
- Tasklist web adalah input ulang data lapangan; header, matrix task, tanggal pelaksanaan, dan keterangan tetap dibuat, tetapi row paraf/signature, page break, dan watermark tidak perlu dibuat di UI.

## Form Grading

Komponen form grading ada di `components/grading-form/`.

Flow input grading:

- User login.
- User masuk menu `/grading`.
- User klik `Input Grading`.
- Modal pertama memilih tanggal penilaian.
- Modal berikutnya memilih jenis equipment.
- Setelah itu user masuk ke halaman form grading equipment tersebut.
- Di dalam form ada dropdown nomor tag untuk memilih equipment spesifik, contoh `GST-01` atau `GST-02`.

Equipment yang sudah pernah dibuat:

- Generator / GST.
- Motor Operated Valve / MOV.
- Meter Arus / MTR.
- Sistem Perpipaan / PIP.
- Pompa Produk / PMP.
- Storage Tank / TNK.
- Transformer / TRF.
- UPS.
- SGR.

Pola section form:

- Data peralatan.
- Dokumentasi peralatan 4 gambar.
- Pengambilan data lapangan, jika equipment punya guide.
- Identifikasi kondisi major.
- Penilaian peralatan.
- Kategori peralatan.
- Kesimpulan.

Catatan form:

- Input kosong harus benar-benar kosong, jangan isi default dari contoh XLSX.
- Nilai satuan ditampilkan dekat dengan nilai, format `{value} satuan`.
- Table panjang wajib dibungkus `overflow-x-auto`.
- Untuk input dalam tabel, kotak aktif mengikuti cell input, bukan seluruh row.
- Hover dan checked pada pilihan assessment hanya mengubah box pilihan secara full.

## XLSX Reference

File XLSX sebelumnya dipakai sebagai sumber struktur form:

- `docs/xlsx/Grading_MOR1_00_LOC_SGR1_yyyymmdd.xlsx`
- `docs/xlsx/Grading_MOR1_00_LOC_TNK1_yyyymmdd.xlsm`
- `docs/xlsx/Grading_MOR1_00_LOC_TRF_yyyymmdd.xlsx`
- `docs/xlsx/Grading_MOR1_00_LOC_UPS_yyyymmdd.xlsx`

Jika ada XLSX baru:

- Ambil section seperti biasa.
- Jangan copy watermark/page break Excel ke UI.
- Gunakan label, parameter, kondisi, skor, dan field input dari XLSX sebagai source of truth.
- Kosongkan value contoh kecuali user minta dipakai sebagai default.

## Verification

Sebelum selesai:

- Jalankan `npm run lint`.
- Jalankan `npm run build`.
- Jika build gagal karena Turbopack sandbox binding port, ulang dengan izin escalated.
