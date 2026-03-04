const cache = {}; // data cache

/**
 * Generic function to load data with caching.
 *
 * @param {string} path The URL path to fetch data from.
 * @param {Function} parser A function to parse the response (e.g., response.text, response.json).
 * @returns {Promise} A promise that resolves to the parsed data.
 */
export default async function loadData(path, parser) {
	if (cache[path]) {
		return cache[path];
	}
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${path}`);
		}
		const data = await parser(response);
		cache[path] = data;
		return data;
	}
	catch (error) {
		console.error('Error loading content:', error);
		throw error;
	}
}

/**
 * Loads JSON data from the specified path.
 *
 * @param {string} path The URL path to the JSON file.
 * @returns {Promise<Object>} A promise that resolves to the JSON object.
 */
export async function loadJSON(path) {
	return loadData(path, response => response.json());
}

/**
 * Loads text data from the specified path.
 *
 * @param {string} path The URL path to the text file.
 * @returns {Promise<string>} A promise that resolves to the text content.
 */
export async function loadText(path) {
	return loadData(path, response => response.text());
}