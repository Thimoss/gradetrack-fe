import { GradingFormSection } from "./grading-form-section";
import { pmpMajorConditionRows } from "./pmp-major-condition-data";

export function PmpMajorConditionSection() {
  return (
    <GradingFormSection title="Identifikasi Kondisi Major">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm text-[#232122]">
          <thead>
            <tr className="bg-slate-100">
              <th className="w-10 border border-zinc-200 px-2 py-3 text-center font-bold text-slate-700">
                No
              </th>
              <th className="w-64 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                Parameter
              </th>
              <th
                className="border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700"
                colSpan={2}
              >
                Kondisi
              </th>
            </tr>
          </thead>
          <tbody>
            {pmpMajorConditionRows.map((row) => (
              <tr key={row.key}>
                <td className="border border-zinc-200 px-2 py-4 text-center font-medium">
                  {row.id}
                </td>
                <th
                  className="border border-zinc-200 px-3 py-4 text-center font-medium"
                  scope="row"
                >
                  {row.parameter}
                </th>
                <td className="w-24 border border-zinc-200 bg-slate-50 p-0">
                  <label className="flex h-full min-h-14 items-center justify-center">
                    <input
                      aria-label={`Pilih ${row.parameter}`}
                      className="h-5 w-5 accent-[#036CB6]"
                      type="checkbox"
                    />
                  </label>
                </td>
                <td className="border border-zinc-200 px-4 py-4">
                  {row.condition}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GradingFormSection>
  );
}
