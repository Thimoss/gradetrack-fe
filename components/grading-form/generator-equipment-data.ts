export type GeneratorEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  voltage: number | string;
  voltageUnit: string;
  insulationClass: string;
  capacity: number | string;
  capacityUnit: string;
  power: number | string;
  powerUnit: string;
  manufactureYear: number | string;
  location: string;
};

export type EquipmentDataRow = {
  label: string;
  value: string;
  unit?: string;
};

export function buildGeneratorEquipmentRows(
  equipment: GeneratorEquipmentData,
): EquipmentDataRow[] {
  return [
    {
      label: "Nomor Tag",
      value: String(equipment.tagNumber),
    },
    {
      label: "Nomor Serial Generator",
      value: String(equipment.serialNumber),
    },
    {
      label: "Manufaktur / Model",
      value: `${equipment.manufacturer} / ${equipment.model}`,
    },
    {
      label: "Voltase",
      value: String(equipment.voltage),
      unit: equipment.voltageUnit,
    },
    {
      label: "Kelas Insulasi",
      value: String(equipment.insulationClass),
    },
    {
      label: "Kapasitas",
      value: String(equipment.capacity),
      unit: equipment.capacityUnit,
    },
    {
      label: "Power",
      value: String(equipment.power),
      unit: equipment.powerUnit,
    },
    {
      label: "Tahun Pembuatan",
      value: String(equipment.manufactureYear),
    },
    {
      label: "Lokasi",
      value: String(equipment.location),
    },
  ];
}
