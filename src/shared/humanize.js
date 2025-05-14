/**
 * Convert a date string to a human readable format.
 *
 * Will convert something like "2025-04-25" to "Apr 25, 2025"
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
 * Will convert "2025-04-25" to "April 25"
 * 
 * @param {string} dateStr 
 * @returns {string}
 */
export function getHumanReadableDateWithoutYear(dateStr) {
	return new Date(dateStr).toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric'
	});
}