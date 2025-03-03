const BASE_URL = process.env.BASE_URL;

/**
 * General method for fetching data from the API.
 * @param {string} endpoint - The API endpoint (relative to BASE_URL).
 * @param {Object} [params={}] - Query parameters as an object.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 */
export async function fetchData(endpoint, params = {}) {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);

    // Append query parameters
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}
