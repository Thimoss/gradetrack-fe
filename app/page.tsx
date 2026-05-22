"use client";

import { useState } from "react";
import { GeneratorDocumentationSection } from "@/components/grading-form/generator-documentation-section";
import { GeneratorEquipmentCategorySection } from "@/components/grading-form/generator-equipment-category-section";
import { PipAssessmentSection } from "@/components/grading-form/pip-assessment-section";
import { PipConclusionSection } from "@/components/grading-form/pip-conclusion-section";
import { PipEquipmentDataSection } from "@/components/grading-form/pip-equipment-data-section";
import { PipFieldDataSection } from "@/components/grading-form/pip-field-data-section";
import { PipMajorConditionSection } from "@/components/grading-form/pip-major-condition-section";

const pipEquipment = {
  lineNo: "Jalur 1",
  lineDescription: "Jalur Pipa 1 ke Tangki 1",
  fluid: "Pertamax",
  diameter: 6,
  diameterUnit: "Inch",
  length: 10,
  lengthUnit: "M",
  designPressure: "450,00",
  designPressureUnit: "Psig",
  designTemperature: "60,00",
  designTemperatureUnit: "C",
  manufactureYear: 1998,
  location: "Tangki 1",
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
            Form Grading PIP
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-950">
                Sistem Perpipaan
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
        <PipEquipmentDataSection equipment={pipEquipment} />
        <GeneratorDocumentationSection />
        <PipFieldDataSection />
        <PipMajorConditionSection />
        <PipAssessmentSection
          onSummaryChange={(summary) => {
            setTotalScore(summary.totalScore);
            setImprovementParameters(summary.improvementParameters);
          }}
        />
        <GeneratorEquipmentCategorySection totalScore={totalScore} />
        <PipConclusionSection
          totalScore={totalScore}
          improvementParameters={improvementParameters}
        />
      </main>
    </div>
  );
}
