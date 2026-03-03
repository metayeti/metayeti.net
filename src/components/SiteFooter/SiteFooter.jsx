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
//  File:         src/components/SiteFooter/SiteFooter.jsx
//  Description:  Site footer component.
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

import './SiteFooter.scss';

function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="site-footer__main wrapped">
				<span>Created by Danijel Durakovic</span>
				<span>
					Powered by
					<a href="https://react.dev" target="_blank" className="site-footer__react-link">
						<div className="site-footer__react-icon"></div> React
					</a>
				</span>
				<span>&copy; {new Date().getFullYear()} metayeti.net | All rights reserved.</span>
			</div>
		</footer>
	);
}

export default SiteFooter;
