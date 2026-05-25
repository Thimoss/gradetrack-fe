import { GradingFormSection } from "./grading-form-section";
import { getMovNextInspectionInterval } from "./mov-conclusion-data";

type MovConclusionSectionProps = {
  totalScore: number;
  improvementParameters: string[];
};

export function MovConclusionSection({
  totalScore,
  improvementParameters,
}: MovConclusionSectionProps) {
  const nextInspectionInterval = getMovNextInspectionInterval(totalScore);

  return (
    <GradingFormSection title="Kesimpulan">
      <div className="grid grid-cols-[minmax(220px,0.8fr)_16px_minmax(320px,1fr)] gap-x-6 gap-y-6 text-sm text-[#232122] max-md:grid-cols-1">
        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="mov-next-inspection-interval"
        >
          Interval Penilaian Berikutnya
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <div className="flex items-center">
          <input
            className="h-11 w-72 rounded-lg border border-zinc-200 bg-slate-100 px-3 text-center text-xl font-bold outline-none focus:bg-white focus:ring-2 focus:ring-[#036CB6] max-sm:w-full"
            id="mov-next-inspection-interval"
            type="number"
            value={nextInspectionInterval}
            readOnly
          />
          <span className="ml-2">Bulan</span>
        </div>

        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="mov-major-condition-summary"
        >
          Identifikasi Kondisi Major
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-32 w-full resize-none rounded-lg border border-zinc-200 bg-slate-100 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#036CB6]"
          id="mov-major-condition-summary"
        />

        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="mov-improvement-parameters"
        >
          Parameter yang memerlukan improvement
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-32 w-full resize-none rounded-lg border border-zinc-200 bg-slate-100 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#036CB6]"
          id="mov-improvement-parameters"
          value={improvementParameters.join(", ")}
          readOnly
        />

        <label className="py-2 font-medium text-neutral-700" htmlFor="mov-notes">
          Catatan
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-28 w-full resize-none rounded-lg border border-zinc-200 bg-slate-100 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#036CB6]"
          id="mov-notes"
        />
      </div>
    </GradingFormSection>
  );
}
