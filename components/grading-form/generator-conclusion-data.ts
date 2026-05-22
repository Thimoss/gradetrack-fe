import { getEquipmentCategory } from "./generator-equipment-category-data";

export function getNextInspectionInterval(totalScore: number) {
  const category = getEquipmentCategory(totalScore);

  if (category.label === "LOW INTEGRITY") {
    return 3;
  }

  if (category.label === "MEDIUM INTEGRITY") {
    return 9;
  }

  return 12;
}
