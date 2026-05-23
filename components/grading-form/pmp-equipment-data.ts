export type PmpEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  manufacturer: string;
  model: string;
  fluid: string;
  pumpType: string;
  driverType: string;
  insulationClass: string;
  flowCapacity: number | string;
  flowCapacityUnit: string;
  power: number | string;
  powerUnit: string;
  manufactureYear: number | string;
  location: string;
};

export type PmpEquipmentDataRow = {
  label: string;
  value: string;
};

export function buildPmpEquipmentRows(
  equipment: PmpEquipmentData,
): PmpEquipmentDataRow[] {
  return [
    { label: "Nomor Tag", value: equipment.tagNumber },
    { label: "Nomor Serial Pompa", value: equipment.serialNumber },
    {
      label: "Manufaktur / Model Pompa",
      value: `${equipment.manufacturer} / ${equipment.model}`,
    },
    { label: "Fluida / Jenis", value: `${equipment.fluid} / ${equipment.pumpType}` },
    {
      label: "Jenis Penggerak / Kelas Insulasi",
      value: `${equipment.driverType} / ${equipment.insulationClass}`,
    },
    {
      label: "Laju alir",
      value: `${equipment.flowCapacity} ${equipment.flowCapacityUnit}`,
    },
    { label: "Power", value: `${equipment.power} ${equipment.powerUnit}` },
    { label: "Tahun Pembuatan", value: String(equipment.manufactureYear) },
    { label: "Lokasi", value: equipment.location },
  ];
}
