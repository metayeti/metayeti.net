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
//  File:         src/pages/Projects.jsx
//  Description:  Projects page component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-01
//  Updated:      2026-09-30
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import IconForward from '@/components/icons/IconForward';
import { loadJSON, SRC_PROJECTS_LISTING } from '@/util';

import './Projects.scss';

const MASONRY_CARD_WIDTH = 240;
const MASONRY_MAX_COLUMNS = 5;
const MASONRY_COLUMN_GAP = 32;
const MASONRY_ROW_GAP = 32;

function ProjectCard({ project }) {
	const [isHovered, setIsHovered] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isPreviewReady, setIsPreviewReady] = useState(false);
	const [animationFailed, setAnimationFailed] = useState(false);
	const screenshot = project.screenshots?.[0];
	const projectPath = project.path ? `${project.path}/${project.slug}` : project.slug;
	const screenshotUrl = screenshot ? `/content/projects/${projectPath}/screenshots/${screenshot}` : null;
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
		<div className="projects-page__entry">
			<Link
				className={`projects-page__project${screenshotUrl ? ' projects-page__project--with-image' : ''}`}
				to={`/projects/${projectPath}`}
				onPointerEnter={() => setIsHovered(true)}
				onPointerLeave={() => setIsHovered(false)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			>
				{project.status && (
					<div className="projects-page__status">
						{project.status === 'in-dev' ? 'In development' : project.status}
					</div>
				)}
				{imageUrl && (
					<div className="projects-page__image">
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
					</div>
				)}
				<div className="projects-page__project-content">
					<div className="projects-page__project-copy">
						<h4 className="projects-page__project-title">{project.title}</h4>
						<p className="projects-page__project-description">{project.description}</p>
					</div>
					<span className="projects-page__link">
						More <IconForward aria-hidden="true" width="16" height="16" />
					</span>
				</div>
			</Link>
		</div>
	);
}

export default function Projects() {
	const [projectListing, setProjectListing] = useState(null);
	const [activeCategoryId, setActiveCategoryId] = useState(null);
	const [loadError, setLoadError] = useState(false);
	const projectsLayoutRef = useRef(null);

	useEffect(() => {
		async function fetchProjects() {
			try {
				const projectData = await loadJSON(SRC_PROJECTS_LISTING);
				setProjectListing(projectData);
				setActiveCategoryId(projectData?.categories?.[0]?.id ?? null);
			} catch (error) {
				console.error('Failed to load projects:', error);
				setLoadError(true);
			}
		}
		fetchProjects();
	}, []);

	const categories = projectListing?.categories ?? [];
	const activeCategory = categories.find((category) => category.id === activeCategoryId);
	const sections = activeCategory?.sections ?? [];

	useLayoutEffect(() => {
		const root = projectsLayoutRef.current;
		if (!root) return undefined;

		const containers = Array.from(root.querySelectorAll('.projects-page__projects--vertical-stack'));
		if (containers.length === 0) return undefined;

		let animationFrame = null;
		let resizeTimeout = null;
		let isWindowResizing = false;

		function layoutProjects() {
			animationFrame = null;
			containers.forEach((container) => {
				const containerWidth = container.clientWidth;
				const entries = Array.from(container.children);

				if (!containerWidth || entries.length === 0) {
					container.style.height = '0px';
					return;
				}

				const cardWidth = Math.min(MASONRY_CARD_WIDTH, containerWidth);
				const columnCount = Math.min(
					MASONRY_MAX_COLUMNS,
					entries.length,
					Math.max(1, Math.floor(containerWidth / (cardWidth + MASONRY_COLUMN_GAP))),
				);
				const contentWidth = columnCount * cardWidth + (columnCount - 1) * MASONRY_COLUMN_GAP;
				const leftOffset = (containerWidth - contentWidth) / 2;
				const columnHeights = Array(columnCount).fill(0);

				entries.forEach((entry) => {
					entry.style.width = `${cardWidth}px`;
				});

				entries.forEach((entry) => {
					let shortestColumn = 0;
					for (let index = 1; index < columnCount; index += 1) {
						if (columnHeights[index] < columnHeights[shortestColumn]) {
							shortestColumn = index;
						}
					}

					entry.style.left = `${leftOffset + shortestColumn * (cardWidth + MASONRY_COLUMN_GAP)}px`;
					entry.style.top = `${columnHeights[shortestColumn] + MASONRY_ROW_GAP / 2}px`;
					columnHeights[shortestColumn] += entry.offsetHeight + MASONRY_ROW_GAP;
				});

				container.style.height = `${Math.max(...columnHeights)}px`;
			});
		}

		function scheduleLayout() {
			if (animationFrame !== null) cancelAnimationFrame(animationFrame);
			animationFrame = requestAnimationFrame(layoutProjects);
		}

		function handleWindowResize() {
			isWindowResizing = true;
			if (animationFrame !== null) {
				cancelAnimationFrame(animationFrame);
				animationFrame = null;
			}
			if (resizeTimeout !== null) clearTimeout(resizeTimeout);
			resizeTimeout = window.setTimeout(() => {
				resizeTimeout = null;
				isWindowResizing = false;
				layoutProjects();
			}, 50);
		}

		const resizeObserver =
			typeof ResizeObserver === 'undefined'
				? null
				: new ResizeObserver(() => {
						if (!isWindowResizing) scheduleLayout();
					});
		containers.forEach((container) => {
			resizeObserver?.observe(container);
			Array.from(container.children).forEach((entry) => resizeObserver?.observe(entry));
			container.classList.add('projects-page__projects--instant');
		});
		window.addEventListener('resize', handleWindowResize);
		layoutProjects();
		containers.forEach((container) => {
			container.offsetHeight;
			container.classList.remove('projects-page__projects--instant');
		});

		return () => {
			if (animationFrame !== null) cancelAnimationFrame(animationFrame);
			if (resizeTimeout !== null) clearTimeout(resizeTimeout);
			resizeObserver?.disconnect();
			window.removeEventListener('resize', handleWindowResize);
			containers.forEach((container) => {
				container.style.height = '';
				Array.from(container.children).forEach((entry) => {
					entry.style.width = '';
					entry.style.left = '';
					entry.style.top = '';
				});
			});
		};
	}, [activeCategory?.id, activeCategory?.sections]);

	function handleTabKeyDown(event, index) {
		let nextIndex;
		if (event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length;
		if (event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length;
		if (event.key === 'Home') nextIndex = 0;
		if (event.key === 'End') nextIndex = categories.length - 1;
		if (nextIndex === undefined) return;

		event.preventDefault();
		setActiveCategoryId(categories[nextIndex].id);
		document.getElementById(`projects-tab-${categories[nextIndex].id}`)?.focus();
	}

	return (
		<main className="projects-page wrapped">
			<h2>Projects</h2>

			{!projectListing && !loadError && <p role="status">Loading projects...</p>}
			{loadError && <p role="alert">Projects could not be loaded.</p>}
			{projectListing && categories.length === 0 && <p>No project categories found.</p>}

			{activeCategory && (
				<>
					<div className="projects-page__tabs" role="tablist" aria-label="Project categories">
						{categories.map((category, index) => (
							<button
								key={category.id}
								id={`projects-tab-${category.id}`}
								className={`projects-page__tab${activeCategoryId === category.id ? ' projects-page__tab--active' : ''}`}
								role="tab"
								aria-selected={activeCategoryId === category.id}
								aria-controls="projects-panel"
								tabIndex={activeCategoryId === category.id ? 0 : -1}
								onClick={() => setActiveCategoryId(category.id)}
								onKeyDown={(event) => handleTabKeyDown(event, index)}
							>
								{category.title}
							</button>
						))}
					</div>

					<section
						id="projects-panel"
						className="projects-page__panel"
						role="tabpanel"
						aria-labelledby={`projects-tab-${activeCategory.id}`}
						tabIndex={0}
					>
						<div ref={projectsLayoutRef} className="projects-page__sections">
							{sections.map((section) => (
								<div key={section.id} className="projects-page__section">
									{section.title && (
										<h3
											id={`projects-section-${section.id}`}
											className="projects-page__section-title"
										>
											{section.title}
										</h3>
									)}
									{section.description && (
										<p className="projects-page__section-description">{section.description}</p>
									)}
									{section.projects.length > 0 ? (
										<div
											className={`projects-page__projects projects-page__projects--${section.display}`}
										>
											{section.projects.map((project) => (
												<ProjectCard key={project.slug} project={project} />
											))}
										</div>
									) : (
										<p className="projects-page__empty">No projects in this section yet.</p>
									)}
								</div>
							))}
						</div>
					</section>
				</>
			)}
		</main>
	);
}
