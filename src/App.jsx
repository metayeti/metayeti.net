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
//  File:         src/App.jsx
//  Description:  App component.
//
//  Author:       Danijel Durakovic <metayetidev@gmail.com>
//  Created:      2026-02-09
//  Updated:      2026-03-13
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         Remove console.log in final version.
//

import UnderConstruction from './components/extras/UnderConstruction';

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
//import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Blog from '@/pages/Blog';
import About from '@/pages/About';
import NotFound from './pages/NotFound';

console.log('Current mode:', import.meta.env.MODE);

function RootLayout() {
	return (
		<>
			{import.meta.env.MODE === 'production' && <UnderConstruction />}
			<SiteHeader />
			<main>
				<Outlet />
			</main>
			<SiteFooter />
			{import.meta.env.MODE === 'production' && <UnderConstruction />}
		</>
	);
}

const router = createBrowserRouter([
	//const router = createHashRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
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
