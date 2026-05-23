"use client";

import { useState } from "react";
import { GeneratorDocumentationSection } from "@/components/grading-form/generator-documentation-section";
import { GeneratorEquipmentCategorySection } from "@/components/grading-form/generator-equipment-category-section";
import { MasterLayout } from "@/components/layout/master-layout";
import { UpsAssessmentSection } from "@/components/grading-form/ups-assessment-section";
import { UpsConclusionSection } from "@/components/grading-form/ups-conclusion-section";
import { UpsEquipmentDataSection } from "@/components/grading-form/ups-equipment-data-section";
import { UpsFieldDataSection } from "@/components/grading-form/ups-field-data-section";
import { UpsMajorConditionSection } from "@/components/grading-form/ups-major-condition-section";

const upsEquipment = {
  tagNumber: "327-UPS-001/00",
  serialNumber: "0",
  location: "IT Cikampek",
  manufactureYear: 0,
  manufacturer: "",
  model: "",
  designStandard: "",
  mainInputVoltage: "",
  mainInputVoltageUnit: "Volt",
  mainInputCurrent: "",
  mainInputCurrentUnit: "Ampere",
  mainInputFrequency: "",
  mainInputFrequencyUnit: "Hz",
  mainInputPowerKva: "",
  mainInputPowerKw: "",
  mainInputShortCircuitCurrent: "",
  bypassVoltage: "",
  bypassCurrent: "",
  bypassFrequency: "",
  bypassPowerKva: "",
  bypassPowerKw: "",
  bypassShortCircuitCurrent: "",
  batteryVoltage: "",
  batteryNominalCurrent: "",
  batteryMaxCurrent: "",
  outputVoltage: "",
  outputCurrent: "",
  outputFrequency: "",
  outputPowerKva: "",
  outputPowerKw: "",
  outputShortCircuitCurrent: "",
  ipRating: "",
};

export default function GradingPage() {
  const [totalScore, setTotalScore] = useState(0);
  const [improvementParameters, setImprovementParameters] = useState<string[]>(
    [],
  );

  return (
    <MasterLayout>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="rounded-lg border border-zinc-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
            Form Grading UPS
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-950">
                Uninterruptible Power Systems
              </h1>
              <p className="mt-1 text-sm text-neutral-600">
                Data inspeksi, penilaian, kategori, dan kesimpulan peralatan.
              </p>
            </div>
            <div className="rounded-lg bg-slate-950 px-4 py-3 text-right text-white shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-300">
                Total Skor
              </p>
              <p className="text-2xl font-bold">
                {totalScore.toFixed(1).replace(".", ",")}
              </p>
            </div>
          </div>
        </header>
        <UpsEquipmentDataSection equipment={upsEquipment} />
        <GeneratorDocumentationSection />
        <UpsFieldDataSection />
        <UpsMajorConditionSection />
        <UpsAssessmentSection
          onSummaryChange={(summary) => {
            setTotalScore(summary.totalScore);
            setImprovementParameters(summary.improvementParameters);
          }}
        />
        <GeneratorEquipmentCategorySection totalScore={totalScore} />
        <UpsConclusionSection
          totalScore={totalScore}
          improvementParameters={improvementParameters}
        />
      </div>
    </MasterLayout>
  );
}
