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
//  Created:      2026-03-20
//  Updated:      2026-06-18
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import IconBack from '@/components/icons/IconBack';
import IconCalendar from '@/components/icons/IconCalendar';
import IconTime from '@/components/icons/IconTime';
import IconPages from '@/components/icons/IconPages';
import IconDownload from '@/components/icons/IconDownload';
import IconChevronLeft from '@/components/icons/IconChevronLeft';
import IconChevronRight from '@/components/icons/IconChevronRight';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
	loadJSON,
	loadText,
	getHumanReadableDate,
	SRC_BLOG_LISTING,
	PAGE_BREAK_SHORTCODE,
	md,
	extractHeadings,
	estimateReadingTime,
	getReadingTimeLabel,
} from '@/util';

import BlogComments from '@/components/extras/BlogComments';

import './BlogPost.scss';

export default function BlogPost() {
	const { slug, page } = useParams();
	const navigate = useNavigate();

	const [postData, setPostData] = useState(null);
	const [renderedHTML, setRenderedHTML] = useState('');
	const [headings, setHeadings] = useState([]);
	const [activeHeadingId, setActiveHeadingId] = useState(null);
	const [readingTime, setReadingTime] = useState('');

	// -- pagination state --
	const [articlePages, setArticlePages] = useState([]);
	const [pageIndex, setPageIndex] = useState(0);
	const [pendingScrollToId, setPendingScrollToId] = useState(null);

	// Refs to guard against race conditions during programmatic scrolls
	const isClickScrollingRef = useRef(false);
	const scrollTimeoutRef = useRef(null);

	// Update document title
	useEffect(() => {
		if (postData) {
			document.title = `${postData.title} | metayeti.net`;
			return () => {
				document.title = 'metayeti.net';
			};
		}
	}, [postData]);

	// Sync page index with url param
	useEffect(() => {
		const p = parseInt(page);
		if (!isNaN(p) && p > 0) {
			setPageIndex(p - 1);
		} else {
			setPageIndex(0);
		}
	}, [page]);

	// Load post data and markdown structure
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
				const fullMarkdown = await loadText(articlePath);

				// split pages
				const lines = fullMarkdown.split('\n');
				const pages = [];
				let buffer = [];
				for (const line of lines) {
					if (line.trim() === PAGE_BREAK_SHORTCODE) {
						pages.push(buffer.join('\n'));
						buffer = [];
					} else {
						buffer.push(line);
					}
				}
				if (buffer.length > 0) pages.push(buffer.join('\n'));
				setArticlePages(pages);

				// extract headings for sidebar TOC
				const extractedHeadings = extractHeadings(fullMarkdown);
				setHeadings(extractedHeadings);

				// estimate reading time
				const plainText = fullMarkdown
					.replace(/[#*`~[\]()]/g, '')
					.replace(/\s+/g, ' ')
					.trim();
				const minutes = estimateReadingTime(plainText);
				setReadingTime(getReadingTimeLabel(minutes));

				// initial hash handling
				if (window.location.hash) {
					const id = window.location.hash.slice(1);
					const heading = extractedHeadings.find((h) => h.id === id);
					if (heading) {
						setPageIndex(heading.pageIndex);
						setPendingScrollToId(heading.id);
					}
				}
			} catch (error) {
				console.error('Failed to load blog post:', error);
			}
		}
		loadPost();
	}, [slug]);

	// Clean up timeouts on unmount
	useEffect(() => {
		return () => {
			if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
		};
	}, []);

	// Calculate active heading using viewport-relative coordinates
	const computeActiveHeading = useCallback(() => {
		// Absolute safety: do not calculate if a programmatic click-scroll is active
		if (isClickScrollingRef.current) return;

		const articleEl = document.querySelector('.blog-post__article');
		if (!articleEl) {
			setActiveHeadingId(null);
			return;
		}

		const headingElements = Array.from(articleEl.querySelectorAll('h2,h3,h4,h5,h6')).filter((el) => el.id);
		if (headingElements.length === 0) {
			setActiveHeadingId(null);
			return;
		}

		// The target trigger line is 20% down from the top of the viewport
		const viewportTarget = window.innerHeight * 0.2;

		// Filter for elements that have scrolled past or reached our target line
		const aboveTarget = headingElements
			.map((el) => ({ el, rect: el.getBoundingClientRect() }))
			.filter(({ rect }) => rect.top <= viewportTarget)
			.sort((a, b) => b.rect.top - a.rect.top); // The largest rect.top is closest to the line

		if (aboveTarget.length > 0) {
			setActiveHeadingId(aboveTarget[0].el.id);
			return;
		}

		// Fallback: if we haven't scrolled past any headings yet, highlight the first one
		setActiveHeadingId(headingElements[0].id);
	}, []);

	// Hook to manage event listeners cleanly
	useEffect(() => {
		if (!headings || headings.length === 0 || articlePages.length === 0 || !renderedHTML) return;

		let ticking = false;

		const onScroll = () => {
			if (isClickScrollingRef.current) return; // Ignore natural scroll events caused by TOC clicks
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(() => {
					computeActiveHeading();
					ticking = false;
				});
			}
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);

		// Initialize position matching once layout settles
		computeActiveHeading();

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	}, [headings, articlePages, pageIndex, renderedHTML, computeActiveHeading]);

	// Hook A: Transforms markdown to HTML when pages alter
	useEffect(() => {
		if (articlePages.length > 0) {
			const mdContent = articlePages[pageIndex] || '';
			setRenderedHTML(md.render(mdContent));
		}
	}, [pageIndex, articlePages]);

	// Hook B: Manages cross-page automated scrolling via URL hashes cleanly
	useEffect(() => {
		if (pendingScrollToId && renderedHTML) {
			const timer = setTimeout(() => {
				const el = document.getElementById(pendingScrollToId);
				if (el) {
					isClickScrollingRef.current = true;
					setActiveHeadingId(pendingScrollToId);
					el.scrollIntoView();
					setPendingScrollToId(null);

					if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
					scrollTimeoutRef.current = setTimeout(() => {
						isClickScrollingRef.current = false;
						computeActiveHeading();
					}, 800); // 800ms buffer gives late layout adjustments plenty of time to finish
				}
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [pendingScrollToId, renderedHTML, computeActiveHeading]);

	const handlePageChange = (newIndex) => {
		if (newIndex >= 0 && newIndex < articlePages.length) {
			const pageNum = newIndex + 1;
			const url = pageNum === 1 ? `/blog/${slug}` : `/blog/${slug}/${pageNum}`;
			navigate(url);
		}
	};

	const handleHeadingClick = (e, heading) => {
		e.preventDefault();
		const targetPage = heading.pageIndex + 1;
		const targetUrl = targetPage === 1 ? `/blog/${slug}` : `/blog/${slug}/${targetPage}`;

		if (heading.pageIndex !== pageIndex) {
			setPendingScrollToId(heading.id);
			navigate(`${targetUrl}#${heading.id}`);
		} else {
			const el = document.getElementById(heading.id);
			if (el) {
				// Activate the guard instantly and forcefully assign the highlight class
				isClickScrollingRef.current = true;
				setActiveHeadingId(heading.id);

				el.scrollIntoView();

				if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
				scrollTimeoutRef.current = setTimeout(() => {
					isClickScrollingRef.current = false;
					computeActiveHeading(); // Safe recalculation once layout pop settles
				}, 800);
			}
			navigate(`${targetUrl}#${heading.id}`, { replace: true });
		}
	};

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
		<div className="blog-post wrapped">
			<div className="blog-post__content sidebar-layout sidebar-layout--hidden">
				<div className="blog-post__main">
					<Link to="/blog" className="blog-post__back" aria-label="Back to blog">
						<IconBack />
					</Link>
					{/* -- post header -- */}
					<section className="blog-post__header">
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
							<div className="blog-post__meta-item">
								<span className="blog-post__meta-icon">
									<IconCalendar />
								</span>
								<span>{getHumanReadableDate(postData['date-published'])}</span>
							</div>
							<div className="blog-post__meta-item">
								<span className="blog-post__meta-icon">
									<IconTime />
								</span>
								{readingTime && <span>{readingTime} read</span>}
							</div>
							{articlePages.length > 1 && (
								<div className="blog-post__meta-item">
									<span className="blog-post__meta-icon">
										<IconPages />
									</span>
									<span>
										Page {pageIndex + 1} of {articlePages.length}
									</span>{' '}
									<span className="blog-post__meta-page-nav">
										<button
											className="blog-post__meta-page-btn"
											disabled={pageIndex === 0}
											onClick={() => handlePageChange(pageIndex - 1)}
											aria-label="Previous page"
										>
											<IconChevronLeft />
										</button>
										<button
											className="blog-post__meta-page-btn"
											disabled={pageIndex === articlePages.length - 1}
											onClick={() => handlePageChange(pageIndex + 1)}
											aria-label="Next page"
										>
											<IconChevronRight />
										</button>
									</span>{' '}
								</div>
							)}
						</div>
					</section>

					{/* -- article content -- */}
					<article className="blog-post__article" dangerouslySetInnerHTML={{ __html: renderedHTML }} />

					{/* -- pagination -- */}
					{articlePages.length > 1 && (
						<div className="blog-post__pagination">
							<button
								className="blog-post__pagination-btn"
								disabled={pageIndex === 0}
								onClick={() => handlePageChange(pageIndex - 1)}
							>
								&larr; Prev
							</button>

							<div className="blog-post__pagination-pages">
								{articlePages.map((_, i) => (
									<button
										key={i}
										className={`blog-post__pagination-page ${i === pageIndex ? 'blog-post__pagination-page--active' : ''}`}
										onClick={() => handlePageChange(i)}
									>
										{i + 1}
									</button>
								))}
							</div>

							<button
								className="blog-post__pagination-btn"
								disabled={pageIndex === articlePages.length - 1}
								onClick={() => handlePageChange(pageIndex + 1)}
							>
								Next &rarr;
							</button>
						</div>
					)}

					{/* -- post footer -- */}
					<section className="blog-post__footer">
						<div className="blog-post__footer-row">
							<div className="blog-post__date-updated">
								Article last updated:
								<span>{getHumanReadableDate(lastUpdated)}</span>
							</div>
							<div className="blog-post__raw">
								<button onClick={handleDownloadRaw}>
									<span className="icon">
										<IconDownload />
									</span>
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
									&mdash; programmer, game developer, blogger, digital shaman etc.
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
										className={`blog-post__toc-item blog-post__toc-item--h${heading.level} ${
											heading.id === activeHeadingId ? 'blog-post__toc-item--active' : ''
										}`}
									>
										<a href={`#${heading.id}`} onClick={(e) => handleHeadingClick(e, heading)}>
											{heading.text}
										</a>
									</li>
								))}
							</ul>
						</nav>
					)}
				</div>
			</div>
			<div className="blog-post__comments">
				<BlogComments />
			</div>
		</div>
	);
}
