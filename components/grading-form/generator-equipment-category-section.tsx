import {
  equipmentCategories,
  getEquipmentCategory,
} from "./generator-equipment-category-data";

type GeneratorEquipmentCategorySectionProps = {
  totalScore: number;
};

export function GeneratorEquipmentCategorySection({
  totalScore,
}: GeneratorEquipmentCategorySectionProps) {
  const activeCategory = getEquipmentCategory(totalScore);

  return (
    <section className="border-b-4 border-blue-700 bg-white">
      <h2 className="px-1 text-lg font-bold uppercase leading-8 text-neutral-950">
        Kategori Peralatan
      </h2>
      <div className="mx-9 mb-3 grid grid-cols-[minmax(260px,0.8fr)_minmax(360px,1fr)] items-center gap-28 border border-neutral-300 px-10 py-4 max-lg:grid-cols-1 max-lg:gap-8 max-md:mx-4 max-md:px-4">
        <div className="border border-neutral-300 px-6 py-2 text-center text-3xl font-bold uppercase leading-tight text-neutral-950">
          {activeCategory.label.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </div>
        <div>
          <div className="grid grid-cols-3 border border-neutral-300">
            {equipmentCategories.map((category) => {
              const isActive = category.label === activeCategory.label;

              return (
                <div
                  key={category.label}
                  className={`flex h-24 items-center justify-center border-r border-neutral-300 text-4xl font-bold text-neutral-950 last:border-r-0 ${category.className}`}
                >
                  {isActive ? "X" : ""}
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-3 text-center text-base font-bold text-neutral-950">
            {equipmentCategories.map((category) => (
              <span key={category.label}>{category.rangeLabel}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
