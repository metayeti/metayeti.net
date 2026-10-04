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
//  File:         src/pages/Home.jsx
//  Description:  Home page component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
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
				<p>Ahoy there! I'm Danijel. Welcome to my humble online abode.</p>
				<p>
					I'm a game developer from Slovenia. I create <Link to="/projects">videogames</Link>
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
				<h2>Latest posts</h2>
				<LatestPosts />
			</section>
			<section>
				<h2>Latest projects</h2>
				<LatestProjects />
			</section>
		</div>
	);
}
