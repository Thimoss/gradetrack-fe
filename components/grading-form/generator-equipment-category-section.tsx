import {
  equipmentCategories,
  getEquipmentCategory,
} from "./generator-equipment-category-data";
import { GradingFormSection } from "./grading-form-section";

type GeneratorEquipmentCategorySectionProps = {
  totalScore: number;
};

export function GeneratorEquipmentCategorySection({
  totalScore,
}: GeneratorEquipmentCategorySectionProps) {
  const activeCategory = getEquipmentCategory(totalScore);

  return (
    <GradingFormSection title="Kategori Peralatan">
      <div className="grid grid-cols-[minmax(260px,0.8fr)_minmax(360px,1fr)] items-center gap-10 max-lg:grid-cols-1">
        <div className="rounded-lg border border-zinc-200 bg-slate-50 px-6 py-6 text-center text-3xl font-bold uppercase leading-tight text-slate-950">
          {activeCategory.label.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </div>
        <div>
          <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-zinc-200">
            {equipmentCategories.map((category) => {
              const isActive = category.label === activeCategory.label;

              return (
                <div
                  key={category.label}
                  className={`flex h-24 items-center justify-center border-r border-zinc-200 text-4xl font-bold last:border-r-0 ${category.className}`}
                >
                  {isActive ? "X" : ""}
                </div>
              );
            })}
          </div>
          <div className="mt-2 grid grid-cols-3 text-center text-sm font-bold text-neutral-700">
            {equipmentCategories.map((category) => (
              <span key={category.label}>{category.rangeLabel}</span>
            ))}
          </div>
        </div>
      </div>
    </GradingFormSection>
  );
}
