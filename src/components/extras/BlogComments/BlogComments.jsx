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
//  Created:      2026-06-18
//  Updated:      2026-06-18
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import React, { useState, useEffect } from 'react';
import Giscus from '@giscus/react';

import './BlogComments.scss';

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
				repo="metayeti/blog-comments"
				repoId="R_kgDOS-rQ5w"
				category="General"
				categoryId="DIC_kwDOS-rQ584C_bfv"
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
