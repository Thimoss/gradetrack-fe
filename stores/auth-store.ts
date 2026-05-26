"use client";

import { create } from "zustand";

export type AuthUser = {
  id: number;
  employee_number: string;
  name: string;
  role: string;
  depot_id?: number | null;
};

type AuthState = {
  user: AuthUser | null;
  hydrateUser: () => void;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrateUser: () => {
    set({ user: readStoredUser() });
  },
  setUser: (user) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "grading_employee_number",
        user.employee_number,
      );
      window.localStorage.setItem("grading_user_id", String(user.id));
      window.localStorage.setItem("grading_user_name", user.name);
      window.localStorage.setItem("grading_user_role", user.role);
      if (user.depot_id) {
        window.localStorage.setItem("grading_depot_id", String(user.depot_id));
      } else {
        window.localStorage.removeItem("grading_depot_id");
      }
    }

    set({ user });
  },
  clearUser: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("grading_employee_number");
      window.localStorage.removeItem("grading_user_id");
      window.localStorage.removeItem("grading_user_name");
      window.localStorage.removeItem("grading_user_role");
      window.localStorage.removeItem("grading_depot_id");
    }

    set({ user: null });
  },
}));

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const employeeNumber = window.localStorage.getItem(
    "grading_employee_number",
  );
  const id = window.localStorage.getItem("grading_user_id");
  const name = window.localStorage.getItem("grading_user_name");
  const role = window.localStorage.getItem("grading_user_role");
  const depotId = window.localStorage.getItem("grading_depot_id");

  if (!employeeNumber || !id || !name || !role) return null;

  return {
    id: Number(id),
    employee_number: employeeNumber,
    name,
    role,
    depot_id: depotId ? Number(depotId) : null,
  };
}
