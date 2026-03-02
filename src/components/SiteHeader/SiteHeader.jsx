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
//  Updated:      2026-03-02
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import SiteHeaderBanner from './SiteHeaderBanner';
import SiteHeaderSocial from './SiteHeaderSocial';
import SiteHeaderNav from './SiteHeaderNav';

import './SiteHeader.scss';

export default function SiteHeader() {
	return (
		<>
			<header class="site-header">
				<SiteHeaderBanner />
				<SiteHeaderSocial />
			</header>
			{/* NOTE: The main navigation component has to be outside of
			    <header> so it can use sticky positioning. */}
			<SiteHeaderNav />
		</>
	);
}
