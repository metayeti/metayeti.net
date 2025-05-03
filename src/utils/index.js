//
// Utility functions
//

const cache = {}; // data cache

/**
 * Generic function to load data with caching.
 *
 * @param {string} path The URL path to fetch data from.
 * @param {Function} parser A function to parse the response (e.g., response.text, response.json).
 * @returns {Promise} - A promise that resolves to the parsed data.
 */
async function loadData(path, parser) {
	if (cache[path]) {
		console.log(cache[path]);
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

/**
 * Convert a date string to a human readable format.
 *
 * Will convert something like "2025-04-25" to "April 25, 2025"
 * 
 * @param {string} dateStr
 * @returns {string}
 */
export function getHumanReadableDate(dateStr) {
	return new Date(dateStr).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	});
}

/**
 * Switch between dark and light themes.
 *
 * @param {boolean} lightMode Whether or not to switch to a light mode theme.
 */
export function switchTheme(lightMode) {
	const lightModeClass = 'let-there-be-light';
	//const themeMeta = document.querySelector('meta[name="theme-color"]');
	if (lightMode) {
		document.documentElement.classList.add(lightModeClass);
		//themeMeta.setAttribute('content', '#dfdfdf');
	}
	else {
		document.documentElement.classList.remove(lightModeClass);
		//themeMeta.setAttribute('content', '#141414');
	}
}