export type ValidationResult = {
  isValid: boolean;
  message: string;
};

const controlCharacterPattern = /[\u0000-\u001F\u007F]/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const numericPattern = /^-?\d+(\.\d+)?$/;
const positiveIntegerPattern = /^\d+$/;

export function valid(message = ""): ValidationResult {
  return { isValid: true, message };
}

export function invalid(message: string): ValidationResult {
  return { isValid: false, message };
}

export function sanitizeText(value: string) {
  return value.replace(controlCharacterPattern, "");
}

export function sanitizeInteger(value: string) {
  return value.replace(/\D/g, "");
}

export function sanitizeDecimal(value: string, options?: { allowNegative?: boolean }) {
  const sign = options?.allowNegative && value.startsWith("-") ? "-" : "";
  const sanitized = value
    .replace(/,/g, ".")
    .replace(/[^\d.]/g, "")
    .replace(/(\..*)\./g, "$1");

  return `${sign}${sanitized}`;
}

export function isFilled(value: string) {
  return value.trim().length > 0;
}

export function validateRequiredText(
  value: string,
  label: string,
  options?: { maxLength?: number },
) {
  const text = sanitizeText(value).trim();

  if (!text) return invalid(`${label} wajib diisi.`);
  if (controlCharacterPattern.test(value)) {
    return invalid(`${label} tidak boleh berisi karakter kontrol.`);
  }
  if (options?.maxLength && text.length > options.maxLength) {
    return invalid(`${label} maksimal ${options.maxLength} karakter.`);
  }

  return valid();
}

export function validateOptionalText(
  value: string,
  label: string,
  options?: { maxLength?: number },
) {
  if (!value.trim()) return valid();
  return validateRequiredText(value, label, options);
}

export function validateRequiredNumber(value: string, label: string) {
  const text = value.trim();

  if (!text) return invalid(`${label} wajib diisi.`);
  if (!numericPattern.test(text) || Number.isNaN(Number(text))) {
    return invalid(`${label} harus berupa angka.`);
  }

  return valid();
}

export function validateOptionalNumber(value: string, label: string) {
  if (!value.trim()) return valid();
  return validateRequiredNumber(value, label);
}

export function validateRequiredPositiveInteger(value: string, label: string) {
  const text = value.trim();

  if (!text) return invalid(`${label} wajib diisi.`);
  if (!positiveIntegerPattern.test(text) || Number(text) <= 0) {
    return invalid(`${label} harus berupa bilangan bulat positif.`);
  }

  return valid();
}

export function validateOptionalPositiveInteger(value: string, label: string) {
  if (!value.trim()) return valid();
  return validateRequiredPositiveInteger(value, label);
}

export function validateEmail(value: string, label: string) {
  if (!value.trim()) return valid();
  if (!emailPattern.test(value.trim())) {
    return invalid(`${label} harus berupa email valid.`);
  }

  return valid();
}

export function validateDate(value: string, label: string) {
  if (!isoDatePattern.test(value)) return invalid(`${label} harus berupa tanggal valid.`);
  if (Number.isNaN(new Date(value).getTime())) {
    return invalid(`${label} harus berupa tanggal valid.`);
  }

  return valid();
}

export function validateEnum<T extends string>(
  value: string,
  allowedValues: readonly T[],
  label: string,
) {
  if (!allowedValues.includes(value as T)) {
    return invalid(`${label} tidak sesuai pilihan yang tersedia.`);
  }

  return valid();
}

export function firstInvalid(validations: ValidationResult[]) {
  return validations.find((result) => !result.isValid) ?? valid();
}
