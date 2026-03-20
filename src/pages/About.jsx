import { useState, useEffect, useRef } from 'react';
import { goodMusic, goodGameMusic } from '@/extras/musicLinks';
import './About.scss';

function pickRandom(list, exclude = null) {
	const filtered = exclude !== null ? list.filter((x) => x !== exclude) : list;
	return filtered[Math.floor(Math.random() * filtered.length)];
}

function getAge(birthDate) {
	return Math.floor((Date.now() - new Date(birthDate).getTime()) / 31557600000);
}

function HexNode({ children, size = 'lg', glow, dark, className = '' }) {
	const sizeClass = `hex-node--${size}`;
	return (
		<div
			className={`hex-node ${sizeClass}${glow ? ' hex-node--glow' : ''}${dark ? ' hex-node--dark' : ''}${className ? ` ${className}` : ''}`}
		>
			<div className="hex-node__border">
				<div className="hex-node__inner">{children}</div>
			</div>
		</div>
	);
}

export default function About() {
	const age = getAge('1988-01-05');
	const [musicUrl, setMusicUrl] = useState(() => pickRandom(goodMusic));
	const [gameMusicUrl, setGameMusicUrl] = useState(() => pickRandom(goodGameMusic));
	const containerRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting) e.target.classList.add('hex--visible');
				}),
			{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
		);

		containerRef.current?.querySelectorAll('.hex-reveal').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, []);

	return (
		<div className="hex-about wrapped" ref={containerRef}>
			<div className="hex-about__scanlines" />
			<div className="hex-about__spine" />

			{/* Decorative floating hexes */}
			<div className="hex-about__deco hex-about__deco--1" />
			<div className="hex-about__deco hex-about__deco--2" />
			<div className="hex-about__deco hex-about__deco--3" />
			<div className="hex-about__deco hex-about__deco--4" />
			<div className="hex-about__deco hex-about__deco--5" />
			<div className="hex-about__deco hex-about__deco--6" />

			{/* ─── IDENTITY ─── */}
			<div className="hex-about__cluster hex-reveal">
				<HexNode size="lg" glow>
					<span className="hex-about__sys-label">SYS.IDENTITY</span>
					<h2>Danijel</h2>
					<p>
						Programmer with a passion for videogames. I build games, software, websites and interactive
						digital content.
					</p>
					<p>Core interests: programming, mathematics, science, philosophy, music &amp; art.</p>
				</HexNode>
				<div className="hex-about__branch" />
				<div className="hex-about__satellites">
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">LOC</span>
						<span className="hex-about__tag-value">Slovenia</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">AGE</span>
						<span className="hex-about__tag-value">{age}</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">ROLE</span>
						<span className="hex-about__tag-value">Developer</span>
					</HexNode>
				</div>
			</div>

			<div className="hex-about__spine-node" />

			{/* ─── PHOTO ─── */}
			<div className="hex-about__cluster hex-reveal">
				<HexNode size="photo" glow>
					<img src="/content/static/images/me.jpg" alt="me" />
				</HexNode>
			</div>

			<div className="hex-about__spine-node" />

			{/* ─── ABOUT THIS SITE ─── */}
			<div className="hex-about__cluster hex-reveal">
				<HexNode size="md" glow>
					<span className="hex-about__sys-label">NET.INFO</span>
					<h2>This Website</h2>
					<p>
						A digital garden within the cyberspace. Portfolio, blog, and markdown-driven content on a custom
						codebase.
					</p>
				</HexNode>
				<div className="hex-about__branch" />
				<div className="hex-about__satellites">
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">SRC</span>
						<span className="hex-about__tag-value">
							<a
								href="https://github.com/metayeti/metayeti.net"
								className="external"
								target="_blank"
								rel="noreferrer"
							>
								GitHub
							</a>
						</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">BLOG</span>
						<span className="hex-about__tag-value">
							<a href="/blog">Posts</a>
						</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">WORK</span>
						<span className="hex-about__tag-value">
							<a href="/projects">Projects</a>
						</span>
					</HexNode>
				</div>
			</div>

			<div className="hex-about__spine-node" />

			{/* ─── FAVORITES ─── */}
			<div className="hex-about__cluster hex-reveal">
				<HexNode size="lg" glow>
					<span className="hex-about__sys-label">FAV.DAT</span>
					<h2>Favorites</h2>
					<div className="hex-about__fav-grid">
						<div className="hex-about__fav-item">
							<span className="hex-about__fav-key">GAMES</span>
							<span className="hex-about__fav-val">
								Commander Keen, Quake, C&amp;C, Fallout&nbsp;1, WoW&nbsp;Classic
							</span>
						</div>
						<div className="hex-about__fav-item">
							<span className="hex-about__fav-key">MUSIC</span>
							<span className="hex-about__fav-val">
								All{' '}
								<a
									href={musicUrl}
									className="external"
									target="_blank"
									rel="noreferrer"
									onClick={() => setMusicUrl(pickRandom(goodMusic, musicUrl))}
								>
									good music
								</a>{' '}
								&amp;{' '}
								<a
									href={gameMusicUrl}
									className="external"
									target="_blank"
									rel="noreferrer"
									onClick={() => setGameMusicUrl(pickRandom(goodGameMusic, gameMusicUrl))}
								>
									game soundtracks
								</a>
							</span>
						</div>
						<div className="hex-about__fav-item">
							<span className="hex-about__fav-key">LANG</span>
							<span className="hex-about__fav-val">C++, JavaScript</span>
						</div>
						<div className="hex-about__fav-item">
							<span className="hex-about__fav-key">EDITORS</span>
							<span className="hex-about__fav-val">Vim, VS Code, Notepad3</span>
						</div>
						<div className="hex-about__fav-item">
							<span className="hex-about__fav-key">AUTHORS</span>
							<span className="hex-about__fav-val">Roald Dahl, Frank Herbert, Terry Pratchett</span>
						</div>
						<div className="hex-about__fav-item">
							<span className="hex-about__fav-key">IDOLS</span>
							<span className="hex-about__fav-val">John Romero, John Carmack, Chris Sawyer</span>
						</div>
					</div>
				</HexNode>
				<div className="hex-about__branch" />
				<div className="hex-about__satellites">
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">COLORS</span>
						<div className="hex-about__colors">
							<span className="hex-about__color-dot" style={{ backgroundColor: '#77776b' }} />
							<span className="hex-about__color-dot" style={{ backgroundColor: '#47d6ab' }} />
							<span className="hex-about__color-dot" style={{ backgroundColor: '#645892' }} />
						</div>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">COMPOSERS</span>
						<span className="hex-about__tag-value hex-about__tag-value--tiny">Klepacki, Stafford</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">HEROES</span>
						<span className="hex-about__tag-value hex-about__tag-value--tiny">Bugs Bunny, Asterix</span>
					</HexNode>
				</div>
			</div>

			<div className="hex-about__spine-node" />

			{/* ─── SKILLS ─── */}
			<div className="hex-about__cluster hex-reveal">
				<HexNode size="lg" glow>
					<span className="hex-about__sys-label">SKILL.LOG</span>
					<h2>Skills</h2>
					<p>
						Started programming at age 9 in Visual Basic 3. Evolved through VB5/6, C, Pascal, C++, C#, Java,
						Python, PHP, JavaScript and many others.
					</p>
					<p>
						Favorite languages: C++ for raw power, JavaScript for eloquent simplicity. Pixel art for games,
						FL Studio for composing tracks.
					</p>
				</HexNode>
				<div className="hex-about__branch" />
				<div className="hex-about__satellites">
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">ART</span>
						<span className="hex-about__tag-value">Pixel Art</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">DAW</span>
						<span className="hex-about__tag-value">FL Studio</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">OPEN SRC</span>
						<span className="hex-about__tag-value">
							<a href="https://github.com/metayeti" className="external" target="_blank" rel="noreferrer">
								GitHub
							</a>
						</span>
					</HexNode>
					<HexNode size="sm" dark>
						<span className="hex-about__tag-label">AUDIO</span>
						<span className="hex-about__tag-value">
							<a
								href="https://soundcloud.com/metayeti"
								className="external"
								target="_blank"
								rel="noreferrer"
							>
								SoundCloud
							</a>
						</span>
					</HexNode>
				</div>
			</div>

			<div className="hex-about__spine-node" />

			{/* ─── LANGUAGES ─── */}
			<div className="hex-about__cluster hex-reveal">
				<HexNode size="md">
					<span className="hex-about__sys-label">LANG.HUMAN</span>
					<h2>Languages</h2>
					<p>Slovenian &middot; Serbo-Croatian &middot; English</p>
				</HexNode>
			</div>

			<div className="hex-about__spine-node" />

			{/* ─── CONTACT ─── */}
			<div className="hex-about__cluster hex-reveal">
				<HexNode size="md" glow>
					<span className="hex-about__sys-label">COMMS.SYS</span>
					<h2>Contact</h2>
					<p>
						<a href="mailto:metayetidev@gmail.com" className="nocaps email">
							metayetidev@gmail.com
						</a>
					</p>
				</HexNode>
			</div>
		</div>
	);
}
