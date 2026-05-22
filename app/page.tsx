"use client";

import { useState } from "react";
import { GeneratorEquipmentDataSection } from "@/components/grading-form/generator-equipment-data-section";
import { GeneratorAssessmentSection } from "@/components/grading-form/generator-assessment-section";
import { GeneratorConclusionSection } from "@/components/grading-form/generator-conclusion-section";
import { GeneratorDocumentationSection } from "@/components/grading-form/generator-documentation-section";
import { GeneratorEquipmentCategorySection } from "@/components/grading-form/generator-equipment-category-section";
import { GeneratorFieldGuideSection } from "@/components/grading-form/generator-field-guide-section";
import { GeneratorMajorConditionSection } from "@/components/grading-form/generator-major-condition-section";
import { GeneratorMeasurementSection } from "@/components/grading-form/generator-measurement-section";

const generatorEquipment = {
  tagNumber: "327-G-302/00",
  serialNumber: "4B159808",
  manufacturer: "STAMFORD AC G",
  model: "B5 5000",
  voltage: 220,
  voltageUnit: "Volt",
  insulationClass: "B",
  capacity: 400,
  capacityUnit: "KVA",
  power: 50,
  powerUnit: "Hz",
  manufactureYear: 1994,
  location: "IT Cikampek F204-LJP",
};

export default function Home() {
  const [totalScore, setTotalScore] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-8 text-neutral-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <header className="rounded-lg border border-zinc-200 bg-white px-6 py-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">
            Form Grading Generator
          </p>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-950">
                Generator Set GST
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
        <GeneratorEquipmentDataSection equipment={generatorEquipment} />
        <GeneratorDocumentationSection />
        <GeneratorFieldGuideSection />
        <GeneratorMeasurementSection />
        <GeneratorMajorConditionSection />
        <GeneratorAssessmentSection onTotalScoreChange={setTotalScore} />
        <GeneratorEquipmentCategorySection totalScore={totalScore} />
        <GeneratorConclusionSection totalScore={totalScore} />
      </main>
    </div>
  );
}
