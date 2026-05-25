"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  type Equipment,
  type EquipmentType,
} from "@/hooks/use-equipment-page";

type DepotOption = {
  id: number;
  depot_name: string;
  depot_code: string;
};

export type EquipmentFormState = {
  depot_id: string;
  equipmentType: EquipmentType;
  tagNumber: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  location: string;
  manufactureYear: string;
  extra: Record<string, string>;
};

type FieldConfig = {
  name: string;
  label: string;
  type?: "number" | "text";
  step?: string;
};

type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
};

type DepotListResponse = {
  items: DepotOption[];
};

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

const emptyForm: EquipmentFormState = {
  depot_id: "",
  equipmentType: "GENERATOR_GST",
  tagNumber: "",
  serialNumber: "",
  manufacturer: "",
  model: "",
  location: "",
  manufactureYear: "",
  extra: {},
};

export const equipmentRequiredFields: Record<EquipmentType, FieldConfig[]> = {
  GENERATOR_GST: [
    { name: "voltage", label: "Voltage", type: "number" },
    { name: "insulationClass", label: "Insulation Class" },
    { name: "capacity", label: "Capacity", type: "number" },
    { name: "power", label: "Power", type: "number" },
  ],
  MOTOR_OPERATED_VALVE_MOV: [
    { name: "nps", label: "NPS", type: "number" },
    { name: "rating", label: "Rating", type: "number" },
    { name: "actuatorManufacturer", label: "Actuator Manufacturer" },
    { name: "actuatorModel", label: "Actuator Model" },
    { name: "actuatorType", label: "Actuator Type" },
    { name: "failurePosition", label: "Failure Position" },
    { name: "fluid", label: "Fluid" },
    { name: "flowCapacity", label: "Flow Capacity", type: "number" },
  ],
  FLOW_METER_MTR: [
    { name: "flowMeterType", label: "Flow Meter Type" },
    { name: "fluid", label: "Fluid" },
    { name: "flowCapacity", label: "Flow Capacity", type: "number" },
  ],
  PIPING_SYSTEM_PIP: [
    { name: "lineNumber", label: "Line Number" },
    { name: "lineDescription", label: "Line Description" },
    { name: "fluid", label: "Fluid" },
    { name: "diameter", label: "Diameter", type: "number", step: "any" },
    { name: "length", label: "Length", type: "number", step: "any" },
    { name: "designPressure", label: "Design Pressure", type: "number", step: "any" },
    { name: "designTemperature", label: "Design Temperature", type: "number", step: "any" },
  ],
  PRODUCT_PUMP_PMP: [
    { name: "fluid", label: "Fluid" },
    { name: "pumpType", label: "Pump Type" },
    { name: "driverType", label: "Driver Type" },
    { name: "insulationClass", label: "Insulation Class" },
    { name: "flowCapacity", label: "Flow Capacity", type: "number" },
    { name: "power", label: "Power", type: "number" },
  ],
  MEDIUM_VOLTAGE_SWITCHGEAR_SGR1: [
    { name: "designStandard", label: "Design Standard" },
    { name: "ratedOperationalVoltage", label: "Rated Voltage", type: "number" },
    { name: "mainBusbarRatedCurrent", label: "Main Busbar Current", type: "number" },
    { name: "circuitBreakerType", label: "Circuit Breaker Type" },
    { name: "springChargingMotorAuxSupplyVoltage", label: "Spring Charging Voltage", type: "number" },
    { name: "protectionCircuitAuxSupplyVoltage", label: "Protection Circuit Voltage", type: "number" },
    { name: "controlSignallingAuxSupplyVoltage", label: "Control Signalling Voltage", type: "number" },
    { name: "heatingLightingAuxSupplyVoltage", label: "Heating Lighting Voltage", type: "number" },
    { name: "frequency", label: "Frequency", type: "number" },
    { name: "ratedShortTimeWithstandCurrent", label: "Short Time Current", type: "number" },
    { name: "ratedShortTimeWithstandDuration", label: "Short Time Duration", type: "number" },
    { name: "degreeOfProtection", label: "Degree of Protection" },
    { name: "totalCubicle", label: "Total Cubicle", type: "number" },
  ],
  STORAGE_TANK_TNK1: [
    { name: "fluid", label: "Fluid" },
    { name: "roofType", label: "Roof Type" },
    { name: "foundationType", label: "Foundation Type" },
    { name: "diameter", label: "Diameter", type: "number", step: "any" },
    { name: "height", label: "Height", type: "number", step: "any" },
    { name: "tankCapacity", label: "Tank Capacity", type: "number", step: "any" },
  ],
  SPHERICAL_TANK_TNK2: [
    { name: "fluid", label: "Fluid" },
    { name: "supportType", label: "Support Type" },
    { name: "diameter", label: "Diameter", type: "number", step: "any" },
    { name: "tankCapacity", label: "Tank Capacity", type: "number", step: "any" },
    { name: "designPressure", label: "Design Pressure", type: "number", step: "any" },
    { name: "designTemperature", label: "Design Temperature", type: "number", step: "any" },
  ],
  POWER_TRANSFORMER_TRF: [
    { name: "designStandard", label: "Design Standard" },
    { name: "numberOfPhase", label: "Number of Phase", type: "number" },
    { name: "impedancePercent", label: "Impedance Percent", type: "number", step: "any" },
    { name: "temperatureRise", label: "Temperature Rise", type: "number", step: "any" },
    { name: "temperatureRiseMax", label: "Temperature Rise Max", type: "number", step: "any" },
    { name: "frequency", label: "Frequency", type: "number" },
    { name: "ratedPower", label: "Rated Power", type: "number", step: "any" },
    { name: "primaryRatedVoltage", label: "Primary Rated Voltage", type: "number", step: "any" },
    { name: "secondaryRatedVoltage", label: "Secondary Rated Voltage", type: "number", step: "any" },
    { name: "primaryRatedCurrent", label: "Primary Rated Current", type: "number", step: "any" },
    { name: "secondaryRatedCurrent", label: "Secondary Rated Current", type: "number", step: "any" },
    { name: "coolingType", label: "Cooling Type" },
    { name: "vectorGroup", label: "Vector Group" },
    { name: "numberOfTap", label: "Number of Tap", type: "number" },
    { name: "nominalTap", label: "Nominal Tap", type: "number" },
    { name: "transformerOilMass", label: "Transformer Oil Mass", type: "number", step: "any" },
    { name: "totalMass", label: "Total Mass", type: "number", step: "any" },
  ],
  UNINTERRUPTIBLE_POWER_SYSTEM_UPS: [],
};

export function useEquipmentFormPage(equipmentId?: string) {
  const router = useRouter();
  const [form, setForm] = useState<EquipmentFormState>(emptyForm);
  const [depots, setDepots] = useState<DepotOption[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(equipmentId));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = Boolean(equipmentId);
  const requiredFields = useMemo(() => {
    return equipmentRequiredFields[form.equipmentType];
  }, [form.equipmentType]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDepots() {
      try {
        const data = await fetchJson<DepotListResponse>(
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

  useEffect(() => {
    if (!equipmentId) return;

    const controller = new AbortController();

    async function loadEquipment() {
      setIsLoading(true);
      setError(null);

      try {
        const equipment = await fetchJson<Equipment>(
          `${apiBaseUrl}/equipment/${equipmentId}`,
          { signal: controller.signal },
        );
        setForm(mapEquipmentToForm(equipment));
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
  }, [equipmentId]);

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    if (name === "equipmentType") {
      setForm((current) => ({
        ...current,
        equipmentType: value as EquipmentType,
        extra: {},
      }));
      return;
    }

    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleExtraFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      extra: { ...current.extra, [name]: value },
    }));
  }

  async function submitEquipment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const endpoint = isEditMode
      ? `${apiBaseUrl}/equipment/${equipmentId}`
      : `${apiBaseUrl}/equipment`;

    try {
      await fetchJson<Equipment>(endpoint, {
        body: JSON.stringify(buildEquipmentPayload(form, isEditMode, depots)),
        headers: { "Content-Type": "application/json" },
        method: isEditMode ? "PATCH" : "POST",
      });

      toast.success(
        isEditMode ? "Equipment diperbarui." : "Equipment dibuat.",
      );
      router.push("/equipment");
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
    router.push("/equipment");
  }

  return {
    form,
    depots,
    isEditMode,
    isLoading,
    isSubmitting,
    error,
    requiredFields,
    handleFieldChange,
    handleExtraFieldChange,
    submitEquipment,
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

function mapEquipmentToForm(equipment: Equipment): EquipmentFormState {
  return {
    depot_id: equipment.depot ? String(equipment.depot.id) : "",
    equipmentType: equipment.equipmentType,
    tagNumber: stringify(equipment.identity.tagNumber),
    serialNumber: stringify(equipment.identity.serialNumber),
    manufacturer: stringify(equipment.maker?.manufacturer),
    model: stringify(equipment.maker?.model),
    location: stringify(equipment.identity.location),
    manufactureYear: stringify(equipment.identity.manufactureYear),
    extra: flattenRecord(equipment.specifications),
  };
}

function buildEquipmentPayload(
  form: EquipmentFormState,
  isEditMode: boolean,
  depots: DepotOption[],
) {
  const selectedDepot = depots.find((depot) => String(depot.id) === form.depot_id);
  const depotLocation = selectedDepot
    ? `${selectedDepot.depot_name} (${selectedDepot.depot_code})`
    : undefined;
  const payload = removeBlankFields({
    depot_id: toOptionalNumber(form.depot_id),
    equipmentType: form.equipmentType,
    tagNumber:
      form.equipmentType === "PIPING_SYSTEM_PIP"
        ? form.extra.lineNumber || form.tagNumber
        : form.tagNumber,
    serialNumber: form.serialNumber,
    manufacturer: form.manufacturer,
    model: form.model,
    location: form.location || depotLocation,
    manufactureYear: toOptionalNumber(form.manufactureYear),
    ...convertExtraFields(form.extra),
  });

  if (!isEditMode) return payload;

  const { depot_id, ...updatePayload } = payload;
  void depot_id;
  return updatePayload;
}

function convertExtraFields(extra: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(extra).map(([key, value]) => [
      key,
      isNumericKey(key) ? toOptionalNumber(value) : value,
    ]),
  );
}

function removeBlankFields(payload: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== "" && value !== undefined,
    ),
  );
}

function flattenRecord(value: Record<string, unknown>) {
  const result: Record<string, string> = {};

  for (const [key, item] of Object.entries(value)) {
    if (isUnitValue(item)) {
      result[key] = stringify(item.value);
      continue;
    }

    if (item && typeof item === "object" && !Array.isArray(item)) {
      Object.assign(result, flattenRecord(item as Record<string, unknown>));
      continue;
    }

    result[key] = stringify(item);
  }

  return result;
}

function isUnitValue(value: unknown): value is { value: unknown } {
  return Boolean(value && typeof value === "object" && "value" in value);
}

function stringify(value: unknown) {
  if (value === undefined || value === null) return "";
  return String(value);
}

function toOptionalNumber(value: string) {
  if (value.trim() === "") return undefined;
  return Number(value);
}

function isNumericKey(key: string) {
  return /year|voltage|capacity|power|nps|rating|diameter|length|pressure|temperature|current|duration|frequency|cubicle|phase|impedance|rise|tap|mass|height/i.test(
    key,
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return "Terjadi kesalahan.";
}
