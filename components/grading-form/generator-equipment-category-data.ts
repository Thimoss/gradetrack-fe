export type EquipmentCategory = {
  label: string;
  min: number;
  max: number;
  rangeLabel: string;
  className: string;
};

export const equipmentCategories: EquipmentCategory[] = [
  {
    label: "LOW INTEGRITY",
    min: 0,
    max: 40,
    rangeLabel: "0% - 40%",
    className: "bg-[var(--pertamina-red)] text-white",
  },
  {
    label: "MEDIUM INTEGRITY",
    min: 41,
    max: 75,
    rangeLabel: "41% - 75%",
    className: "bg-[var(--pertamina-green)] text-[var(--pertamina-black)]",
  },
  {
    label: "HIGH INTEGRITY",
    min: 76,
    max: 100,
    rangeLabel: "76% - 100%",
    className: "bg-[var(--pertamina-blue)] text-white",
  },
];

export function getEquipmentCategory(totalScore: number) {
  return (
    equipmentCategories.find((category) => {
      return totalScore >= category.min && totalScore <= category.max;
    }) ?? equipmentCategories[0]
  );
}
