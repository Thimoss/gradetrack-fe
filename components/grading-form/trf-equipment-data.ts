export type TrfEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  location: string;
  manufactureYear: number;
  manufacturer: string;
  model: string;
  designStandard: string;
  numberOfPhase: number;
  impedance: number;
  impedanceUnit: string;
  temperatureRiseOil: number;
  temperatureRiseWinding: number;
  temperatureRiseUnit: string;
  frequency: number;
  frequencyUnit: string;
  ratedPower: number;
  ratedPowerUnit: string;
  primaryRatedVoltage: number;
  secondaryRatedVoltage: number;
  ratedVoltageUnit: string;
  primaryRatedCurrent: number;
  secondaryRatedCurrent: number;
  ratedCurrentUnit: string;
  coolingType: string;
  vectorGroup: string;
  numberOfTap: number;
  nominalTap: number;
  oilWeight: number;
  oilWeightUnit: string;
  totalMass: number;
  totalMassUnit: string;
};

export function buildTrfEquipmentRows(equipment: TrfEquipmentData) {
  return [
    { label: "Nomor Tag", value: equipment.tagNumber },
    { label: "Nomor Serial", value: equipment.serialNumber },
    { label: "Lokasi", value: equipment.location },
    { label: "Tahun Pembuatan", value: equipment.manufactureYear },
    {
      label: "Manufaktur / Model",
      value: `${equipment.manufacturer} / ${equipment.model}`,
    },
    { label: "Design Standard", value: equipment.designStandard },
    { label: "Number of Phase", value: equipment.numberOfPhase },
    {
      label: "% Impedance (75°C)",
      value: `${equipment.impedance} ${equipment.impedanceUnit}`,
    },
    {
      label: "Temperature Rise",
      value: `${equipment.temperatureRiseOil} / ${equipment.temperatureRiseWinding} ${equipment.temperatureRiseUnit}`,
    },
    { label: "Frequency", value: `${equipment.frequency} ${equipment.frequencyUnit}` },
    {
      label: "Rated Power",
      value: `${equipment.ratedPower} ${equipment.ratedPowerUnit}`,
    },
    {
      label: "Rated Voltage",
      value: `${equipment.primaryRatedVoltage} / ${equipment.secondaryRatedVoltage} ${equipment.ratedVoltageUnit}`,
    },
    {
      label: "Rated Current",
      value: `${equipment.primaryRatedCurrent} / ${equipment.secondaryRatedCurrent} ${equipment.ratedCurrentUnit}`,
    },
    { label: "Cooling Type", value: equipment.coolingType },
    { label: "Vector Group", value: equipment.vectorGroup },
    { label: "Number of Tap", value: equipment.numberOfTap },
    { label: "Nominal Tap", value: equipment.nominalTap },
    {
      label: "Oil in Transformer",
      value: `${equipment.oilWeight} ${equipment.oilWeightUnit}`,
    },
    {
      label: "Total Mass",
      value: `${equipment.totalMass} ${equipment.totalMassUnit}`,
    },
  ];
}
