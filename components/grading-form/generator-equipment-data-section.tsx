import {
  buildGeneratorEquipmentRows,
  type GeneratorEquipmentData,
} from "./generator-equipment-data";

type GeneratorEquipmentDataSectionProps = {
  equipment?: GeneratorEquipmentData | null;
  isLoading?: boolean;
};

export function GeneratorEquipmentDataSection({
  equipment,
  isLoading = false,
}: GeneratorEquipmentDataSectionProps) {
  if (isLoading) {
    return (
      <section className="border-y border-neutral-300 bg-white">
        <h2 className="border-b border-neutral-300 px-1 text-lg font-bold uppercase leading-7 text-neutral-950">
          Data Peralatan
        </h2>
        <div className="px-10 py-4 text-sm text-neutral-500">Memuat data.</div>
      </section>
    );
  }

  if (!equipment) {
    return (
      <section className="border-y border-neutral-300 bg-white">
        <h2 className="border-b border-neutral-300 px-1 text-lg font-bold uppercase leading-7 text-neutral-950">
          Data Peralatan
        </h2>
        <div className="px-10 py-4 text-sm text-neutral-500">
          Data peralatan belum tersedia.
        </div>
      </section>
    );
  }

  const rows = buildGeneratorEquipmentRows(equipment);

  return (
    <section className="border-y border-neutral-300 bg-white">
      <h2 className="border-b border-neutral-300 px-1 text-lg font-bold uppercase leading-7 text-neutral-950">
        Data Peralatan
      </h2>
      <dl className="grid grid-cols-[minmax(160px,440px)_24px_minmax(120px,1fr)_minmax(64px,160px)] gap-y-1 px-10 py-1.5 text-base leading-6 text-neutral-950 max-sm:grid-cols-[minmax(120px,1fr)_16px_minmax(80px,1fr)] max-sm:px-4 max-sm:text-sm">
        {rows.map((row) => (
          <div
            key={row.label}
            className="contents"
          >
            <dt className="font-normal">{row.label}</dt>
            <dd className="text-center">:</dd>
            <dd className="font-normal">{row.value}</dd>
            <dd className="font-normal max-sm:col-start-3">{row.unit ?? ""}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
