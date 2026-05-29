"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { AdminDepotUser } from "@/hooks/use-admin-depot-page";
import {
  firstInvalid,
  invalid,
  sanitizeInteger,
  sanitizeText,
  validateRequiredText,
  valid,
} from "@/lib/input-validation";

type AdminDepotFormState = {
  employee_number: string;
  name: string;
  password: string;
  depot_id: string;
};

type DepotOption = {
  id: number;
  depot_name: string;
  depot_code: string;
};

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const emptyForm: AdminDepotFormState = {
  employee_number: "",
  name: "",
  password: "",
  depot_id: "",
};

export function useAdminDepotFormPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [depots, setDepots] = useState<DepotOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDepots() {
      try {
        const data = await fetchJson<{ items: DepotOption[] }>(
          `${apiBaseUrl}/api/master/depots?limit=100&sort_by=depot_name&sort_order=asc`,
          { signal: controller.signal },
        );
        setDepots(data.items);
      } catch {
        setDepots([]);
      }
    }

    void loadDepots();

    return () => controller.abort();
  }, []);

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "employee_number" || name === "depot_id"
        ? sanitizeInteger(value)
        : sanitizeText(value),
    }));
  }

  async function submitAdminDepot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const validation = validateAdminDepotForm(form, depots);
    if (!validation.isValid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      await fetchJson<AdminDepotUser>(`${apiBaseUrl}/api/master/users`, {
        body: JSON.stringify({
          ...form,
          depot_id: Number(form.depot_id),
          role: "ADMIN_DEPOT",
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      toast.success("Admin depot dibuat.");
      router.push("/admin-depot");
      router.refresh();
    } catch (submitError) {
      const message = getErrorMessage(submitError);
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function cancelForm() {
    router.push("/admin-depot");
  }

  return {
    form,
    depots,
    isSubmitting,
    error,
    handleFieldChange,
    submitAdminDepot,
    cancelForm,
  };
}

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
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

function validateAdminDepotForm(
  form: AdminDepotFormState,
  depots: DepotOption[],
) {
  const depotExists = depots.some((depot) => String(depot.id) === form.depot_id);

  return firstInvalid([
    depotExists ? valid() : invalid("Lokasi tugas wajib dipilih dari daftar depot."),
    validateRequiredText(form.employee_number, "Nomor pegawai", {
      maxLength: 30,
    }),
    validateRequiredText(form.name, "Nama", { maxLength: 120 }),
    validateRequiredText(form.password, "Kata sandi", { maxLength: 120 }),
    form.password.length >= 6
      ? valid()
      : invalid("Kata sandi minimal 6 karakter."),
  ]);
}
