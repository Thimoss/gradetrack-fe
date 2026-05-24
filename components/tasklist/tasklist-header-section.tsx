type TasklistHeaderSectionProps = {
  reportDate: string;
  location: string;
  year: string;
  monthNumber: string;
  weekNumber: string;
  totalTasklistPlan: number;
  totalTasklistSelesai: number;
};

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="grid grid-cols-[minmax(150px,220px)_16px_minmax(0,1fr)] items-center gap-2 text-sm max-sm:grid-cols-[minmax(120px,1fr)_12px_minmax(0,1fr)]">
      <dt className="font-bold text-neutral-950">{label}</dt>
      <dd className="text-center text-neutral-400">:</dd>
      <dd className="min-h-9 rounded-md border border-zinc-200 bg-white px-3 py-2 font-semibold text-neutral-950">
        {value}
      </dd>
    </div>
  );
}

export function TasklistHeaderSection({
  reportDate,
  location,
  year,
  monthNumber,
  weekNumber,
  totalTasklistPlan,
  totalTasklistSelesai,
}: TasklistHeaderSectionProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 bg-slate-50 px-5 py-3">
        <h1 className="text-sm font-bold uppercase tracking-wide text-slate-900">
          Tasklist
        </h1>
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <dl className="space-y-3">
          <InfoRow label="Hari/ Tgl. Pelaporan" value={reportDate} />
          <InfoRow label="Lokasi" value={location} />
        </dl>

        <dl className="space-y-3">
          <InfoRow label="Tahun" value={year} />
          <InfoRow label="Bulan Ke" value={monthNumber} />
          <InfoRow label="Minggu Ke" value={weekNumber} />
          <InfoRow label="Total Tasklist Plan" value={totalTasklistPlan} />
          <InfoRow label="Total Tasklist Selesai" value={totalTasklistSelesai} />
        </dl>
      </div>
    </section>
  );
}
