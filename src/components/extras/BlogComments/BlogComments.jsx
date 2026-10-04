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
//  File:         src/components/extras/BlogComments/BlogComments.jsx
//  Description:  Blog comments component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import React, { useState, useEffect } from 'react';
import Giscus from '@giscus/react';

import './BlogComments.scss';

const BLOG_GISCUS_REPO = 'metayeti/blog-comments';
const BLOG_GISCUS_REPO_ID = 'R_kgDOS-rQ5w';
const BLOG_GISCUS_CATEGORY = 'General';
const BLOG_GISCUS_CATEGORY_ID = 'DIC_kwDOS-rQ584C_bfv';

const BlogComments = () => {
	// handle themes
	const [giscusTheme, setGiscusTheme] = useState('dark');

	useEffect(() => {
		const checkTheme = () => {
			const isLightMode = document.documentElement.classList.contains('lightmode');
			setGiscusTheme(isLightMode ? 'light' : 'dark');
		};

		checkTheme();

		// observe changes to :root
		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

		// cleanup
		return () => observer.disconnect();
	}, []);

	return (
		<div className="comments-container">
			<Giscus
				id="comments"
				repo={BLOG_GISCUS_REPO}
				repoId={BLOG_GISCUS_REPO_ID}
				category={BLOG_GISCUS_CATEGORY}
				categoryId={BLOG_GISCUS_CATEGORY_ID}
				mapping="pathname"
				strict="0"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme={giscusTheme}
				lang="en"
				loading="lazy"
			/>
		</div>
	);
};

export default BlogComments;
