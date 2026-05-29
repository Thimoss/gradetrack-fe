"use client";

import { apiBaseUrl } from "@/lib/api-client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { GeneratorEquipmentCategorySection } from "@/components/grading-form/generator-equipment-category-section";
import { GradingFormSection } from "@/components/grading-form/grading-form-section";
import { TasklistHeaderSection } from "@/components/tasklist/tasklist-header-section";

type SubmissionKind = "grading" | "tasklist";

type SubmissionDetailPageProps = {
  id: string;
  kind: SubmissionKind;
};

type ApiEnvelope<T> = {
  data: T;
};

type DetailData = GradingSubmissionDetail | TasklistSubmissionDetail;

type GradingSubmissionDetail = {
  id: string;
  equipmentType: string;
  inspectionDate: string;
  equipment?: {
    tagNumber?: string;
    location?: string | null;
    equipmentType?: string;
  };
  equipmentData?: Record<string, unknown> | null;
  fieldData?: Record<string, unknown> | null;
  majorConditions?: Record<string, unknown> | null;
  assessmentItems?: GradingAssessmentItem[] | null;
  conclusion?: Record<string, unknown> | null;
  totalScore?: number;
  category?: string;
  approvalStatus?: string;
  createdBy?: string | null;
  createdAt?: string;
};

type GradingAssessmentItem = {
  key?: string;
  parameter?: string;
  selectedValue?: number;
  weight?: number;
  score?: number;
};

type TasklistSubmissionDetail = {
  session: {
    id: string;
    equipmentType: string;
    cycle: string;
    periodDate: string;
    executionDate?: string | null;
    location: string;
    year: number;
    monthNumber: number;
    weekNumber: number;
    totalTasklistPlan: number;
    totalTasklistSelesai: number;
    approvalStatus?: string;
    remarks?: string | null;
    createdBy?: string | null;
    createdAt?: string;
  };
  equipment: Array<{
    id: string;
    tagNumber: string;
  }>;
  tasks: Array<{
    id: string;
    code: string;
    description: string;
    durationMinutes: number;
    procedure: string;
    acceptanceCriteria: string;
    inputType: string;
    measurementLabel?: string | null;
    measurementUnit?: string | null;
  }>;
  resultsByTask: Array<{
    taskId: string;
    taskCode: string;
    results: Array<{
      equipmentId: string;
      performance: string;
      measuredValue?: string | null;
      note?: string | null;
    }>;
  }>;
};

export function SubmissionDetailPage({ id, kind }: SubmissionDetailPageProps) {
  const [data, setData] = useState<DetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadDetail() {
      setIsLoading(true);
      setError("");

      try {
        const endpoint =
          kind === "grading"
            ? `${apiBaseUrl}/grading-submissions/${id}`
            : `${apiBaseUrl}/tasklists/${id}`;
        const response = await fetch(endpoint, { signal: controller.signal });
        const envelope = (await response.json()) as ApiEnvelope<DetailData>;

        if (!response.ok) {
          throw new Error("Gagal memuat detail submission.");
        }

        setData(envelope.data);
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
            : "Gagal memuat detail submission.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadDetail();

    return () => controller.abort();
  }, [id, kind]);

  const title =
    kind === "grading" && isGradingSubmissionDetail(data)
      ? getEquipmentLabel(data.equipmentType)
      : kind;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <section className="rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[#036CB6]">
              Detail Pengajuan
            </p>
            <h1 className="mt-1 text-2xl font-bold capitalize text-[#232122]">
              {title}
            </h1>
          </div>
          <Link
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            href="/submissions"
          >
            <IoArrowBackOutline aria-hidden="true" className="text-lg" />
            Kembali
          </Link>
        </div>

        {error ? (
          <div className="border-b border-[#f6b9c0] bg-[#FDE8EB] px-5 py-3 text-sm font-medium text-[#E91D32]">
            {error}
          </div>
        ) : null}

        <div className="p-5">
          {isLoading ? (
            <p className="text-sm text-neutral-500">Memuat detail...</p>
          ) : data && kind === "grading" && isGradingSubmissionDetail(data) ? (
            <GradingSubmissionView data={data} />
          ) : data && kind === "tasklist" && isTasklistSubmissionDetail(data) ? (
            <TasklistSubmissionView data={data} />
          ) : (
            <p className="rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3 text-sm text-neutral-500">
              Detail pengajuan belum tersedia.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function GradingSubmissionView({ data }: { data: GradingSubmissionDetail }) {
  const totalScore = data.totalScore ?? 0;

  return (
    <div className="flex flex-col gap-5">
      <GradingFormSection title="Data Pengajuan">
        <dl className="grid gap-3 text-sm text-[#232122] md:grid-cols-2">
          <InfoItem label="Jenis Peralatan" value={getEquipmentLabel(data.equipmentType)} />
          <InfoItem label="Nomor Tag" value={data.equipment?.tagNumber ?? "-"} />
          <InfoItem label="Tanggal Penilaian" value={formatDate(data.inspectionDate)} />
          <InfoItem label="Lokasi" value={data.equipment?.location ?? "-"} />
          <InfoItem label="Status" value={formatStatus(data.approvalStatus)} />
          <InfoItem label="Dibuat Oleh" value={data.createdBy ?? "-"} />
        </dl>
      </GradingFormSection>

      <JsonRecordSection title="Data Peralatan" data={data.equipmentData} />
      <JsonRecordSection title="Data Lapangan" data={data.fieldData} />
      <JsonRecordSection title="Kondisi Major" data={data.majorConditions} />

      <GradingAssessmentTable
        items={data.assessmentItems ?? []}
        totalScore={totalScore}
      />
      <GeneratorEquipmentCategorySection totalScore={totalScore} />
      <JsonRecordSection title="Kesimpulan" data={data.conclusion} />
    </div>
  );
}

function TasklistSubmissionView({ data }: { data: TasklistSubmissionDetail }) {
  const userRemarks = getUserTasklistRemarks(data.session.remarks);

  return (
    <div className="flex flex-col gap-5">
      <TasklistHeaderSection
        reportDate={formatDate(data.session.periodDate)}
        location={data.session.location}
        year={String(data.session.year)}
        monthNumber={String(data.session.monthNumber)}
        weekNumber={String(data.session.weekNumber)}
        totalTasklistPlan={data.session.totalTasklistPlan}
        totalTasklistSelesai={data.session.totalTasklistSelesai}
      />

      <GradingFormSection title="Status Pengajuan">
        <dl className="grid gap-3 text-sm text-[#232122] md:grid-cols-2">
          <InfoItem label="Peralatan" value={data.session.equipmentType} />
          <InfoItem label="Siklus" value={data.session.cycle} />
          <InfoItem label="Tanggal Pelaksanaan" value={formatDate(data.session.executionDate)} />
          <InfoItem label="Status" value={formatStatus(data.session.approvalStatus)} />
          <InfoItem label="Dibuat Oleh" value={data.session.createdBy ?? "-"} />
          {userRemarks ? <InfoItem label="Keterangan" value={userRemarks} /> : null}
        </dl>
      </GradingFormSection>

      {data.equipment.map((equipment) => (
        <TasklistEquipmentResult
          data={data}
          equipmentId={equipment.id}
          tagNumber={equipment.tagNumber}
          key={equipment.id}
        />
      ))}
    </div>
  );
}

function TasklistEquipmentResult({
  data,
  equipmentId,
  tagNumber,
}: {
  data: TasklistSubmissionDetail;
  equipmentId: string;
  tagNumber: string;
}) {
  const finishedCount = data.tasks.filter((task) => {
    return getTaskResult(data, task.id, equipmentId)?.performance;
  }).length;

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-slate-50 px-5 py-3">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-[#232122]">
            {tagNumber}
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            {data.session.equipmentType} ({data.session.cycle})
          </p>
        </div>
        <div className="rounded-full bg-[#036CB6] px-3 py-1 text-xs font-bold text-white">
          {finishedCount}/{data.tasks.length} task selesai
        </div>
      </div>

      <div className="grid gap-4 p-5">
        {data.tasks.map((task) => {
          const result = getTaskResult(data, task.id, equipmentId);

          return (
            <article
              className={`rounded-lg border p-4 ${getPerformanceClass(result?.performance)}`}
              key={task.id}
            >
              <div className="grid gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-700 shadow-sm">
                        {task.code}
                      </span>
                      <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-neutral-500 shadow-sm">
                        {task.durationMinutes} menit
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-bold uppercase text-[#232122]">
                      {task.description}
                    </h3>
                  </div>
                  <div className="min-w-32 rounded-lg bg-white/85 px-4 py-3 text-center shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                      Performa
                    </p>
                    <p className="mt-1 text-2xl font-black leading-none text-[#232122]">
                      {result?.performance || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 text-sm leading-6 text-neutral-700 lg:grid-cols-2">
                  <TaskInfo label="Prosedur" value={task.procedure} />
                  <TaskInfo
                    label="Kriteria penerimaan"
                    value={task.acceptanceCriteria}
                  />
                  {task.inputType === "MEASUREMENT" ? (
                    <TaskInfo
                      label={`${task.measurementLabel ?? "Nilai"}${task.measurementUnit ? ` (${task.measurementUnit})` : ""}`}
                      value={result?.measuredValue || "-"}
                    />
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function GradingAssessmentTable({
  items,
  totalScore,
}: {
  items: GradingAssessmentItem[];
  totalScore: number;
}) {
  return (
    <GradingFormSection
      title="Penilaian Peralatan"
      headerSlot={
        <span className="rounded-full bg-[#036CB6] px-3 py-1 text-xs font-bold text-white">
          Total {formatNumber(totalScore)}
        </span>
      }
      bodyClassName="p-0"
    >
      {items.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm text-[#232122]">
            <thead>
              <tr className="bg-slate-100">
                <th className="w-14 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                  No
                </th>
                <th className="border border-zinc-200 px-3 py-3 text-left font-bold text-slate-700">
                  Parameter
                </th>
                <th className="w-32 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                  Nilai (%)
                </th>
                <th className="w-32 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                  Bobot
                </th>
                <th className="w-32 border border-zinc-200 px-3 py-3 text-center font-bold text-slate-700">
                  Skor
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.key ?? item.parameter ?? index}>
                  <td className="border border-zinc-200 px-3 py-3 text-center font-semibold">
                    {index + 1}
                  </td>
                  <td className="border border-zinc-200 px-3 py-3 font-semibold">
                    {item.parameter ?? item.key ?? "-"}
                  </td>
                  <td className="border border-zinc-200 px-3 py-3 text-center">
                    {formatNumber(item.selectedValue)}
                  </td>
                  <td className="border border-zinc-200 px-3 py-3 text-center">
                    {formatNumber(item.weight)}
                  </td>
                  <td className="border border-zinc-200 px-3 py-3 text-center font-bold">
                    {formatNumber(item.score)}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  className="border border-zinc-200 bg-slate-50 px-3 py-3 text-right font-bold"
                  colSpan={4}
                >
                  Total
                </td>
                <td className="border border-zinc-200 bg-slate-50 px-3 py-3 text-center font-bold">
                  {formatNumber(totalScore)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-5 text-sm text-neutral-500">
          Data penilaian belum tersedia.
        </p>
      )}
    </GradingFormSection>
  );
}
function JsonRecordSection({
  title,
  data,
}: {
  title: string;
  data?: Record<string, unknown> | null;
}) {
  const entries = Object.entries(data ?? {}).filter(([, value]) => {
    return value !== undefined && value !== null && value !== "";
  });

  return (
    <GradingFormSection title={title}>
      {entries.length ? (
        <dl className="grid gap-3 text-sm text-[#232122] md:grid-cols-2">
          {entries.map(([key, value]) => (
            <InfoItem
              key={key}
              label={formatKey(key)}
              value={formatValue(value)}
            />
          ))}
        </dl>
      ) : (
        <p className="text-sm text-neutral-500">Data belum tersedia.</p>
      )}
    </GradingFormSection>
  );
}

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-slate-50 px-4 py-3">
      <dt className="text-xs font-bold uppercase tracking-wide text-neutral-500">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-[#232122]">{value}</dd>
    </div>
  );
}

function TaskInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/80 p-3">
      <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-1">{value}</p>
    </div>
  );
}

function getTaskResult(
  data: TasklistSubmissionDetail,
  taskId: string,
  equipmentId: string,
) {
  return data.resultsByTask
    .find((item) => item.taskId === taskId)
    ?.results.find((result) => result.equipmentId === equipmentId);
}

function getPerformanceClass(performance?: string) {
  if (performance === "H") {
    return "border-[#d8e3a3] bg-[#F3F7DF]";
  }
  if (performance === "M") return "border-amber-200 bg-amber-50";
  if (performance === "L") return "border-[#f6b9c0] bg-[#FDE8EB]";

  return "border-zinc-200 bg-white";
}

function isGradingSubmissionDetail(
  data: DetailData | null,
): data is GradingSubmissionDetail {
  return Boolean(data && "assessmentItems" in data);
}

function isTasklistSubmissionDetail(
  data: DetailData | null,
): data is TasklistSubmissionDetail {
  return Boolean(data && "session" in data && "resultsByTask" in data);
}

function getEquipmentLabel(type: string) {
  const labels: Record<string, string> = {
    gst: "Generator",
    mov: "Motor Operated Valve",
    mtr: "Meter Arus",
    pip: "Sistem Perpipaan",
    pmp: "Pompa Produk",
    sgr: "Switchgear",
    tnk: "Storage Tank",
    trf: "Transformer",
    ups: "UPS",
  };

  return labels[type.toLowerCase()] ?? type.toUpperCase();
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  return value.slice(0, 10);
}

function formatNumber(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "-";

  return value.toFixed(1).replace(".", ",");
}

function formatStatus(value?: string) {
  return value ? value.replaceAll("_", " ") : "-";
}

function getUserTasklistRemarks(value?: string | null) {
  if (!value) return "";

  const cleaned = value
    .replace(
      /\b(monthlyCycle|occurrenceCount|realizedOccurrenceCount|planPerOccurrence)=[^;\n]+;?/g,
      "",
    )
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/smoke test|integrasi api/i.test(line))
    .map((line) => line.replace(/^[;,\s]+|[;,\s]+$/g, ""))
    .filter(Boolean)
    .join("\n");

  return cleaned;
}

function formatKey(key: string) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "Ya" : "Tidak";
  if (Array.isArray(value)) return value.map(formatValue).join(", ");
  if (value && typeof value === "object") return JSON.stringify(value);

  return "-";
}
