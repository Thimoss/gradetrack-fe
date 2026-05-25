"use client";

import { useMemo, useState } from "react";
import {
  IoArrowBackOutline,
  IoBarChartOutline,
  IoBusinessOutline,
  IoClipboardOutline,
  IoListOutline,
} from "react-icons/io5";
import type {
  DashboardCategoryCount,
  DashboardLocationRow,
} from "@/hooks/use-dashboard-page";
import { ErrorBanner, PageCard, PageShell } from "@/components/ui/page-section";
import { useDashboardPage } from "@/hooks/use-dashboard-page";

type RecapMode = "grading" | "tasklist";

const trendLabel: Record<DashboardLocationRow["gradingKpi"]["trend"], string> =
  {
    UP: "Naik",
    DOWN: "Turun",
    FLAT: "Stabil",
  };

function CountCells({ count }: { count: DashboardCategoryCount }) {
  return (
    <>
      <td className="border border-zinc-200 px-4 py-3 text-center">{count.LOW}</td>
      <td className="border border-zinc-200 px-4 py-3 text-center">{count.MED}</td>
      <td className="border border-zinc-200 px-4 py-3 text-center">{count.HIGH}</td>
    </>
  );
}

export function RecapPage() {
  const { errorMessage, isLoading, period, setPeriod, summary } =
    useDashboardPage();
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

  function backToMode() {
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
            Pilih depot terlebih dahulu, lalu pilih jenis rekap yang ingin
            dilihat.
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

      {errorMessage ? <ErrorBanner>{errorMessage}</ErrorBanner> : null}

      {!selectedDepot ? (
        <DepotList
          isLoading={isLoading}
          onSelectDepot={selectDepot}
          rows={summary.rows}
        />
      ) : selectedMode ? (
        <RecapDetail
          mode={selectedMode}
          onBack={backToMode}
          row={selectedDepot}
          periodLabel={summary.periodLabel}
        />
      ) : (
        <RecapModePicker
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

function RecapModePicker({
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
            Lihat ringkasan kategori before, after, best before, dan KPI
            grading untuk depot ini.
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
            Lihat rencana, realisasi, dan persentase penyelesaian tasklist
            untuk depot ini.
          </span>
        </button>
      </div>
    </div>
  );
}

function RecapDetail({
  mode,
  onBack,
  periodLabel,
  row,
}: {
  mode: RecapMode;
  onBack: () => void;
  periodLabel: string;
  row: DashboardLocationRow;
}) {
  return (
    <div className="grid gap-5">
      <StepHeader
        onBack={onBack}
        subtitle={`${row.location} - ${periodLabel}`}
        title={mode === "grading" ? "Rekap Grading" : "Rekap Tasklist"}
      />
      {mode === "grading" ? (
        <GradingRecapTable row={row} />
      ) : (
        <TasklistRecapTable row={row} />
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

function GradingRecapTable({ row }: { row: DashboardLocationRow }) {
  return (
    <PageCard>
      <div className="border-b border-zinc-200 px-5 py-4">
        <h3 className="text-base font-bold text-[#232122]">
          Ringkasan Equipment Grading
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#036CB6] text-center text-xs font-bold uppercase text-white">
              <th className="border border-zinc-200 px-4 py-3 text-left" rowSpan={2}>
                Depot
              </th>
              <th className="border border-zinc-200 px-4 py-3" colSpan={3}>
                Before
              </th>
              <th className="border border-zinc-200 px-4 py-3" colSpan={3}>
                After
              </th>
              <th className="border border-zinc-200 px-4 py-3" colSpan={3}>
                Best Before
              </th>
              <th className="border border-zinc-200 px-4 py-3" rowSpan={2}>
                KPI
              </th>
              <th className="border border-zinc-200 px-4 py-3" rowSpan={2}>
                Progress
              </th>
            </tr>
            <tr className="bg-[#E6F1FA] text-center text-xs font-bold uppercase text-[#232122]">
              {["LOW", "MED", "HIGH", "LOW", "MED", "HIGH", "LOW", "MED", "HIGH"].map(
                (label, index) => (
                  <th className="border border-zinc-200 px-4 py-2" key={index}>
                    {label}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-zinc-200 px-4 py-3 text-left text-[#232122]">
                {row.location}
              </th>
              <CountCells count={row.before} />
              <CountCells count={row.after} />
              <CountCells count={row.bestBefore} />
              <td className="border border-zinc-200 px-4 py-3 text-center font-bold">
                {trendLabel[row.gradingKpi.trend]}
              </td>
              <td className="border border-zinc-200 px-4 py-3 text-center font-bold">
                {row.gradingProgress}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}

function TasklistRecapTable({ row }: { row: DashboardLocationRow }) {
  return (
    <PageCard>
      <div className="border-b border-zinc-200 px-5 py-4">
        <h3 className="text-base font-bold text-[#232122]">
          Ringkasan Tasklist
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#036CB6] text-left text-xs font-bold uppercase text-white">
              <th className="border border-zinc-200 px-4 py-3">Depot</th>
              <th className="border border-zinc-200 px-4 py-3 text-center">
                Rencana
              </th>
              <th className="border border-zinc-200 px-4 py-3 text-center">
                Realisasi
              </th>
              <th className="border border-zinc-200 px-4 py-3 text-center">
                Progress
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-zinc-200 px-4 py-3 text-left text-[#232122]">
                <span className="inline-flex items-center gap-2">
                  <IoListOutline aria-hidden="true" className="text-[#036CB6]" />
                  {row.location}
                </span>
              </th>
              <td className="border border-zinc-200 px-4 py-3 text-center">
                {row.tasklist.plan}
              </td>
              <td className="border border-zinc-200 px-4 py-3 text-center">
                {row.tasklist.real}
              </td>
              <td className="border border-zinc-200 px-4 py-3 text-center font-bold text-[#232122]">
                {row.tasklist.progress}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageCard>
  );
}
