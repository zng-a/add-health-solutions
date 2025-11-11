/**
 * Payload CMS API client
 * Handles fetching data from the Payload CMS backend
 */

const PAYLOAD_API_URL = import.meta.env.PAYLOAD_API_URL || 'http://localhost:3000/api';

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * Fetch data from Payload CMS
 * @param collection - The collection name (e.g., 'posts', 'media', 'users')
 * @param query - Optional query parameters
 */
export async function fetchFromPayload<T>(
  collection: string,
  query: Record<string, any> = {}
): Promise<PayloadResponse<T>> {
  const queryString = new URLSearchParams(query).toString();
  const url = `${PAYLOAD_API_URL}/${collection}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch from Payload: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from Payload CMS (${collection}):`, error);
    throw error;
  }
}

/**
 * Fetch a single document by ID
 */
export async function fetchPayloadDoc<T>(
  collection: string,
  id: string
): Promise<T> {
  const url = `${PAYLOAD_API_URL}/${collection}/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching document from Payload CMS:`, error);
    throw error;
  }
}

/**
 * Fetch media file URL
 */
export function getMediaUrl(filename: string): string {
  return `${PAYLOAD_API_URL.replace('/api', '')}/media/${filename}`;
}
