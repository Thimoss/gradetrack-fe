export type MovEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  location: string;
  manufactureYear: number | string;
  valveBodyManufacturer: string;
  valveBodyModel: string;
  valveType: string;
  nps: number | string;
  rating: number | string;
  actuatorManufacturer: string;
  actuatorModel: string;
  actuatorType: string;
  failurePosition: string;
  fluid: string;
  flowCapacity: number | string;
  flowCapacityUnit: string;
};

export type MovEquipmentDataRow = {
  label: string;
  value: string;
};

export function buildMovEquipmentRows(
  equipment: MovEquipmentData,
): MovEquipmentDataRow[] {
  return [
    { label: "Nomor Tag", value: equipment.tagNumber },
    { label: "Nomor Serial", value: equipment.serialNumber },
    { label: "Lokasi", value: equipment.location },
    { label: "Tahun Pembuatan", value: String(equipment.manufactureYear) },
    {
      label: "Manufaktur / Model (Valve Body)",
      value: `${equipment.valveBodyManufacturer} / ${equipment.valveBodyModel}`,
    },
    { label: "Tipe Valve", value: equipment.valveType },
    { label: "NPS / Rating", value: `${equipment.nps} / ${equipment.rating}` },
    {
      label: "Manufaktur / Model (Actuator)",
      value: `${equipment.actuatorManufacturer} / ${equipment.actuatorModel}`,
    },
    { label: "Tipe Aktuator", value: equipment.actuatorType },
    { label: "Failure Position", value: equipment.failurePosition },
    { label: "Fluida", value: equipment.fluid },
    {
      label: "Kapasitas Laju Alir",
      value: `${equipment.flowCapacity} ${equipment.flowCapacityUnit}`,
    },
  ];
}
