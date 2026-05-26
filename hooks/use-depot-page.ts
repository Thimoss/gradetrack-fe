"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { sanitizeText } from "@/lib/input-validation";

export type DepotStatus = "active" | "inactive";

export type DepotOwnershipType =
  | "company_owned"
  | "third_party"
  | "leased"
  | "partner";

export type Depot = {
  id: number;
  depot_code: string;
  depot_name: string;
  region_id: number | null;
  area_id: number | null;
  address: string | null;
  city: string;
  province: string;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  pic_name: string | null;
  pic_phone: string | null;
  pic_email: string | null;
  ownership_type: DepotOwnershipType | null;
  status: DepotStatus;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type DepotFormState = {
  depot_code: string;
  depot_name: string;
  region_id: string;
  area_id: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  latitude: string;
  longitude: string;
  pic_name: string;
  pic_phone: string;
  pic_email: string;
  ownership_type: "" | DepotOwnershipType;
  status: DepotStatus;
  description: string;
};

type DepotListResponse = {
  items: Depot[];
  pagination: {
    current_page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
};

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

export const depotStatusOptions: Array<{ value: DepotStatus; label: string }> =
  [
    { value: "active", label: "Aktif" },
    { value: "inactive", label: "Nonaktif" },
  ];

export const depotOwnershipOptions: Array<{
  value: DepotOwnershipType;
  label: string;
}> = [
  { value: "company_owned", label: "Company owned" },
  { value: "third_party", label: "Third party" },
  { value: "leased", label: "Leased" },
  { value: "partner", label: "Partner" },
];

export function useDepotPage() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [deletingDepot, setDeletingDepot] = useState<Depot | null>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"" | DepotStatus>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageLabel = useMemo(() => {
    return `${page} / ${Math.max(totalPages, 1)}`;
  }, [page, totalPages]);

  function applyDepotList(data: DepotListResponse) {
    setDepots(data.items);
    setTotalPages(data.pagination.total_pages || 1);
    setTotalItems(data.pagination.total);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadDepots() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await requestDepots(page, search, status, controller.signal);
        applyDepotList(data);
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

    void loadDepots();

    return () => controller.abort();
  }, [page, search, status]);

  async function refreshDepots() {
    setIsLoading(true);

    try {
      const data = await requestDepots(page, search, status);
      applyDepotList(data);
    } finally {
      setIsLoading(false);
    }
  }

  function askDeleteDepot(depot: Depot) {
    setDeletingDepot(depot);
    setError(null);
  }

  function cancelDeleteDepot() {
    if (isDeleting) return;
    setDeletingDepot(null);
  }

  async function confirmDeleteDepot() {
    if (!deletingDepot) return;

    setIsDeleting(true);
    setError(null);

    try {
      await fetchJson<Depot>(`${apiBaseUrl}/api/master/depots/${deletingDepot.id}`, {
        method: "DELETE",
      });
      toast.success("Depot dihapus.");
      setDeletingDepot(null);
      await refreshDepots();
    } catch (deleteError) {
      const message = getErrorMessage(deleteError);
      setError(message);
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  }

  function applySearch(value: string) {
    setSearch(sanitizeText(value));
    setPage(1);
  }

  function applyStatus(value: "" | DepotStatus) {
    setStatus(value);
    setPage(1);
  }

  function goToPreviousPage() {
    setPage((current) => Math.max(current - 1, 1));
  }

  function goToNextPage() {
    setPage((current) => Math.min(current + 1, Math.max(totalPages, 1)));
  }

  return {
    depots,
    deletingDepot,
    search,
    status,
    page,
    totalPages,
    totalItems,
    pageLabel,
    isLoading,
    isDeleting,
    error,
    askDeleteDepot,
    cancelDeleteDepot,
    confirmDeleteDepot,
    applySearch,
    applyStatus,
    goToPreviousPage,
    goToNextPage,
  };
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  return readApiResponse<T>(response);
}

async function requestDepots(
  page: number,
  search: string,
  status: "" | DepotStatus,
  signal?: AbortSignal,
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: "10",
    sort_by: "depot_name",
    sort_order: "asc",
  });

  if (search.trim()) params.set("search", search.trim());
  if (status) params.set("status", status);

  const response = await fetch(`${apiBaseUrl}/api/master/depots?${params}`, {
    signal,
  });

  return readApiResponse<DepotListResponse>(response);
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
