//
//  metayeti.net
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  Copyright (c) 2026-present metayeti.net
//  All rights reserved.
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  File:         src/util/markdown.js
//  Description:  Markdown parser utility using markdown-it.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-15
//  Updated:      2026-03-17
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { PAGE_BREAK_SHORTCODE } from './constants';

import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import hljs from 'highlight.js/lib/core';

// -- import individual languages for hljs --
import javascript from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';

// -- register languages --
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('json', json);

// -- create markdown-it instance --
const md = MarkdownIt({
	html: true,
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value;
			} catch {
				/* empty */
			}
		}
		return '';
	},
});

// -- add ids to headings for navigation --
md.use(anchor, {
	permalink: false,
	slugify: (s) =>
		s
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '-'),
	tabIndex: false,
});

// -- rewrite renderer rules --

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

// add link class and target _blank to external links
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	const hrefIndex = token.attrIndex('href');
	const href = hrefIndex >= 0 ? token.attrs[hrefIndex][1] : '';
	let className = 'link';
	if (!href.startsWith('/') && !href.startsWith('#')) {
		token.attrPush(['target', '_blank']);
		token.attrPush(['rel', 'noopener noreferrer']);
		// add external class
		className += ' external';
	}
	token.attrPush(['class', className]);
	return self.renderToken(tokens, idx, options);
};

// add list class to bullets
md.renderer.rules.bullet_list_open = (tokens, idx, options, env, self) => {
	const token = tokens[idx];
	token.attrPush(['class', 'list']);
	return self.renderToken(tokens, idx, options);
};

// -- export --
export default md;

/**
 * Extracts headings from markdown text for table of contents.
 * Returns an array of { id, text, level } objects.
 *
 * @param {string} markdownText Raw markdown text.
 * @returns {Array<{id: string, text: string, level: number}>}
 */
export function extractHeadings(markdownText) {
	const headings = [];
	const lines = markdownText.split('\n');
	let pageIndex = 0;
	lines.forEach((line) => {
		if (line.trim() === PAGE_BREAK_SHORTCODE) {
			pageIndex++;
			return;
		}

		const match = line.match(/^(#{1,6})\s+(.+)$/);
		if (match) {
			const originalLevel = match[1].length;
			const level = Math.min(originalLevel + 1, 6); // shifted like in render
			const text = match[2].trim();
			// eslint-disable-next-line no-useless-escape
			const id = text
				.toLowerCase()
				.replace(/[^\w\s-]/g, '')
				.replace(/\s+/g, '-');
			headings.push({ id, text, level, pageIndex });
		}
	});
	return headings;
}

/**
 * Estimates reading time for a given text.
 *
 * @param {string} text The text to estimate reading time for.
 * @param {number} wordsPerMinute Words per minute reading speed.
 * @returns {number} Estimated reading time in minutes.
 */
export function estimateReadingTime(text, wordsPerMinute = 200) {
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.ceil(words / wordsPerMinute);
}

/**
 * Returns a human-readable reading time string.
 *
 * @param {number} minutes Number of minutes.
 * @returns {string} e.g. "5 min" or "1 min"
 */
export function getReadingTimeLabel(minutes) {
	return `${minutes} min`;
}
