/**
 * Switch between dark and light themes.
 *
 * @param {boolean} lightMode Whether or not to switch to a light mode theme.
 */
export function switchTheme(lightMode) {
	const lightModeClass = 'let-there-be-light';
	if (lightMode) {
		document.documentElement.classList.add(lightModeClass);
	}
	else {
		document.documentElement.classList.remove(lightModeClass);
	}
}