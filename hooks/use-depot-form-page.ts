"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Depot, DepotFormState } from "@/hooks/use-depot-page";
import {
  firstInvalid,
  sanitizeDecimal,
  sanitizeInteger,
  sanitizeText,
  validateEmail,
  validateEnum,
  validateOptionalNumber,
  validateOptionalPositiveInteger,
  validateOptionalText,
  validateRequiredText,
} from "@/lib/input-validation";

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

const emptyForm: DepotFormState = {
  depot_code: "",
  depot_name: "",
  region_id: "",
  area_id: "",
  address: "",
  city: "",
  province: "",
  postal_code: "",
  latitude: "",
  longitude: "",
  pic_name: "",
  pic_phone: "",
  pic_email: "",
  ownership_type: "",
  status: "active",
  description: "",
};

const depotStatusValues = ["active", "inactive"] as const;
const depotOwnershipValues = [
  "company_owned",
  "third_party",
  "leased",
  "partner",
] as const;
const integerFields = new Set(["region_id", "area_id"]);
const decimalFields = new Set(["latitude", "longitude"]);

export function useDepotFormPage(depotId?: string) {
  const router = useRouter();
  const [form, setForm] = useState<DepotFormState>(emptyForm);
  const [isLoading, setIsLoading] = useState(Boolean(depotId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = Boolean(depotId);

  useEffect(() => {
    if (!depotId) return;

    const controller = new AbortController();

    async function loadDepot() {
      setIsLoading(true);
      setError(null);

      try {
        const depot = await fetchJson<Depot>(
          `${apiBaseUrl}/api/master/depots/${depotId}`,
          { signal: controller.signal },
        );
        setForm(mapDepotToForm(depot));
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

    void loadDepot();

    return () => controller.abort();
  }, [depotId]);

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: sanitizeDepotValue(name, value) }));
  }

  async function submitDepot(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const validation = validateDepotForm(form);
    if (!validation.isValid) {
      setError(validation.message);
      toast.error(validation.message);
      return;
    }

    setIsSubmitting(true);

    const endpoint = isEditMode
      ? `${apiBaseUrl}/api/master/depots/${depotId}`
      : `${apiBaseUrl}/api/master/depots`;

    try {
      await fetchJson<Depot>(endpoint, {
        body: JSON.stringify(buildDepotPayload(form)),
        headers: { "Content-Type": "application/json" },
        method: isEditMode ? "PUT" : "POST",
      });

      toast.success(isEditMode ? "Depot diperbarui." : "Depot dibuat.");
      router.push("/depot");
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
    router.push("/depot");
  }

  return {
    form,
    isEditMode,
    isLoading,
    isSubmitting,
    error,
    handleFieldChange,
    submitDepot,
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

function mapDepotToForm(depot: Depot): DepotFormState {
  return {
    depot_code: depot.depot_code,
    depot_name: depot.depot_name,
    region_id: stringifyOptional(depot.region_id),
    area_id: stringifyOptional(depot.area_id),
    address: depot.address ?? "",
    city: depot.city,
    province: depot.province,
    postal_code: depot.postal_code ?? "",
    latitude: stringifyOptional(depot.latitude),
    longitude: stringifyOptional(depot.longitude),
    pic_name: depot.pic_name ?? "",
    pic_phone: depot.pic_phone ?? "",
    pic_email: depot.pic_email ?? "",
    ownership_type: depot.ownership_type ?? "",
    status: depot.status,
    description: depot.description ?? "",
  };
}

function stringifyOptional(value: number | null) {
  return value === null ? "" : String(value);
}

function buildDepotPayload(form: DepotFormState) {
  return removeBlankFields({
    depot_code: form.depot_code,
    depot_name: form.depot_name,
    region_id: toOptionalNumber(form.region_id),
    area_id: toOptionalNumber(form.area_id),
    address: form.address,
    city: form.city,
    province: form.province,
    postal_code: form.postal_code,
    latitude: toOptionalNumber(form.latitude),
    longitude: toOptionalNumber(form.longitude),
    pic_name: form.pic_name,
    pic_phone: form.pic_phone,
    pic_email: form.pic_email,
    ownership_type: form.ownership_type,
    status: form.status,
    description: form.description,
  });
}

function removeBlankFields(payload: Record<string, string | number | undefined>) {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== "" && value !== undefined,
    ),
  );
}

function toOptionalNumber(value: string) {
  if (value.trim() === "") return undefined;
  return Number(value);
}

function sanitizeDepotValue(name: string, value: string) {
  if (integerFields.has(name)) return sanitizeInteger(value);
  if (decimalFields.has(name)) return sanitizeDecimal(value, { allowNegative: true });
  return sanitizeText(value);
}

function validateDepotForm(form: DepotFormState) {
  return firstInvalid([
    validateRequiredText(form.depot_code, "Kode depot", { maxLength: 50 }),
    validateRequiredText(form.depot_name, "Nama depot", { maxLength: 120 }),
    validateEnum(form.status, depotStatusValues, "Status"),
    validateRequiredText(form.city, "Kota", { maxLength: 80 }),
    validateRequiredText(form.province, "Provinsi", { maxLength: 80 }),
    validateOptionalText(form.postal_code, "Kode pos", { maxLength: 20 }),
    validateOptionalPositiveInteger(form.region_id, "ID region"),
    validateOptionalPositiveInteger(form.area_id, "ID area"),
    form.ownership_type
      ? validateEnum(form.ownership_type, depotOwnershipValues, "Kepemilikan")
      : { isValid: true, message: "" },
    validateOptionalNumber(form.latitude, "Latitude"),
    validateOptionalNumber(form.longitude, "Longitude"),
    validateOptionalText(form.pic_name, "PIC", { maxLength: 120 }),
    validateOptionalText(form.pic_phone, "Telepon PIC", { maxLength: 30 }),
    validateEmail(form.pic_email, "Email PIC"),
    validateOptionalText(form.address, "Alamat", { maxLength: 255 }),
    validateOptionalText(form.description, "Deskripsi", { maxLength: 500 }),
  ]);
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan.";
}
