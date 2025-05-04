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