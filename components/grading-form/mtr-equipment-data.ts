export type MtrEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  location: string;
  manufactureYear: number | string;
  manufacturer: string;
  model: string;
  flowMeterType: string;
  fluid: string;
  flowCapacity: number | string;
  flowCapacityUnit: string;
};

export type MtrEquipmentDataRow = {
  label: string;
  value: string;
};

export function buildMtrEquipmentRows(
  equipment: MtrEquipmentData,
): MtrEquipmentDataRow[] {
  return [
    { label: "Nomor Tag", value: equipment.tagNumber },
    { label: "Nomor Serial", value: equipment.serialNumber },
    { label: "Lokasi", value: equipment.location },
    { label: "Tahun Pembuatan", value: String(equipment.manufactureYear) },
    {
      label: "Manufaktur / Model",
      value: `${equipment.manufacturer} / ${equipment.model}`,
    },
    { label: "Tipe Flow Meter", value: equipment.flowMeterType },
    { label: "Fluida", value: equipment.fluid },
    {
      label: "Kapasitas Laju Alir",
      value: `${equipment.flowCapacity} ${equipment.flowCapacityUnit}`,
    },
  ];
}
