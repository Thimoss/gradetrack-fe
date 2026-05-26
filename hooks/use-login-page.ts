"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch, getApiMessage, type ApiEnvelope } from "@/lib/api-client";
import {
  firstInvalid,
  validateRequiredPositiveInteger,
  validateRequiredText,
} from "@/lib/input-validation";
import { useAuthStore, type AuthUser } from "@/stores/auth-store";

type LoginPayload = {
  user: AuthUser;
};

export function useLoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const employeeNumber = String(form.get("employeeNumber") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setErrorMessage("");

    const validation = firstInvalid([
      validateRequiredPositiveInteger(employeeNumber, "Nomor pegawai"),
      validateRequiredText(password, "Kata sandi", { maxLength: 120 }),
    ]);
    if (!validation.isValid) {
      setErrorMessage(validation.message);
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await apiFetch<LoginPayload>("/auth/login", {
        body: JSON.stringify({
          employee_number: employeeNumber,
          password,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      setUser(data.user);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return { errorMessage, handleSubmit, isSubmitting };
}

function getLoginErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return getApiMessage((error as ApiEnvelope<unknown> | undefined)?.message);
}
