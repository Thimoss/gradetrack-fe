import { generatorMajorConditionRows } from "./generator-major-condition-data";

function getSeverityClass(severity: "critical" | "major") {
  if (severity === "critical") {
    return "bg-red-200";
  }

  return "bg-neutral-300";
}

export function GeneratorMajorConditionSection() {
  return (
    <section className="border-b-4 border-blue-700 bg-white">
      <h2 className="border-t-4 border-blue-700 px-1 text-lg font-bold uppercase leading-7 text-neutral-950">
        Identifikasi Kondisi Major
      </h2>
      <table className="w-full border-collapse text-base text-neutral-950">
        <thead>
          <tr className="bg-blue-300">
            <th className="w-10 border border-neutral-300 px-2 py-4 text-center font-bold">
              No
            </th>
            <th className="w-52 border border-neutral-300 px-3 py-4 text-center font-bold">
              Parameter
            </th>
            <th
              className="border border-neutral-300 px-3 py-4 text-center font-bold"
              colSpan={2}
            >
              Kondisi
            </th>
          </tr>
        </thead>
        <tbody>
          {generatorMajorConditionRows.map((row) => (
            <tr key={row.id}>
              <td className="border border-neutral-300 px-2 py-7 text-center">
                {row.id}
              </td>
              <th
                className="border border-neutral-300 px-2 py-7 text-center font-normal"
                scope="row"
              >
                {row.parameter}
              </th>
              <td
                className={`w-24 border border-neutral-300 p-0 ${getSeverityClass(row.severity)}`}
              >
                <label className="flex h-full min-h-16 items-center justify-center">
                  <input
                    aria-label={`Pilih ${row.parameter}`}
                    className="h-5 w-5 accent-blue-700"
                    type="checkbox"
                  />
                </label>
              </td>
              <td className="border border-neutral-300 px-1 py-7">
                {row.condition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
