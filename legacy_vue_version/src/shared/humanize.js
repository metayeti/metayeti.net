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
 * Will convert "2025-04-25" to "April 25, 2025"
 * 
 * @param {string} dateStr
 * @returns {string}
 */
export function getHumanReadableDateFull(dateStr) {
	return new Date(dateStr).toLocaleDateString('en-US', {
		month: 'long',
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

/**
 * Will convert "58" to "58 minutes" and "90" to "1.5 hours"
 *
 * @param {number} minutes Number of minutes.
 */
export function getHumanReadableMinutes(minutes) {
	if (minutes < 60) {
		return `${minutes} minute${minutes === 1 ? '' : 's'}`;
	}	
	const hours = Number((minutes / 60).toFixed(1)); // wrap with Number so we get rid of insignificant zeroes (e.g "1.0 hours")
	return `${hours} hour${hours === 1 ? '' : 's'}`;
}