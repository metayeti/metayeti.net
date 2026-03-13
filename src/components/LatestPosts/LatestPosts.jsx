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
//  File:         src/components/LatestPosts/LatestPosts.jsx
//  Description:  Latest blog posts component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-13
//  Updated:      2026-03-13
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON, getHumanReadableDate } from '@/util';
import { SRC_BLOG_LISTING } from '@/util';

import './LatestPosts.scss';

export default function LatestPosts() {
	const postsToShow = 3; // change if needed

	const [blogListing, setBlogListing] = useState([]);

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

	if (!blogListing.length) {
		return null;
	}

	return (
		<div className="latest-posts">
			<ul className="latest-posts__list">
				{blogListing.slice(0, postsToShow).map((item) => (
					<li key={item.id ?? item.slug} className="latest-posts__item">
						<Link to={`/blog/${item.slug}`} className="latest-posts__entry">
							<div className="latest-posts__content">
								<div className="latest-posts__date">
									<span>{getHumanReadableDate(item['date-published'])}</span>
								</div>
								<div className="latest-posts__title">
									<span>{item['title']}</span>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
			{blogListing.length > postsToShow && (
				<div className="latest-posts__more">
					<Link to="/blog">More &middot;&middot;&middot;</Link>
				</div>
			)}
		</div>
	);
}
