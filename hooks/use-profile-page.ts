"use client";

import { FormEvent, useState } from "react";
import { apiFetch } from "@/lib/api-client";
import { firstInvalid, invalid, validateRequiredText, valid } from "@/lib/input-validation";
import { useAuthStore } from "@/stores/auth-store";

export function useProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;

    const form = new FormData(event.currentTarget);
    const currentPassword = String(form.get("currentPassword") ?? "");
    const newPassword = String(form.get("newPassword") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    setErrorMessage("");
    setSuccessMessage("");

    const validation = firstInvalid([
      validateRequiredText(currentPassword, "Kata sandi lama", {
        maxLength: 120,
      }),
      validateRequiredText(newPassword, "Kata sandi baru", { maxLength: 120 }),
      validateRequiredText(confirmPassword, "Konfirmasi kata sandi baru", {
        maxLength: 120,
      }),
      newPassword.length >= 6
        ? valid()
        : invalid("Kata sandi baru minimal 6 karakter."),
    ]);
    if (!validation.isValid) {
      setErrorMessage(validation.message);
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi baru belum sama.");
      return;
    }

    setIsSubmitting(true);

    try {
      await apiFetch<{ success: boolean }>("/auth/change-password", {
        body: JSON.stringify({
          employee_number: user.employee_number,
          current_password: currentPassword,
          new_password: newPassword,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      event.currentTarget.reset();
      setSuccessMessage("Kata sandi berhasil diganti.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Kata sandi gagal diganti.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    changePassword,
    errorMessage,
    isSubmitting,
    successMessage,
    user,
  };
}
