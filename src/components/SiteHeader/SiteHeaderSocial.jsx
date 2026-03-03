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
//  File:         src/components/SiteHeader/SiteHeaderSocial.jsx
//  Description:  Site header social component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-27
//  Updated:      2026-03-03
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import IconGitHub from '@/components/icons/IconGitHub';
import IconFacebook from '@/components/icons/IconFacebook';
import IconLinkedIn from '@/components/icons/IconLinkedIn';
import IconX from '@/components/icons/IconX';
import IconSteam from '@/components/icons/IconSteam';
import IconItchIo from '@/components/icons/IconItchIo';
import IconYouTube from '@/components/icons/IconYouTube';
import IconSoundCloud from '@/components/icons/IconSoundCloud';

import './SiteHeaderSocial.scss';

export default function SiteHeaderSocial() {
	return (
		<nav className="site-header-social">
			<div className="site-header-social__links wrapped wrapped--sm-pad">
				<a href="https://github.com/metayeti" target="_blank" className="site-header-social__link">
					<IconGitHub />
					<div className="site-header-social__link-tooltip">GitHub</div>
				</a>
				<a
					href="https://www.facebook.com/profile.php?id=100095050669741"
					target="_blank"
					className="site-header-social__link"
				>
					<IconFacebook />
					<div className="site-header-social__link-tooltip">Facebook</div>
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconLinkedIn />
					<div className="site-header-social__link-tooltip">LinkedIn</div>
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconX />
					<div className="site-header-social__link-tooltip">X</div>
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconSteam />
					<div className="site-header-social__link-tooltip">Steam</div>
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconItchIo />
					<div className="site-header-social__link-tooltip">itch.io</div>
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconYouTube />
					<div className="site-header-social__link-tooltip">YouTube</div>
				</a>
				<a href="#" target="_blank" className="site-header-social__link">
					<IconSoundCloud />
					<div className="site-header-social__link-tooltip site-header-social__link-tooltip--last">
						SoundCloud
					</div>
				</a>
			</div>
		</nav>
	);
}
