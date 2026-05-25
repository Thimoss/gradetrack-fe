import { GradingFormSection } from "./grading-form-section";
import { getTrfNextInspectionInterval } from "./trf-conclusion-data";

type TrfConclusionSectionProps = {
  totalScore: number;
  improvementParameters: string[];
};

export function TrfConclusionSection({
  totalScore,
  improvementParameters,
}: TrfConclusionSectionProps) {
  const hasAssessmentInput = totalScore > 0 || improvementParameters.length > 0;
  const nextInspectionInterval = getTrfNextInspectionInterval(totalScore);

  return (
    <GradingFormSection title="Kesimpulan">
      <div className="grid grid-cols-[minmax(220px,0.8fr)_16px_minmax(320px,1fr)] gap-x-6 gap-y-6 text-sm text-[#232122] max-md:grid-cols-1">
        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="trf-next-inspection-interval"
        >
          Interval Penilaian Berikutnya
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <div className="flex items-center">
          <input
            className="h-11 w-72 rounded-lg border border-zinc-200 bg-slate-100 px-3 text-center text-xl font-bold outline-none focus:bg-white focus:ring-2 focus:ring-[#036CB6] max-sm:w-full"
            id="trf-next-inspection-interval"
            readOnly
            type="number"
            value={hasAssessmentInput ? nextInspectionInterval : ""}
          />
          <span className="ml-2">Bulan</span>
        </div>

        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="trf-major-condition-summary"
        >
          Identifikasi Kondisi Major
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-32 w-full resize-none rounded-lg border border-zinc-200 bg-slate-100 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#036CB6]"
          id="trf-major-condition-summary"
        />

        <label
          className="py-2 font-medium text-neutral-700"
          htmlFor="trf-improvement-parameters"
        >
          Parameter yang memerlukan improvement
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-44 w-full resize-none rounded-lg border border-zinc-200 bg-slate-100 p-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#036CB6]"
          id="trf-improvement-parameters"
          readOnly
          value={improvementParameters.join(", ")}
        />

        <label className="py-2 font-medium text-neutral-700" htmlFor="trf-notes">
          Catatan
        </label>
        <span className="py-2 text-center text-neutral-400 max-md:hidden">:</span>
        <textarea
          className="h-28 w-full resize-none rounded-lg border border-zinc-200 bg-white p-3 outline-none focus:ring-2 focus:ring-[#036CB6]"
          id="trf-notes"
        />
      </div>
    </GradingFormSection>
  );
}
