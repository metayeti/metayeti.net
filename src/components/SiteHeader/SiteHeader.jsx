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
//  Updated:      2026-02-27
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import './SiteHeader.scss';
import SiteHeaderBanner from './SiteHeaderBanner';
import SiteHeaderSocial from './SiteHeaderSocial';
import SiteHeaderNav from './SiteHeaderNav';

function SiteHeader() {
	return (
		<header className="site-header">
			<SiteHeaderBanner />
			<SiteHeaderSocial />
			<SiteHeaderNav />
		</header>
	);
}

export default SiteHeader;
