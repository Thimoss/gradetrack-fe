import { GradingFormSection } from "./grading-form-section";
import {
  pmpVibrationColumns,
  pmpVibrationRows,
} from "./pmp-measurement-data";

function MeasurementInput({ label }: { label: string }) {
  return (
    <input
      aria-label={label}
      className="h-9 w-full border border-transparent bg-slate-50 px-2 text-center outline-none transition focus:border-sky-500 focus:bg-white"
      type="text"
    />
  );
}

export function PmpMeasurementSection() {
  return (
    <GradingFormSection title="Data Vibrasi, Suhu, Noise & Grounding">
      <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)] gap-5 max-lg:grid-cols-1">
        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Data Vibrasi & Suhu
          </div>
          <div className="overflow-x-auto p-4">
            <table className="w-full min-w-[560px] border-collapse text-center text-sm text-neutral-950">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Titik
                  </th>
                  {pmpVibrationColumns.map((column) => (
                    <th
                      key={column.key}
                      className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pmpVibrationRows.map((row) => (
                  <tr key={row.key}>
                    {row.key === "bodyDriver" ? (
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
                        {pmpVibrationColumns.map((column) => (
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
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-zinc-200">
          <div className="border-b border-zinc-200 bg-slate-50 px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700">
            Data Noise & Grounding
          </div>
          <div className="p-4">
            <table className="w-full border-collapse text-center text-sm text-neutral-950">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Titik
                  </th>
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                {["B", "C"].map((point) => (
                  <tr key={point}>
                    <th
                      className="border border-zinc-200 px-3 py-2 font-medium"
                      scope="row"
                    >
                      {point}
                    </th>
                    <td className="border border-zinc-200 p-0">
                      <MeasurementInput label={`Noise ${point}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
              *dB
            </p>
            <table className="w-full border-collapse text-center text-sm text-neutral-950">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Parameter
                  </th>
                  <th className="border border-zinc-200 px-3 py-2 font-bold uppercase text-slate-700">
                    Nilai
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th
                    className="border border-zinc-200 px-3 py-2 font-medium uppercase"
                    scope="row"
                  >
                    Grounding
                  </th>
                  <td className="border border-zinc-200 p-0">
                    <MeasurementInput label="Grounding" />
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="px-1 py-2 text-xs font-bold uppercase tracking-wide text-neutral-500">
              *Ohm
            </p>
          </div>
        </div>
      </div>
    </GradingFormSection>
  );
}
