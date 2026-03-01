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

import { Link } from 'react-router-dom';
import './SiteHeaderNav.scss';

export default function SiteHeaderNav() {
	return (
		<nav className="site-header-nav">
			<div className="site-header-nav__main wrapped wrapped--no-pad">
				<ul className="site-header-nav__links">
					<li>
						<Link to="/" className="site-header-nav__link">
							Home
						</Link>
					</li>
					<li>
						<Link to="/about" className="site-header-nav__link">
							About
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
