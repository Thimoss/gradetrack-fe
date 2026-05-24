"use client";

import { useMemo, useState } from "react";

export type GradingEquipmentType =
  | "gst"
  | "mov"
  | "mtr"
  | "pip"
  | "pmp"
  | "sgr"
  | "tnk"
  | "trf"
  | "ups";

export type GradingStep = "idle" | "date" | "equipment" | "form";

export type GradingEquipmentOption = {
  type: GradingEquipmentType;
  label: string;
  description: string;
  tags: string[];
  hasGuide: boolean;
};

export const gradingEquipmentOptions: GradingEquipmentOption[] = [
  {
    type: "gst",
    label: "Generator",
    description: "Generator set dan alternator.",
    tags: ["GST-01", "GST-02"],
    hasGuide: true,
  },
  {
    type: "mov",
    label: "Motor Operated Valve",
    description: "MOV tanpa guide lapangan.",
    tags: ["MOV-01", "MOV-02"],
    hasGuide: false,
  },
  {
    type: "mtr",
    label: "Meter Arus",
    description: "Flow meter tanpa guide lapangan.",
    tags: ["MTR-01", "MTR-02"],
    hasGuide: false,
  },
  {
    type: "pip",
    label: "Sistem Perpipaan",
    description: "Jalur pipa dan data ketebalan.",
    tags: ["PIP-01", "PIP-02"],
    hasGuide: false,
  },
  {
    type: "pmp",
    label: "Pompa Produk",
    description: "Pompa produk dengan guide lapangan.",
    tags: ["PMP-01", "PMP-02"],
    hasGuide: true,
  },
  {
    type: "sgr",
    label: "Switchgear",
    description: "Switchgear dan cubicle.",
    tags: ["SGR-01", "SGR-02"],
    hasGuide: false,
  },
  {
    type: "tnk",
    label: "Storage Tank",
    description: "Tangki timbun dan pengukuran visual.",
    tags: ["TNK-01", "TNK-02"],
    hasGuide: false,
  },
  {
    type: "trf",
    label: "Transformer",
    description: "Transformator daya.",
    tags: ["TRF-01", "TRF-02"],
    hasGuide: false,
  },
  {
    type: "ups",
    label: "UPS",
    description: "Uninterruptible power systems.",
    tags: ["UPS-01", "UPS-02"],
    hasGuide: false,
  },
];

function getTodayInputValue() {
  return new Date().toISOString().slice(0, 10);
}

export function useGradingPage() {
  const [step, setStep] = useState<GradingStep>("idle");
  const [assessmentDate, setAssessmentDate] = useState(getTodayInputValue);
  const [selectedEquipmentType, setSelectedEquipmentType] =
    useState<GradingEquipmentType>("gst");
  const [selectedTag, setSelectedTag] = useState(
    gradingEquipmentOptions[0].tags[0],
  );

  const selectedEquipmentOption = useMemo(() => {
    return (
      gradingEquipmentOptions.find(
        (option) => option.type === selectedEquipmentType,
      ) ?? gradingEquipmentOptions[0]
    );
  }, [selectedEquipmentType]);

  function startGrading() {
    setStep("date");
  }

  function closeModal() {
    setStep("idle");
  }

  function submitAssessmentDate() {
    setStep("equipment");
  }

  function selectEquipmentType(type: GradingEquipmentType) {
    const option = gradingEquipmentOptions.find((item) => item.type === type);

    setSelectedEquipmentType(type);
    setSelectedTag(option?.tags[0] ?? "");
  }

  function submitEquipmentType() {
    setStep("form");
  }

  function restartFlow() {
    setStep("date");
  }

  return {
    step,
    assessmentDate,
    selectedEquipmentType,
    selectedEquipmentOption,
    selectedTag,
    gradingEquipmentOptions,
    setAssessmentDate,
    setSelectedTag,
    startGrading,
    closeModal,
    submitAssessmentDate,
    selectEquipmentType,
    submitEquipmentType,
    restartFlow,
  };
}
