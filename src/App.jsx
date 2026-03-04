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
//  Updated:      2026-03-04
//
//  ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//
//  NOTE:         -
//  TODO:         Remove console.log in final version.
//

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
			{/* <div className="site-in-construction">
				<div class="band-1">
					<div class="band-1-track">
						<div class="band-1-segment">
							<div class="band-1-stripe"></div>
							<div class="band-1-text">UNDER CONSTRUCTION</div>
							<div class="band-1-stripe"></div>
							<div class="band-1-text">⚡ COMING SOON ⚡</div>
							<div class="band-1-stripe"></div>
							<div class="band-1-text">WORK IN PROGRESS</div>
							<div class="band-1-stripe"></div>
							<div class="band-1-text">🚧 STAY TUNED 🚧</div>
						</div>
						<div class="band-1-segment">
							<div class="band-1-stripe"></div>
							<div class="band-1-text">UNDER CONSTRUCTION</div>
							<div class="band-1-stripe"></div>
							<div class="band-1-text">⚡ COMING SOON ⚡</div>
							<div class="band-1-stripe"></div>
							<div class="band-1-text">WORK IN PROGRESS</div>
							<div class="band-1-stripe"></div>
							<div class="band-1-text">🚧 STAY TUNED 🚧</div>
						</div>
					</div>
				</div>
			</div> */}
			<SiteHeader />
			<main>
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
