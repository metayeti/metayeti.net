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
//  File:         components/SiteHeader/HeaderBanner.jsx
//  Description:  Header banner component.
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

import './HeaderBanner.scss';

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

function HeaderBanner() {
	const timeOfDay = getTimeOfDay();
	return (
		<div className="header-banner">
			<div className={`header-banner__background header-banner__background--${timeOfDay} pixelated`}></div>
		</div>
	);
}

export default HeaderBanner;
