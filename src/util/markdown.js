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

// -- helper: parse line ranges --
const parseLineRanges = (rangeStr) => {
	// format: {1,3-5}
	const ranges = [];
	if (!rangeStr) return ranges;

	const content = rangeStr.replace(/^{|}$/g, '');
	content.split(',').forEach((part) => {
		const match = part.trim().match(/^(\d+)(?:-(\d+))?$/);
		if (match) {
			const start = parseInt(match[1], 10);
			const end = match[2] ? parseInt(match[2], 10) : start;
			ranges.push([start, end]);
		}
	});
	return ranges;
};

// -- create markdown-it instance --
const md = MarkdownIt({
	html: true,
	highlight: (str, lang) => {
		// we handle highlighting manually in the fence renderer now
		// but we keep this for inline code or other usages if needed
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

// -- override fence renderer for line highlighting --
md.renderer.rules.fence = function (tokens, idx, options, env, self) {
	const token = tokens[idx];
	const info = token.info ? md.utils.unescapeAll(token.info).trim() : '';

	let langName = '';
	let lineRanges = [];

	if (info) {
		const split = info.split(/\s+/);
		langName = split[0];

		// check for ranges in the rest
		const rangeMatch = info.match(/{([\d,-]+)}/);
		if (rangeMatch) {
			lineRanges = parseLineRanges(rangeMatch[0]);
		}
	}

	let highlightedCode = '';
	if (options.highlight) {
		// pass clean language name
		highlightedCode = options.highlight(token.content, langName) || md.utils.escapeHtml(token.content);
	} else {
		highlightedCode = md.utils.escapeHtml(token.content);
	}

	// If no highlighting needed, return standard structure (or close to it)
	// if (lineRanges.length === 0) {
	// 	return '<pre><code class="hljs language-' + langName + '">' + highlightedCode + '</code></pre>\n';
	// }

	// Generate highlighted lines overlay
	const lines = token.content.split(/\r?\n/);
	// remove last empty line if it exists (highlight.js usually ignores trailing newline)
	if (lines[lines.length - 1] === '') {
		lines.pop();
	}

	let lineBgHtml = '<div class="code-lines">';
	for (let i = 0; i < lines.length; i++) {
		const lineNum = i + 1;
		const isHighlighted = lineRanges.some(([start, end]) => lineNum >= start && lineNum <= end);
		lineBgHtml += `<div class="code-line${isHighlighted ? ' highlighted' : ''}" data-line="${lineNum}"></div>`;
	}
	lineBgHtml += '</div>';

	return (
		'<div class="code-block-wrapper">' +
		lineBgHtml +
		'<pre><code class="hljs language-' +
		langName +
		'">' +
		highlightedCode +
		'</code></pre>' +
		'</div>\n'
	);
};

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
