"use client";

import { useState } from "react";
import { GeneratorDocumentationSection } from "@/components/grading-form/generator-documentation-section";
import { GeneratorEquipmentCategorySection } from "@/components/grading-form/generator-equipment-category-section";
import { MovFieldDataSection } from "@/components/grading-form/mov-field-data-section";
import { MtrAssessmentSection } from "@/components/grading-form/mtr-assessment-section";
import { MtrConclusionSection } from "@/components/grading-form/mtr-conclusion-section";
import { MtrEquipmentDataSection } from "@/components/grading-form/mtr-equipment-data-section";
import { MtrMajorConditionSection } from "@/components/grading-form/mtr-major-condition-section";

const mtrEquipment = {
  tagNumber: "327-FQI-209/00",
  serialNumber: "0",
  location: "IT Cikampek",
  manufactureYear: 0,
  manufacturer: "SMITH METER IN",
  model: "PRIME 4-0-0-1",
  flowMeterType: "Positive Displacement (PD) Flow Meter",
  fluid: "PREMIUM",
  flowCapacity: 0,
  flowCapacityUnit: "m3/h",
};

export default function Home() {
  const [totalScore, setTotalScore] = useState(0);
  const [improvementParameters, setImprovementParameters] = useState<string[]>(
    [],
  );

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-8 text-neutral-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="rounded-lg border border-zinc-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
            Form Grading Flow Meter
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-950">
                Meter Arus MTR
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
        <MtrEquipmentDataSection equipment={mtrEquipment} />
        <GeneratorDocumentationSection />
        <MovFieldDataSection />
        <MtrMajorConditionSection />
        <MtrAssessmentSection
          onSummaryChange={(summary) => {
            setTotalScore(summary.totalScore);
            setImprovementParameters(summary.improvementParameters);
          }}
        />
        <GeneratorEquipmentCategorySection totalScore={totalScore} />
        <MtrConclusionSection
          totalScore={totalScore}
          improvementParameters={improvementParameters}
        />
      </main>
    </div>
  );
}
