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

				{/* -- WEBSITE (large) -- */}
				<div className="about-page__card about-page__card--website">
					<h3>About this website</h3>
					<p>
						This website is a little digital garden of my own within the cyberspace. It also serves as my
						personal portfolio and blog. The website is based on my own custom codebase that works on
						markdown-driven content.
					</p>
					<p>
						This website uses no cookies, stores exactly 1 bit of data*, and has 0 (zero) ads. The full
						source is available on{' '}
						<a
							href="https://github.com/metayeti/metayeti.net"
							target="_blank"
							rel="noopener noreferrer"
							className="external"
						>
							GitHub
						</a>
						.
					</p>
					<p className="about-page__footnote">
						* Technically a single character &mdash; <code>1</code> or <code>0</code>, indicating whether or
						not light mode is on.
					</p>
				</div>

				{/* -- COLORS (small) -- */}
				<div className="about-page__card about-page__card--colors">
					<h4>Favorite colors</h4>
					<div className="about-page__color-swatches">
						<span className="about-page__swatch" style={{ '--swatch-color': '#77776b' }} />
						<span className="about-page__swatch" style={{ '--swatch-color': '#47d6ab' }} />
						<span className="about-page__swatch" style={{ '--swatch-color': '#645892' }} />
					</div>
				</div>

				{/* -- VIDEOGAMES (large) -- */}
				<div className="about-page__card about-page__card--games">
					<h3>Videogames</h3>
					<p>
						<span className="about-page__flavor">Commander Keen</span>, Quake, Command &amp; Conquer,
						Fallout 1, WoW Classic any many more.
					</p>
					<img
						className="about-page__blooguard pixelated"
						src="/content/static/images/blooguard.gif"
						alt="Blooguard"
					/>
				</div>

				{/* -- MUSIC (medium) -- */}
				<div className="about-page__card about-page__card--music">
					<h4>Music</h4>
					<p>
						I love all good music and I have a special place in my heart for videogame music. My favorite
						composers are Frank Klepacki and Glenn Stafford.
					</p>
					<audio controls src="/content/static/audio/game_track.mp3" />
					<p className="about-page__caption">A game track I composed.</p>
				</div>

				{/* -- HEROES (small) -- */}
				<div className="about-page__card about-page__card--heroes">
					<h4>Personal heroes</h4>
					<p>Bugs Bunny, Asterix, Zvitorepec</p>
				</div>

				{/* -- IDOLS (small) -- */}
				<div className="about-page__card about-page__card--idols">
					<h4>Personal idols</h4>
					<p>John Romero, John Carmack, Chris Sawyer, that guy from Spiderweb Software</p>
				</div>

				{/* -- PROGRAMMING LANGS (medium) -- */}
				<div className="about-page__card about-page__card--langs">
					<h4>Favorite programming languages</h4>
					<p>C++</p>
					<p>JavaScript</p>
				</div>

				{/* -- OS (medium) -- */}
				<div className="about-page__card about-page__card--os">
					<h4>Favorite operating systems</h4>
					<p>
						<a href="https://winworldpc.com/product/ms-dos/622" target="_blank" rel="noopener noreferrer">
							MS-DOS 6.22
						</a>
						,{' '}
						<a
							href="https://winworldpc.com/product/windows-98/98-second-edition"
							target="_blank"
							rel="noopener noreferrer"
						>
							Windows 98
						</a>{' '}
						(with{' '}
						<a href="https://winworldpc.com/product/plus/1998" target="_blank" rel="noopener noreferrer">
							Plus!
						</a>
						), most flavors of{' '}
						<a href="https://www.linux.org/" target="_blank" rel="noopener noreferrer">
							Linux{' '}
							<img
								className="about-page__inline-icon"
								alt="Linux"
								src="/content/static/images/linux.png"
							/>
						</a>
					</p>
				</div>

				{/* -- PROGRAMMING JOURNEY (large) -- */}
				<div className="about-page__card about-page__card--prog-journey">
					<h3>Programming</h3>
					<p>
						I started programming at an early age of about 9. The very first thing I remember is trying to
						figure out how timers work in{' '}
						<a
							href="https://winworldpc.com/product/microsoft-visual-bas/30"
							className="external"
							target="_blank"
							rel="noopener noreferrer"
						>
							Visual Basic 3
						</a>
						. Later on, I weaved my way through VB5 and 6, then C, Pascal, and finally C++, C#, Java,
						Python, PHP, JavaScript and many others.
					</p>
					{/* <div className="about-page__prog-visual">
						<img className="bordered" src="/content/static/images/vb3.png" alt="VB3" />
						<p className="about-page__caption">Visual Basic 3 &mdash; my earliest programming memory.</p>
					</div> */}
					<p>
						Throughout my programming journey, I&apos;ve explored a wide range of technologies,
						methodologies, frameworks, computer science concepts, mathematics, and related fields.
					</p>
				</div>

				{/* -- HUMAN LANGUAGES (large) -- */}
				<div className="about-page__card about-page__card--languages">
					<h3>Human languages</h3>
					<p>As an aspiring member of the human species, I&apos;ve learned some human languages.</p>
					<ul className="about-page__list">
						<li>Slovenian, my mother tongue. As perplexing as it is beautiful.</li>
						<li>
							Serbo-Croatian, my 2nd language, I rarely use it but I understand it more or less
							flawlessly.
						</li>
						<li>English, my 3rd language. I would rate my level as advanced.</li>
					</ul>
					<p className="about-page__aside">
						My attempts to learn German have been less than fruitful so far, although Duolingo had
						successfully trained me to be able to ask for the whereabouts of horses, should I ever encounter
						a situation in which that would become a pressing concern. My attempts to learn Russian have
						been similar, even though I assure you I&apos;m capable of asking for the whereabouts of horses
						in Russian as well. I&apos;m now trying to learn Japanese. I have not learned how to ask for the
						whereabouts of horses in Japanese just yet, but I expect to be able to discuss it fluently soon.
					</p>
				</div>

				{/* -- TECH PHILOSOPHY (medium) -- */}
				<div className="about-page__card about-page__card--tech-phil">
					<h4>Tech Philosophy</h4>
					<p>
						My favorite programming language is C++ with its raw power, expressivity and rock-like
						stability. My second favorite programming language is JavaScript. It&apos;s moderately high
						level but remains eloquent in its simplicity, yet highly expressive.
					</p>
					<p>
						I like{' '}
						<a
							href="https://en.wikipedia.org/wiki/Open-source_software"
							className="external"
							target="_blank"
							rel="noopener noreferrer"
						>
							open source
						</a>
						. You can check out some of my projects on{' '}
						<a
							href="https://github.com/metayeti"
							className="external"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
						.
					</p>
				</div>

				{/* -- ART (medium/tall) -- */}
				<div className="about-page__card about-page__card--art">
					<h3>Art &amp; Music</h3>
					<p>
						I&apos;ve been interested in all manners of visual design ever since I can remember. In the very
						early days I used to make interfaces in Visual Basic just for fun. In recent times I mostly work
						with web interfaces.
					</p>
					<div className="about-page__art-showcase">
						<div>
							<img
								className="about-page__skills-img about-page__skills-img--zakk pixelated"
								src="/content/static/images/zakk.png"
								alt="ZAKK"
							/>
							<p className="about-page__caption">This guy's name is Zakk.</p>
						</div>
						<div>
							<img
								className="about-page__skills-img pixelated"
								src="/content/static/images/zakk_sprite.gif"
								alt="ZAKK walk"
							/>
							<p className="about-page__caption">Doin' the walk.</p>
						</div>
					</div>
					<p>
						I have always been interested in art and music. I decided to focus mostly on pixel art as
						that&apos;s my favorite graphical style.
					</p>
				</div>

				{/* -- MUSIC PROD (medium) -- */}
				<div className="about-page__card about-page__card--music-prod">
					<h4>Music Production</h4>
					<p>
						Music-wise, I&apos;ve used a number of DAWs over the years, my current favorite is{' '}
						<a
							href="https://www.image-line.com/fl-studio"
							className="external"
							target="_blank"
							rel="noopener noreferrer"
						>
							FL Studio
						</a>
						. You can listen to some of my music on{' '}
						<a
							href="https://soundcloud.com/metayeti"
							className="external"
							target="_blank"
							rel="noopener noreferrer"
						>
							SoundCloud
						</a>
						.
					</p>
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
