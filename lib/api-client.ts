export type ApiEnvelope<T> = {
  statusCode?: number;
  message?: string | string[];
  data: T;
};

export const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:3001";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(buildApiUrl(path), init);
  const envelope = (await response.json()) as ApiEnvelope<T | null>;

  if (!response.ok || envelope.data === null) {
    throw new Error(getApiMessage(envelope.message));
  }

  return envelope.data;
}

export function getApiMessage(message?: string | string[]) {
  if (Array.isArray(message)) {
    return message[0] ?? "Data belum dapat diproses.";
  }

  return message || "Data belum dapat diproses.";
}

function buildApiUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${apiBaseUrl}${path}`;
}
