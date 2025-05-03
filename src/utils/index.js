//
// Utility functions
//

/**
 * Loads JSON data from path.
 *
 * @param {string} path
 * @returns {Promise}
 */
export async function loadJSON(path) {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${path}`);
		}
		return response.json();
	}
	catch (error) {
		console.log('Error loading content:', error);
	}
}

/**
 * Load text data from path.
 *
 * @param {string} path
 * @returns {Promise}
 */
export async function loadText(path) {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(`Failed to fetch ${path}`);
		}
		return response.text();
	}
	catch (error) {
		console.log('Error loading content:', error);
	}
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