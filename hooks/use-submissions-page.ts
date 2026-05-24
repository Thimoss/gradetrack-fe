"use client";

import { useEffect, useMemo, useState } from "react";

type ApiEnvelope<T> = {
  data: T;
};

export type SubmissionScope = "mine" | "all";

export type SubmissionRow = {
  id: string;
  type: "grading" | "tasklist";
  title: string;
  subtitle: string;
  status: string;
  createdBy: string;
  createdAt: string;
  detailHref: string;
};

type GradingResponse = {
  items: Array<{
    id: string;
    equipmentType: string;
    tagNumber: string;
    category: string;
    approvalStatus: string;
    createdBy?: string;
    createdAt: string;
  }>;
};

type TasklistResponse = {
  items: Array<{
    id: string;
    equipmentType: string;
    cycle: string;
    totalTasklistPlan: number;
    totalTasklistSelesai: number;
    approvalStatus: string;
    createdBy?: string;
    createdAt: string;
  }>;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

export function useSubmissionsPage() {
  const [scope, setScope] = useState<SubmissionScope>("mine");
  const [rows, setRows] = useState<SubmissionRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const currentEmployeeNumber = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("grading_employee_number") ?? "";
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSubmissions() {
      setIsLoading(true);
      setError("");

      try {
        const createdByQuery =
          scope === "mine" && currentEmployeeNumber
            ? `&createdBy=${encodeURIComponent(currentEmployeeNumber)}`
            : "";
        const [grading, tasklist] = await Promise.all([
          fetchJson<GradingResponse>(
            `${apiBaseUrl}/grading-submissions?limit=100${createdByQuery}`,
            controller.signal,
          ),
          fetchJson<TasklistResponse>(
            `${apiBaseUrl}/tasklists?limit=100${createdByQuery}`,
            controller.signal,
          ),
        ]);

        setRows(
          [
            ...grading.items.map(mapGradingRow),
            ...tasklist.items.map(mapTasklistRow),
          ].sort(
            (left, right) =>
              new Date(right.createdAt).getTime() -
              new Date(left.createdAt).getTime(),
          ),
        );
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
            : "Gagal memuat submission.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadSubmissions();

    return () => controller.abort();
  }, [currentEmployeeNumber, scope]);

  return {
    scope,
    rows,
    isLoading,
    error,
    setScope,
  };
}

async function fetchJson<T>(url: string, signal: AbortSignal) {
  const response = await fetch(url, { signal });
  const envelope = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok) {
    throw new Error("Gagal memuat submission.");
  }

  return envelope.data;
}

function mapGradingRow(item: GradingResponse["items"][number]): SubmissionRow {
  return {
    id: item.id,
    type: "grading",
    title: `Grading ${formatEquipmentType(item.equipmentType)}`,
    subtitle: `${item.tagNumber} - ${item.category}`,
    status: item.approvalStatus,
    createdBy: item.createdBy ?? "-",
    createdAt: item.createdAt,
    detailHref: `/submissions/grading/${item.id}`,
  };
}

function mapTasklistRow(item: TasklistResponse["items"][number]): SubmissionRow {
  return {
    id: item.id,
    type: "tasklist",
    title: `Tasklist ${formatEquipmentType(item.equipmentType)}`,
    subtitle: `${formatCycle(item.cycle)} - ${item.totalTasklistSelesai}/${item.totalTasklistPlan}`,
    status: item.approvalStatus,
    createdBy: item.createdBy ?? "-",
    createdAt: item.createdAt,
    detailHref: `/submissions/tasklist/${item.id}`,
  };
}

function formatEquipmentType(value: string) {
  return value.replaceAll("_", " ");
}

function formatCycle(value: string) {
  return value.replaceAll("_", " ");
}
