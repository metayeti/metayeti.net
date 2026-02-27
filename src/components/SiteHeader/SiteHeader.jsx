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
//  File:         components/SiteHeader/SiteHeader.jsx
//  Description:  Site header component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-10
//  Updated:      n/a
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import './SiteHeader.scss';
import HeaderBanner from './HeaderBanner';
import SocialNavBar from './SocialNavBar';

function SiteHeader() {
	return (
		/*
		<header className="header">
			<div className="header__banner">
				<div className="header__banner-background pixelated"></div>
			</div>
		</header>
		*/
		<header className="site-header">
			<HeaderBanner />
			<SocialNavBar />
		</header>
	);
}

export default SiteHeader;
