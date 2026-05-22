export type PipEquipmentData = {
  lineNo: string;
  lineDescription: string;
  fluid: string;
  diameter: number | string;
  diameterUnit: string;
  length: number | string;
  lengthUnit: string;
  designPressure: number | string;
  designPressureUnit: string;
  designTemperature: number | string;
  designTemperatureUnit: string;
  manufactureYear: number | string;
  location: string;
};

export type PipEquipmentDataRow = {
  label: string;
  value: string;
};

export function buildPipEquipmentRows(
  equipment: PipEquipmentData,
): PipEquipmentDataRow[] {
  return [
    { label: "Nomor Jalur / Line No", value: equipment.lineNo },
    { label: "Deskripsi Jalur", value: equipment.lineDescription },
    { label: "Fluida", value: equipment.fluid },
    {
      label: "Dimensi (Diameter x Panjang)",
      value: `${equipment.diameter} ${equipment.diameterUnit} x ${equipment.length} ${equipment.lengthUnit}`,
    },
    {
      label: "Tekanan Desain / Temperatur Desain",
      value: `${equipment.designPressure} ${equipment.designPressureUnit} / ${equipment.designTemperature} ${equipment.designTemperatureUnit}`,
    },
    { label: "Tahun Pembuatan", value: String(equipment.manufactureYear) },
    { label: "Lokasi", value: equipment.location },
  ];
}
