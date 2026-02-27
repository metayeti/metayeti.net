export function updateTitle(articleTitle = '') {
	if (articleTitle.length > 0) {
		document.title = `${articleTitle} | metayeti.net`;
	}
	else {
		document.title = 'metayeti.net';
	}
}