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
//  Created:      2026-03-18
//  Updated:      2026-03-18
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useParams, Link } from 'react-router-dom';
import IconBack from '@/components/icons/IconBack';

import './ProjectPage.scss';

// -- Mock project details keyed by slug --

const PROJECT_DATA = {
	'dungeon-of-the-endless': {
		title: 'Dungeon of the Endless',
		tagline: 'A roguelike dungeon crawler with procedurally generated levels.',
		description:
			'Explore vast, procedurally generated dungeons filled with traps, treasures, and terrifying creatures. Build your party, craft powerful items, and descend deeper into the unknown. Each run is unique thanks to advanced procedural generation algorithms.',
		status: 'Active',
		tags: ['C++', 'OpenGL', 'Procedural Generation'],
		links: {
			github: 'https://github.com/example/dungeon',
			itch: 'https://example.itch.io/dungeon',
		},
		devlog: [
			{
				date: '2026-03-15',
				title: 'Lighting system overhaul',
				content:
					'Rewrote the lighting engine to support dynamic point lights and ambient occlusion. Performance improved by 40% through spatial hashing.',
			},
			{
				date: '2026-03-02',
				title: 'New enemy AI behaviors',
				content:
					'Implemented flanking and retreating behaviors for ranged enemies. Added patrol routes and aggro radius tuning.',
			},
			{
				date: '2026-02-18',
				title: 'Procedural room templates',
				content:
					'Created a template system for room generation. Rooms now have themed variants based on dungeon depth and biome type.',
			},
			{
				date: '2026-02-05',
				title: 'Inventory and crafting UI',
				content:
					'Designed and implemented the inventory grid system. Items can be dragged, dropped, and combined for crafting.',
			},
			{
				date: '2026-01-20',
				title: 'Project kickoff',
				content:
					'Set up the project structure, build system, and core game loop. First prototype renders a basic tile map with player movement.',
			},
		],
	},
	'pixel-forge': {
		title: 'Pixel Forge',
		tagline: 'Lightweight pixel art editor built for game developers.',
		description:
			'A fast, minimal pixel art editor focused on game asset creation. Features layers, animation preview, and direct export to sprite sheets.',
		status: 'Active',
		tags: ['JavaScript', 'Canvas API'],
		links: {
			github: 'https://github.com/example/pixel-forge',
		},
		devlog: [
			{
				date: '2026-03-10',
				title: 'Layer blending modes',
				content: 'Added multiply, screen, and overlay blending modes for layers.',
			},
			{
				date: '2026-02-28',
				title: 'Animation timeline',
				content: 'Built a frame-based animation timeline with onion skinning support.',
			},
		],
	},
	'starfield-sim': {
		title: 'Starfield Simulator',
		tagline: 'A real-time star field simulation with parallax scrolling.',
		description:
			'Real-time star field rendering with multiple parallax layers, customizable star density, and interactive controls.',
		status: 'Completed',
		tags: ['C++', 'SDL2'],
		links: {
			github: 'https://github.com/example/starfield',
		},
		devlog: [],
	},
	'chip8-emu': {
		title: 'CHIP-8 Emulator',
		tagline: 'A fully functional CHIP-8 emulator and debugger.',
		description:
			'Complete CHIP-8 emulator with step-through debugger, memory inspector, and ROM loading. Passes all standard test ROMs.',
		status: 'Completed',
		tags: ['Rust'],
		links: {
			github: 'https://github.com/example/chip8',
		},
		devlog: [],
	},
	'markdown-blog-engine': {
		title: 'Markdown Blog Engine',
		tagline: 'Static blog engine that renders markdown with code highlighting.',
		description:
			'A lightweight static blog generator that converts markdown files into styled HTML pages with syntax highlighting and responsive design.',
		status: 'Completed',
		tags: ['JavaScript', 'Node.js'],
		links: {},
		devlog: [],
	},
	'retro-snake': {
		title: 'Retro Snake',
		tagline: 'Classic snake game with a retro CRT aesthetic.',
		description:
			'A nostalgic snake game rendered with CRT scanline effects, pixel-perfect collision, and increasing difficulty levels.',
		status: 'Legacy',
		tags: ['JavaScript', 'Canvas'],
		links: {
			github: 'https://github.com/example/retro-snake',
		},
		devlog: [],
	},
	'ini-parser': {
		title: 'INI File Parser',
		tagline: 'A header-only C++ library for reading and writing INI files.',
		description:
			'Lightweight, header-only C++ library for parsing INI configuration files. Supports sections, comments, multi-line values, and UTF-8.',
		status: 'Legacy',
		tags: ['C++'],
		links: {
			github: 'https://github.com/example/ini-parser',
		},
		devlog: [],
	},
};

function formatDevlogDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

export default function ProjectPage() {
	const { slug } = useParams();
	const project = PROJECT_DATA[slug];

	if (!project) {
		return (
			<div className="project-page wrapped">
				<Link to="/projects" className="project-page__back" title="Back to projects">
					<IconBack />
				</Link>
				<h2>Project Not Found</h2>
				<p>The project you&rsquo;re looking for doesn&rsquo;t exist.</p>
			</div>
		);
	}

	const hasDevlog = project.devlog && project.devlog.length > 0;

	return (
		<div className="project-page wrapped">
			{/* -- Back button -- */}
			<Link to="/projects" className="project-page__back" title="Back to projects">
				<IconBack />
			</Link>

			{/* -- Project header -- */}
			<header className="project-page__header">
				<span className={`project-page__status project-page__status--${project.status.toLowerCase()}`}>
					{project.status}
				</span>
				<h2 className="project-page__title">{project.title}</h2>
				<p className="project-page__tagline">{project.tagline}</p>
				<div className="project-page__tags">
					{project.tags.map((tag) => (
						<span key={tag} className="project-page__tag">
							{tag}
						</span>
					))}
				</div>
			</header>

			{/* -- Hero mock image -- */}
			<div className="project-page__hero">
				<div className="project-page__hero-mock" />
			</div>

			{/* -- Description -- */}
			<section className="project-page__about">
				<h3>About</h3>
				<p>{project.description}</p>
				{Object.keys(project.links).length > 0 && (
					<div className="project-page__link-list">
						{project.links.github && (
							<a
								href={project.links.github}
								className="project-page__ext-link external"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</a>
						)}
						{project.links.itch && (
							<a
								href={project.links.itch}
								className="project-page__ext-link external"
								target="_blank"
								rel="noopener noreferrer"
							>
								itch.io
							</a>
						)}
					</div>
				)}
			</section>

			{/* -- Devlog -- */}
			{hasDevlog && (
				<section className="project-page__devlog" id="devlog">
					<h2>Devlog</h2>
					<div className="project-page__timeline">
						{project.devlog.map((entry, index) => (
							<div key={index} className="project-page__timeline-entry">
								<div className="project-page__timeline-marker">
									<span className="project-page__timeline-number">
										{project.devlog.length - index}
									</span>
								</div>
								<div className="project-page__timeline-card">
									<div className="project-page__timeline-date">{formatDevlogDate(entry.date)}</div>
									<h4 className="project-page__timeline-title">{entry.title}</h4>
									<p className="project-page__timeline-content">{entry.content}</p>
								</div>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
}
