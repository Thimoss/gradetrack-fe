"use client";

import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  IoArrowBackOutline,
  IoBarChartOutline,
  IoBusinessOutline,
  IoClipboardOutline,
} from "react-icons/io5";
import type { DashboardLocationRow } from "@/hooks/use-dashboard-page";
import { PageCard, PageShell } from "@/components/ui/page-section";
import { useDashboardPage } from "@/hooks/use-dashboard-page";

type RecapMode = "grading" | "tasklist";

type ApiEnvelope<T> = {
  data: T;
};

type EquipmentItem = {
  id: string;
  equipmentType: string;
  identity: Record<string, unknown>;
  maker?: Record<string, unknown>;
};

type EquipmentListResponse = {
  items: EquipmentItem[];
};

type GradingSubmission = {
  equipmentId: string;
  inspectionDate: string;
  category: string;
};

type GradingResponse = {
  items: GradingSubmission[];
};

type TasklistSession = {
  id: string;
  equipmentType: string;
  cycle: TasklistCycle;
  periodDate: string;
  year: number;
  monthNumber: number;
  totalTasklistPlan: number;
  totalTasklistSelesai: number;
};

type TasklistResponse = {
  items: TasklistSession[];
};

type TasklistDetail = {
  session: TasklistSession;
  equipment: Array<{
    id: string;
    tagNumber: string;
    equipmentType: string;
  }>;
  tasks: Array<{
    id: string;
    description: string;
  }>;
  resultsByTask: Array<{
    taskId: string;
    results: Array<{
      equipmentId: string;
      performance: string;
    }>;
  }>;
};

type TasklistCycle = "DAILY" | "WEEKLY" | "MONTHLY" | "SIX_MONTHLY" | "YEARLY";

type EquipmentGroup = {
  code: string;
  title: string;
};

type TasklistRecapRow = {
  equipmentTypeCode: string;
  tag: string;
  description: string;
  values: Record<TasklistCycle, { plan: number; real: number }>;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const tasklistCycles: Array<{ key: TasklistCycle; label: string }> = [
  { key: "DAILY", label: "Daily" },
  { key: "WEEKLY", label: "Weekly" },
  { key: "MONTHLY", label: "Monthly" },
  { key: "SIX_MONTHLY", label: "6 Monthly" },
  { key: "YEARLY", label: "Yearly" },
];

const equipmentGroups: EquipmentGroup[] = [
  { code: "GST", title: "GENSET" },
  { code: "MTR", title: "METER ARUS" },
  { code: "MOV", title: "MOTOR OPERATED VALVE" },
  { code: "PMP", title: "POMPA" },
  { code: "PIP", title: "SISTEM PERPIPAAN" },
  { code: "SGR", title: "SWITCH GEAR" },
  { code: "TNK", title: "TANGKI TIMBUN" },
  { code: "TRF", title: "TRANSFORMER" },
  { code: "UPS", title: "UPS" },
];

export function RecapPage() {
  const { isLoading, period, setPeriod, summary } = useDashboardPage();
  const [selectedDepotId, setSelectedDepotId] = useState<number | null>(null);
  const [selectedMode, setSelectedMode] = useState<RecapMode | null>(null);

  const selectedDepot = useMemo(() => {
    return summary.rows.find((row) => row.depotId === selectedDepotId) ?? null;
  }, [selectedDepotId, summary.rows]);

  function selectDepot(depotId: number) {
    setSelectedDepotId(depotId);
    setSelectedMode(null);
  }

  function backToDepots() {
    setSelectedDepotId(null);
    setSelectedMode(null);
  }

  return (
    <PageShell>
      <header className="flex flex-wrap items-end justify-between gap-4 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-sm font-bold uppercase text-[#036CB6]">
            Rekap LTSA
          </p>
          <h1 className="mt-1 text-2xl font-bold text-[#232122]">
            Rekap Grading dan Tasklist
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            Pilih depot, lalu pilih bentuk rekap sesuai lembar laporan LTSA.
          </p>
        </div>
        <label className="grid gap-1 text-sm font-semibold text-neutral-800">
          Periode
          <input
            className="h-10 rounded-lg border border-zinc-300 px-3 text-sm font-semibold text-[#232122] outline-none focus:border-[#036CB6] focus:ring-2 focus:ring-[#E6F1FA]"
            onChange={(event) => setPeriod(event.target.value)}
            type="month"
            value={period}
          />
        </label>
      </header>

      {!selectedDepot ? (
        <DepotList
          isLoading={isLoading}
          onSelectDepot={selectDepot}
          rows={summary.rows}
        />
      ) : selectedMode ? (
        <SheetDetail
          mode={selectedMode}
          onBack={() => setSelectedMode(null)}
          period={period}
          row={selectedDepot}
        />
      ) : (
        <ModePicker
          onBack={backToDepots}
          onSelectMode={setSelectedMode}
          row={selectedDepot}
        />
      )}
    </PageShell>
  );
}

function DepotList({
  isLoading,
  onSelectDepot,
  rows,
}: {
  isLoading: boolean;
  onSelectDepot: (depotId: number) => void;
  rows: DashboardLocationRow[];
}) {
  return (
    <PageCard>
      <div className="border-b border-zinc-200 px-5 py-4">
        <h2 className="text-base font-bold text-[#232122]">Pilih depot</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Daftar depot mengikuti data rekap pada periode terpilih.
        </p>
      </div>
      <div className="divide-y divide-zinc-100">
        {isLoading ? (
          <p className="px-5 py-10 text-center text-sm text-neutral-500">
            Memuat daftar depot...
          </p>
        ) : null}

        {!isLoading && rows.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-neutral-500">
            Data depot belum tersedia untuk periode ini.
          </p>
        ) : null}

        {!isLoading
          ? rows.map((row) => (
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#E6F1FA]"
                key={row.depotId}
                onClick={() => onSelectDepot(row.depotId)}
                type="button"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#036CB6] text-white">
                    <IoBusinessOutline aria-hidden="true" className="text-xl" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[#232122]">
                      {row.location}
                    </span>
                    <span className="mt-1 block text-xs text-neutral-500">
                      {row.city}
                    </span>
                  </span>
                </span>
                <span className="rounded-lg border border-zinc-200 px-3 py-1 text-xs font-bold text-[#036CB6]">
                  Pilih
                </span>
              </button>
            ))
          : null}
      </div>
    </PageCard>
  );
}

function ModePicker({
  onBack,
  onSelectMode,
  row,
}: {
  onBack: () => void;
  onSelectMode: (mode: RecapMode) => void;
  row: DashboardLocationRow;
}) {
  return (
    <div className="grid gap-5">
      <StepHeader onBack={onBack} subtitle={row.city} title={row.location} />
      <div className="grid gap-4 md:grid-cols-2">
        <button
          className="rounded-lg border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:border-[#036CB6] hover:bg-[#E6F1FA]"
          onClick={() => onSelectMode("grading")}
          type="button"
        >
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#036CB6] text-white">
            <IoBarChartOutline aria-hidden="true" className="text-xl" />
          </span>
          <span className="mt-4 block text-lg font-bold text-[#232122]">
            Rekap Grading
          </span>
          <span className="mt-2 block text-sm leading-6 text-neutral-600">
            Format tabel bulanan dengan kolom before dan after.
          </span>
        </button>
        <button
          className="rounded-lg border border-zinc-200 bg-white p-5 text-left shadow-sm transition hover:border-[#036CB6] hover:bg-[#E6F1FA]"
          onClick={() => onSelectMode("tasklist")}
          type="button"
        >
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#A8BC36] text-[#232122]">
            <IoClipboardOutline aria-hidden="true" className="text-xl" />
          </span>
          <span className="mt-4 block text-lg font-bold text-[#232122]">
            Rekap Tasklist
          </span>
          <span className="mt-2 block text-sm leading-6 text-neutral-600">
            Format tabel cycle Daily, Weekly, Monthly, 6 Monthly, dan Yearly.
          </span>
        </button>
      </div>
    </div>
  );
}

function SheetDetail({
  mode,
  onBack,
  period,
  row,
}: {
  mode: RecapMode;
  onBack: () => void;
  period: string;
  row: DashboardLocationRow;
}) {
  const data = useRecapSheetData(row.depotId, period);

  return (
    <div className="grid gap-5">
      <StepHeader
        onBack={onBack}
        subtitle={row.location}
        title={mode === "grading" ? "Rekap Grading" : "Rekap Tasklist"}
      />
      {data.isLoading ? (
        <PageCard>
          <p className="px-5 py-10 text-center text-sm text-neutral-500">
            Memuat data rekap...
          </p>
        </PageCard>
      ) : mode === "grading" ? (
        <GradingSheet
          equipment={data.equipment}
          period={period}
          row={row}
          submissions={data.gradingSubmissions}
        />
      ) : (
        <TasklistSheet
          details={data.tasklistDetails}
          equipment={data.equipment}
          period={period}
          row={row}
        />
      )}
    </div>
  );
}

function StepHeader({
  onBack,
  subtitle,
  title,
}: {
  onBack: () => void;
  subtitle: string;
  title: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-xs font-bold uppercase text-[#036CB6]">{subtitle}</p>
        <h2 className="mt-1 text-xl font-bold text-[#232122]">{title}</h2>
      </div>
      <button
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        onClick={onBack}
        type="button"
      >
        <IoArrowBackOutline aria-hidden="true" className="text-lg" />
        Kembali
      </button>
    </div>
  );
}

function useRecapSheetData(depotId: number, period: string) {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [gradingSubmissions, setGradingSubmissions] = useState<
    GradingSubmission[]
  >([]);
  const [tasklistDetails, setTasklistDetails] = useState<TasklistDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setIsLoading(true);
      setError("");

      try {
        const [equipmentPayload, gradingPayload, tasklistPayload] =
          await Promise.all([
            fetchJson<EquipmentListResponse>(
              `${apiBaseUrl}/equipment?depot_id=${depotId}&limit=100`,
              controller.signal,
            ),
            fetchJson<GradingResponse>(
              `${apiBaseUrl}/grading-submissions?limit=100`,
              controller.signal,
            ),
            fetchJson<TasklistResponse>(
              `${apiBaseUrl}/tasklists?depotId=${depotId}&limit=100`,
              controller.signal,
            ),
          ]);

        const periodSessions = tasklistPayload.items.filter((item) =>
          isTasklistSessionInPeriod(item, period),
        );
        const tasklistDetailPayloads = await Promise.all(
          periodSessions.map((item) =>
            fetchJson<TasklistDetail>(
              `${apiBaseUrl}/tasklists/${item.id}`,
              controller.signal,
            ),
          ),
        );
        const equipmentIds = new Set(
          equipmentPayload.items.map((item) => item.id),
        );
        setEquipment(equipmentPayload.items);
        setGradingSubmissions(
          gradingPayload.items.filter((item) => equipmentIds.has(item.equipmentId)),
        );
        setTasklistDetails(tasklistDetailPayloads);
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Gagal memuat data rekap.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();

    return () => controller.abort();
  }, [depotId, period]);

  return { equipment, gradingSubmissions, tasklistDetails, isLoading, error };
}

function GradingSheet({
  equipment,
  period,
  row,
  submissions,
}: {
  equipment: EquipmentItem[];
  period: string;
  row: DashboardLocationRow;
  submissions: GradingSubmission[];
}) {
  const year = period.slice(0, 4);
  const submissionByEquipment = new Map(
    submissions.map((item) => [item.equipmentId, item]),
  );

  return (
    <ReportShell
      depotName={row.location}
      orientation="landscape"
      title="REKAPITULASI GRADING"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1500px] border-collapse text-[11px] text-[#232122]">
          <thead>
            <tr className="bg-zinc-300 text-center font-bold">
              <th className="border border-black px-2 py-2" rowSpan={2}>
                {row.location}
              </th>
              <th className="border border-black px-2 py-2" rowSpan={2}>
                Deskripsi Equipment
              </th>
              <th className="border border-black px-2 py-2" colSpan={2}>
                Jumlah
              </th>
              <th className="border border-black px-2 py-2" colSpan={24}>
                Grading Period
              </th>
            </tr>
            <tr className="bg-zinc-300 text-center font-bold">
              <th className="border border-black px-2 py-1">SAP</th>
              <th className="border border-black px-2 py-1">Aktual</th>
              {monthLabels.map((month) => (
                <th className="border border-black px-2 py-1" colSpan={2} key={month}>
                  {month}-{year.slice(2)}
                </th>
              ))}
            </tr>
            <tr className="bg-zinc-200 text-center font-bold">
              <th className="border border-black px-2 py-1" />
              <th className="border border-black px-2 py-1" />
              <th className="border border-black px-2 py-1" />
              <th className="border border-black px-2 py-1" />
              {monthLabels.map((month) => (
                <Fragment key={month}>
                  <th className="border border-black px-2 py-1" key={`${month}-before`}>
                    Before
                  </th>
                  <th className="border border-black px-2 py-1" key={`${month}-after`}>
                    After
                  </th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {buildGroupedEquipment(equipment).map((group) => (
              <EquipmentGroupRows
                group={group}
                key={group.title}
                renderRow={(item) => {
                  const submission = submissionByEquipment.get(item.id);
                  const monthIndex = submission
                    ? new Date(submission.inspectionDate).getMonth()
                    : -1;

                  return (
                    <>
                      <td className="border border-black px-2 py-1 text-center">1</td>
                      <td className="border border-black px-2 py-1 text-center">
                        {submission ? "1" : ""}
                      </td>
                      {monthLabels.map((month, index) => (
                        <Fragment key={`${item.id}-${month}`}>
                          <td
                            className="border border-black px-2 py-1 text-center"
                          />
                          <td
                            className="border border-black px-2 py-1 text-center"
                          >
                            {index === monthIndex ? submission?.category : ""}
                          </td>
                        </Fragment>
                      ))}
                    </>
                  );
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
    </ReportShell>
  );
}

function TasklistSheet({
  details,
  equipment,
  period,
  row,
}: {
  details: TasklistDetail[];
  equipment: EquipmentItem[];
  period: string;
  row: DashboardLocationRow;
}) {
  const tasklistRows = buildTasklistRows(details, equipment);
  const totals = details.reduce(
    (result, session) => ({
      plan: result.plan + session.session.totalTasklistPlan,
      real: result.real + session.session.totalTasklistSelesai,
    }),
    { plan: 0, real: 0 },
  );
  const kpi = totals.plan ? (totals.real / totals.plan) * 100 : 0;

  return (
    <ReportShell
      depotName={row.location}
      orientation="portrait"
      title="REKAPITULASI TASKLIST"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-collapse text-[11px] text-[#232122]">
          <thead>
            <tr className="bg-zinc-300 text-center font-bold">
              <th className="border border-black px-2 py-2" rowSpan={3}>
                {row.location}
              </th>
              <th className="border border-black px-2 py-2" rowSpan={3}>
                Deskripsi Equipment
              </th>
              <th className="border border-black px-2 py-2" colSpan={10}>
                Tasklist Executing
              </th>
            </tr>
            <tr className="bg-zinc-300 text-center font-bold">
              {tasklistCycles.map((cycle) => (
                <th className="border border-black px-2 py-1" colSpan={2} key={cycle.key}>
                  {cycle.label}
                </th>
              ))}
            </tr>
            <tr className="bg-zinc-200 text-center font-bold">
              {tasklistCycles.map((cycle) => (
                <Fragment key={cycle.key}>
                  <th className="border border-black px-2 py-1" key={`${cycle.key}-plan`}>
                    Plan
                  </th>
                  <th className="border border-black px-2 py-1" key={`${cycle.key}-real`}>
                    Real
                  </th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {buildGroupedTasklistRows(tasklistRows).map((group) => (
              <TasklistGroupRows
                group={group}
                key={group.title}
                renderRow={(item) => {
                  return tasklistCycles.map((cycle) => {
                    const value = item.values[cycle.key];

                    return (
                      <Fragment key={`${item.tag}-${item.description}-${cycle.key}`}>
                        <td
                          className="border border-black px-2 py-1 text-center"
                        >
                          {value.plan || ""}
                        </td>
                        <td
                          className="border border-black px-2 py-1 text-center"
                        >
                          {value.real || ""}
                        </td>
                      </Fragment>
                    );
                  });
                }}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-[11px] text-[#232122]">
          <tbody>
            <tr>
              <td className="border border-black px-3 py-1 text-center" colSpan={4}>
                Rekapitulasi TASKLIST Depot {row.location} Periode {formatPeriod(period)}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-3 py-1 text-right" colSpan={2}>
                TOTAL TASKLIST PLAN:
              </td>
              <td className="border border-black px-3 py-1" colSpan={2}>
                {totals.plan}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-3 py-1 text-right" colSpan={2}>
                TOTAL TASKLIST REAL:
              </td>
              <td className="border border-black px-3 py-1" colSpan={2}>
                {totals.real}
              </td>
            </tr>
            <tr>
              <td className="border border-black px-3 py-1 text-right" colSpan={2}>
                KPI TASKLIST REAL/PLAN (%):
              </td>
              <td className="border border-black px-3 py-1" colSpan={2}>
                {kpi.toFixed(2)}%
              </td>
            </tr>
            <tr className="text-center font-bold">
              <td className="border border-black px-3 py-1">Entitas</td>
              <td className="border border-black px-3 py-1">
                Disiapkan Oleh,
                <br />
                PT Pertamina Maintenance and Construction
              </td>
              <td className="border border-black px-3 py-1">
                Diketahui Oleh,
                <br />
                PT Pertamina Patra Niaga
              </td>
              <td className="border border-black px-3 py-1">
                Disetujui Oleh,
                <br />
                PT Pertamina Patra Niaga
              </td>
            </tr>
            <tr className="h-20">
              <td className="border border-black px-3 py-1 text-center">Tanda Tangan</td>
              <td className="border border-black px-3 py-1" />
              <td className="border border-black px-3 py-1" />
              <td className="border border-black px-3 py-1" />
            </tr>
            <tr>
              <td className="border border-black px-3 py-1 text-center">Nama</td>
              <td className="border border-black px-3 py-1 text-center">-</td>
              <td className="border border-black px-3 py-1 text-center">-</td>
              <td className="border border-black px-3 py-1 text-center">-</td>
            </tr>
            <tr>
              <td className="border border-black px-3 py-1 text-center">Jabatan</td>
              <td className="border border-black px-3 py-1 text-center">-</td>
              <td className="border border-black px-3 py-1 text-center">-</td>
              <td className="border border-black px-3 py-1 text-center">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ReportShell>
  );
}

function ReportShell({
  children,
  depotName,
  orientation,
  title,
}: {
  children: ReactNode;
  depotName: string;
  orientation: "landscape" | "portrait";
  title: string;
}) {
  return (
    <PageCard className="bg-white">
      <div className="overflow-x-auto p-4">
        <div
          className={`mx-auto border border-black bg-white p-4 ${
            orientation === "landscape" ? "min-w-[1540px]" : "min-w-[1040px]"
          }`}
        >
          <div className="grid grid-cols-[160px_minmax(0,1fr)_180px] items-center border border-black text-center text-[11px] text-[#232122]">
            <div className="flex h-14 items-center justify-center border-r border-black px-3">
              <Image
                alt="Pertamina Patra Niaga"
                className="h-auto max-h-10 w-full object-contain"
                height={94}
                src="/logo/logo1.png"
                width={250}
              />
            </div>
            <div>
              <p className="font-bold">{title}</p>
              <p className="font-bold">
                Long Term Service Agreement (LTSA) Preventive Maintenance &
                Corrective Maintenance
              </p>
              <p className="font-bold">
                Sarana dan Fasilitas Operasi di IT/FT PT Pertamina Patra Niaga
              </p>
            </div>
            <div className="flex h-14 items-center justify-center border-l border-black px-3">
              <Image
                alt="Pertamina Maintenance and Construction"
                className="h-auto max-h-10 w-full object-contain"
                height={58}
                src="/logo/logo2.png"
                width={242}
              />
            </div>
          </div>
          <p className="mt-2 text-xs font-bold uppercase text-[#232122]">
            {depotName}
          </p>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </PageCard>
  );
}

function EquipmentGroupRows({
  group,
  renderRow,
}: {
  group: { title: string; items: EquipmentItem[] };
  renderRow: (item: EquipmentItem) => ReactNode;
}) {
  if (group.items.length === 0) return null;

  return (
    <>
      <tr className="font-bold">
        <td className="border border-black px-2 py-1">{group.title}</td>
        <td className="border border-black px-2 py-1" />
      </tr>
      {group.items.map((item) => (
        <tr key={item.id}>
          <td className="border border-black px-2 py-1">
            {getEquipmentTag(item)}
          </td>
          <td className="border border-black px-2 py-1">
            {getEquipmentDescription(item)}
          </td>
          {renderRow(item)}
        </tr>
      ))}
    </>
  );
}

function TasklistGroupRows({
  group,
  renderRow,
}: {
  group: { title: string; items: TasklistRecapRow[] };
  renderRow: (item: TasklistRecapRow) => ReactNode;
}) {
  if (group.items.length === 0) return null;

  return (
    <>
      <tr className="font-bold">
        <td className="border border-black px-2 py-1">{group.title}</td>
        <td className="border border-black px-2 py-1" />
        {tasklistCycles.flatMap((cycle) => [
          <td
            className="border border-black px-2 py-1"
            key={`${group.title}-${cycle.key}-plan`}
          />,
          <td
            className="border border-black px-2 py-1"
            key={`${group.title}-${cycle.key}-real`}
          />,
        ])}
      </tr>
      {group.items.map((item, index) => (
        <tr key={`${item.tag}-${item.description}-${index}`}>
          <td className="border border-black px-2 py-1">{item.tag}</td>
          <td className="border border-black px-2 py-1">{item.description}</td>
          {renderRow(item)}
        </tr>
      ))}
    </>
  );
}

async function fetchJson<T>(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal });
  const envelope = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok) {
    throw new Error("Gagal memuat data rekap.");
  }

  return envelope.data;
}

function buildGroupedEquipment(equipment: EquipmentItem[]) {
  return equipmentGroups.map((group) => ({
    title: group.title,
    items: equipment.filter((item) => {
      return getEquipmentTypeCode(item.equipmentType) === group.code;
    }),
  }));
}

function buildGroupedTasklistRows(rows: TasklistRecapRow[]) {
  return equipmentGroups.map((group) => ({
    title: group.title,
    items: rows.filter((item) => item.equipmentTypeCode === group.code),
  }));
}

function buildTasklistRows(
  details: TasklistDetail[],
  equipment: EquipmentItem[],
): TasklistRecapRow[] {
  const equipmentById = new Map(equipment.map((item) => [item.id, item]));
  const rows = new Map<string, TasklistRecapRow>();

  for (const detail of details) {
    const occurrence = getTasklistOccurrence(detail);
    const planPerEquipment = detail.tasks.length * occurrence;

    for (const sessionEquipment of detail.equipment) {
      const masterEquipment = equipmentById.get(sessionEquipment.id);
      const rowKey = sessionEquipment.id;
      const row =
        rows.get(rowKey) ??
        createTasklistRow(sessionEquipment, masterEquipment);
      const completedTaskCount = detail.resultsByTask.filter((taskResult) => {
        return taskResult.results.some((result) => {
          return (
            result.equipmentId === sessionEquipment.id && result.performance
          );
        });
      }).length;
      const cycleValue = row.values[detail.session.cycle];

      cycleValue.plan += planPerEquipment;
      cycleValue.real += completedTaskCount * occurrence;
      rows.set(rowKey, row);
    }
  }

  return Array.from(rows.values());
}

function createTasklistRow(
  sessionEquipment: TasklistDetail["equipment"][number],
  masterEquipment: EquipmentItem | undefined,
): TasklistRecapRow {
  return {
    equipmentTypeCode: getEquipmentTypeCode(
      masterEquipment?.equipmentType ?? sessionEquipment.equipmentType,
    ),
    tag: sessionEquipment.tagNumber || "-",
    description: getTasklistDescription(masterEquipment),
    values: createEmptyTasklistValues(),
  };
}

function createEmptyTasklistValues(): TasklistRecapRow["values"] {
  return {
    DAILY: { plan: 0, real: 0 },
    WEEKLY: { plan: 0, real: 0 },
    MONTHLY: { plan: 0, real: 0 },
    SIX_MONTHLY: { plan: 0, real: 0 },
    YEARLY: { plan: 0, real: 0 },
  };
}

function getTasklistOccurrence(detail: TasklistDetail) {
  const divisor = detail.tasks.length * detail.equipment.length;
  if (!divisor) return 0;

  return Math.round(detail.session.totalTasklistPlan / divisor);
}

function getTasklistDescription(
  equipment: EquipmentItem | undefined,
) {
  const equipmentDescription = equipment ? getEquipmentDescription(equipment) : "";
  if (!equipmentDescription || equipmentDescription === "-") return "-";

  return equipmentDescription;
}

function isTasklistSessionInPeriod(session: TasklistSession, period: string) {
  const [year, month] = period.split("-").map(Number);
  if (session.year === year && session.monthNumber === month) return true;
  return session.periodDate?.slice(0, 7) === period;
}

function getEquipmentTypeCode(type: string) {
  if (type.includes("GENERATOR")) return "GST";
  if (type.includes("MOTOR_OPERATED_VALVE")) return "MOV";
  if (type.includes("FLOW_METER")) return "MTR";
  if (type.includes("PIPING")) return "PIP";
  if (type.includes("PUMP")) return "PMP";
  if (type.includes("SWITCHGEAR")) return "SGR";
  if (type.includes("TANK")) return "TNK";
  if (type.includes("TRANSFORMER")) return "TRF";
  if (type.includes("UPS")) return "UPS";

  return type;
}

function getEquipmentTag(item: EquipmentItem) {
  return (
    formatValue(item.identity.tagNumber) ||
    formatValue(item.identity.lineNumber) ||
    "-"
  );
}

function getEquipmentDescription(item: EquipmentItem) {
  return (
    formatValue(item.identity.lineDescription) ||
    [item.maker?.manufacturer, item.maker?.model]
      .map(formatValue)
      .filter(Boolean)
      .join(", ") ||
    formatValue(item.identity.location) ||
    "-"
  );
}

function formatPeriod(value: string) {
  if (!value) return "-";
  const [year, month] = value.split("-");
  const monthIndex = Number(month) - 1;

  return `${monthLabels[monthIndex] ?? month}-${year}`;
}

function formatValue(value: unknown) {
  if (value === undefined || value === null || value === "") return "";
  return String(value);
}
