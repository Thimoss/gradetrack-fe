import { GradingFormSection } from "./grading-form-section";
import { getSgrNextInspectionInterval } from "./sgr-conclusion-data";

type SgrConclusionSectionProps = {
  totalScore: number;
  improvementParameters: string[];
};

export function SgrConclusionSection({
  totalScore,
  improvementParameters,
}: SgrConclusionSectionProps) {
  const nextInspectionInterval = getSgrNextInspectionInterval(totalScore);

  return (
    <GradingFormSection title="Kesimpulan">
      <div className="grid grid-cols-[minmax(220px,0.8fr)_16px_minmax(320px,1fr)] gap-x-6 gap-y-6 text-sm text-neutral-950 max-md:grid-cols-1">
        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="sgr-next-inspection-interval"
        >
          Interval Penilaian Berikutnya
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <div className="flex items-center">
          <input
            className="h-11 w-72 rounded-lg border border-zinc-200 bg-slate-100 px-3 text-center text-xl font-bold outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 max-sm:w-full"
            id="sgr-next-inspection-interval"
            readOnly
            type="number"
            value={nextInspectionInterval}
          />
          <span className="ml-2">Bulan</span>
        </div>

        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="sgr-major-condition-summary"
        >
          Identifikasi Kondisi Major
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-32 w-full resize-none rounded-lg border border-zinc-200 bg-slate-100 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
          defaultValue="Tidak Ada"
          id="sgr-major-condition-summary"
        />

        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="sgr-improvement-parameters"
        >
          Parameter yang memerlukan improvement
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-44 w-full resize-none rounded-lg border border-zinc-200 bg-slate-100 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
          id="sgr-improvement-parameters"
          readOnly
          value={
            improvementParameters.length > 0
              ? improvementParameters.join(", ")
              : "Tidak Ada"
          }
        />

        <label className="py-2 font-medium text-neutral-700" htmlFor="sgr-notes">
          Catatan
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-28 w-full resize-none rounded-lg border border-zinc-200 bg-white p-3 outline-none focus:ring-2 focus:ring-sky-500"
          id="sgr-notes"
        />
      </div>
    </GradingFormSection>
  );
}
