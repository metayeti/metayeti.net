import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/core';

// import individual languages for hljs (so we don't bundle those we don't need)
import javascript from 'highlight.js/lib/languages/javascript';

// import individual styles for hljs
import 'highlight.js/styles/dark.css';

hljs.registerLanguage('javascript', javascript);

const md = MarkdownIt({
	html: true, // warning: don't let users alter markdown
	// ---
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch (__) {}
		}
		return ''; // use external default escaping
	}
});

// -- rewrite some markdown renderer rules --

// shift heading levels (h1 -> h2, h2 -> h3, etc.)
md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const level = Math.min(parseInt(token.tag.slice(1), 10) + 1, 6);
	return `<h${level}>`;
};
md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const level = Math.min(parseInt(token.tag.slice(1), 10) + 1, 6);
	return `</h${level}>`;
};

// add link class to links
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	// add class="link" to the list of attributes
	token.attrPush(['class', 'link']);
	// ... and proceed with the default renderer for link_open
	return self.renderToken(tokens, idx, options);
};

// -- export markdown instance for global use --
export default md;