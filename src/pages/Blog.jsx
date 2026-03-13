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
//  Updated:      2026-03-13
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import './Blog.scss';

export default function Blog() {
	return (
		<div className="blog-page sidebar-layout wrapped">
			<div className="blog-page__main">
				<h2>All Posts</h2>
				<h3>2025</h3>
				<p>hello, world</p>
			</div>
			<div className="blog-page__side">
				<div className="blog-page__filters">
					<form action="" className="blog-page__search-box">
						<input
							className="blog-page__search-input"
							type="text"
							name="search"
							placeholder="Search posts ..."
						/>
						<button type="submit" title="Search"></button>
					</form>
					<div className="blog-page__filter-by-topic">
						<h5>Topics</h5>
					</div>
					<div className="blog-page__filter-by-year">
						<h5>Years</h5>
					</div>
				</div>
			</div>
		</div>
	);
}
