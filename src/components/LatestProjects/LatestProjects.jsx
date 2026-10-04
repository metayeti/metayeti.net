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
//  File:         src/components/LatestProjects/LatestProjects.jsx
//  Description:  Latest projects component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-18
//  Updated:      2026-09-30
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON, SRC_PROJECTS_LISTING } from '@/util';

import './LatestProjects.scss';

function FeaturedProjectCard({ project, index }) {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isPreviewReady, setIsPreviewReady] = useState(false);
	const [animationFailed, setAnimationFailed] = useState(false);
	const projectPath = project.path ? `${project.path}/${project.slug}` : project.slug;
	const CardLink = project.playUrl ? 'a' : Link;
	const cardLinkProps = project.playUrl
		? { href: project.playUrl, target: '_blank', rel: 'noopener noreferrer' }
		: { to: `/projects/${projectPath}` };
	const screenshotUrl = `/content/projects/${projectPath}/screenshots/${project.screenshots[0]}`;
	const animatedUrl = project.animated ? `/content/projects/${projectPath}/screenshots/${project.animated}` : null;
	const isEngaged = isHovered || isFocused;

	useEffect(() => {
		if (!isEngaged || !animatedUrl || animationFailed) {
			setIsPreviewReady(false);
			return undefined;
		}

		const timeoutId = window.setTimeout(() => setIsPreviewReady(true), 500);
		return () => window.clearTimeout(timeoutId);
	}, [isEngaged, animatedUrl, animationFailed]);

	const isPreviewActive = isPreviewReady && animatedUrl && !animationFailed;
	const imageUrl = isPreviewActive ? animatedUrl : screenshotUrl;

	return (
		<CardLink
			className="latest-projects__card"
			{...cardLinkProps}
			style={{ '--card-index': index }}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		>
			<img
				src={imageUrl}
				alt={`${project.title} screenshot`}
				loading="lazy"
				onError={(event) => {
					if (isPreviewActive) {
						setAnimationFailed(true);
						return;
					}
					event.currentTarget.hidden = true;
				}}
			/>
		</CardLink>
	);
}

export default function LatestProjects() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		let isCurrent = true;

		async function loadFeaturedProjects() {
			try {
				const listing = await loadJSON(SRC_PROJECTS_LISTING);
				const allProjects = (listing.categories ?? []).flatMap((category) =>
					(category.sections ?? []).flatMap((section) => section.projects ?? []),
				);
				const featuredProjects = (listing.featured ?? [])
					.map((featured) =>
						allProjects.find(
							(project) =>
								project.slug === featured.slug && (project.path ?? '') === (featured.path ?? ''),
						),
					)
					.filter((project) => project?.screenshots?.[0])
					.slice(0, 6);

				if (isCurrent) setProjects(featuredProjects);
			} catch (error) {
				console.error('Failed to load featured projects:', error);
			}
		}

		loadFeaturedProjects();
		return () => {
			isCurrent = false;
		};
	}, []);

	return (
		<div className="latest-projects">
			<div className="latest-projects__stack">
				{projects.map((project, index) => (
					<FeaturedProjectCard
						key={`${project.path ?? ''}/${project.slug}`}
						project={project}
						index={index}
					/>
				))}
			</div>
			<div className="latest-projects__more">
				<Link to="/projects">More &middot;&middot;&middot;</Link>
			</div>
		</div>
	);
}
