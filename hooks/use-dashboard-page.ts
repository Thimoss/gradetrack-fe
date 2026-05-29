"use client";

import { apiBaseUrl } from "@/lib/api-client";
import { useEffect, useMemo, useState } from "react";

export type DashboardCategoryCount = {
  LOW: number;
  MED: number;
  HIGH: number;
};

export type DashboardLocationRow = {
  depotId: number;
  location: string;
  city: string;
  before: DashboardCategoryCount;
  after: DashboardCategoryCount;
  bestBefore: DashboardCategoryCount;
  gradingKpi: {
    trend: "UP" | "DOWN" | "FLAT";
    delta: number;
  };
  gradingProgress: string;
  tasklist: {
    plan: number;
    real: number;
    progress: number;
  };
};

export type DashboardSummary = {
  period: string;
  periodLabel: string;
  rows: DashboardLocationRow[];
  totals: {
    before: DashboardCategoryCount;
    after: DashboardCategoryCount;
    bestBefore: DashboardCategoryCount;
    tasklist: {
      plan: number;
      real: number;
      progress: number;
    };
  };
};

type ApiEnvelope<T> = {
  data: T;
};

function getCurrentPeriod() {
  return new Date().toISOString().slice(0, 7);
}

function getFallbackSummary(period: string): DashboardSummary {
  return {
    period,
    periodLabel: period,
    rows: [],
    totals: {
      before: { LOW: 0, MED: 0, HIGH: 0 },
      after: { LOW: 0, MED: 0, HIGH: 0 },
      bestBefore: { LOW: 0, MED: 0, HIGH: 0 },
      tasklist: { plan: 0, real: 0, progress: 0 },
    },
  };
}

export function useDashboardPage() {
  const [period, setPeriod] = useState(getCurrentPeriod);
  const [summary, setSummary] = useState<DashboardSummary>(() =>
    getFallbackSummary(getCurrentPeriod()),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadSummary() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `${apiBaseUrl}/dashboard/summary?period=${period}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Gagal memuat dashboard.");
        }

        const payload = (await response.json()) as ApiEnvelope<DashboardSummary>;
        setSummary(payload.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setSummary(getFallbackSummary(period));
        setErrorMessage(
          error instanceof Error ? error.message : "Gagal memuat dashboard.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadSummary();

    return () => controller.abort();
  }, [period]);

  const metrics = useMemo(() => {
    const afterTotal =
      summary.totals.after.LOW +
      summary.totals.after.MED +
      summary.totals.after.HIGH;

    return {
      locationCount: summary.rows.length,
      gradedEquipmentCount: afterTotal,
      tasklistProgress: summary.totals.tasklist.progress,
    };
  }, [summary]);

  return {
    errorMessage,
    isLoading,
    metrics,
    period,
    setPeriod,
    summary,
  };
}
