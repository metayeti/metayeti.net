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
//  File:         main.jsx
//  Description:  Site entry point.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-09
//  Updated:      n/a
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import '@/styles/main.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App.jsx';

createRoot(document.getElementById('metayeti-dot-net')).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
