import { GradingFormSection } from "./grading-form-section";

const thicknessRows = ["OD 1", "OD 2", "OD 3", "OD 4"];

export function PipFieldDataSection() {
  return (
    <GradingFormSection title="Pengambilan Data Lapangan">
      <div className="grid grid-cols-[minmax(420px,0.7fr)_minmax(260px,1fr)] gap-8 rounded-lg border border-zinc-200 p-5 max-lg:grid-cols-1 max-sm:overflow-x-auto">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Data Ketebalan
          </h3>
          <table className="mt-3 w-full min-w-[420px] border-collapse text-center text-sm text-neutral-950">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Segmen
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Aktual
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  T. Req.
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  OD
                </th>
              </tr>
            </thead>
            <tbody>
              {thicknessRows.map((row) => (
                <tr key={row}>
                  <th
                    className="border border-zinc-200 px-3 py-2 font-medium"
                    scope="row"
                  >
                    {row}
                  </th>
                  <td className="border border-zinc-200 p-0">
                    <input
                      aria-label={`${row} aktual`}
                      className="h-9 w-full border border-transparent bg-slate-50 px-2 text-center outline-none transition focus:border-sky-500 focus:bg-white"
                      type="number"
                      step="0.1"
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <input
                      aria-label={`${row} required thickness`}
                      className="h-9 w-full border border-transparent bg-slate-100 px-2 text-center outline-none transition focus:border-sky-500 focus:bg-white"
                      type="number"
                      step="0.1"
                      readOnly
                    />
                  </td>
                  <td className="border border-zinc-200 p-0">
                    <input
                      aria-label={`${row} outside diameter`}
                      className="h-9 w-full border border-transparent bg-slate-50 px-2 text-center outline-none transition focus:border-sky-500 focus:bg-white"
                      type="number"
                      step="0.1"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid min-w-[420px] grid-cols-4 px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <span />
            <span>*mm</span>
            <span>*mm</span>
            <span>*inch</span>
          </div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <p className="font-bold">Note:</p>
          <p>OD 1 - OD 4 untuk diameter pipa yang berbeda dalam 1 jalur.</p>
        </div>
      </div>
    </GradingFormSection>
  );
}
