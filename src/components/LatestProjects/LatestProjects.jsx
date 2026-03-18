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
//  Updated:      2026-03-18
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { Link } from 'react-router-dom';

import './LatestProjects.scss';

const MOCK_PROJECTS = [
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
];

export default function LatestProjects() {
	const projectsToShow = 3;

	return (
		<div className="latest-projects">
			<div className="latest-projects__stack">
				{MOCK_PROJECTS.slice(0, projectsToShow).map((project, index) => (
					<Link
						key={project.slug}
						to={`/projects/${project.slug}`}
						className="latest-projects__card"
						style={{ '--card-index': index }}
					>
						<div className="latest-projects__card-img" />
						<div className="latest-projects__card-body">
							<h4 className="latest-projects__card-title">{project.title}</h4>
							<p className="latest-projects__card-desc">{project.description}</p>
							<div className="latest-projects__card-tags">
								{project.tags.map((tag) => (
									<span key={tag} className="latest-projects__card-tag">
										{tag}
									</span>
								))}
							</div>
						</div>
					</Link>
				))}
			</div>
			{MOCK_PROJECTS.length > projectsToShow && (
				<div className="latest-projects__more">
					<Link to="/projects">More &middot;&middot;&middot;</Link>
				</div>
			)}
		</div>
	);
}
