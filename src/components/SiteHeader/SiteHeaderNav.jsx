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
//  Updated:      2026-03-01
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import RockerSwitch from '@/components/ui/RockerSwitch';
import IconFlame from '@/components/icons/IconFlame';
import './SiteHeaderNav.scss';

export default function SiteHeaderNav() {
	const [isLit, setIsLit] = useState(false);

	const getLinkClassName = ({ isActive }) =>
		clsx('site-header-nav__link', isActive && 'site-header-nav__link--active');

	return (
		<nav className="site-header-nav">
			<div className="site-header-nav__main wrapped wrapped--no-pad">
				<div className="site-header-nav__buttons">
					<ul className="site-header-nav__links">
						<li>
							<NavLink to="/" className={getLinkClassName}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink to="/projects" className={getLinkClassName}>
								Projects
							</NavLink>
						</li>
						<li>
							<NavLink to="/blog" className={getLinkClassName}>
								Blog
							</NavLink>
						</li>
						<li>
							<NavLink to="/about" className={getLinkClassName}>
								About
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="site-header-nav__side">
					<div className={clsx('site-header-nav__side-icon', isLit && 'site-header-nav__side-icon--active')}>
						<IconFlame />
					</div>
					<div className="site-header-nav__side-switch">
						<RockerSwitch onSwitchToggle={setIsLit} />
					</div>
				</div>
			</div>
		</nav>
	);
}
