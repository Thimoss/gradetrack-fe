import { GradingFormSection } from "./grading-form-section";

function NumberInput({ label }: { label: string }) {
  return (
    <input
      aria-label={label}
      className="h-9 w-full border border-transparent bg-white px-2 text-center outline-none transition focus:border-sky-500"
      step="0.1"
      type="number"
    />
  );
}

function CategoryInput({ label }: { label: string }) {
  return (
    <select
      aria-label={label}
      className="h-9 w-full border border-transparent bg-white px-2 text-center outline-none transition focus:border-sky-500"
      defaultValue=""
    >
      <option value="" />
      <option value="GOOD">GOOD</option>
      <option value="MODERATE">MODERATE</option>
      <option value="POOR">POOR</option>
    </select>
  );
}

export function UpsFieldDataSection() {
  return (
    <GradingFormSection title="Pengambilan Data Lapangan">
      <div className="grid grid-cols-2 gap-6 rounded-lg border border-zinc-200 p-5 max-lg:grid-cols-1 max-sm:overflow-x-auto">
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
                <th
                  className="border border-zinc-200 px-3 py-2 font-medium"
                  scope="row"
                >
                  Grounding
                </th>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Grounding measured" />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            *Ohm
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Output Voltage Stability (UPS) IEC 62040-3
          </div>
          <table className="w-full min-w-[560px] border-collapse text-center text-sm text-neutral-950">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Nominal Voltage
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Output Voltage
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Deviation (%)
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Nominal voltage" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Output voltage" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Output voltage deviation" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <CategoryInput label="Output voltage category" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Transfer Time Test (AC Fail to Battery) IEC 62040-3
          </div>
          <table className="w-full min-w-[420px] border-collapse text-center text-sm text-neutral-950">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Result
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Transfer time result" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <CategoryInput label="Transfer time category" />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            *ms
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Internal Resistance Test Battery IEEE STD 1184
          </div>
          <table className="w-full min-w-[420px] border-collapse text-center text-sm text-neutral-950">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Result
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Internal resistance result" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <CategoryInput label="Internal resistance category" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200 max-lg:col-span-1 lg:col-span-2">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Discharge Time IEC 62040-3
          </div>
          <table className="w-full min-w-[560px] border-collapse text-center text-sm text-neutral-950">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Nominal Discharge Time
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Actual Discharge Time
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Deviation (%)
                </th>
                <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Nominal discharge time" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Actual discharge time" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <NumberInput label="Discharge time deviation" />
                </td>
                <td className="border border-zinc-200 p-0">
                  <CategoryInput label="Discharge time category" />
                </td>
              </tr>
            </tbody>
          </table>
          <p className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            *min
          </p>
        </div>
      </div>
    </GradingFormSection>
  );
}
