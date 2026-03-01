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
//  Updated:      2026-03-01
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
		</div>
	);
}
