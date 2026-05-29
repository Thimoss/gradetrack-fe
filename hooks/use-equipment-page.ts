"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { sanitizeText } from "@/lib/input-validation";

export type EquipmentType =
  | "GENERATOR_GST"
  | "MOTOR_OPERATED_VALVE_MOV"
  | "FLOW_METER_MTR"
  | "PIPING_SYSTEM_PIP"
  | "PRODUCT_PUMP_PMP"
  | "MEDIUM_VOLTAGE_SWITCHGEAR_SGR1"
  | "STORAGE_TANK_TNK1"
  | "SPHERICAL_TANK_TNK2"
  | "POWER_TRANSFORMER_TRF"
  | "UNINTERRUPTIBLE_POWER_SYSTEM_UPS";

export type EquipmentStatus = "running" | "idle" | "inactive";

export type Equipment = {
  id: string;
  equipmentType: EquipmentType;
  status: EquipmentStatus;
  depot?: {
    id: number;
    depot_code: string;
    depot_name: string;
    city: string;
    province: string;
  };
  identity: Record<string, unknown>;
  maker?: Record<string, unknown>;
  specifications: Record<string, unknown>;
  timestamps: {
    createdAt: string;
    updatedAt: string;
  };
};

type EquipmentListResponse = {
  items: Equipment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export const equipmentTypeOptions: Array<{
  value: EquipmentType;
  label: string;
}> = [
  { value: "GENERATOR_GST", label: "Generator" },
  { value: "MOTOR_OPERATED_VALVE_MOV", label: "Motor Operated Valve" },
  { value: "FLOW_METER_MTR", label: "Meter Arus" },
  { value: "PIPING_SYSTEM_PIP", label: "Sistem Perpipaan" },
  { value: "PRODUCT_PUMP_PMP", label: "Pompa Produk" },
  { value: "MEDIUM_VOLTAGE_SWITCHGEAR_SGR1", label: "Switchgear" },
  { value: "STORAGE_TANK_TNK1", label: "Storage Tank" },
  { value: "SPHERICAL_TANK_TNK2", label: "Spherical Tank" },
  { value: "POWER_TRANSFORMER_TRF", label: "Transformer" },
  { value: "UNINTERRUPTIBLE_POWER_SYSTEM_UPS", label: "UPS" },
];

export const equipmentStatusOptions: Array<{
  value: EquipmentStatus;
  label: string;
}> = [
  { value: "running", label: "Running" },
  { value: "idle", label: "Idle" },
  { value: "inactive", label: "Tidak aktif" },
];

export function useEquipmentPage() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [deletingEquipment, setDeletingEquipment] = useState<Equipment | null>(
    null,
  );
  const [editingStatusEquipment, setEditingStatusEquipment] =
    useState<Equipment | null>(null);
  const [statusForm, setStatusForm] = useState<EquipmentStatus>("idle");
  const [search, setSearch] = useState("");
  const [equipmentType, setEquipmentType] = useState<"" | EquipmentType>("");
  const [status, setStatus] = useState<"" | EquipmentStatus>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageLabel = useMemo(() => {
    return `${page} / ${Math.max(totalPages, 1)}`;
  }, [page, totalPages]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadEquipment() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await requestEquipment(
          page,
          search,
          equipmentType,
          status,
          controller.signal,
        );
        setEquipment(data.items);
        setTotalPages(data.pagination.totalPages || 1);
        setTotalItems(data.pagination.total);
      } catch (fetchError) {
        if (
          fetchError instanceof DOMException &&
          fetchError.name === "AbortError"
        ) {
          return;
        }
        setError(getErrorMessage(fetchError));
      } finally {
        setIsLoading(false);
      }
    }

    void loadEquipment();

    return () => controller.abort();
  }, [equipmentType, page, search, status]);

  async function refreshEquipment() {
    setIsLoading(true);

    try {
      const data = await requestEquipment(page, search, equipmentType, status);
      setEquipment(data.items);
      setTotalPages(data.pagination.totalPages || 1);
      setTotalItems(data.pagination.total);
    } finally {
      setIsLoading(false);
    }
  }

  function applySearch(value: string) {
    setSearch(sanitizeText(value));
    setPage(1);
  }

  function applyEquipmentType(value: "" | EquipmentType) {
    setEquipmentType(value);
    setPage(1);
  }

  function applyStatus(value: "" | EquipmentStatus) {
    setStatus(value);
    setPage(1);
  }

  function askDeleteEquipment(item: Equipment) {
    setDeletingEquipment(item);
    setError(null);
  }

  function cancelDeleteEquipment() {
    if (isDeleting) return;
    setDeletingEquipment(null);
  }

  function openStatusModal(item: Equipment) {
    setEditingStatusEquipment(item);
    setStatusForm(item.status);
    setError(null);
  }

  function closeStatusModal() {
    if (isUpdatingStatus) return;
    setEditingStatusEquipment(null);
  }

  async function submitStatusUpdate() {
    if (!editingStatusEquipment) return;

    setIsUpdatingStatus(true);
    setError(null);

    try {
      await fetchJson<Equipment>(
        `${apiBaseUrl}/equipment/${editingStatusEquipment.id}`,
        {
          body: JSON.stringify({ status: statusForm }),
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
        },
      );
      toast.success("Status peralatan diperbarui.");
      setEditingStatusEquipment(null);
      await refreshEquipment();
    } catch (updateError) {
      const message = getErrorMessage(updateError);
      setError(message);
      toast.error(message);
    } finally {
      setIsUpdatingStatus(false);
    }
  }

  async function confirmDeleteEquipment() {
    if (!deletingEquipment) return;

    setIsDeleting(true);
    setError(null);

    try {
      await fetchJson<Equipment>(`${apiBaseUrl}/equipment/${deletingEquipment.id}`, {
        method: "DELETE",
      });
      toast.success("Peralatan dihapus.");
      setDeletingEquipment(null);
      await refreshEquipment();
    } catch (deleteError) {
      const message = getErrorMessage(deleteError);
      setError(message);
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  function goToPreviousPage() {
    setPage((current) => Math.max(current - 1, 1));
  }

  function goToNextPage() {
    setPage((current) => Math.min(current + 1, Math.max(totalPages, 1)));
  }

  return {
    equipment,
    deletingEquipment,
    editingStatusEquipment,
    statusForm,
    search,
    equipmentType,
    status,
    page,
    totalPages,
    totalItems,
    pageLabel,
    isLoading,
    isDeleting,
    isUpdatingStatus,
    error,
    setStatusForm,
    applySearch,
    applyEquipmentType,
    applyStatus,
    askDeleteEquipment,
    cancelDeleteEquipment,
    confirmDeleteEquipment,
    openStatusModal,
    closeStatusModal,
    submitStatusUpdate,
    goToPreviousPage,
    goToNextPage,
  };
}

async function requestEquipment(
  page: number,
  search: string,
  equipmentType: "" | EquipmentType,
  status: "" | EquipmentStatus,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: "10",
    sortBy: "tagNumber",
    sortOrder: "asc",
  });

  if (search.trim()) params.set("search", search.trim());
  if (equipmentType) params.set("equipmentType", equipmentType);
  if (status) params.set("status", status);

  const response = await fetch(`${apiBaseUrl}/equipment?${params}`, { signal });

  return readApiResponse<EquipmentListResponse>(response);
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  return readApiResponse<T>(response);
}

async function readApiResponse<T>(response: Response) {
  const envelope = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok) {
    throw new Error(envelope.message || "Request gagal.");
  }

  return envelope.data;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan.";
}
