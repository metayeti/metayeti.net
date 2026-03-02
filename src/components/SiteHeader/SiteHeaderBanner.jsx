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
//  File:         components/SiteHeader/SiteHeaderBanner.jsx
//  Description:  Site header banner component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-27
//  Updated:      2026-03-02
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import './SiteHeaderBanner.scss';

function getTimeOfDay() {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) {
		return 'morning';
	} else if (hour >= 12 && hour < 17) {
		return 'midday';
	} else if (hour >= 17 && hour < 21) {
		return 'evening';
	} else {
		return 'night';
	}
}

export default function SiteHeaderBanner() {
	const timeOfDay = getTimeOfDay();
	return (
		<div className="site-header-banner">
			<div
				className={`site-header-banner__background site-header-banner__background--${timeOfDay} pixelated`}
			></div>
			<div className="site-header-banner__branding wrapped">
				<div className="site-header-banner__branding-yeti pixelated"></div>
				{/*<h1 className="site-header-banner__branding-title">metayeti.net</h1>*/}
				<h1 className="site-header-banner__branding-title">
					<span className="site-header-banner__branding-hl">.&#47;meta</span>
					<span>yeti.net_</span>
				</h1>
			</div>
			<div className="site-header-banner__scanlines"></div>
		</div>
	);
}
