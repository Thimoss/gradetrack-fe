"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import type { AdminDepotUser } from "@/hooks/use-admin-depot-page";

type AdminDepotFormState = {
  employee_number: string;
  name: string;
  password: string;
};

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

const emptyForm: AdminDepotFormState = {
  employee_number: "",
  name: "",
  password: "",
};

export function useAdminDepotFormPage() {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFieldChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitAdminDepot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await fetchJson<AdminDepotUser>(`${apiBaseUrl}/api/master/users`, {
        body: JSON.stringify({ ...form, role: "ADMIN_DEPOT" }),
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
