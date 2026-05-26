# Frontend Rules

Rules ini wajib dipakai untuk pengembangan `grading-fe` berikutnya.

## Brand Name

Nama web sementara: `GradeTrack`.

Web dipakai untuk:

- grading peralatan,
- tasklist tindak lanjut,
- rekap dan monitoring.

## Color Palette

Gunakan palet dari halaman login sebagai dasar semua page berikutnya.

| Token | Tailwind | Hex | Usage |
|---|---|---|---|
| `primary-dark` | `slate-950` | `#020617` | Header gelap, primary button, surface utama |
| `primary-hover` | `slate-800` | `#1e293b` | Hover button gelap |
| `primary-muted` | `slate-700` | `#334155` | Heading/table text sekunder |
| `brand-blue` | `sky-700` | `#0369a1` | Eyebrow, active state, aksen utama |
| `brand-blue-soft` | `sky-100` | `#e0f2fe` | Focus ring, subtle highlight |
| `brand-cyan` | `sky-600` | `#0284c7` | Accent visual gelap |
| `brand-green` | `emerald-500` | `#10b981` | Success/accent visual |
| `page-bg` | `zinc-100` | `#f4f4f5` | Background halaman |
| `surface` | `white` | `#ffffff` | Card/form/table surface |
| `border` | `zinc-200` | `#e4e4e7` | Border utama |
| `text-main` | `neutral-950` | `#0a0a0a` | Teks utama |
| `text-muted` | `neutral-600` | `#525252` | Deskripsi/helper text |

Jangan membuat palet baru tanpa alasan kuat. Jika butuh warna status, gunakan warna yang harmonis dengan palet ini.

## Responsive Requirement

Setiap halaman wajib responsif untuk desktop dan mobile.

Checklist minimum:

- Layout tidak overflow horizontal di mobile.
- Tabel panjang wajib punya `overflow-x-auto`.
- Form field penuh lebar di mobile.
- Grid wajib punya breakpoint, misalnya `max-lg:grid-cols-1`.
- Teks tombol dan card tidak boleh terpotong.
- Validasi tampilan mobile dilakukan sebelum dianggap selesai.

## Icons

Gunakan `react-icons` untuk icon UI.

- Utamakan icon pack `react-icons/io5`.
- Jika icon yang dibutuhkan tidak ada di `io5`, boleh gunakan pack lain dari `react-icons`.
- Jangan memakai huruf sebagai pengganti icon navigasi/action.
- Icon dekoratif wajib diberi `aria-hidden="true"`.
- Button icon-only wajib punya `aria-label`.

## State Management

Gunakan state management yang maintainable dengan SWR dan Zustand.

- Local state boleh untuk state kecil khusus komponen.
- Server state dan data dari API wajib memakai SWR.
- Shared client state lintas halaman/fitur wajib memakai Zustand.
- Store Zustand harus kecil dan fokus per domain, contoh `auth`, `grading`, `tasklist`, `recap`.
- Jangan taruh semua state dalam satu global store besar.
- Jangan simpan data server duplikat di Zustand jika sudah dikelola SWR.
- Zustand hanya untuk state client, contoh user login, role, pilihan UI global, filter aktif, draft form, dan status modal.
- SWR dipakai untuk fetch, cache, revalidate, loading, error, mutate, dan sinkron data setelah create/update/delete.
- Async action dipisah dari UI component. Hook page boleh memanggil SWR/Zustand, tetapi komponen UI tidak boleh berisi fetch mentah.

Jika SWR atau Zustand belum ada di dependency saat mulai implementasi, tambahkan dependency dengan alasan jelas.

## Data Fetching

Pola fetch wajib konsisten.

- Semua GET API gunakan `useSWR`.
- Mutasi POST/PUT/PATCH/DELETE gunakan helper async lalu panggil `mutate`.
- Gunakan key SWR yang stabil, contoh `["/equipment", params]`.
- Jangan fetch langsung di component render.
- Jangan memakai `useEffect + fetch + setState` untuk data server baru. Refactor ke SWR saat menyentuh area terkait.
- Empty state ditangani dari `data` kosong, bukan dari error fetch.
- Error teknis jangan tampil mentah ke user awam. Gunakan wording sederhana atau diamkan jika konteksnya memang boleh kosong.
- Backend response envelope dibaca lewat helper fetcher, lalu hook menerima `data` utama.
- Hindari multiple fetch paralel manual jika bisa dipisah menjadi hook SWR kecil per resource.

## Store Pattern

Zustand store harus sederhana.

- Simpan hanya state client yang benar-benar perlu shared.
- Store tidak boleh menjadi pengganti cache API.
- Store auth minimal menyimpan `employee_number`, `name`, `role`, `depot_id`, dan action `setUser`/`clearUser`.
- Store filter boleh menyimpan filter aktif lintas halaman jika filter perlu dipertahankan.
- Persist ke `localStorage` hanya untuk auth/session ringan dan preferensi UI yang memang perlu bertahan.
- Jangan simpan password, token mentah yang tidak diperlukan, atau payload besar di localStorage.

## Clean Code

Terapkan struktur page yang pendek dan mudah dibaca.

- Page hanya komposisi layout dan section.
- UI besar dipindah ke komponen kecil.
- Logic/form handler dipindah ke hook per halaman.
- Nama hook mengikuti halaman, contoh `useLoginPage`, `useGradingPage`.
- Helper murni masuk file util/data terpisah.
- Hindari function panjang di file page.
- Hindari inline data besar di page.
- Jangan campur UI, fetch, kalkulasi, dan mapping data dalam satu file.

## Suggested Folder Pattern

```text
app/
  page.tsx
components/
  auth/
    login-page.tsx
    login-form.tsx
hooks/
  use-login-page.ts
stores/
  auth-store.ts
lib/
  api-client.ts
  swr.ts
```

Pattern boleh disesuaikan dengan kebutuhan fitur, tapi prinsipnya tetap: page tipis, komponen fokus, logic di hook, shared state di store.
