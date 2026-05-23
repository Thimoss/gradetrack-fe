export type UpsEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  location: string;
  manufactureYear: number | string;
  manufacturer: string;
  model: string;
  designStandard: string;
  mainInputVoltage: number | string;
  mainInputVoltageUnit: string;
  mainInputCurrent: number | string;
  mainInputCurrentUnit: string;
  mainInputFrequency: number | string;
  mainInputFrequencyUnit: string;
  mainInputPowerKva: number | string;
  mainInputPowerKw: number | string;
  mainInputShortCircuitCurrent: number | string;
  bypassVoltage: number | string;
  bypassCurrent: number | string;
  bypassFrequency: number | string;
  bypassPowerKva: number | string;
  bypassPowerKw: number | string;
  bypassShortCircuitCurrent: number | string;
  batteryVoltage: number | string;
  batteryNominalCurrent: number | string;
  batteryMaxCurrent: number | string;
  outputVoltage: number | string;
  outputCurrent: number | string;
  outputFrequency: number | string;
  outputPowerKva: number | string;
  outputPowerKw: number | string;
  outputShortCircuitCurrent: number | string;
  ipRating: string;
};

export function buildUpsEquipmentRows(equipment: UpsEquipmentData) {
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
    {
      label: "Main Input Voltage",
      value: `${equipment.mainInputVoltage} ${equipment.mainInputVoltageUnit}`,
    },
    {
      label: "Main Input Current",
      value: `${equipment.mainInputCurrent} ${equipment.mainInputCurrentUnit}`,
    },
    {
      label: "Main Input Frequency",
      value: `${equipment.mainInputFrequency} ${equipment.mainInputFrequencyUnit}`,
    },
    {
      label: "Main Input Power",
      value: `${equipment.mainInputPowerKva} kVA / ${equipment.mainInputPowerKw} kW`,
    },
    {
      label: "Main Input Short Circuit Current",
      value: `${equipment.mainInputShortCircuitCurrent} kA`,
    },
    { label: "Bypass Voltage", value: `${equipment.bypassVoltage} Volt` },
    { label: "Bypass Current", value: `${equipment.bypassCurrent} Ampere` },
    { label: "Bypass Frequency", value: `${equipment.bypassFrequency} Hz` },
    {
      label: "Bypass Power",
      value: `${equipment.bypassPowerKva} kVA / ${equipment.bypassPowerKw} kW`,
    },
    {
      label: "Bypass Short Circuit Current",
      value: `${equipment.bypassShortCircuitCurrent} kA`,
    },
    { label: "Battery Voltage", value: `${equipment.batteryVoltage} Volt` },
    {
      label: "Battery Nominal Current",
      value: `${equipment.batteryNominalCurrent} Ampere`,
    },
    {
      label: "Battery Max Current",
      value: `${equipment.batteryMaxCurrent} Ampere`,
    },
    { label: "Output Voltage", value: `${equipment.outputVoltage} Volt` },
    { label: "Output Current", value: `${equipment.outputCurrent} Ampere` },
    { label: "Output Frequency", value: `${equipment.outputFrequency} Hz` },
    {
      label: "Output Power",
      value: `${equipment.outputPowerKva} kVA / ${equipment.outputPowerKw} kW`,
    },
    {
      label: "Output Short Circuit Current",
      value: `${equipment.outputShortCircuitCurrent} kA`,
    },
    { label: "IP rating", value: equipment.ipRating },
  ];
}
