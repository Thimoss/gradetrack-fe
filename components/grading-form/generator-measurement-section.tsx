import {
  electricalColumns,
  groundingRows,
  noiseRows,
  vibrationColumns,
  vibrationRows,
} from "./generator-measurement-data";
import { GradingFormSection } from "./grading-form-section";

function MeasurementInput({ label }: { label: string }) {
  return (
    <input
      aria-label={label}
      className="h-9 w-full border border-transparent bg-slate-50 px-2 text-center outline-none transition focus:border-[#036CB6] focus:bg-white"
      type="text"
    />
  );
}

export function GeneratorMeasurementSection() {
  return (
    <GradingFormSection title="Data Vibrasi, Suhu, Voltase, Frekuensi, Noise & Grounding">
      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(320px,0.9fr)] gap-5 max-lg:grid-cols-1">
        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Vibrasi, Suhu, Voltase dan Frekuensi
          </div>
          <div className="overflow-x-auto p-4">
          <table className="w-full min-w-[560px] border-collapse text-center text-sm text-[#232122]">
            <thead>
              <tr>
                <th className="border border-zinc-200 bg-slate-100 px-3 py-2 font-bold uppercase text-slate-700">
                  Titik
                </th>
                {vibrationColumns.map((column) => (
                  <th
                    key={column.key}
                    className="border border-zinc-200 bg-slate-100 px-3 py-2 font-bold uppercase text-slate-700"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vibrationRows.map((row) => (
                <tr key={row.key}>
                  {row.key === "bodyAlternator" ? (
                    <>
                      <th
                        className="border border-zinc-200 px-3 py-2 text-center font-medium"
                        colSpan={4}
                        scope="row"
                      >
                        {row.label}
                      </th>
                      <td className="border border-zinc-200 p-0">
                        <MeasurementInput label={`${row.label} Suhu`} />
                      </td>
                    </>
                  ) : (
                    <>
                      <th
                        className="border border-zinc-200 px-3 py-2 font-medium"
                        scope="row"
                      >
                        {row.label}
                      </th>
                      {vibrationColumns.map((column) => (
                        <td
                          key={column.key}
                          className="border border-zinc-200 p-0"
                        >
                          <MeasurementInput
                            label={`${row.label} ${column.label}`}
                          />
                        </td>
                      ))}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid grid-cols-5 px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
            <span className="col-span-4">*mm/s</span>
            <span>*°C</span>
          </div>

          <table className="mt-2 w-80 border-collapse text-center text-sm text-[#232122] max-sm:w-full">
            <thead>
              <tr>
                {electricalColumns.map((column) => (
                  <th
                    key={column.key}
                    className="border border-zinc-200 bg-slate-100 px-3 py-2 font-bold uppercase text-slate-700"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {electricalColumns.map((column) => (
                  <td
                    key={column.key}
                    className="border border-zinc-200 p-0"
                  >
                    <MeasurementInput label={column.label} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="grid w-80 grid-cols-[1fr_1fr] px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500 max-sm:w-full">
            <span>*Volt</span>
            <span>*Hz</span>
          </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Noise & Grounding
          </div>
          <div className="p-4">
          <table className="w-full border-collapse text-center text-sm text-[#232122]">
            <thead>
              <tr>
                <th className="border border-zinc-200 bg-slate-100 px-3 py-2 font-bold uppercase text-slate-700">
                  Titik
                </th>
                <th className="border border-zinc-200 bg-slate-100 px-3 py-2 font-bold uppercase text-slate-700">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              {noiseRows.map((row) => (
                <tr key={row.key}>
                  <th
                    className="border border-zinc-200 px-3 py-2 font-medium"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  <td className="border border-zinc-200 p-0">
                    <MeasurementInput label={`Noise ${row.label}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">*dB</p>

          <table className="w-full border-collapse text-center text-sm text-[#232122]">
            <thead>
              <tr>
                <th className="border border-zinc-200 bg-slate-100 px-3 py-2 font-bold uppercase text-slate-700">
                  Parameter
                </th>
                <th className="border border-zinc-200 bg-slate-100 px-3 py-2 font-bold uppercase text-slate-700">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              {groundingRows.map((row) => (
                <tr key={row.key}>
                  <th
                    className="border border-zinc-200 px-3 py-2 font-medium uppercase"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  <td className="border border-zinc-200 p-0">
                    <MeasurementInput label={row.label} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">*Ohm</p>
          </div>
        </div>
      </div>
    </GradingFormSection>
  );
}
