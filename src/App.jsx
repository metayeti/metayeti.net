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
//  File:         App.jsx
//  Description:
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-09
//  Updated:      2026-03-01
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         -
//

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from '@/routes/Home';
import Projects from '@/routes/Projects';
import Blog from '@/routes/Blog';
import About from '@/routes/About';
import NotFound from './routes/NotFound';

function RootLayout() {
	return (
		<>
			<SiteHeader />
			<main className="main-content">
				<Outlet />
				{Array.from({ length: 60 }).map((_, i) => (
					<br key={i} />
				))}
			</main>
			<SiteFooter />
		</>
	);
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/projects',
				element: <Projects />,
			},
			{
				path: '/blog',
				element: <Blog />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
