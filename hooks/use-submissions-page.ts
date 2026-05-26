"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { apiFetch } from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";

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

export function useSubmissionsPage() {
  const [scope, setScope] = useState<SubmissionScope>("mine");
  const currentEmployeeNumber = useAuthStore(
    (state) => state.user?.employee_number ?? "",
  );
  const createdByQuery =
    scope === "mine" && currentEmployeeNumber
      ? `&createdBy=${encodeURIComponent(currentEmployeeNumber)}`
      : "";
  const gradingKey = ["grading-submissions", createdByQuery] as const;
  const tasklistKey = ["tasklist-submissions", createdByQuery] as const;
  const grading = useSWR(gradingKey, ([, query]) =>
    apiFetch<GradingResponse>(`/grading-submissions?limit=100${query}`),
  );
  const tasklist = useSWR(tasklistKey, ([, query]) =>
    apiFetch<TasklistResponse>(`/tasklists?limit=100${query}`),
  );
  const rows = useMemo(() => {
    if (grading.error || tasklist.error) return [];

    return [
      ...(grading.data?.items ?? []).map(mapGradingRow),
      ...(tasklist.data?.items ?? []).map(mapTasklistRow),
    ].sort(
      (left, right) =>
        new Date(right.createdAt).getTime() -
        new Date(left.createdAt).getTime(),
    );
  }, [grading.data?.items, grading.error, tasklist.data?.items, tasklist.error]);
  const isLoading = grading.isLoading || tasklist.isLoading;
  const error = grading.error ?? tasklist.error ?? null;

  return {
    error,
    isLoading,
    rows,
    scope,
    setScope,
  };
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
