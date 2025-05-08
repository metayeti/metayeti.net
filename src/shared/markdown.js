import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import hljs from 'highlight.js/lib/core';

// import individual languages for hljs (so we don't bundle those we don't need)
import javascript from 'highlight.js/lib/languages/javascript';

// import individual styles for hljs
import 'highlight.js/styles/dark.css';

hljs.registerLanguage('javascript', javascript);

const md = MarkdownIt({
	html: true, // warning: don't let users alter markdown or you're open to XSS
	// ---
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch { /* empty */ }
		}
		return ''; // use external default escaping
	}
});

// add ids to headings for navigation
md.use(anchor, {
	permalink: false,
	slugify: s => s.toLowerCase().replace(/\s+/g, '-'),
	tabIndex: false
});

// -- rewrite some markdown renderer rules --

// shift heading levels (h1 -> h2, h2 -> h3, etc.)
md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const level = Math.min(parseInt(token.tag.slice(1), 10) + 1, 6);
	token.tag = `h${level}`;
	return self.renderToken(tokens, idx, options);
};
md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const level = Math.min(parseInt(token.tag.slice(1), 10) + 1, 6);
	token.tag = `h${level}`;
	return self.renderToken(tokens, idx, options);
};

// add link class and target _blank to links
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const hrefIndex = token.attrIndex('href');
	const href = hrefIndex >= 0 ? token.attrs[hrefIndex][1] : '';
	// add class="link" to the list of attributes
	token.attrPush(['class', 'link']);
	if (!href.startsWith('/') && !href.startsWith('#')) {
		// add target="_blank"
		token.attrPush(['target', '_blank']);
	}
	// proceed with the default renderer for link_open
	return self.renderToken(tokens, idx, options);
};

md.renderer.rules.bullet_list_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	// add class="list" to the list of attributes
	token.attrPush(['class', 'list']);
	// proceed with the default renderer for list_open
	return self.renderToken(tokens, idx, options);
};


// -- export the markdown instance for global use --
export default md;