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
//  File:         src/components/LatestProjects/LatestProjects.jsx
//  Description:  Latest projects component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-18
//  Updated:      2026-03-18
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { Link } from 'react-router-dom';

import './LatestProjects.scss';

export default function LatestProjects() {
	const projectsToShow = 3;

	return (
		<div className="latest-projects">
			<div>Under construction.</div>
			{/* {MOCK_PROJECTS.length > projectsToShow && ( */}
			<div className="latest-projects__more">
				<Link to="/projects">More &middot;&middot;&middot;</Link>
			</div>
			{/* )} */}
		</div>
	);
}
