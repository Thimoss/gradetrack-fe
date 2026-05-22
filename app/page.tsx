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
    <div className="min-h-screen bg-neutral-100 px-6 py-8 text-neutral-950">
      <main className="mx-auto w-full max-w-5xl border border-neutral-300 bg-white">
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
