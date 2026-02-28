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
import IconFacebook from '../icons/IconFacebook';
import IconLinkedIn from '../icons/IconLinkedIn';
import IconX from '../icons/IconX';
import IconSteam from '../icons/IconSteam';
import IconItchIo from '../icons/IconItchIo';
import IconYouTube from '../icons/IconYouTube';
import IconSoundCloud from '../icons/IconSoundCloud';
import './SiteHeaderSocial.scss';

export default function SiteHeaderSocial() {
	return (
		<div className="site-header-social">
			<div className="site-header-social__links wrapped">
				<a href="https://github.com/metayeti" target="_blank" className="site-header-social__link">
					<IconGitHub />
				</a>
				<a
					href="https://www.facebook.com/profile.php?id=100095050669741"
					target="_blank"
					className="site-header-social__link"
				>
					<IconFacebook />
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconLinkedIn />
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconX />
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconSteam />
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconItchIo />
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconYouTube />
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconSoundCloud />
				</a>
			</div>
		</div>
	);
}
