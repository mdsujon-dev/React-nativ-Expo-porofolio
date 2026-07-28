/**
 * Tiny fetch wrapper around the backend API.
 * Base URL comes from EXPO_PUBLIC_API_URL (see .env) with a safe fallback.
 */
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'https://new-portfolio-backend-ivory.vercel.app/api';

/** Path the contact form submits to (configurable per backend). */
export const CONTACT_PATH = process.env.EXPO_PUBLIC_CONTACT_PATH ?? '/contact';

/** Standard envelope returned by the backend. */
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error?: string;
};

async function parse<T>(res: Response): Promise<T> {
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !json.success) {
    throw new Error(json?.message || `Request failed (${res.status})`);
  }
  return json.data;
}

export function apiGet<T>(path: string): Promise<T> {
  return fetch(`${API_URL}${path}`).then((res) => parse<T>(res));
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  return fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((res) => parse<T>(res));
}
