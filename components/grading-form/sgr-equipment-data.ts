export type SgrEquipmentData = {
  tagNumber: string;
  serialNumber: string;
  location: string;
  manufactureYear: number;
  manufacturer: string;
  model: string;
  designStandard: string;
  ratedOperationalVoltage: number;
  ratedOperationalVoltageUnit: string;
  mainBusbarRatedCurrent: number;
  mainBusbarRatedCurrentUnit: string;
  circuitBreakerType: string;
  springChargingMotorAuxSupplyVoltage: number;
  springChargingMotorAuxSupplyVoltageUnit: string;
  protectionCircuitAuxSupplyVoltage: number;
  protectionCircuitAuxSupplyVoltageUnit: string;
  controlSignallingAuxSupplyVoltage: number;
  controlSignallingAuxSupplyVoltageUnit: string;
  heatingLightingAuxSupplyVoltage: number;
  heatingLightingAuxSupplyVoltageUnit: string;
  frequency: number;
  frequencyUnit: string;
  ratedShortTimeWithstandCurrent: number;
  ratedShortTimeWithstandCurrentUnit: string;
  ratedShortTimeWithstandDuration: number;
  ratedShortTimeWithstandDurationUnit: string;
  degreeOfProtection: string;
  totalCubicle: number;
};

export function buildSgrEquipmentRows(equipment: SgrEquipmentData) {
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
      label: "Rated Operational Voltage",
      value: `${equipment.ratedOperationalVoltage} ${equipment.ratedOperationalVoltageUnit}`,
    },
    {
      label: "Main Busbar Rated Current",
      value: `${equipment.mainBusbarRatedCurrent} ${equipment.mainBusbarRatedCurrentUnit}`,
    },
    { label: "Circuit Breaker Type", value: equipment.circuitBreakerType },
    {
      label: "Spring Charging Motor Aux. Supply Voltage",
      value: `${equipment.springChargingMotorAuxSupplyVoltage} ${equipment.springChargingMotorAuxSupplyVoltageUnit}`,
    },
    {
      label: "Protection Circuit Aux. Supply Voltage",
      value: `${equipment.protectionCircuitAuxSupplyVoltage} ${equipment.protectionCircuitAuxSupplyVoltageUnit}`,
    },
    {
      label: "Control & Signalling Aux. Supply Voltage",
      value: `${equipment.controlSignallingAuxSupplyVoltage} ${equipment.controlSignallingAuxSupplyVoltageUnit}`,
    },
    {
      label: "Heating & Lighting Aux. Supply Voltage",
      value: `${equipment.heatingLightingAuxSupplyVoltage} ${equipment.heatingLightingAuxSupplyVoltageUnit}`,
    },
    { label: "Frequency", value: `${equipment.frequency} ${equipment.frequencyUnit}` },
    {
      label: "Rated Short Time Withstand Current",
      value: `${equipment.ratedShortTimeWithstandCurrent} ${equipment.ratedShortTimeWithstandCurrentUnit} / ${equipment.ratedShortTimeWithstandDuration} ${equipment.ratedShortTimeWithstandDurationUnit}`,
    },
    { label: "Degree of Protection (IP Rating)", value: equipment.degreeOfProtection },
    { label: "Total Cubicle", value: equipment.totalCubicle },
  ];
}
