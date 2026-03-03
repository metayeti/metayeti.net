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
			<h2>Hi! I'm Danijel.</h2>
			<p>Welcome to my humble online abode.</p>
			<p>I'm a game developer from Slovenia.</p>
			<h2>Latest Posts</h2>
			<h2>Latest Projects</h2>
		</div>
	);
}
