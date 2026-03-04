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
//  File:         src/components/extras/UnderConstruction.jsx
//  Description:  Under construction banner.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-04
//  Updated:      2026-03-04
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         Remove when site is finished.
//  TODO:         -
//

import './UnderConstruction.scss';

export default function UnderConstruction() {
	const BandSegment = () => (
		<div className="band-segment">
			{Array.from({ length: 4 }, (_, i) => (
				<>
					<div key={i} className="band-stripe" />
					<div key={i + 4} className="band-text">
						UNDER CONSTRUCTION
					</div>
				</>
			))}
		</div>
	);

	return (
		<div className="under-construction-banner">
			<div className="band">
				<div className="band-track">
					{Array.from({ length: 3 }, (_, i) => (
						<BandSegment key={i} />
					))}
				</div>
			</div>
		</div>
	);
}
