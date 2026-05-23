import { GradingFormSection } from "./grading-form-section";
import {
  buildTrfEquipmentRows,
  type TrfEquipmentData,
} from "./trf-equipment-data";

type TrfEquipmentDataSectionProps = {
  equipment?: TrfEquipmentData | null;
  isLoading?: boolean;
};

export function TrfEquipmentDataSection({
  equipment,
  isLoading = false,
}: TrfEquipmentDataSectionProps) {
  if (isLoading) {
    return (
      <GradingFormSection title="Data Peralatan">
        <div className="rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-neutral-500">
          Memuat data.
        </div>
      </GradingFormSection>
    );
  }

  if (!equipment) {
    return (
      <GradingFormSection title="Data Peralatan">
        <div className="rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-neutral-500">
          Data peralatan belum tersedia.
        </div>
      </GradingFormSection>
    );
  }

  const rows = buildTrfEquipmentRows(equipment);

  return (
    <GradingFormSection title="Data Peralatan">
      <dl className="grid max-w-5xl grid-cols-[minmax(260px,420px)_16px_minmax(180px,1fr)] gap-x-3 gap-y-3 text-sm leading-6 text-neutral-950 max-md:grid-cols-[minmax(160px,1fr)_16px_minmax(120px,1fr)]">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="font-medium text-neutral-600">{row.label}</dt>
            <dd className="text-center text-neutral-400">:</dd>
            <dd className="text-neutral-950">{row.value}</dd>
          </div>
        ))}
      </dl>
    </GradingFormSection>
  );
}
