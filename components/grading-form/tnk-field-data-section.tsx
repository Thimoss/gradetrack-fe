import { GradingFormSection } from "./grading-form-section";

const thicknessSegments = [
  "ATAP",
  "COURSE 1",
  "COURSE 2",
  "COURSE 3",
  "COURSE 4",
  "COURSE 5",
  "COURSE 6",
  "COURSE 7",
  "COURSE 8",
  "BOTTOM",
];

function NumberCell({ label }: { label: string }) {
  return (
    <td className="border border-zinc-200 p-0">
      <input
        aria-label={label}
        className="h-9 w-full border border-transparent bg-white px-2 text-center outline-none transition focus:border-[#036CB6]"
        step="0.1"
        type="number"
      />
    </td>
  );
}

export function TnkFieldDataSection() {
  return (
    <GradingFormSection title="Pengambilan Data Lapangan">
      <div className="grid grid-cols-3 gap-6 rounded-lg border border-zinc-200 p-5 max-xl:grid-cols-2 max-lg:grid-cols-1 max-sm:overflow-x-auto">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Data Ketebalan
          </h3>
          <table className="mt-3 w-full min-w-[360px] border-collapse text-center text-sm text-[#232122]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Segment
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Aktual
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  T. Req.
                </th>
              </tr>
            </thead>
            <tbody>
              {thicknessSegments.map((segment) => (
                <tr key={segment}>
                  <th
                    className="border border-zinc-200 px-3 py-2 font-medium"
                    scope="row"
                  >
                    {segment}
                  </th>
                  <NumberCell label={`${segment} aktual`} />
                  <NumberCell label={`${segment} required thickness`} />
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid min-w-[360px] grid-cols-3 px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <span />
            <span>*mm</span>
            <span>*mm</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Data Settlement
            </h3>
            <table className="mt-3 w-full min-w-[300px] border-collapse text-center text-sm text-[#232122]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Aktual
                  </th>
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Limit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <NumberCell label="Settlement aktual" />
                  <NumberCell label="Settlement limit" />
                </tr>
              </tbody>
            </table>
            <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
              *mm
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
              Data Grounding
            </h3>
            <table className="mt-3 w-full min-w-[300px] border-collapse text-center text-sm text-[#232122]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Aktual
                  </th>
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Limit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <NumberCell label="Grounding aktual" />
                  <NumberCell label="Grounding limit" />
                </tr>
              </tbody>
            </table>
            <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
              *Ohm
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            Data Plumbness
          </h3>
          <table className="mt-3 w-full min-w-[260px] border-collapse text-center text-sm text-[#232122]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Aktual
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <NumberCell label="Plumbness aktual" />
              </tr>
            </tbody>
          </table>
          <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            *mm
          </p>
        </div>
      </div>
    </GradingFormSection>
  );
}
