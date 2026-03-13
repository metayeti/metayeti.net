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
//  Updated:      2026-03-13
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import LatestPosts from '@/components/LatestPosts';
import './Home.scss';

export default function Home() {
	return (
		<div className="home-page wrapped">
			<div className="home-page__yeti"></div>
			<section>
				<h2>Hi! I'm Danijel.</h2>
				<p>Welcome to my humble online abode.</p>
				<p>
					I'm a game developer from Slovenia. I make{' '}
					<a data-label="videogames" href="#">
						videogames
					</a>
					<br className="responsive-break" /> and{' '}
					<a data-label="things that go whirrrr" href="#">
						things that go whirrrr
					</a>
					. I sometimes write some <br className="responsive-break" />
					<a data-label="nonsense on my blog" href="#">
						nonsense on my blog
					</a>
					. I like snow leopards, coding and tea.
				</p>
				<p>Enjoy your stay!</p>
			</section>
			<section>
				<h2>Latest Posts</h2>
				<LatestPosts />
			</section>
			<section>
				<h2>Latest Projects</h2>
			</section>
		</div>
	);
}
