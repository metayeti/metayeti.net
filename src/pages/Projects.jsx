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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { loadJSON, SRC_PROJECTS_LISTING } from '@/util';

import './Projects.scss';

export default function Projects() {
	const [projectListing, setProjectListing] = useState(null);
	const [activeCategoryId, setActiveCategoryId] = useState(null);
	const [loadError, setLoadError] = useState(false);

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
	const projects = projectListing?.projects?.[activeCategoryId] ?? [];

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
						<header className="projects-page__category-heading">
							<h3>{activeCategory.title}</h3>
							<p>{activeCategory.description}</p>
						</header>

						{projects.length > 0 ? (
							<div className={`projects-page__projects projects-page__projects--${activeCategory.stack}`}>
								{projects.map((project) => {
									const screenshot = project.screenshots?.[0];
									const screenshotUrl = screenshot
										? `/content/projects/${project.slug}/screenshots/${screenshot}`
										: null;

									return (
										<div key={project.slug} className="projects-page__entry">
											<Link
												className={`projects-page__project${screenshotUrl ? ' projects-page__project--with-image' : ''}`}
												to={`/projects/${project.slug}`}
											>
												{project.status && (
													<div className="projects-page__status">
														{project.status === 'in-dev'
															? 'In development'
															: project.status}
													</div>
												)}
												{screenshotUrl && (
													<div className="projects-page__image">
														<img
															src={screenshotUrl}
															alt={`${project.title} screenshot`}
															loading="lazy"
															onError={(event) => {
																event.currentTarget.hidden = true;
															}}
														/>
													</div>
												)}
												<div className="projects-page__project-content">
													<div className="projects-page__project-copy">
														<h4 className="projects-page__project-title">
															{project.title}
														</h4>
														<p className="projects-page__project-description">
															{project.description}
														</p>
													</div>
													<span className="projects-page__link">
														More <span aria-hidden="true">&rarr;</span>
													</span>
												</div>
											</Link>
										</div>
									);
								})}
							</div>
						) : (
							<p className="projects-page__empty">No projects in this category yet.</p>
						)}
					</section>
				</>
			)}
		</main>
	);
}
