import { getNextInspectionInterval } from "./generator-conclusion-data";

type GeneratorConclusionSectionProps = {
  totalScore: number;
};

export function GeneratorConclusionSection({
  totalScore,
}: GeneratorConclusionSectionProps) {
  const nextInspectionInterval = getNextInspectionInterval(totalScore);

  return (
    <section className="border-b-4 border-blue-700 bg-white">
      <h2 className="px-1 text-lg font-bold uppercase leading-8 text-neutral-950">
        Kesimpulan
      </h2>
      <div className="mx-9 mb-3 grid grid-cols-[minmax(240px,0.9fr)_24px_minmax(360px,1fr)] gap-x-8 gap-y-8 border border-neutral-300 px-12 py-8 text-base text-neutral-950 max-md:mx-4 max-md:grid-cols-[1fr_16px_1.2fr] max-md:px-4">
        <label
          className="py-2"
          htmlFor="next-inspection-interval"
        >
          Interval Penilaian Berikutnya
        </label>
        <span className="py-2 text-center">:</span>
        <div className="flex items-center">
          <input
            className="h-10 w-72 border border-neutral-300 bg-neutral-300 px-3 text-center text-xl font-bold outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 max-sm:w-full"
            id="next-inspection-interval"
            type="number"
            value={nextInspectionInterval}
            readOnly
          />
          <span className="ml-1">Bulan</span>
        </div>

        <label
          className="py-2"
          htmlFor="major-condition-summary"
        >
          Identifikasi Kondisi Major
        </label>
        <span className="py-2 text-center">:</span>
        <textarea
          className="h-32 w-full resize-none border border-neutral-300 bg-neutral-300 p-1 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          defaultValue="Tidak Ada"
          id="major-condition-summary"
        />

        <label
          className="py-2"
          htmlFor="improvement-parameters"
        >
          Parameter yang memerlukan improvement
        </label>
        <span className="py-2 text-center">:</span>
        <textarea
          className="h-44 w-full resize-none border border-neutral-300 bg-neutral-300 p-1 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          defaultValue="Performa / Kinerja Peralatan"
          id="improvement-parameters"
        />

        <label className="py-2" htmlFor="conclusion-notes">
          Catatan
        </label>
        <span className="py-2 text-center">:</span>
        <textarea
          className="h-28 w-full resize-none border border-neutral-300 bg-blue-100 p-1 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          id="conclusion-notes"
        />
      </div>
    </section>
  );
}
