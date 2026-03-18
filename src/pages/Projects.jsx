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
//  Updated:      2026-03-18
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { Link } from 'react-router-dom';

import './Projects.scss';

// -- Mock project data --

const FEATURED_PROJECT = {
	slug: 'dungeon-of-the-endless',
	title: 'Dungeon of the Endless',
	tagline: 'A roguelike dungeon crawler with procedurally generated levels.',
	description:
		'Explore vast, procedurally generated dungeons filled with traps, treasures, and terrifying creatures. Build your party, craft powerful items, and descend deeper into the unknown.',
	status: 'Active',
	tags: ['C++', 'OpenGL', 'Procedural Generation'],
	projectUrl: '/projects/dungeon-of-the-endless',
	devlogUrl: '/projects/dungeon-of-the-endless#devlog',
	screenshots: [
		{ id: 1, alt: 'Dungeon exploration gameplay' },
		{ id: 2, alt: 'Character inventory screen' },
		{ id: 3, alt: 'Boss encounter' },
	],
};

const ALL_PROJECTS = {
	active: [
		{
			slug: 'dungeon-of-the-endless',
			title: 'Dungeon of the Endless',
			description: 'A roguelike dungeon crawler with procedurally generated levels.',
			tags: ['C++', 'OpenGL'],
		},
		{
			slug: 'pixel-forge',
			title: 'Pixel Forge',
			description: 'Lightweight pixel art editor built for game developers.',
			tags: ['JavaScript', 'Canvas API'],
		},
	],
	completed: [
		{
			slug: 'starfield-sim',
			title: 'Starfield Simulator',
			description: 'A real-time star field simulation with parallax scrolling.',
			tags: ['C++', 'SDL2'],
		},
		{
			slug: 'chip8-emu',
			title: 'CHIP-8 Emulator',
			description: 'A fully functional CHIP-8 emulator and debugger.',
			tags: ['Rust'],
		},
		{
			slug: 'markdown-blog-engine',
			title: 'Markdown Blog Engine',
			description: 'Static blog engine that renders markdown with code highlighting.',
			tags: ['JavaScript', 'Node.js'],
		},
	],
	legacy: [
		{
			slug: 'retro-snake',
			title: 'Retro Snake',
			description: 'Classic snake game with a retro CRT aesthetic.',
			tags: ['JavaScript', 'Canvas'],
		},
		{
			slug: 'ini-parser',
			title: 'INI File Parser',
			description: 'A header-only C++ library for reading and writing INI files.',
			tags: ['C++'],
		},
	],
};

function FeaturedScreenshot({ screenshot, index }) {
	return (
		<div className="projects-page__screenshot" title={screenshot.alt}>
			<div className="projects-page__screenshot-mock">{index + 1}</div>
		</div>
	);
}

function ProjectCard({ project }) {
	return (
		<Link to={`/projects/${project.slug}`} className="projects-page__card">
			<div className="projects-page__card-mock-img" />
			<div className="projects-page__card-body">
				<h4 className="projects-page__card-title">{project.title}</h4>
				<p className="projects-page__card-desc">{project.description}</p>
				<div className="projects-page__card-tags">
					{project.tags?.map((tag) => (
						<span key={tag} className="projects-page__card-tag">
							{tag}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
}

function ProjectCategory({ title, projects }) {
	if (!projects?.length) return null;
	return (
		<div className="projects-page__category">
			<h3>{title}</h3>
			<div className="projects-page__grid">
				{projects.map((project) => (
					<ProjectCard key={project.slug} project={project} />
				))}
			</div>
		</div>
	);
}

export default function Projects() {
	const feat = FEATURED_PROJECT;

	return (
		<div className="projects-page wrapped">
			<h2>Projects</h2>

			{/* -- Featured project -- */}
			<section className="projects-page__featured">
				<div className="projects-page__featured-inner">
					<div className="projects-page__screenshots">
						<div className="projects-page__screenshot-main">
							<FeaturedScreenshot screenshot={feat.screenshots[0]} index={0} />
						</div>
						<div className="projects-page__screenshot-thumbs">
							{feat.screenshots.slice(1).map((ss, i) => (
								<FeaturedScreenshot key={ss.id} screenshot={ss} index={i + 1} />
							))}
						</div>
					</div>
					<div className="projects-page__featured-info">
						<span className="projects-page__featured-status">{feat.status}</span>
						<h3 className="projects-page__featured-title">{feat.title}</h3>
						<p className="projects-page__featured-tagline">{feat.tagline}</p>
						<p className="projects-page__featured-desc">{feat.description}</p>
						<div className="projects-page__featured-tags">
							{feat.tags.map((tag) => (
								<span key={tag} className="projects-page__featured-tag">
									{tag}
								</span>
							))}
						</div>
						<div className="projects-page__featured-links">
							<Link to={feat.projectUrl} className="projects-page__featured-btn">
								Project Page &rarr;
							</Link>
							<Link
								to={feat.devlogUrl}
								className="projects-page__featured-btn projects-page__featured-btn--secondary"
							>
								Devlog
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* -- All projects -- */}
			<section className="projects-page__all">
				<h2>All Projects</h2>
				<ProjectCategory title="Active" projects={ALL_PROJECTS.active} />
				<ProjectCategory title="Completed" projects={ALL_PROJECTS.completed} />
				<ProjectCategory title="Legacy" projects={ALL_PROJECTS.legacy} />
			</section>
		</div>
	);
}
