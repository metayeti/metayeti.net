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
//  File:         src/pages/ProjectPage.jsx
//  Description:  Individual project page component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from '@/components/ImageGallery';
import IconDownload from '@/components/icons/IconDownload';
import IconBack from '@/components/icons/IconBack';
import IconCode from '@/components/icons/IconCode';
import IconPost from '@/components/icons/IconPost';
import ProjectComments from '@/components/extras/ProjectComments';
import { getHumanReadableDate, loadJSON, loadText, md, SRC_PROJECTS_LISTING } from '@/util';

import './ProjectPage.scss';

export default function ProjectPage() {
	const { path, slug } = useParams();
	const [projectData, setProjectData] = useState(null);
	const [pageState, setPageState] = useState('loading');

	useEffect(() => {
		let isCurrent = true;

		async function loadProject() {
			setProjectData(null);
			setPageState('loading');

			try {
				const listing = await loadJSON(SRC_PROJECTS_LISTING);
				const projects = (listing.categories ?? []).flatMap((category) =>
					(category.sections ?? []).flatMap((section) => section.projects ?? []),
				);
				const project = projects.find((item) => item.slug === slug && (!path || (item.path ?? '') === path));

				if (!project) {
					if (isCurrent) setPageState('not-found');
					return;
				}

				const projectPath = project.path ? `${project.path}/${project.slug}` : project.slug;
				let devlogs = [];
				if (project.devlog) {
					try {
						const listing = await loadJSON(`/content/projects/${projectPath}/devlog/listing.json`);
						const posts = [...(listing.posts ?? [])].sort((a, b) =>
							b['date-published'].localeCompare(a['date-published']),
						);
						devlogs = await Promise.all(
							posts.map(async (post) => ({
								...post,
								markdown: await loadText(`/content/projects/${projectPath}/devlog/${post.slug}.md`),
							})),
						);
					} catch (error) {
						console.warn(`Failed to load devlog for ${project.slug}:`, error);
					}
				}

				if (isCurrent) {
					setProjectData({ project, projectPath, devlogs });
					setPageState('ready');
				}
			} catch (error) {
				console.error('Failed to load project:', error);
				if (isCurrent) setPageState('error');
			}
		}

		loadProject();
		return () => {
			isCurrent = false;
		};
	}, [path, slug]);

	useEffect(() => {
		if (!projectData) return undefined;
		document.title = `${projectData.project.title} | metayeti.net`;
		return () => {
			document.title = 'metayeti.net';
		};
	}, [projectData]);

	if (pageState === 'loading') {
		return (
			<div className="project-page wrapped" role="status">
				Loading project...
			</div>
		);
	}

	if (pageState === 'not-found') {
		return (
			<div className="project-page wrapped">
				<p role="alert">Project not found.</p>
				<Link className="project-page__back" to="/projects" aria-label="Back to project index">
					<IconBack aria-hidden="true" />
				</Link>
			</div>
		);
	}

	if (pageState === 'error' || !projectData) {
		return (
			<div className="project-page wrapped" role="alert">
				This project could not be loaded.
			</div>
		);
	}

	const { project, projectPath, devlogs } = projectData;
	const lastChanged = project['date-updated'];
	const statusLabels = {
		'in-dev': 'In development',
		'in-production': 'In production',
	};
	const statusLabel = statusLabels[project.status] ?? project.status ?? 'Not specified';
	const isInProgress = ['in-dev', 'in-production'].includes(project.status);
	const hasProgress = Number.isFinite(project.progress) && project.progress >= 0 && project.progress <= 100;
	const screenshots = (project.screenshots ?? []).map((filename) => ({
		filename,
		src: `/content/projects/${projectPath}/screenshots/${filename}`,
	}));

	return (
		<div className="project-page wrapped">
			<Link className="project-page__back" to="/projects" aria-label="Back to project index">
				<IconBack aria-hidden="true" />
			</Link>

			<header className="project-page__header">
				<div className="project-page__eyebrow">
					<span>Project</span>
				</div>
				<h2 className="project-page__title">{project.title}</h2>
				<div className="project-page__meta">
					{lastChanged && (
						<div>
							<span>Last updated</span>
							<time dateTime={lastChanged}>{getHumanReadableDate(lastChanged)}</time>
						</div>
					)}
				</div>
			</header>

			<div className="project-page__overview">
				<ImageGallery key={projectPath} images={screenshots} title={project.title} />

				<aside className="project-page__info" aria-label="Project details">
					<h3>Project details</h3>
					<p className="project-page__description">{project.description}</p>
					<dl>
						<div>
							<dt>Status</dt>
							<dd>{statusLabel}</dd>
						</div>
						{isInProgress && (
							<div className="project-page__progress-row">
								<dt>Progress</dt>
								<dd>
									{hasProgress ? (
										<div
											className="project-page__progress"
											role="meter"
											aria-label={`${project.title} development progress`}
											aria-valuemin="0"
											aria-valuemax="100"
											aria-valuenow={project.progress}
										>
											<span className="project-page__progress-track" aria-hidden="true">
												<span style={{ width: `${project.progress}%` }} />
											</span>
											<span className="project-page__progress-value" aria-hidden="true">
												{project.progress}%
											</span>
										</div>
									) : (
										<span>Not set</span>
									)}
								</dd>
							</div>
						)}
						<div>
							<dt>Version</dt>
							<dd>{project.version ?? 'Not announced'}</dd>
						</div>
						{project.platforms?.length > 0 && (
							<div>
								<dt>Platforms</dt>
								<dd>{project.platforms.join(', ')}</dd>
							</div>
						)}
						{project.engine && (
							<div>
								<dt>Engine</dt>
								<dd>{project.engine}</dd>
							</div>
						)}
						{project.releaseWindow && (
							<div>
								<dt>Release window</dt>
								<dd>{project.releaseWindow}</dd>
							</div>
						)}
					</dl>
					{project.downloadUrl ? (
						<a className="project-page__download" href={project.downloadUrl}>
							<IconDownload aria-hidden="true" />
							Download
						</a>
					) : (
						<button className="project-page__download" type="button" disabled>
							<IconDownload aria-hidden="true" />
							Download
						</button>
					)}
					{!project.downloadUrl && <p className="project-page__download-note">No build available yet.</p>}
				</aside>
			</div>

			{project.devlog && (
				<section className="project-page__devlog" aria-labelledby="project-devlog-title">
					<h3 id="project-devlog-title">
						<IconCode aria-hidden="true" />
						Devlog
					</h3>
					<div className="project-page__devlog-list">
						{devlogs.map((post) => (
							<article className="project-page__devlog-post" key={post.slug}>
								<header className="project-page__devlog-post-header">
									<h4>
										<IconPost aria-hidden="true" />
										{post.title}
									</h4>
									<time dateTime={post['date-published']}>
										{getHumanReadableDate(post['date-published'])}
									</time>
								</header>
								<div
									className="project-page__devlog-post-body"
									dangerouslySetInnerHTML={{ __html: md.render(post.markdown) }}
								/>
							</article>
						))}
					</div>
				</section>
			)}

			{project.comments && <ProjectComments key={projectPath} />}
		</div>
	);
}
