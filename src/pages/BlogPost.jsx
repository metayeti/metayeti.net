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
//  File:         src/pages/BlogPost.jsx
//  Description:  Blog post page component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-15
//  Updated:      2026-03-15
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         Basic migration from previous site, needs a lot of fixes.
//

import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
	loadJSON,
	loadText,
	getHumanReadableDate,
	SRC_BLOG_LISTING,
	md,
	extractHeadings,
	estimateReadingTime,
	getReadingTimeLabel,
} from '@/util';

import './BlogPost.scss';

export default function BlogPost() {
	const { slug } = useParams();

	const [postData, setPostData] = useState(null);
	const [renderedHTML, setRenderedHTML] = useState('');
	const [headings, setHeadings] = useState([]);
	const [readingTime, setReadingTime] = useState('');

	useEffect(() => {
		async function loadPost() {
			try {
				// load listing data
				const blogData = await loadJSON(SRC_BLOG_LISTING);
				const post = blogData.posts.find((p) => p.slug === slug);
				if (!post) return;
				setPostData(post);

				// load article markdown
				const articlePath = `/content/blog/${slug}/article.md`;
				const articleMarkdown = await loadText(articlePath);

				// render markdown
				setRenderedHTML(md.render(articleMarkdown));

				// extract headings for sidebar TOC
				setHeadings(extractHeadings(articleMarkdown));

				// estimate reading time
				const plainText = articleMarkdown
					.replace(/[#*`~[\]()]/g, '')
					.replace(/\s+/g, ' ')
					.trim();
				const minutes = estimateReadingTime(plainText);
				setReadingTime(getReadingTimeLabel(minutes));
			} catch (error) {
				console.error('Failed to load blog post:', error);
			}
		}
		loadPost();
	}, [slug]);

	// -- download raw markdown --
	const handleDownloadRaw = useCallback(async () => {
		if (!postData) return;
		const articlePath = `/content/blog/${slug}/article.md`;
		const articleMarkdown = await loadText(articlePath);

		const datePublished = getHumanReadableDate(postData['date-published']);
		const dateUpdated = postData['date-updated']
			? `\nUpdated: ${getHumanReadableDate(postData['date-updated'])}`
			: '';

		const markdown = `# ${postData.title}
${postData.description}

---

${articleMarkdown}

---

Original article URL: ${window.location.href}

Published: ${datePublished}${dateUpdated}

by Danijel Durakovic (https://metayeti.net)
`;

		const blob = new Blob([markdown], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'article.md';
		a.click();
		URL.revokeObjectURL(url);
		a.remove();
	}, [postData, slug]);

	if (!postData) return null;

	const lastUpdated = postData['date-updated'] || postData['date-published'];

	return (
		<div className="blog-post sidebar-layout wrapped">
			<div className="blog-post__main">
				{/* -- post header -- */}
				<section className="blog-post__header">
					<Link to="/blog" className="blog-post__back" aria-label="Back to blog">
						&larr;
					</Link>

					<div className="blog-post__tags">
						{postData.tags?.map((tag) => (
							<span key={tag} className="blog-post__tag">
								<span>{tag}</span>
							</span>
						))}
					</div>

					<h2 className="blog-post__title">{postData.title}</h2>
					<span className="blog-post__description">{postData.description}</span>

					<div className="blog-post__meta">
						<span>{getHumanReadableDate(postData['date-published'])}</span>
						{readingTime && <span>{readingTime} read</span>}
					</div>
				</section>

				{/* -- article content -- */}
				<article className="blog-post__article" dangerouslySetInnerHTML={{ __html: renderedHTML }} />

				{/* -- post footer -- */}
				<section className="blog-post__footer">
					<div className="blog-post__footer-row">
						<div className="blog-post__date-updated">
							Article last updated:
							<span>{getHumanReadableDate(lastUpdated)}</span>
						</div>
						<div className="blog-post__raw">
							<button onClick={handleDownloadRaw}>
								<span>raw</span>
							</button>
						</div>
					</div>

					<div className="blog-post__about-author">
						<div>
							<h5>About the author</h5>
							<p>
								<Link to="/about" className="blog-post__author-link">
									Danijel Durakovic
								</Link>{' '}
								&mdash; programmer, game developer, blogger, elemental shaman etc.
							</p>
						</div>
					</div>
				</section>
			</div>

			{/* -- sidebar table of contents -- */}
			<div className="blog-post__side">
				{headings.length > 0 && (
					<nav className="blog-post__toc">
						<h5>Contents</h5>
						<ul className="blog-post__toc-list">
							{headings.map((heading) => (
								<li
									key={heading.id}
									className={`blog-post__toc-item blog-post__toc-item--h${heading.level}`}
								>
									<a href={`#${heading.id}`}>{heading.text}</a>
								</li>
							))}
						</ul>
					</nav>
				)}
			</div>
		</div>
	);
}
