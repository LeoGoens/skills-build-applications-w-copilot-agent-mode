// Requires VITE_CODESPACE_NAME to be defined (e.g. in .env.local) to reach the Codespaces-forwarded backend.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

/**
 * Fetches a resource collection and normalizes both paginated
 * (`{ results: [...] }`) and plain array responses into an array.
 */
export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status}`);
  }
  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  }
  if (Array.isArray(data?.results)) {
    return data.results;
  }
  return [];
}
