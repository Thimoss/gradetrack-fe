import type { DashboardTask } from "@/hooks/use-dashboard-page";

const priorityClassName: Record<DashboardTask["priority"], string> = {
  High: "bg-red-50 text-red-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
};

type DashboardTaskTableProps = {
  tasks: DashboardTask[];
};

export function DashboardTaskTable({ tasks }: DashboardTaskTableProps) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-200 px-5 py-4">
        <h2 className="text-base font-bold text-neutral-950">Tasklist</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Pekerjaan tindak lanjut yang perlu dipantau.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-700">
              <th className="px-5 py-3 font-bold">Task</th>
              <th className="px-5 py-3 font-bold">Equipment</th>
              <th className="px-5 py-3 font-bold">Lokasi</th>
              <th className="px-5 py-3 font-bold">Prioritas</th>
              <th className="px-5 py-3 font-bold">Due</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="px-5 py-4">
                  <p className="font-semibold text-neutral-950">{task.title}</p>
                  <p className="mt-1 text-xs text-neutral-500">{task.id}</p>
                </td>
                <td className="px-5 py-4 font-medium text-neutral-800">
                  {task.equipment}
                </td>
                <td className="px-5 py-4 text-neutral-600">{task.location}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${priorityClassName[task.priority]}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-5 py-4 text-neutral-600">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
