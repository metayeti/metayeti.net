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
//  File:         components/SiteHeader/SiteHeaderSocial.jsx
//  Description:  Site header social component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-27
//  Updated:      2026-02-28
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import IconGitHub from '../icons/IconGitHub';
import './SiteHeaderSocial.scss';

export default function SiteHeaderSocial() {
	return (
		<div className="site-header-social">
			<div className="site-header-social__links wrapped">
				<a href="https://github.com/metayeti" target="_blank" className="site-header-social__link">
					<IconGitHub />
				</a>
			</div>
		</div>
	);
}
