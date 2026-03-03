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
//  Updated:      2026-03-03
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import './Home.scss';

export default function Home() {
	return (
		<div className="home-page wrapped">
			<div className="home-page__yeti"></div>
			<section>
				<h2>Hi! I'm Danijel.</h2>
				<p>Welcome to my humble online abode.</p>
				<p>
					I'm a game developer from Slovenia. I make games
					<br />
					and things that go whirrrr. I sometimes write some
					<br />
					nonsense on my blog. I like snow leopards and tea.
				</p>
				<p>Enjoy your stay!</p>
			</section>
			<section>
				<h2>Latest Posts</h2>
			</section>
			<section>
				<h2>Latest Projects</h2>
			</section>
		</div>
	);
}
