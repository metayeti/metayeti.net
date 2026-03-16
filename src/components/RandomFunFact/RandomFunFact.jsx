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
//  File:         src/components/RandomFunFact/RandomFunFact.jsx
//  Description:  Component that displays a random fun fact (daily).
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-03-16
//  Updated:      2026-03-16
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import { useState, useEffect } from 'react';
import { loadJSON, SRC_FUN_FACTS } from '@/util';

import './RandomFunFact.scss';

export default function RandomFunFact() {
	const [fact, setFact] = useState(null);

	useEffect(() => {
		async function fetchFact() {
			try {
				const data = await loadJSON(SRC_FUN_FACTS);
				if (Array.isArray(data) && data.length > 0) {
					const now = new Date();
					const start = new Date(now.getFullYear(), 0, 0);
					const diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
					const oneDay = 1000 * 60 * 60 * 24;
					const day = Math.floor(diff / oneDay);

					// do some LCG to get a more random distribution of facts across days
					const a = 1664525;
					const c = 1013904223;
					const m = data.length;
					const index = (a * day + c) % m;

					setFact(data[index]);
				}
			} catch (error) {
				console.error('Failed to load fun facts:', error);
			}
		}

		fetchFact();
	}, []);

	if (!fact) return null;

	return (
		<div className="random-fun-fact">
			<div className="random-fun-fact__category">{fact.category}</div>
			<div>
				<span className="random-fun-fact__text">{fact.fact}</span>
			</div>
		</div>
	);
}
