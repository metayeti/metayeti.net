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
//  File:         components/SiteHeader/SiteHeaderNav.jsx
//  Description:  Site header navigation component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-27
//  Updated:      2026-03-03
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import RockerSwitch from '@/components/ui/RockerSwitch';
import IconFlame from '@/components/icons/IconFlame';
import './SiteHeaderNav.scss';

const LINKS = [
	{ to: '/', label: 'Home' },
	{ to: '/projects', label: 'Projects' },
	{ to: '/blog', label: 'Blog' },
	{ to: '/about', label: 'About' },
];

function NavLinkButton({ to, label }) {
	const [displayText, setDisplayText] = useState(label);
	const [isTyping, setIsTyping] = useState(false);
	const animationTimeoutRef = useRef(null);
	const charIndexRef = useRef(0);

	useEffect(() => {
		// effect setup (empty here)
		return () => {
			// effect cleanup
			if (animationTimeoutRef.current) {
				clearTimeout(animationTimeoutRef.current);
			}
		};
	}, []);

	const handleMouseEnter = () => {
		setIsTyping(true);

		if (animationTimeoutRef.current) {
			clearTimeout(animationTimeoutRef.current);
		}

		charIndexRef.current = 0;

		// prepare for typing by clearing text
		setDisplayText('');
		// start animation
		typeCharacters();
	};

	const typeCharacters = () => {
		const chars = label.split('');
		let index = 0;

		const typeNext = () => {
			if (index < chars.length) {
				setDisplayText(chars.slice(0, index + 1).join(''));
				index++;
				animationTimeoutRef.current = setTimeout(typeNext, 70);
			} else {
				// typing complete
				// cancel anim after a timeout (friendlier for mobile users)
				setTimeout(() => {
					setIsTyping(false);
					setDisplayText(label);
				}, 1200);
			}
		};

		typeNext();
	};

	const handleMouseLeave = () => {
		setIsTyping(false);
		if (animationTimeoutRef.current) {
			clearTimeout(animationTimeoutRef.current);
		}
		setDisplayText(label);
	};

	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) => clsx('site-header-nav__link', isActive && 'site-header-nav__link--active')}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<span className="site-header-nav__link-text-container">
					<span className="site-header-nav__link-text--static" aria-hidden="true">
						{label}
					</span>
					<span className={clsx('site-header-nav__link-text')}>
						{displayText}
						{isTyping && <span className="site-header-nav__link-caret">_</span>}
					</span>
				</span>
			</NavLink>
		</li>
	);
}

export default function SiteHeaderNav() {
	const [isLit, setIsLit] = useState(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('lightmode');
			return saved === '1';
		}
		return false;
	});

	useEffect(() => {
		document.documentElement.classList.toggle('lightmode', isLit);
		localStorage.setItem('lightmode', isLit ? '1' : '0');
	}, [isLit]);

	return (
		<nav className="site-header-nav">
			<div className="site-header-nav__main wrapped wrapped--sm-pad-right-only">
				<div className="site-header-nav__buttons">
					<ul className="site-header-nav__links">
						{LINKS.map((link) => (
							<NavLinkButton key={link.to} to={link.to} label={link.label} />
						))}
					</ul>
				</div>
				<div className="site-header-nav__side">
					<div className={clsx('site-header-nav__side-icon', isLit && 'site-header-nav__side-icon--active')}>
						<IconFlame />
					</div>
					<div className="site-header-nav__side-switch">
						<RockerSwitch initialToggled={isLit} onSwitchToggle={setIsLit} />
					</div>
				</div>
			</div>
		</nav>
	);
}
