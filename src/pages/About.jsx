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
//  Updated:      2026-03-19
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useState } from 'react';
import { goodMusic, goodGameMusic } from '@/extras/musicLinks';
import './About.scss';

function pickRandom(list, exclude = null) {
	const filtered = exclude !== null ? list.filter((x) => x !== exclude) : list;
	return filtered[Math.floor(Math.random() * filtered.length)];
}

/**
 * Get age (in years) from a specific birth date.
 */
function getAge(birthDate) {
	return Math.floor((Date.now() - new Date(birthDate).getTime()) / 31557600000);
}

export default function About() {
	const age = getAge('1988-01-05');
	const [goodMusicUrl, setGoodMusicUrl] = useState(() => pickRandom(goodMusic));
	const [gameMusicUrl, setGameMusicUrl] = useState(() => pickRandom(goodGameMusic));

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
			</div>

			{/* =================== ABOUT THIS WEBSITE =================== */}
			<section>
				<h2>About this website</h2>
				<p>
					This website is a little digital garden of my own within the cyberspace. It also serves as my
					personal portfolio and blog. The website is based on my own custom codebase that works on
					markdown-driven content.
				</p>
				<p>This website uses no cookies, stores exactly 1 bit of data*, and has 0 (zero) ads.</p>
				<p>
					The full source for this website is available on{' '}
					<a
						href="https://github.com/metayeti/metayeti.net"
						className="external"
						target="_blank"
						rel="noreferrer"
					>
						GitHub
					</a>
					.
				</p>
				<p>
					While you&apos;re here, you can check out my <a href="/blog">blog</a> or take a look at the{' '}
					<a href="/projects">projects</a> page to see what I&apos;ve been working on.
				</p>
				<p className="about-page__footnote">
					* Technically a single character &mdash; <code>1</code> or <code>0</code>, indicating whether or not
					light mode is on.
				</p>
			</section>

			{/* =================== RANDOM FACTOIDS =================== */}
			<section>
				<h2>Random factoids</h2>
				<div className="about-page__factoids">
					<ul>
						<li>
							<span className="about-page__factoid-label">Home planet</span>
							<span className="about-page__factoid-value">Earth</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Home country</span>
							<span className="about-page__factoid-value">Slovenia</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Current age</span>
							<span className="about-page__factoid-value">{age}</span>
						</li>
						<li>
							<span className="about-page__factoid-label">
								Favorite videogames
								<img
									className="about-page__blooguard"
									src="/content/static/images/blooguard.gif"
									alt="Blooguard"
								/>
							</span>
							<span className="about-page__factoid-value">
								<span className="about-page__flavor-text">Commander Keen</span>, Quake, Command &amp;
								Conquer, Fallout 1, WoW Classic
							</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite music</span>
							<span className="about-page__factoid-value">
								I love all{' '}
								<a
									href={goodMusicUrl}
									className="external"
									target="_blank"
									rel="noreferrer"
									onClick={() => setGoodMusicUrl(pickRandom(goodMusic, goodMusicUrl))}
								>
									good music
								</a>{' '}
								and I have a special place in my heart for{' '}
								<a
									href={gameMusicUrl}
									className="external"
									target="_blank"
									rel="noreferrer"
									onClick={() => setGameMusicUrl(pickRandom(goodGameMusic, gameMusicUrl))}
								>
									videogame music
								</a>
							</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite colors</span>
							<span className="about-page__factoid-value">
								<span className="about-page__color-box" style={{ backgroundColor: '#77776b' }} />,{' '}
								<span className="about-page__color-box" style={{ backgroundColor: '#47d6ab' }} /> and{' '}
								<span className="about-page__color-box" style={{ backgroundColor: '#645892' }} />
							</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite editors</span>
							<span className="about-page__factoid-value">
								<a href="https://www.vim.org/" className="external" target="_blank" rel="noreferrer">
									Vim
								</a>
								,{' '}
								<a
									href="https://code.visualstudio.com/"
									className="external"
									target="_blank"
									rel="noreferrer"
								>
									VS Code
								</a>
								,{' '}
								<a
									href="https://rizonesoft.com/downloads/notepad3/"
									className="external"
									target="_blank"
									rel="noreferrer"
								>
									Notepad3
								</a>
							</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite programming languages</span>
							<span className="about-page__factoid-value">C++, JavaScript</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite operating systems</span>
							<span className="about-page__factoid-value">
								<a
									href="https://winworldpc.com/product/ms-dos/622"
									className="external"
									target="_blank"
									rel="noreferrer"
								>
									MS-DOS 6.22
								</a>
								,{' '}
								<a
									href="https://winworldpc.com/product/windows-98/98-second-edition"
									className="external"
									target="_blank"
									rel="noreferrer"
								>
									Windows 98
								</a>{' '}
								(with{' '}
								<a
									href="https://winworldpc.com/product/plus/1998"
									className="external"
									target="_blank"
									rel="noreferrer"
								>
									Plus!
								</a>
								), most flavors of{' '}
								<a href="https://www.linux.org/" className="external" target="_blank" rel="noreferrer">
									Linux
								</a>
							</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Personal idols</span>
							<span className="about-page__factoid-value">
								John Romero, John Carmack, Chris Sawyer, that guy from Spiderweb Software
							</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite composers</span>
							<span className="about-page__factoid-value">Frank Klepacki, Glenn Stafford</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Personal heroes</span>
							<span className="about-page__factoid-value">Bugs Bunny, Asterix</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite authors</span>
							<span className="about-page__factoid-value">
								Roald Dahl, Frank Herbert, Terry Pratchett
							</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite scientists</span>
							<span className="about-page__factoid-value">Freeman Dyson, Richard Feynman</span>
						</li>
						<li>
							<span className="about-page__factoid-label">Favorite philosophers</span>
							<span className="about-page__factoid-value">Alan Watts, Bernardo Kastrup</span>
						</li>
					</ul>
				</div>
			</section>

			{/* =================== SKILLS =================== */}
			<section>
				<h2>Skills</h2>

				<h3>Programming</h3>
				<p>
					I started programming at an early age of about 9. The very first thing I remember is trying to
					figure out how timers work in{' '}
					<a
						href="https://winworldpc.com/product/microsoft-visual-bas/30"
						className="external"
						target="_blank"
						rel="noreferrer"
					>
						Visual Basic 3
					</a>
					. Later on, I weaved my way through VB5 and 6, then C, Pascal, and finally C++, C#, Java, Python,
					PHP, JavaScript and many others.
				</p>
				<img src="/content/static/images/vb3.png" className="bordered" alt="VB3" />
				<p className="caption">Visual Basic 3 - my earliest programming memory.</p>
				<p>
					Throughout my programming journey, I&apos;ve explored a wide range of technologies, methodologies,
					frameworks, computer science concepts, mathematics, and related fields.
				</p>
				<p>
					My favorite programming language is C++ with its raw power, expressivity and rock-like stability. My
					second favorite programming language is JavaScript. It&apos;s moderately high level but remains
					eloquent in its simplicity, yet highly expressive.
				</p>
				<p>
					I like{' '}
					<a
						href="https://en.wikipedia.org/wiki/Open-source_software"
						className="external"
						target="_blank"
						rel="noreferrer"
					>
						open source software
					</a>
					. You can check out some of my projects on{' '}
					<a href="https://github.com/metayeti" className="external" target="_blank" rel="noreferrer">
						GitHub
					</a>
					.
				</p>

				<h3>Human languages</h3>
				<p>As an aspiring member of the human species, I&apos;ve learned some human languages.</p>
				<ul className="list">
					<li>Slovenian, my mother tongue. As perplexing as it is beautiful.</li>
					<li>
						Serbo-Croatian, my 2nd language, I rarely use it but I understand it more or less flawlessly.
					</li>
					<li>English, my 3rd language. I would rate my level as advanced.</li>
				</ul>
				<p className="about-page__aside">
					My attempts to learn German have been less than fruitful so far, although Duolingo had successfully
					trained me to be able to ask for the whereabout of horses, should I ever encounter a situation in
					which that would become a pressing concern. My attempts to learn Russian have been similar, and I
					assure you I&apos;m capable of asking for the whereabouts of horses in Russian as well. I&apos;m now
					trying to learn Japanese. I have not learned how to ask for the whereabouts of horses in Japanese
					just yet, but I expect to be able to discuss it fluently soon.
				</p>

				<h3>Art &amp; Music</h3>
				<p>
					I&apos;ve been interested in all manners of visual design ever since I can remember. In the very
					early days I used to make interfaces in Visual Basic just for fun. In recent times I mostly work
					with web interfaces.
				</p>
				<p>
					I have always been interested in art and music. I tried to learn the guitar at an early age (and
					persisted for quite a while). I&apos;ve been interested in drawing since I can remember, although
					it&apos;s only the last decade or so when I took it upon myself to get good enough at it to be able
					to use it for higher goals. For games, I decided to focus mostly on pixel art as that&apos;s my
					favorite graphical style (no doubt inspired by the games I used to play).
				</p>
				<img
					className="about-page__pixelated"
					style={{ width: '420px' }}
					src="/content/static/images/zakk.png"
					alt="ZAKK"
				/>
				<p className="caption">
					This guy&apos;s name is Zakk. I made this titlescreen for a demo game that remains unreleased.
				</p>
				<img className="about-page__pixelated" src="/content/static/images/zakk_sprite.gif" alt="ZAKK walk" />
				<p className="caption">Zakk doin&apos; the walk. Look at him go!</p>
				<p>
					Music-wise, I&apos;ve been getting better at composing my own for my game projects. I&apos;ve used a
					number of DAWs over the years, my current favorite is{' '}
					<a
						href="https://www.image-line.com/fl-studio"
						className="external"
						target="_blank"
						rel="noreferrer"
					>
						FL Studio
					</a>
					. You can listen to some of my music on{' '}
					<a href="https://soundcloud.com/metayeti" className="external" target="_blank" rel="noreferrer">
						SoundCloud
					</a>
					.
				</p>
				<div>
					<audio controls src="/content/static/audio/game_track.mp3" />
				</div>
				<p className="caption">A basic game track I&apos;ve composed.</p>
			</section>

			{/* =================== CONTACT =================== */}
			<section>
				<h2>Contact</h2>
				<p>
					For business inquiries, please contact me at{' '}
					<a href="mailto:metayetidev@gmail.com" className="email nocaps">
						metayetidev@gmail.com
					</a>
					.
				</p>
			</section>
		</div>
	);
}
