export type MeasurementColumn = {
  key: string;
  label: string;
};

export type MeasurementRow = {
  key: string;
  label: string;
};

export const vibrationColumns: MeasurementColumn[] = [
  { key: "a", label: "A" },
  { key: "v", label: "V" },
  { key: "h", label: "H" },
  { key: "temperature", label: "Suhu" },
];

export const vibrationRows: MeasurementRow[] = [
  { key: "point1", label: "I" },
  { key: "point2", label: "II" },
  { key: "bodyAlternator", label: "Body Alternator" },
];

export const electricalColumns: MeasurementColumn[] = [
  { key: "voltage", label: "Voltase" },
  { key: "frequency", label: "Frekuensi" },
];

export const noiseRows: MeasurementRow[] = [
  { key: "pointB", label: "B" },
  { key: "pointC", label: "C" },
];

export const groundingRows: MeasurementRow[] = [
  { key: "grounding", label: "Grounding" },
];
