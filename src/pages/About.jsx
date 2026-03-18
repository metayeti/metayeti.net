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
//  File:         src/routes/About.jsx
//  Description:  About page component.
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

import './About.scss';

/**
 * Get age (in years) from a specific birth date.
 */
function getAge(birthDate) {
	return Math.floor((Date.now() - new Date(birthDate).getTime()) / 31557600000);
}

export default function About() {
	const age = getAge('1988-01-05');

	return (
		<div className="about-page wrapped">
			{/* =================== BENTO GRID =================== */}
			<div className="about-page__bento">
				{/* -- INTRO (large) -- */}
				<div className="about-page__card about-page__card--intro">
					<h2>Hi, I&apos;m Danijel</h2>
					<p>
						I&apos;m a programmer with a passion for videogames. I combine my skills to create games,
						software, websites and other kinds of interactive digital content.
					</p>
					<p>My main interests in life are programming, mathematics, science, philosophy, music and art.</p>
					<div className="about-page__card-meta">
						<span className="about-page__tag">Slovenia</span>
						<span className="about-page__tag">Age {age}</span>
						<span className="about-page__tag">Planet Earth</span>
					</div>
				</div>

				{/* -- PHOTO (large) -- */}
				<div className="about-page__card about-page__card--photo">
					<img src="/content/static/images/me.jpg" alt="me" />
				</div>

				{/* -- CONTACT (wide) -- */}
				<div className="about-page__card about-page__card--contact">
					<h3>Contact</h3>
					<p>
						For business inquiries, please contact me at{' '}
						<a href="mailto:metayetidev@gmail.com" className="email nocaps">
							metayetidev@gmail.com
						</a>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
