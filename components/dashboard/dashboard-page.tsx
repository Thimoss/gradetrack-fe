"use client";

import type {
  DashboardCategoryCount,
  DashboardLocationRow,
} from "@/hooks/use-dashboard-page";
import { ErrorBanner, PageCard, PageShell } from "@/components/ui/page-section";
import { useDashboardPage } from "@/hooks/use-dashboard-page";
import {
  IoAnalyticsOutline,
  IoBusinessOutline,
  IoCheckmarkCircleOutline,
  IoClipboardOutline,
  IoStatsChartOutline,
  IoTrendingDownOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

const trendLabel: Record<DashboardLocationRow["gradingKpi"]["trend"], string> =
  {
    UP: "Naik",
    DOWN: "Turun",
    FLAT: "Stabil",
  };

const trendClassName: Record<
  DashboardLocationRow["gradingKpi"]["trend"],
  string
> = {
  UP: "text-[#A8BC36]",
  DOWN: "text-[#E91D32]",
  FLAT: "text-slate-600",
};

const trendBadgeClassName: Record<
  DashboardLocationRow["gradingKpi"]["trend"],
  string
> = {
  UP: "border-[#DDE9A3] bg-[#F4F8DE] text-[#7C9324]",
  DOWN: "border-[#F6B9C0] bg-[#FDE8EB] text-[#E91D32]",
  FLAT: "border-zinc-200 bg-slate-50 text-slate-600",
};

const categoryTone = {
  LOW: {
    bar: "bg-[#A8BC36]",
    bg: "bg-[#F4F8DE]",
    text: "text-[#7C9324]",
  },
  MED: {
    bar: "bg-[#F5A524]",
    bg: "bg-[#FFF3D8]",
    text: "text-[#A86500]",
  },
  HIGH: {
    bar: "bg-[#E91D32]",
    bg: "bg-[#FDE8EB]",
    text: "text-[#E91D32]",
  },
};

function CountCells({ count }: { count: DashboardCategoryCount }) {
  return (
    <>
      <td className="border border-zinc-200 px-3 py-3 text-center">
        {count.LOW}
      </td>
      <td className="border border-zinc-200 px-3 py-3 text-center">
        {count.MED}
      </td>
      <td className="border border-zinc-200 px-3 py-3 text-center">
        {count.HIGH}
      </td>
    </>
  );
}

function getCategoryTotal(count: DashboardCategoryCount) {
  return count.LOW + count.MED + count.HIGH;
}

function getPercent(value: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((value / total) * 100);
}

function SummaryCard({
  icon,
  label,
  value,
  helper,
  progress,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  helper: string;
  progress?: number;
}) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-bold leading-none text-[#232122]">
            {value}
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#E6F1FA] text-xl text-[#036CB6]">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-sm text-neutral-600">{helper}</p>
      {progress !== undefined ? (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[#036CB6]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      ) : null}
    </article>
  );
}

export function DashboardPage() {
  const { errorMessage, isLoading, metrics, period, setPeriod, summary } =
    useDashboardPage();
  const hasRows = summary.rows.length > 0;
  const afterTotal = getCategoryTotal(summary.totals.after);
  const bestBeforeTotal = getCategoryTotal(summary.totals.bestBefore);
  const improvedLocations = summary.rows.filter(
    (row) => row.gradingKpi.trend === "UP",
  ).length;
  const watchedLocations = summary.rows.filter(
    (row) => row.gradingKpi.trend !== "UP",
  ).length;
  const tasklistGap =
    summary.totals.tasklist.plan - summary.totals.tasklist.real;

  return (
    <PageShell>
      <header className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase text-slate-500">
              Ringkasan Operasional
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#232122]">
              Dashboard LTSA
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600">
              Pantau hasil grading, progress tasklist, dan kondisi tiap lokasi.
            </p>
          </div>
          <label className="grid gap-1 text-sm font-semibold text-neutral-800">
            Periode
            <input
              className="h-10 rounded-lg border border-zinc-300 px-3 text-sm font-semibold text-[#232122]"
              onChange={(event) => setPeriod(event.target.value)}
              type="month"
              value={period}
            />
          </label>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <div className="rounded-lg bg-[#E6F1FA] px-4 py-3">
            <p className="text-sm font-bold uppercase text-[#036CB6]">
              After dinilai
            </p>
            <p className="mt-1 text-lg font-bold text-[#232122]">
              {afterTotal} aset
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-sm font-bold uppercase text-slate-500">
              Best before
            </p>
            <p className="mt-1 text-lg font-bold text-[#232122]">
              {bestBeforeTotal} aset
            </p>
          </div>
          <div className="rounded-lg bg-[#F4F8DE] px-4 py-3">
            <p className="text-sm font-bold uppercase text-[#7C9324]">
              KPI naik
            </p>
            <p className="mt-1 text-lg font-bold text-[#232122]">
              {improvedLocations} lokasi
            </p>
          </div>
          <div className="rounded-lg bg-[#FFF3D8] px-4 py-3">
            <p className="text-sm font-bold uppercase text-[#A86500]">
              Sisa tasklist
            </p>
            <p className="mt-1 text-lg font-bold text-[#232122]">
              {Math.max(tasklistGap, 0)} item
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          helper="Lokasi pada master data"
          icon={<IoBusinessOutline aria-hidden="true" />}
          label="Lokasi"
          value={metrics.locationCount}
        />
        <SummaryCard
          helper="Peralatan yang sudah dinilai"
          icon={<IoCheckmarkCircleOutline aria-hidden="true" />}
          label="Grading selesai"
          value={metrics.gradedEquipmentCount}
          progress={getPercent(metrics.gradedEquipmentCount, afterTotal)}
        />
        <SummaryCard
          helper={`${summary.totals.tasklist.real}/${summary.totals.tasklist.plan} realisasi`}
          icon={<IoClipboardOutline aria-hidden="true" />}
          label="Tasklist"
          value={`${metrics.tasklistProgress}%`}
          progress={metrics.tasklistProgress}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <PageCard>
          <div className="border-b border-zinc-200 px-5 py-4">
            <h2 className="text-lg font-bold text-[#232122]">
              Kondisi aset setelah grading
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Distribusi kategori after untuk monitoring prioritas.
            </p>
          </div>
          <div className="p-5">
            <div className="flex h-4 overflow-hidden rounded-full bg-slate-100">
              {(["LOW", "MED", "HIGH"] as const).map((category) => {
                const value = summary.totals.after[category];
                const width = getPercent(value, afterTotal);
                return (
                  <div
                    className={categoryTone[category].bar}
                    key={category}
                    style={{ width: `${width}%` }}
                  />
                );
              })}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(["LOW", "MED", "HIGH"] as const).map((category) => {
                const value = summary.totals.after[category];
                return (
                  <div
                    className={`rounded-lg px-4 py-3 ${categoryTone[category].bg}`}
                    key={category}
                  >
                    <p
                      className={`text-sm font-bold uppercase ${categoryTone[category].text}`}
                    >
                      {category}
                    </p>
                    <p className="mt-1 text-xl font-bold text-[#232122]">
                      {value}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {getPercent(value, afterTotal)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </PageCard>

        <PageCard>
          <div className="border-b border-zinc-200 px-5 py-4">
            <h2 className="text-lg font-bold text-[#232122]">
              Status monitoring
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Fokus cepat untuk lokasi dan tasklist.
            </p>
          </div>
          <div className="grid gap-3 p-5">
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
              <span className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <IoTrendingUpOutline
                  aria-hidden="true"
                  className="text-xl text-[#A8BC36]"
                />
                Lokasi membaik
              </span>
              <span className="text-lg font-bold text-[#232122]">
                {improvedLocations}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-4">
              <span className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                <IoTrendingDownOutline
                  aria-hidden="true"
                  className="text-xl text-[#E91D32]"
                />
                Perlu dipantau
              </span>
              <span className="text-lg font-bold text-[#232122]">
                {watchedLocations}
              </span>
            </div>
            <div className="rounded-lg border border-zinc-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                  <IoStatsChartOutline
                    aria-hidden="true"
                    className="text-xl text-[#036CB6]"
                  />
                  Progress tasklist
                </span>
                <span className="text-lg font-bold text-[#232122]">
                  {summary.totals.tasklist.progress}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#036CB6]"
                  style={{ width: `${summary.totals.tasklist.progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-neutral-600">
                {summary.totals.tasklist.real} realisasi dari{" "}
                {summary.totals.tasklist.plan} rencana.
              </p>
            </div>
          </div>
        </PageCard>
      </section>

      {errorMessage ? <ErrorBanner>{errorMessage}</ErrorBanner> : null}

      <PageCard>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-bold uppercase text-[#036CB6]">
              <IoAnalyticsOutline aria-hidden="true" />
              Detail monitoring
            </p>
            <h2 className="mt-1 text-lg font-bold text-[#232122]">
              Rekap per lokasi
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Before, after, best before, KPI grading, serta rencana dan
              realisasi tasklist.
            </p>
          </div>
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-bold text-slate-600">
            {summary.periodLabel}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-center text-xs font-bold uppercase text-slate-700">
                <th
                  className="border border-zinc-200 px-4 py-3 text-left"
                  rowSpan={2}
                >
                  Lokasi
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  Before
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  After
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  Best Before
                </th>
                <th className="border border-zinc-200 px-3 py-3" rowSpan={2}>
                  KPI Grad
                </th>
                <th className="border border-zinc-200 px-3 py-3" rowSpan={2}>
                  Progress
                </th>
                <th className="border border-zinc-200 px-3 py-3" colSpan={3}>
                  Tasklist
                </th>
              </tr>
              <tr className="bg-slate-50 text-center text-xs font-bold uppercase text-slate-600">
                {[
                  "LOW",
                  "MED",
                  "HIGH",
                  "LOW",
                  "MED",
                  "HIGH",
                  "LOW",
                  "MED",
                  "HIGH",
                ].map((label, index) => (
                  <th className="border border-zinc-200 px-3 py-2" key={index}>
                    {label}
                  </th>
                ))}
                <th className="border border-zinc-200 px-3 py-2">Plan</th>
                <th className="border border-zinc-200 px-3 py-2">Real</th>
                <th className="border border-zinc-200 px-3 py-2">%</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    className="border border-zinc-200 px-4 py-8 text-center text-sm font-semibold text-slate-500"
                    colSpan={15}
                  >
                    Memuat data dashboard...
                  </td>
                </tr>
              ) : null}

              {!isLoading && !hasRows ? (
                <tr>
                  <td
                    className="border border-zinc-200 px-4 py-8 text-center text-sm font-semibold text-slate-500"
                    colSpan={15}
                  >
                    Belum ada data lokasi untuk periode ini.
                  </td>
                </tr>
              ) : null}

              {!isLoading
                ? summary.rows.map((row) => (
                    <tr className="hover:bg-slate-50" key={row.depotId}>
                      <th className="sticky left-0 z-10 border border-zinc-200 bg-white px-4 py-4 text-left font-bold text-[#232122]">
                        <span className="block">{row.location}</span>
                        <span className="mt-1 block text-xs font-medium text-slate-500">
                          {row.city}
                        </span>
                      </th>
                      <CountCells count={row.before} />
                      <CountCells count={row.after} />
                      <CountCells count={row.bestBefore} />
                      <td className="border border-zinc-200 px-3 py-3 text-center">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${trendBadgeClassName[row.gradingKpi.trend]}`}
                        >
                          {trendLabel[row.gradingKpi.trend]}
                        </span>
                      </td>
                      <td
                        className={`border border-zinc-200 px-3 py-3 text-center font-bold ${trendClassName[row.gradingKpi.trend]}`}
                      >
                        {row.gradingProgress}
                      </td>
                      <td className="border border-zinc-200 px-3 py-3 text-center">
                        {row.tasklist.plan}
                      </td>
                      <td className="border border-zinc-200 px-3 py-3 text-center">
                        {row.tasklist.real}
                      </td>
                      <td className="border border-zinc-200 px-3 py-3 text-center">
                        <div className="mx-auto w-20">
                          <p className="text-sm font-bold text-[#232122]">
                            {row.tasklist.progress}%
                          </p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-[#036CB6]"
                              style={{ width: `${row.tasklist.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold text-[#232122]">
                <th className="border border-zinc-200 px-4 py-3 text-left">
                  Total
                </th>
                <CountCells count={summary.totals.before} />
                <CountCells count={summary.totals.after} />
                <CountCells count={summary.totals.bestBefore} />
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  -
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  -
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  {summary.totals.tasklist.plan}
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  {summary.totals.tasklist.real}
                </td>
                <td className="border border-zinc-200 px-3 py-3 text-center">
                  {summary.totals.tasklist.progress}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </PageCard>
    </PageShell>
  );
}
