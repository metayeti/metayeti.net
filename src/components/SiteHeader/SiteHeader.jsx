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
//  Updated:      2026-03-01
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
			<SiteHeaderBanner />
			<SiteHeaderSocial />
			<SiteHeaderNav />
		</>
	);
}
