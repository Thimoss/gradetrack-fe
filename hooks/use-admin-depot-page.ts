"use client";

import { apiBaseUrl } from "@/lib/api-client";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  firstInvalid,
  invalid,
  sanitizeText,
  validateRequiredText,
  valid,
} from "@/lib/input-validation";

export type AdminDepotUser = {
  id: number;
  employee_number: string;
  name: string;
  depot_id: number | null;
  depot: {
    id: number;
    depot_code: string;
    depot_name: string;
    city: string;
    province: string;
  } | null;
  role: "ADMIN_REGION" | "ADMIN_DEPOT";
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

type UserListResponse = {
  items: AdminDepotUser[];
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

export function useAdminDepotPage() {
  const [users, setUsers] = useState<AdminDepotUser[]>([]);
  const [resetUser, setResetUser] = useState<AdminDepotUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<AdminDepotUser | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isResetting, setIsResetting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pageLabel = useMemo(() => {
    return `${page} / ${Math.max(totalPages, 1)}`;
  }, [page, totalPages]);

  function applyUserList(data: UserListResponse) {
    setUsers(data.items);
    setTotalPages(data.pagination.total_pages || 1);
    setTotalItems(data.pagination.total);
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await requestUsers(page, search, controller.signal);
        applyUserList(data);
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

    void loadUsers();

    return () => controller.abort();
  }, [page, search]);

  async function refreshUsers() {
    setIsLoading(true);

    try {
      const data = await requestUsers(page, search);
      applyUserList(data);
    } finally {
      setIsLoading(false);
    }
  }

  function applySearch(value: string) {
    setSearch(sanitizeText(value));
    setPage(1);
  }

  function openResetModal(user: AdminDepotUser) {
    setResetUser(user);
    setResetPassword("");
    setError(null);
  }

  function closeResetModal() {
    if (isResetting) return;
    setResetUser(null);
    setResetPassword("");
  }

  function openDeleteModal(user: AdminDepotUser) {
    setDeletingUser(user);
    setError(null);
  }

  function closeDeleteModal() {
    if (isDeleting) return;
    setDeletingUser(null);
  }

  async function submitResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!resetUser) return;

    setError(null);

    const validation = firstInvalid([
      validateRequiredText(resetPassword, "Kata sandi baru", {
        maxLength: 120,
      }),
      resetPassword.length >= 6
        ? valid()
        : invalid("Kata sandi baru minimal 6 karakter."),
    ]);
    if (!validation.isValid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setIsResetting(true);

    try {
      await fetchJson<AdminDepotUser>(
        `${apiBaseUrl}/api/master/users/${resetUser.id}/reset-password`,
        {
          body: JSON.stringify({ password: resetPassword }),
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
        },
      );
      toast.success(`Kata sandi ${resetUser.name} berhasil direset.`);
      setResetUser(null);
      setResetPassword("");
      await refreshUsers();
    } catch (resetError) {
      const message = getErrorMessage(resetError);
      setError(message);
      toast.error(message);
    } finally {
      setIsResetting(false);
    }
  }

  async function confirmDeleteUser() {
    if (!deletingUser) return;

    setIsDeleting(true);
    setError(null);

    try {
      await fetchJson<AdminDepotUser>(
        `${apiBaseUrl}/api/master/users/${deletingUser.id}`,
        { method: "DELETE" },
      );
      toast.success(`Admin depot ${deletingUser.name} dihapus.`);
      setDeletingUser(null);
      await refreshUsers();
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
    users,
    resetUser,
    deletingUser,
    resetPassword,
    search,
    page,
    totalPages,
    totalItems,
    pageLabel,
    isLoading,
    isResetting,
    isDeleting,
    error,
    setResetPassword: (value: string) => setResetPassword(sanitizeText(value)),
    applySearch,
    openResetModal,
    closeResetModal,
    openDeleteModal,
    closeDeleteModal,
    submitResetPassword,
    confirmDeleteUser,
    goToPreviousPage,
    goToNextPage,
  };
}

async function requestUsers(page: number, search: string, signal?: AbortSignal) {
  const params = new URLSearchParams({
    page: String(page),
    limit: "10",
    role: "ADMIN_DEPOT",
  });

  if (search.trim()) params.set("search", search.trim());

  const response = await fetch(`${apiBaseUrl}/api/master/users?${params}`, {
    signal,
  });

  return readApiResponse<UserListResponse>(response);
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
