const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface ApiError {
  message: string;
  statusCode: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const err: ApiError = await res.json().catch(() => ({
      message: 'Request failed',
      statusCode: res.status,
    }));
    throw new Error(err.message || `Error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// Registrations
export function submitRegistration(data: {
  fullName: string;
  email: string;
  school?: string;
  grade?: string;
  interests?: string[];
}) {
  return request('/registrations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Newsletter
export function subscribeNewsletter(email: string) {
  return request('/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

// Contact
export function submitContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return request('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
