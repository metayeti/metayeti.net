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
//  File:         src/main.jsx
//  Description:  Application entry point.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-09
//  Updated:      2026-03-03
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import '@/styles/main.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';

createRoot(document.getElementById('metayeti')).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
