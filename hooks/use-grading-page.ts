"use client";

import { useEffect, useMemo, useState } from "react";
import type { Equipment, EquipmentType } from "@/hooks/use-equipment-page";

export type GradingEquipmentType =
  | "gst"
  | "mov"
  | "mtr"
  | "pip"
  | "pmp"
  | "sgr"
  | "tnk"
  | "trf"
  | "ups";

export type GradingStep = "idle" | "date" | "location" | "equipment" | "form";

export type GradingDepotOption = {
  id: number;
  depot_name: string;
  depot_code: string;
  city?: string;
  province?: string;
};

export type GradingEquipmentOption = {
  type: GradingEquipmentType;
  label: string;
  description: string;
  tags: string[];
  hasGuide: boolean;
};

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

type DepotListResponse = {
  items: GradingDepotOption[];
};

type EquipmentListResponse = {
  items: Equipment[];
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

const gradingTypeToEquipmentType: Record<GradingEquipmentType, EquipmentType> = {
  gst: "GENERATOR_GST",
  mov: "MOTOR_OPERATED_VALVE_MOV",
  mtr: "FLOW_METER_MTR",
  pip: "PIPING_SYSTEM_PIP",
  pmp: "PRODUCT_PUMP_PMP",
  sgr: "MEDIUM_VOLTAGE_SWITCHGEAR_SGR1",
  tnk: "STORAGE_TANK_TNK1",
  trf: "POWER_TRANSFORMER_TRF",
  ups: "UNINTERRUPTIBLE_POWER_SYSTEM_UPS",
};

export const gradingEquipmentOptions: GradingEquipmentOption[] = [
  {
    type: "gst",
    label: "Generator",
    description: "Generator set dan alternator.",
    tags: ["GST-01", "GST-02"],
    hasGuide: true,
  },
  {
    type: "mov",
    label: "Motor Operated Valve",
    description: "MOV tanpa guide lapangan.",
    tags: ["MOV-01", "MOV-02"],
    hasGuide: false,
  },
  {
    type: "mtr",
    label: "Meter Arus",
    description: "Flow meter tanpa guide lapangan.",
    tags: ["MTR-01", "MTR-02"],
    hasGuide: false,
  },
  {
    type: "pip",
    label: "Sistem Perpipaan",
    description: "Jalur pipa dan data ketebalan.",
    tags: ["PIP-01", "PIP-02"],
    hasGuide: false,
  },
  {
    type: "pmp",
    label: "Pompa Produk",
    description: "Pompa produk dengan guide lapangan.",
    tags: ["PMP-01", "PMP-02"],
    hasGuide: true,
  },
  {
    type: "sgr",
    label: "Switchgear",
    description: "Switchgear dan cubicle.",
    tags: ["SGR-01", "SGR-02"],
    hasGuide: false,
  },
  {
    type: "tnk",
    label: "Storage Tank",
    description: "Tangki timbun dan pengukuran visual.",
    tags: ["TNK-01", "TNK-02"],
    hasGuide: false,
  },
  {
    type: "trf",
    label: "Transformer",
    description: "Transformator daya.",
    tags: ["TRF-01", "TRF-02"],
    hasGuide: false,
  },
  {
    type: "ups",
    label: "UPS",
    description: "Uninterruptible power systems.",
    tags: ["UPS-01", "UPS-02"],
    hasGuide: false,
  },
];

function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function useGradingPage() {
  const [step, setStep] = useState<GradingStep>("idle");
  const [assessmentDate, setAssessmentDate] = useState(getTodayInputValue);
  const [depots, setDepots] = useState<GradingDepotOption[]>([]);
  const [selectedDepotId, setSelectedDepotId] = useState("");
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoadingDepots, setIsLoadingDepots] = useState(false);
  const [isLoadingEquipment, setIsLoadingEquipment] = useState(false);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [selectedEquipmentType, setSelectedEquipmentType] =
    useState<GradingEquipmentType>("gst");
  const [selectedTag, setSelectedTag] = useState(
    gradingEquipmentOptions[0].tags[0],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadDepots() {
      setIsLoadingDepots(true);
      setSelectionError(null);

      try {
        const data = await fetchJson<DepotListResponse>(
          `${apiBaseUrl}/api/master/depots?limit=100&sort_by=depot_name&sort_order=asc`,
          { signal: controller.signal },
        );
        setDepots(data.items);
        setSelectedDepotId((current) => current || String(data.items[0]?.id ?? ""));
      } catch (error) {
        if (isAbortError(error)) return;
        setSelectionError(getErrorMessage(error));
      } finally {
        setIsLoadingDepots(false);
      }
    }

    void loadDepots();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedDepotId) {
      return;
    }

    const controller = new AbortController();

    async function loadEquipment() {
      setIsLoadingEquipment(true);
      setSelectionError(null);

      try {
        const params = new URLSearchParams({
          depot_id: selectedDepotId,
          equipmentType: gradingTypeToEquipmentType[selectedEquipmentType],
          limit: "100",
          sortBy: "tagNumber",
          sortOrder: "asc",
        });
        const data = await fetchJson<EquipmentListResponse>(
          `${apiBaseUrl}/equipment?${params}`,
          { signal: controller.signal },
        );
        const activeEquipment = data.items.filter(
          (item) => item.status !== "inactive",
        );
        setEquipment(activeEquipment);
        setSelectedTag((current) => {
          if (activeEquipment.some((item) => readTagNumber(item) === current)) {
            return current;
          }

          return readTagNumber(activeEquipment[0]) ?? "";
        });
      } catch (error) {
        if (isAbortError(error)) return;
        setEquipment([]);
        setSelectionError(getErrorMessage(error));
      } finally {
        setIsLoadingEquipment(false);
      }
    }

    void loadEquipment();

    return () => controller.abort();
  }, [selectedDepotId, selectedEquipmentType]);

  const selectedEquipmentOption = useMemo(() => {
    const tags = equipment.map((item) => readTagNumber(item)).filter(Boolean);
    return {
      ...(gradingEquipmentOptions.find(
        (option) => option.type === selectedEquipmentType,
      ) ?? gradingEquipmentOptions[0]),
      tags,
    };
  }, [equipment, selectedEquipmentType]);

  const apiGradingEquipmentOptions = useMemo(() => {
    const tags = equipment.map((item) => readTagNumber(item)).filter(Boolean);

    return gradingEquipmentOptions.map((option) =>
      option.type === selectedEquipmentType ? { ...option, tags } : option,
    );
  }, [equipment, selectedEquipmentType]);

  const selectedDepot = useMemo(() => {
    return depots.find((depot) => String(depot.id) === selectedDepotId) ?? null;
  }, [depots, selectedDepotId]);

  const selectedEquipment = useMemo(() => {
    return (
      equipment.find((item) => readTagNumber(item) === selectedTag) ??
      equipment[0] ??
      null
    );
  }, [equipment, selectedTag]);

  function startGrading() {
    setStep("date");
  }

  function closeModal() {
    setStep("idle");
  }

  function submitAssessmentDate() {
    setStep("location");
  }

  function submitLocation() {
    if (!selectedDepotId) {
      setSelectionError("Pilih depot terlebih dahulu.");
      return;
    }

    setStep("equipment");
  }

  function selectEquipmentType(type: GradingEquipmentType) {
    setSelectedEquipmentType(type);
    setEquipment([]);
    setSelectedTag("");
  }

  function submitEquipmentType() {
    if (!selectedEquipment) {
      setSelectionError("Peralatan belum tersedia untuk depot dan jenis ini.");
      return;
    }

    setStep("form");
  }

  function restartFlow() {
    setStep("date");
  }

  return {
    step,
    assessmentDate,
    depots,
    selectedDepot,
    selectedDepotId,
    selectedEquipmentType,
    selectedEquipmentOption,
    selectedEquipment,
    selectedTag,
    gradingEquipmentOptions: apiGradingEquipmentOptions,
    isLoadingDepots,
    isLoadingEquipment,
    selectionError,
    setAssessmentDate,
    setSelectedDepotId,
    setSelectedTag,
    startGrading,
    closeModal,
    submitAssessmentDate,
    submitLocation,
    selectEquipmentType,
    submitEquipmentType,
    restartFlow,
  };
}

function readTagNumber(equipment?: Equipment) {
  const value = equipment?.identity.tagNumber ?? equipment?.identity.lineNumber;
  return typeof value === "string" ? value : "";
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  const envelope = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok) {
    throw new Error(envelope.message || "Request gagal.");
  }

  return envelope.data;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan.";
}
