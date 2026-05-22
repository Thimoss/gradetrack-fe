import { GradingFormSection } from "./grading-form-section";

export function MovFieldDataSection() {
  return (
    <GradingFormSection title="Pengambilan Data Lapangan">
      <div className="max-w-sm overflow-hidden rounded-lg border border-zinc-200">
        <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
          Grounding (ANSI NETA MTS)
        </div>
        <table className="w-full border-collapse text-center text-sm text-neutral-950">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                Parameter
              </th>
              <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                Measured
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-zinc-200 px-3 py-2 font-medium" scope="row">
                Grounding
              </th>
              <td className="border border-zinc-200 p-0">
                <input
                  aria-label="Grounding measured"
                  className="h-9 w-full border border-transparent bg-slate-50 px-2 text-center outline-none transition focus:border-sky-500 focus:bg-white"
                  type="number"
                  step="0.1"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
          *Ohm
        </p>
      </div>
    </GradingFormSection>
  );
}
