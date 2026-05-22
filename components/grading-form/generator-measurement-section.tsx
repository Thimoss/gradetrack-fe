import {
  electricalColumns,
  groundingRows,
  noiseRows,
  vibrationColumns,
  vibrationRows,
} from "./generator-measurement-data";

function MeasurementInput({ label }: { label: string }) {
  return (
    <input
      aria-label={label}
      className="h-7 w-full bg-blue-100 px-2 text-center outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
      type="text"
    />
  );
}

export function GeneratorMeasurementSection() {
  return (
    <section className="border-b border-neutral-300 bg-white">
      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(320px,0.9fr)] gap-8 px-1 max-lg:grid-cols-1">
        <div>
          <h2 className="text-lg font-bold uppercase leading-8 text-neutral-950">
            Data Vibrasi, Suhu, Voltase dan Frekuensi
          </h2>
        </div>
        <div>
          <h2 className="text-lg font-bold uppercase leading-8 text-neutral-950">
            Data Noise & Grounding
          </h2>
        </div>
      </div>
      <div className="mx-9 mb-3 grid grid-cols-[minmax(0,1.25fr)_minmax(320px,0.9fr)] gap-14 border border-neutral-300 px-10 py-7 max-lg:grid-cols-1 max-lg:gap-8 max-md:mx-4 max-md:px-4">
        <div>
          <table className="w-full border-collapse text-center text-base text-neutral-950">
            <thead>
              <tr>
                <th className="border border-neutral-300 bg-blue-300 px-3 py-0.5 font-normal uppercase">
                  Titik
                </th>
                {vibrationColumns.map((column) => (
                  <th
                    key={column.key}
                    className="border border-neutral-300 bg-blue-300 px-3 py-0.5 font-normal uppercase"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vibrationRows.map((row) => (
                <tr key={row.key}>
                  <th
                    className="border border-neutral-300 px-3 py-0.5 font-normal"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  {vibrationColumns.map((column) => (
                    <td
                      key={column.key}
                      className="border border-neutral-300 p-0"
                    >
                      <MeasurementInput
                        label={`${row.label} ${column.label}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="grid grid-cols-[1fr_1fr] text-base font-bold text-neutral-950">
            <span>*mm/s</span>
            <span className="pl-2">*°C</span>
          </div>

          <table className="mt-1 w-80 border-collapse text-center text-base text-neutral-950 max-sm:w-full">
            <thead>
              <tr>
                {electricalColumns.map((column) => (
                  <th
                    key={column.key}
                    className="border border-neutral-300 bg-blue-300 px-3 py-0.5 font-normal uppercase"
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
                    className="border border-neutral-300 p-0"
                  >
                    <MeasurementInput label={column.label} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="grid w-80 grid-cols-[1fr_1fr] text-base font-bold text-neutral-950 max-sm:w-full">
            <span>*Volt</span>
            <span>*Hz</span>
          </div>
        </div>

        <div>
          <table className="w-full border-collapse text-center text-base text-neutral-950">
            <thead>
              <tr>
                <th className="border border-neutral-300 bg-blue-300 px-3 py-0.5 font-normal uppercase">
                  Titik
                </th>
                <th className="border border-neutral-300 bg-blue-300 px-3 py-0.5 font-normal uppercase">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              {noiseRows.map((row) => (
                <tr key={row.key}>
                  <th
                    className="border border-neutral-300 px-3 py-0.5 font-normal"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  <td className="border border-neutral-300 p-0">
                    <MeasurementInput label={`Noise ${row.label}`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-base font-bold leading-7 text-neutral-950">*dB</p>

          <table className="w-full border-collapse text-center text-base text-neutral-950">
            <thead>
              <tr>
                <th className="border border-neutral-300 bg-blue-300 px-3 py-0.5 font-normal uppercase">
                  Parameter
                </th>
                <th className="border border-neutral-300 bg-blue-300 px-3 py-0.5 font-normal uppercase">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody>
              {groundingRows.map((row) => (
                <tr key={row.key}>
                  <th
                    className="border border-neutral-300 px-3 py-0.5 font-normal uppercase"
                    scope="row"
                  >
                    {row.label}
                  </th>
                  <td className="border border-neutral-300 p-0">
                    <MeasurementInput label={row.label} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-base font-bold leading-7 text-neutral-950">*Ohm</p>
        </div>
      </div>
    </section>
  );
}
