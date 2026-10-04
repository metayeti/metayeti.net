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
//  File:         src/components/SiteHeader/SiteHeader.jsx
//  Description:  Site header component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import SiteHeaderBanner from './SiteHeaderBanner';
import SiteHeaderSocial from './SiteHeaderSocial';
import SiteHeaderNav from './SiteHeaderNav';

export default function SiteHeader() {
	return (
		<>
			<header className="site-header">
				<SiteHeaderBanner />
				<SiteHeaderSocial />
			</header>
			{/* NOTE: The main navigation component has to be outside of
			    <header> so it can use sticky positioning. */}
			<SiteHeaderNav />
		</>
	);
}
