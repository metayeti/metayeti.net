/**
 * Creates a handler function for intercepting and managing internal route links.
 * This factory pattern allows the handler to access the Vue Router instance
 * while respecting Vue's composition API rules.
 *
 * @param {object} router The Vue Router instance from useRouter().
 * @returns {function} A click event handler function.
 */
export function routeLinkHandler(router) {

	/**
	 * Handles click events on anchor tags to use Vue Router navigation
	 * instead of normal browser navigation for internal links.
	 *
	 * @param {object} e The click event object.
	 */
	return function handleRouteLink(e) {
		// intercept route links and let the router handle them
		const target = e.target;

		const href = target.getAttribute('href');

		if (!href || !href.startsWith('/')) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		router.push(target.pathname);
	}
}