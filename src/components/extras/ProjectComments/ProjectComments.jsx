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
//  File:         src/components/extras/ProjectComments/ProjectComments.jsx
//  Description:  Project comments component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useEffect, useState } from 'react';
import Giscus from '@giscus/react';

import './ProjectComments.scss';

const PROJECT_GISCUS_REPO = 'metayeti/project-comments';
const PROJECT_GISCUS_REPO_ID = 'R_kgDOU16myQ';
const PROJECT_GISCUS_CATEGORY = 'General';
const PROJECT_GISCUS_CATEGORY_ID = 'DIC_kwDOU16myc4DGxFc';

const ProjectComments = () => {
	const [giscusTheme, setGiscusTheme] = useState('dark');

	useEffect(() => {
		const checkTheme = () => {
			const isLightMode = document.documentElement.classList.contains('lightmode');
			setGiscusTheme(isLightMode ? 'light' : 'dark');
		};

		checkTheme();

		const observer = new MutationObserver(checkTheme);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

		return () => observer.disconnect();
	}, []);

	return (
		<div className="project-comments-container">
			<Giscus
				id="project-comments"
				repo={PROJECT_GISCUS_REPO}
				repoId={PROJECT_GISCUS_REPO_ID}
				category={PROJECT_GISCUS_CATEGORY}
				categoryId={PROJECT_GISCUS_CATEGORY_ID}
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

export default ProjectComments;
