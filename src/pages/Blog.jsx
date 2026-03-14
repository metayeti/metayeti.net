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
//  File:         src/routes/Blog.jsx
//  Description:  Blog page component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-01
//  Updated:      2026-03-14
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON, SRC_BLOG_LISTING } from '@/util';
import IconSearch from '@/components/icons/IconSearch';

import './Blog.scss';

function formatDateWithoutYear(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

export default function Blog() {
	const [blogListing, setBlogListing] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [activeTag, setActiveTag] = useState(null);
	const searchInputRef = useRef(null);

	useEffect(() => {
		async function fetchBlogPosts() {
			try {
				const blogData = await loadJSON(SRC_BLOG_LISTING);
				setBlogListing(blogData?.posts ?? []);
			} catch (error) {
				console.error('Failed to load blog posts:', error);
			}
		}
		fetchBlogPosts();
	}, []);

	// -- filtered posts --
	const filteredPosts = useMemo(() => {
		let posts = blogListing;
		if (activeTag) {
			posts = posts.filter((post) => post.tags?.includes(activeTag));
		}
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			posts = posts.filter(
				(post) =>
					post.title.toLowerCase().includes(query) ||
					post.description?.toLowerCase().includes(query) ||
					post.tags?.some((tag) => tag.toLowerCase().includes(query)),
			);
		}
		return posts;
	}, [blogListing, activeTag, searchQuery]);

	// -- posts grouped by year --
	const postsByYear = useMemo(() => {
		const grouped = new Map();
		filteredPosts.forEach((post) => {
			const year = new Date(post['date-published']).getFullYear();
			if (!grouped.has(year)) grouped.set(year, []);
			grouped.get(year).push(post);
		});
		return grouped;
	}, [filteredPosts]);

	// -- tag list with counts (from all posts) --
	const tagList = useMemo(() => {
		const tagCounts = new Map();
		blogListing.forEach((post) => {
			if (Array.isArray(post.tags)) {
				post.tags.forEach((tag) => {
					tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
				});
			}
		});
		return Array.from(tagCounts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
	}, [blogListing]);

	// -- year list with counts (from all posts) --
	const yearList = useMemo(() => {
		const yearCounts = new Map();
		blogListing.forEach((post) => {
			const year = new Date(post['date-published']).getFullYear();
			yearCounts.set(year, (yearCounts.get(year) ?? 0) + 1);
		});
		return Array.from(yearCounts.entries()).sort((a, b) => b[0] - a[0]);
	}, [blogListing]);

	function handleSearchSubmit(event) {
		event.preventDefault();
		if (!searchInputRef.current?.value.trim()) {
			searchInputRef.current?.focus();
		}
	}

	function handleTagClick(tag) {
		setActiveTag((prev) => (prev === tag ? null : tag));
	}

	function handleClearFilters() {
		setActiveTag(null);
		setSearchQuery('');
	}

	const hasActiveFilters = activeTag || searchQuery.trim();

	return (
		<div className="blog-page sidebar-layout wrapped">
			<div className="blog-page__main">
				<h2>All Posts</h2>

				{hasActiveFilters && (
					<div className="blog-page__active-filters">
						{activeTag && <span className="blog-page__active-filter">Tag: {activeTag}</span>}
						{searchQuery.trim() && (
							<span className="blog-page__active-filter">Search: &ldquo;{searchQuery}&rdquo;</span>
						)}
						<button className="blog-page__clear-filters" onClick={handleClearFilters}>
							Clear
						</button>
					</div>
				)}

				{filteredPosts.length === 0 && blogListing.length > 0 && (
					<p className="blog-page__no-results">No posts found.</p>
				)}

				{Array.from(postsByYear.entries()).map(([year, posts]) => (
					<div key={year} className="blog-page__year-group">
						<h3>{year}</h3>
						<div className="blog-page__entries">
							{posts.map((post) => (
								<div key={post.slug} className="blog-page__entry">
									<div className="blog-page__entry-tags">
										{post.tags?.map((tag) => (
											<button
												key={tag}
												className={`blog-page__entry-tag${activeTag === tag ? ' blog-page__entry-tag--active' : ''}`}
												onClick={() => handleTagClick(tag)}
											>
												{tag}
											</button>
										))}
									</div>
									<Link to={`/blog/${post.slug}`} className="blog-page__entry-link">
										<div className="blog-page__entry-date">
											{formatDateWithoutYear(post['date-published'])}
										</div>
										<div className="blog-page__entry-title">{post.title}</div>
										<div className="blog-page__entry-desc">{post.description}</div>
										<div className="blog-page__entry-cta">Read More &rarr;</div>
									</Link>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<div className="blog-page__side">
				<div className="blog-page__filters">
					<form onSubmit={handleSearchSubmit} className="blog-page__search-box">
						<input
							ref={searchInputRef}
							className="blog-page__search-input"
							type="text"
							name="search"
							placeholder="Search posts ..."
							maxLength="99"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button className="blog-page__search-button" type="submit" title="Search">
							<IconSearch />
						</button>
					</form>

					<div className="blog-page__filter-section">
						<h5>Topics</h5>
						<div className="blog-page__tag-list">
							{tagList.map(([tag, count]) => (
								<button
									key={tag}
									className={`blog-page__filter-tag${activeTag === tag ? ' blog-page__filter-tag--active' : ''}`}
									onClick={() => handleTagClick(tag)}
								>
									<span className="blog-page__filter-tag-name">{tag}</span>
									<span className="blog-page__filter-tag-count">{count}</span>
								</button>
							))}
						</div>
					</div>

					<div className="blog-page__filter-section">
						<h5>Years</h5>
						<div className="blog-page__tag-list">
							{yearList.map(([year, count]) => (
								<span key={year} className="blog-page__filter-tag blog-page__filter-tag--static">
									<span className="blog-page__filter-tag-name">{year}</span>
									<span className="blog-page__filter-tag-count">{count}</span>
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
