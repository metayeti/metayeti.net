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
//  File:         src/routes/Home.jsx
//  Description:  Home page component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-01
//  Updated:      2026-03-20
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { Link } from 'react-router-dom';
import LatestPosts from '@/components/LatestPosts';
import LatestProjects from '@/components/LatestProjects';

import './Home.scss';

export default function Home() {
	return (
		<div className="home-page wrapped">
			<div className="home-page__yeti"></div>
			<section>
				<h2>Hi!</h2>
				<p>Ahoy there! I'm Danijel. Welcome to my online abode.</p>
				<p>
					I'm a game developer from Slovenia. I make <Link to="/projects">videogames</Link>
					<br className="responsive-break" /> and{' '}
					<a
						href="https://github.com/metayeti"
						className="external"
						target="_blank"
						rel="noopener noreferrer"
					>
						things that go whirrrr
					</a>
					. I sometimes write some <br className="responsive-break" />
					<Link to="/blog">nonsense on my blog</Link>. I like snow leopards, coding and tea.
				</p>
				<p>Enjoy your stay!</p>
			</section>
			<section>
				<h2>Latest Posts</h2>
				<LatestPosts />
			</section>
			<section>
				<h2>Latest Projects</h2>
				<LatestProjects />
			</section>
		</div>
	);
}
