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
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import IconLinkedIn from '@/components/icons/IconLinkedIn';
import IconX from '@/components/icons/IconX';
import IconGitHub from '@/components/icons/IconGitHub';
import IconSteam from '@/components/icons/IconSteam';
import IconItchIo from '@/components/icons/IconItchIo';
import IconYouTube from '@/components/icons/IconYouTube';
import IconSoundCloud from '@/components/icons/IconSoundCloud';
import IconEmail from '@/components/icons/IconEmail';

import './SiteHeaderSocial.scss';

export default function SiteHeaderSocial() {
	return (
		<nav className="site-header-social">
			<div className="site-header-social__links wrapped wrapped--sm-pad">
				<a
					href="https://x.com/metayetidev"
					className="site-header-social__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconX />
					<div className="site-header-social__link-tooltip">X</div>
				</a>
				<a
					href="https://github.com/metayeti"
					className="site-header-social__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconGitHub />
					<div className="site-header-social__link-tooltip">GitHub</div>
				</a>
				<a
					href="https://steamcommunity.com/profiles/76561198783415213"
					className="site-header-social__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconSteam />
					<div className="site-header-social__link-tooltip">Steam</div>
				</a>
				<a
					href="https://www.youtube.com/@metayetidev"
					className="site-header-social__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconYouTube />
					<div className="site-header-social__link-tooltip">YouTube</div>
				</a>
				<a
					href="https://soundcloud.com/metayeti"
					className="site-header-social__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconSoundCloud />
					<div className="site-header-social__link-tooltip site-header-social__link-tooltip--last">
						SoundCloud
					</div>
				</a>
				<a
					href="mailto:metayetidev@gmail.com"
					className="site-header-social__link"
					target="_blank"
					rel="noopener noreferrer"
				>
					<IconEmail />
					<div className="site-header-social__link-tooltip site-header-social__link-tooltip--last">
						E-Mail
					</div>
				</a>
			</div>
		</nav>
	);
}
