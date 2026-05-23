export type TnkEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  manufacturer: string;
  fluid: string | number;
  roofType: string;
  foundationType: string | number;
  diameter: number;
  diameterUnit: string;
  height: number;
  heightUnit: string;
  capacity: number;
  capacityUnit: string;
  manufactureYear: number;
  location: string;
};

export function buildTnkEquipmentRows(equipment: TnkEquipmentData) {
  return [
    { label: "Nomor Tag", value: equipment.tagNumber },
    { label: "Nomor Serial Tangki", value: equipment.serialNumber },
    { label: "Manufaktur", value: equipment.manufacturer },
    {
      label: "Fluida / Jenis Atap",
      value: `${equipment.fluid} / ${equipment.roofType}`,
    },
    { label: "Jenis Pondasi", value: equipment.foundationType },
    {
      label: "Dimensi (Diameter x Tinggi)",
      value: `${equipment.diameter} ${equipment.diameterUnit} x ${equipment.height} ${equipment.heightUnit}`,
    },
    { label: "Kapasitas", value: `${equipment.capacity} ${equipment.capacityUnit}` },
    { label: "Tahun Pembuatan", value: equipment.manufactureYear },
    { label: "Lokasi", value: equipment.location },
  ];
}
